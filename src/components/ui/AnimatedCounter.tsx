import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export const AnimatedCounter = ({ 
  value, 
  suffix = '', 
  duration = 2, 
  className = '',
  decimals = 0 
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const startTime = Date.now();
      const startValue = 0;
      const endValue = value;

      const animate = () => {
        const now = Date.now();
        const elapsed = (now - startTime) / 1000; // elapsed time in seconds
        const progress = Math.min(elapsed / duration, 1); // progress from 0 to 1

        // Easing function for smooth animation (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (endValue - startValue) * easeOut;

        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(endValue); // Ensure we end exactly at the target value
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  // Check if element is already in view on mount
  useEffect(() => {
    if (ref.current && !hasAnimated.current) {
      const rect = (ref.current as HTMLElement).getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight + 100 && rect.bottom > -100;
      if (isVisible) {
        hasAnimated.current = true;
        
        const startTime = Date.now();
        const startValue = 0;
        const endValue = value;

        const animate = () => {
          const now = Date.now();
          const elapsed = (now - startTime) / 1000;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentValue = startValue + (endValue - startValue) * easeOut;

          setCount(currentValue);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(endValue);
          }
        };

        const timer = setTimeout(() => {
          requestAnimationFrame(animate);
        }, 50);
        
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count);

  return (
    <span ref={ref} className={className}>
      {displayValue}{suffix}
    </span>
  );
};

