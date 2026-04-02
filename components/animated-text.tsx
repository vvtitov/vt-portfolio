"use client"

import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
}

export function AnimatedText({ text }: AnimatedTextProps) {
  // Split text into an array of words
  const words = text.split(" ")

  // Keep text painted from the first frame so LCP is not blocked waiting for opacity.
  const container = {
    hidden: { opacity: 1 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.03 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 1,
      y: 14,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 120,
      },
    },
  }

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-foreground leading-tight"
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} style={{ marginRight: "0.25em", display: "inline-block" }}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

