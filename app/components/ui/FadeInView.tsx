import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface FadeInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
  threshold?: number;
}

const directionOffsets = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

const FadeInView = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 40,
  once = true,
  threshold = 0.2,
}: FadeInViewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const offset = directionOffsets[direction];
  const initialX = direction === "left" ? distance : direction === "right" ? -distance : 0;
  const initialY = direction === "up" ? distance : direction === "down" ? -distance : 0;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: initialX, y: initialY }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: initialX, y: initialY }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInView;
