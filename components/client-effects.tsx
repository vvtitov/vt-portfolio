"use client"

import dynamic from "next/dynamic"

const CursorFollower = dynamic(
  () => import("@/components/cursor-follower").then((mod) => ({ default: mod.CursorFollower })),
  { ssr: false },
)

export function ClientEffects() {
  return <CursorFollower />
}
