"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useProjects } from "@/context/projects-context"

export function ProjectFilter() {
  const { activeFilter, setActiveFilter } = useProjects()

  const filters = [
    { id: "all", label: "All" },
    { id: "web", label: "Web Development" },
    { id: "ui", label: "UI/UX Design" },
    { id: "ai", label: "Artificial Intelligence" },  
  ]

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {filters &&
        filters.map((filter) => (
          <motion.div key={filter.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className="rounded-full"
            >
              {filter.label}
            </Button>
          </motion.div>
        ))}
    </div>
  )
}
