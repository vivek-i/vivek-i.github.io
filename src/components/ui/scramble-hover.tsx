"use client"

import { motion } from "motion/react"
import React, { useState, useEffect } from "react"

interface ScrambleHoverProps {
  text: string
  scrambleSpeed?: number
  maxIterations?: number
  useOriginalCharsOnly?: boolean
  className?: string
  style?: React.CSSProperties
}

const ScrambleHover: React.FC<ScrambleHoverProps> = ({
  text,
  scrambleSpeed = 100,
  maxIterations = 4,
  useOriginalCharsOnly = true,
  className = "",
  style = {},
}) => {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)

  const characters = useOriginalCharsOnly
    ? Array.from(new Set(text.split(""))).join("")
    : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"

  const scrambleText = () => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iteration) return text[index]
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join("")
      )

      if (iteration >= text.length) {
        clearInterval(interval)
        setDisplayText(text)
      }

      iteration += 1 / 3
    }, scrambleSpeed)
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
    scrambleText()
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setDisplayText(text)
  }

  useEffect(() => {
    setDisplayText(text)
  }, [text])

  return (
    <motion.span
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
    </motion.span>
  )
}

export default ScrambleHover 