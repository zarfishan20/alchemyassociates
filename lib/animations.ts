// lib/animations.ts
import { Variants } from "framer-motion";

type Direction = "left" | "right";

export const slideIn = (
  direction: Direction = "left",
  delay: number = 0
): Variants => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -80 : 80, // Reduced distance slightly for a smoother feel
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.4, // Increased from 1 to 1.4
      delay,
      ease: [0.25, 0.1, 0.25, 1], // Standard "cubic-out" for a more gradual deceleration
    }
  }
});

export const fadeUp = (delay: number = 0): Variants => ({
  hidden: {
    opacity: 0,
    y: 40, // Reduced from 60 to 40 so it doesn't have to "travel" as fast
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2, // Increased from 0.9 to 1.2
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    }
  }
});

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2, // Increased from 0.15 for a more intentional sequence
    }
  }
};