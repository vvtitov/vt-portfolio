"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SkillBarProps {
  name: string
  percentage: number
  delay?: number
}

export function SkillBar({ name, percentage, delay = 0 }: SkillBarProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{name}</h3>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

