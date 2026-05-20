import { motion } from 'motion/react';

const AdvisorEmptyState = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-4 text-center sm:justify-between"
    >
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">
        Pathway &amp; roadmap guidance
      </h1>
    </motion.header>
  );
};

export default AdvisorEmptyState;
