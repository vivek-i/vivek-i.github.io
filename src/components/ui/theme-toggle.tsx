"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (!mounted) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      onClick={toggleTheme}
      style={{
        position: "fixed",
        top: typeof window !== "undefined" && window.innerWidth < 600 ? "24px" : "40px",
        right: typeof window !== "undefined" && window.innerWidth < 600 ? "20px" : "40px",
        zIndex: 1000,
        background: theme === "dark" ? "rgba(250, 250, 250, 0.08)" : "rgba(10, 10, 10, 0.08)",
        border: theme === "dark" ? "1px solid rgba(250, 250, 250, 0.15)" : "1px solid rgba(10, 10, 10, 0.15)",
        borderRadius: "10px",
        padding: "10px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: "auto",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = theme === "dark" ? "rgba(250, 250, 250, 0.12)" : "rgba(10, 10, 10, 0.12)";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = theme === "dark" ? "rgba(250, 250, 250, 0.08)" : "rgba(10, 10, 10, 0.08)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {theme === "dark" ? (
          <FiSun size={18} color="rgba(250, 250, 250, 0.9)" />
        ) : (
          <FiMoon size={18} color="rgba(10, 10, 10, 0.8)" />
        )}
      </motion.div>
    </motion.button>
  );
}

