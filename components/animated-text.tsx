"use client"

import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
}

export function AnimatedText({ text }: AnimatedTextProps) {
  // Split text into an array of words
  const words = text.split(" ")

  // Variants for container of words
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  // Variants for each word
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
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

