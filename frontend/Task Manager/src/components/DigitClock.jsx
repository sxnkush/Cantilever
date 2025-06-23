import { motion } from "framer-motion";

export default function DigitClock({ digit }) {
  return (
    <motion.div
      className="bg-black text-amber-400 text-5xl w-12 h-16 flex items-center justify-center rounded shadow-lg font-mono "
      key={digit}
      initial={{ rotateX: -90 }}
      animate={{ rotateX: 0 }}
      exit={{ rotateX: 90 }}
      transition={{ duration: 0.3 }}
    >
      {digit}
    </motion.div>
  );
}
