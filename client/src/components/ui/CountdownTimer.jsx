import { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-orbitron font-bold text-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[10px] text-gray-500 font-sora uppercase">{label}</span>
    </div>
  );

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <TimeBlock value={timeLeft.days} label="Days" />
      <span className="text-gray-600 pb-4">:</span>
      <TimeBlock value={timeLeft.hours} label="Hrs" />
      <span className="text-gray-600 pb-4">:</span>
      <TimeBlock value={timeLeft.minutes} label="Min" />
      <span className="text-gray-600 pb-4">:</span>
      <TimeBlock value={timeLeft.seconds} label="Sec" />
    </div>
  );
};

export default CountdownTimer;