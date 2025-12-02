import { motion, useInView } from "framer-motion";
import { ReactNode, useRef, useEffect, useState } from "react";

interface SectionAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const PopupAnimation = ({ children, className = "", delay = 0 }: SectionAnimationProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Check if element is already in view on mount (with small delay to ensure DOM is ready)
    const checkVisibility = () => {
      if (ref.current) {
        const rect = (ref.current as HTMLElement).getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight + 100 && rect.bottom > -100;
        if (isVisible) {
          setShouldAnimate(true);
        }
      }
    };
    
    // Small delay to ensure ref is attached
    const timer = setTimeout(checkVisibility, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 0, y: 50 }}
      animate={(isInView || shouldAnimate) ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 0, y: 50 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeIn = ({ children, className = "", delay = 0, direction = "up" }: { children: ReactNode, className?: string, delay?: number, direction?: "up" | "down" | "left" | "right" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  useEffect(() => {
    // Check if element is already in view on mount (with small delay to ensure DOM is ready)
    const checkVisibility = () => {
      if (ref.current) {
        const rect = (ref.current as HTMLElement).getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight + 100 && rect.bottom > -100;
        if (isVisible) {
          setShouldAnimate(true);
        }
      }
    };
    
    // Small delay to ensure ref is attached
    const timer = setTimeout(checkVisibility, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={(isInView || shouldAnimate) ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, className = "", staggerDelay = 0.1 }: { children: ReactNode, className?: string, staggerDelay?: number }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

