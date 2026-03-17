import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const AnimatedCounter = ({ value, duration = 2, prefix = '', suffix = '', className = '' }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <motion.span 
      className={`font-orbitron ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
};

export default AnimatedCounter;