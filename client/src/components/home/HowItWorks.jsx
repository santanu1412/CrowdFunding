import { motion } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "Initialize Project",
    desc: "Deploy your vision to the network. Set your funding goal, timeline, and reward tiers for early adopters.",
    icon: (
      <svg className="w-8 h-8 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    num: "02",
    title: "Gather Support",
    desc: "Connect with backers globally. Watch your progress bar fill in real-time as the community funds your idea.",
    icon: (
      <svg className="w-8 h-8 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    num: "03",
    title: "Execute Protocol",
    desc: "Once fully funded, the smart contract releases capital. Build your product and distribute rewards to backers.",
    icon: (
      <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4">
            System <span className="text-cyan">Architecture</span>
          </h2>
          <p className="text-gray-400 font-sora">Three steps to turn a concept into a reality.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-cyan via-violet to-emerald-500 opacity-20" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-dark border-2 border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-lg group hover:border-cyan transition-colors duration-300">
                <div className="absolute inset-2 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan/10 transition-colors duration-300">
                  {step.icon}
                </div>
                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-dark border border-white/10 rounded-full flex items-center justify-center font-orbitron font-bold text-xs text-gray-400">
                  {step.num}
                </div>
              </div>
              
              <h3 className="text-xl font-orbitron font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 font-sora text-sm leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;