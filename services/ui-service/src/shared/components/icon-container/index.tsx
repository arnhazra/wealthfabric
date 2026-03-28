"use client"
import { ReactNode } from "react"

interface IconContainerProps {
  children: ReactNode
  ai?: boolean
}

const IconContainer = ({ ai, children }: IconContainerProps) => {
  if (ai) {
    return (
      <div className="w-11 h-11 flex items-center justify-center text-white hexagon-shape ui-soft-gradient">
        {children}
      </div>
    )
  }

  return (
    <div className="w-11 h-11 flex items-center justify-center bg-primary text-black hexagon-shape">
      {children}
    </div>
  )
}

export default IconContainer
