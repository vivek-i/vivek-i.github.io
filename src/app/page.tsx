"use client";
import Head from "next/head";
import styles from "./page.module.css";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { useState, useEffect, useCallback, useRef } from "react";
import AnimatedCursor from "react-animated-cursor";
import ScrambleHover from "../components/ui/scramble-hover";
import ThemeToggle from "../components/ui/theme-toggle";
import { motion } from "motion/react";

type Position = {
  x: number;
  y: number;
};

const blobStyle = {
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(60px)',
  willChange: 'transform',
  pointerEvents: 'none',
} as const;

const getIconStyle = (color: string) => ({
  color: color,
  fontSize: "3.125rem", 
  marginTop: "15px",
  marginBottom: "15px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  pointerEvents: "auto" as const,
  transform: "scale(1)",
});

const getIconHoverStyle = (color: string) => ({
  color: color,
  fontSize: "3.125rem", 
  marginTop: "15px",
  marginBottom: "15px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  pointerEvents: "auto" as const,
  transform: "scale(1.2)",
});

const linkStyle = {
  color: "white",
  textDecoration: "underline",
  pointerEvents: "auto" as const,
  transition: "all 0.3s ease",
  opacity: 0.8,
};

const linkHoverStyle = {
  ...linkStyle,
  opacity: 1,
};

const isIphoneWithSafari = () => {
  const ua = navigator.userAgent;
  return (
    /iPhone/.test(ua) &&
    /Safari/.test(ua) &&
    !/CriOS/.test(ua) &&
    !/FxiOS/.test(ua)
  );
};

export default function Home() {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
  const [isIphoneSafari, setIsIphoneSafari] = useState(false);
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  // Blob positions with velocity for floating effect
  const [blob1Pos, setBlob1Pos] = useState({ x: 0, y: 0 });
  const [blob2Pos, setBlob2Pos] = useState({ x: 0, y: 0 });
  const [blob3Pos, setBlob3Pos] = useState({ x: 0, y: 0 });
  
  // Use ref for mouse position to avoid recreating animation loop
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
    
    // Check for saved theme
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark";
      if (currentTheme) {
        setTheme(currentTheme);
      }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    
    return () => observer.disconnect();
  }, []);

  // Floating and bouncing blobs animation
  useEffect(() => {
    if (!isMounted) return;

    let animationFrameId: number;
    let time = 0;
    
    // Use refs to avoid recreating the effect
    let currentBlob1Pos = { x: 0, y: 0 };
    let currentBlob2Pos = { x: 0, y: 0 };
    let currentBlob3Pos = { x: 0, y: 0 };
    
    // Initial velocities for natural floating
    const velocities = {
      blob1: { x: 0, y: 0 },
      blob2: { x: 0, y: 0 },
      blob3: { x: 0, y: 0 },
    };

    const animate = () => {
      time += 0.02;
      
      // Natural floating motion using sine waves - larger amplitude for more visible movement
      const float1X = Math.sin(time * 0.7) * 100;
      const float1Y = Math.cos(time * 0.5) * 90;
      
      const float2X = Math.sin(time * 0.6 + 2) * 95;
      const float2Y = Math.cos(time * 0.8 + 2) * 85;
      
      const float3X = Math.sin(time * 0.8 + 4) * 90;
      const float3Y = Math.cos(time * 0.7 + 4) * 100;

      // Get current mouse position from ref
      const mouse = mouseRef.current;

      // Cursor repulsion effect - MASSIVE repel like hitting a ball
      const repelDistance = 350;
      const repelStrength = 15;

      // Blob 1 repulsion
      const blob1CenterX = window.innerWidth * 0.3;
      const blob1CenterY = window.innerHeight * 0.4;
      const blob1ActualX = blob1CenterX + float1X + currentBlob1Pos.x;
      const blob1ActualY = blob1CenterY + float1Y + currentBlob1Pos.y;
      const dist1 = Math.hypot(mouse.x - blob1ActualX, mouse.y - blob1ActualY);
      
      if (dist1 < repelDistance && dist1 > 1) {
        const angle1 = Math.atan2(blob1ActualY - mouse.y, blob1ActualX - mouse.x);
        const force = ((repelDistance - dist1) / repelDistance) * repelStrength;
        velocities.blob1.x += Math.cos(angle1) * force;
        velocities.blob1.y += Math.sin(angle1) * force;
      }

      // Blob 2 repulsion
      const blob2CenterX = window.innerWidth * 0.8;
      const blob2CenterY = window.innerHeight * 0.3;
      const blob2ActualX = blob2CenterX + float2X + currentBlob2Pos.x;
      const blob2ActualY = blob2CenterY + float2Y + currentBlob2Pos.y;
      const dist2 = Math.hypot(mouse.x - blob2ActualX, mouse.y - blob2ActualY);
      
      if (dist2 < repelDistance && dist2 > 1) {
        const angle2 = Math.atan2(blob2ActualY - mouse.y, blob2ActualX - mouse.x);
        const force = ((repelDistance - dist2) / repelDistance) * repelStrength;
        velocities.blob2.x += Math.cos(angle2) * force;
        velocities.blob2.y += Math.sin(angle2) * force;
      }

      // Blob 3 repulsion
      const blob3CenterX = window.innerWidth * 0.6;
      const blob3CenterY = window.innerHeight * 0.8;
      const blob3ActualX = blob3CenterX + float3X + currentBlob3Pos.x;
      const blob3ActualY = blob3CenterY + float3Y + currentBlob3Pos.y;
      const dist3 = Math.hypot(mouse.x - blob3ActualX, mouse.y - blob3ActualY);
      
      if (dist3 < repelDistance && dist3 > 1) {
        const angle3 = Math.atan2(blob3ActualY - mouse.y, blob3ActualX - mouse.x);
        const force = ((repelDistance - dist3) / repelDistance) * repelStrength;
        velocities.blob3.x += Math.cos(angle3) * force;
        velocities.blob3.y += Math.sin(angle3) * force;
      }

      // Apply friction - minimal friction so they really fly
      const friction = 0.94;
      velocities.blob1.x *= friction;
      velocities.blob1.y *= friction;
      velocities.blob2.x *= friction;
      velocities.blob2.y *= friction;
      velocities.blob3.x *= friction;
      velocities.blob3.y *= friction;

      // Return blobs to center gradually - weaker so they fly far before coming back
      const returnForce = 0.008;
      velocities.blob1.x -= currentBlob1Pos.x * returnForce;
      velocities.blob1.y -= currentBlob1Pos.y * returnForce;
      velocities.blob2.x -= currentBlob2Pos.x * returnForce;
      velocities.blob2.y -= currentBlob2Pos.y * returnForce;
      velocities.blob3.x -= currentBlob3Pos.x * returnForce;
      velocities.blob3.y -= currentBlob3Pos.y * returnForce;

      // Update local positions
      currentBlob1Pos.x += velocities.blob1.x;
      currentBlob1Pos.y += velocities.blob1.y;
      currentBlob2Pos.x += velocities.blob2.x;
      currentBlob2Pos.y += velocities.blob2.y;
      currentBlob3Pos.x += velocities.blob3.x;
      currentBlob3Pos.y += velocities.blob3.y;

      // Update state
      setBlob1Pos({ x: currentBlob1Pos.x + float1X, y: currentBlob1Pos.y + float1Y });
      setBlob2Pos({ x: currentBlob2Pos.x + float2X, y: currentBlob2Pos.y + float2Y });
      setBlob3Pos({ x: currentBlob3Pos.x + float3X, y: currentBlob3Pos.y + float3Y });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMounted]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const pos = { x: e.pageX, y: e.pageY };
    setMousePosition(pos);
    mouseRef.current = pos;
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      setIsIphoneSafari(isIphoneWithSafari());
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []); 


  const colors = {
    light: {
      bg: "#f4ede3",
      overlay: "rgba(244, 237, 227, 0.3)",
      text: "#0a0a0a",
      textSecondary: "rgba(10, 10, 10, 0.85)",
      icon: "rgba(10, 10, 10, 0.4)",
      iconHover: "rgba(10, 10, 10, 0.9)",
      link: "#0a0a0a",
      linkOpacity: 0.9,
      cursor: "#0a0a0a",
      blobGradient: "linear-gradient(-220deg, rgb(0, 51, 208) 0%, rgb(200, 116, 254) 40%, rgb(255, 198, 41) 80%)",
    },
    dark: {
      bg: "#0a0a0a",
      overlay: "rgba(10,10,10,0.3)",
      text: "#fafafa",
      textSecondary: "rgba(250, 250, 250, 0.85)",
      icon: "rgba(250, 250, 250, 0.4)",
      iconHover: "rgba(250, 250, 250, 0.9)",
      link: "#fafafa",
      linkOpacity: 0.9,
      cursor: "#fafafa",
      blobGradient: "linear-gradient(-220deg, rgb(0, 51, 208) 0%, rgb(200, 116, 254) 40%, rgb(255, 198, 41) 80%)",
    },
  };

  const currentColors = colors[theme];

  return (
    <div onPointerMove={handlePointerMove}>
      <ThemeToggle />
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        innerStyle={{
          backgroundColor: currentColors.cursor,
        }}
        outerStyle={{
          border: `3px solid ${currentColors.cursor}`,
        }}
      />

      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: currentColors.bg,
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
          transition: "background-color 0.5s ease",
        }}
      >
        {/* Blob 1 */}
        <div
          style={{
            ...blobStyle,
            width: windowWidth === undefined ? '400px' : windowWidth < 600 ? '250px' : windowWidth < 900 ? '320px' : '400px',
            height: windowWidth === undefined ? '400px' : windowWidth < 600 ? '250px' : windowWidth < 900 ? '320px' : '400px',
            background: currentColors.blobGradient,
            opacity: theme === 'light' ? 1 : 0.7,
            left: '30%',
            top: '40%',
            marginLeft: windowWidth === undefined ? '-200px' : windowWidth < 600 ? '-125px' : windowWidth < 900 ? '-160px' : '-200px',
            marginTop: windowWidth === undefined ? '-200px' : windowWidth < 600 ? '-125px' : windowWidth < 900 ? '-160px' : '-200px',
            transform: `translate(${blob1Pos.x}px, ${blob1Pos.y}px)`,
          }}
        />
        
        {/* Blob 2 */}
        <div
          style={{
            ...blobStyle,
            width: windowWidth === undefined ? '350px' : windowWidth < 600 ? '220px' : windowWidth < 900 ? '280px' : '350px',
            height: windowWidth === undefined ? '350px' : windowWidth < 600 ? '220px' : windowWidth < 900 ? '280px' : '350px',
            background: currentColors.blobGradient,
            opacity: theme === 'light' ? 0.95 : 0.65,
            right: '20%',
            top: '30%',
            marginRight: windowWidth === undefined ? '-175px' : windowWidth < 600 ? '-110px' : windowWidth < 900 ? '-140px' : '-175px',
            marginTop: windowWidth === undefined ? '-175px' : windowWidth < 600 ? '-110px' : windowWidth < 900 ? '-140px' : '-175px',
            transform: `translate(${blob2Pos.x}px, ${blob2Pos.y}px)`,
          }}
        />
        
        {/* Blob 3 */}
        <div
          style={{
            ...blobStyle,
            width: windowWidth === undefined ? '380px' : windowWidth < 600 ? '240px' : windowWidth < 900 ? '300px' : '380px',
            height: windowWidth === undefined ? '380px' : windowWidth < 600 ? '240px' : windowWidth < 900 ? '300px' : '380px',
            background: currentColors.blobGradient,
            opacity: theme === 'light' ? 0.9 : 0.6,
            left: '60%',
            bottom: '20%',
            marginLeft: windowWidth === undefined ? '-190px' : windowWidth < 600 ? '-120px' : windowWidth < 900 ? '-150px' : '-190px',
            marginBottom: windowWidth === undefined ? '-190px' : windowWidth < 600 ? '-120px' : windowWidth < 900 ? '-150px' : '-190px',
            transform: `translate(${blob3Pos.x}px, ${blob3Pos.y}px)`,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: currentColors.overlay,
          zIndex: 10,
          backdropFilter: "blur(100px)",
          WebkitBackdropFilter: "blur(100px)",
          display: "flex",
          flexDirection: "column", 
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "max(0px, env(safe-area-inset-top))",
          paddingBottom: "max(40px, env(safe-area-inset-bottom))",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
          overflowY: "auto",
          overflowX: "hidden",
          pointerEvents: "none",
          transition: "background-color 0.5s ease",
        }}
      >
        {/* Main Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: windowWidth && windowWidth > 900 ? "row" : "column",
            justifyContent: windowWidth && windowWidth > 900 ? "space-between" : "flex-start",
            alignItems: windowWidth && windowWidth > 900 ? "flex-start" : "flex-start",
            maxWidth: "1200px",
            width: "100%",
            padding: windowWidth === undefined ? "40px" : windowWidth < 600 ? "24px 20px 60px 20px" : windowWidth < 900 ? "32px 28px 60px 28px" : "60px 40px",
            gap: windowWidth && windowWidth > 900 ? "100px" : "40px",
          }}
        >
          {/* Left Column - Name & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              minWidth: windowWidth && windowWidth > 900 ? "240px" : "auto",
              position: windowWidth && windowWidth > 900 ? "sticky" : "relative",
              top: windowWidth && windowWidth > 900 ? "60px" : "0",
              order: windowWidth && windowWidth < 900 ? 0 : 0,
            }}
          >
            <h1
              style={{
                fontFamily: "Manrope",
                color: currentColors.text,
                fontSize: windowWidth === undefined ? "1.5rem" : windowWidth < 600 ? "1.35rem" : windowWidth < 900 ? "1.5rem" : "1.5rem",
                fontWeight: "400",
                marginBottom: windowWidth && windowWidth < 900 ? "0px" : "32px",
                letterSpacing: "-0.01em",
                lineHeight: "1.3",
                transition: "color 0.5s ease",
              }}
            >
              <ScrambleHover
                text="vivek isukapalli"
                scrambleSpeed={30}
                maxIterations={10}
                useOriginalCharsOnly={true}
                style={{ cursor: "pointer", pointerEvents: "auto" }}
              />
            </h1>
            
            {/* Social Links - Desktop Only */}
            {windowWidth && windowWidth > 900 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "24px",
                }}
              >
                <a
                  href="https://www.linkedin.com/in/vivek-isukapalli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "Manrope",
                    fontSize: "0.9rem",
                    color: currentColors.textSecondary,
                    opacity: 0.6,
                    textDecoration: "none",
                    pointerEvents: "auto",
                    transition: "opacity 0.3s ease",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.6"; }}
                >
                  linkedin
                </a>
                <a
                  href="https://github.com/vivek-i"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "Manrope",
                    fontSize: "0.9rem",
                    color: currentColors.textSecondary,
                    opacity: 0.6,
                    textDecoration: "none",
                    pointerEvents: "auto",
                    transition: "opacity 0.3s ease",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.6"; }}
                >
                  github
                </a>
                <a
                  href="https://www.instagram.com/vivek.isu"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "Manrope",
                    fontSize: "0.9rem",
                    color: currentColors.textSecondary,
                    opacity: 0.6,
                    textDecoration: "none",
                    pointerEvents: "auto",
                    transition: "opacity 0.3s ease",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.6"; }}
                >
                  instagram
                </a>
              </div>
            )}
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              flex: 1,
              maxWidth: windowWidth && windowWidth > 900 ? "600px" : "100%",
            }}
          >
            {/* Intro */}
            <p
              style={{
                fontFamily: "Manrope",
                fontSize: windowWidth === undefined ? "1.05rem" : windowWidth < 600 ? "0.9rem" : "1.05rem",
                lineHeight: "1.7",
                color: currentColors.textSecondary,
                marginBottom: windowWidth && windowWidth < 600 ? "28px" : "32px",
                fontWeight: windowWidth && windowWidth < 600 ? "300" : "300",
                letterSpacing: "-0.01em",
                transition: "color 0.5s ease",
                opacity: windowWidth && windowWidth < 600 ? 0.7 : 1,
              }}
            >
              exploring <span style={{ opacity: 0.4 }}>|</span> applied ai
            </p>

            {/* Current */}
            <div style={{ marginBottom: windowWidth && windowWidth < 600 ? "28px" : "32px" }}>
              <p
                style={{
                  fontFamily: "Manrope",
                  fontSize: windowWidth === undefined ? "0.85rem" : windowWidth < 600 ? "0.8rem" : "0.85rem",
                  color: currentColors.textSecondary,
                  opacity: 0.5,
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontWeight: "500",
                  transition: "color 0.5s ease",
                }}
              >
                currently
              </p>
              <p
                style={{
                  fontFamily: "Manrope",
                  fontSize: windowWidth === undefined ? "1.05rem" : windowWidth < 600 ? "1rem" : "1.05rem",
                  lineHeight: "1.7",
                  color: currentColors.textSecondary,
                  fontWeight: "300",
                  letterSpacing: "-0.01em",
                  transition: "color 0.5s ease",
                }}
              >
                building{" "}
                <a
                  href="https://valuemate.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: currentColors.link,
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    textDecorationColor: "rgba(128, 128, 128, 0.3)",
                    pointerEvents: "auto",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecorationColor = currentColors.link;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecorationColor = "rgba(128, 128, 128, 0.3)";
                  }}
                >
                  valuemate
                </a>{" "}
                (yc x25), where we use ai to automate real estate appraisals.
              </p>
            </div>

            {/* Previously */}
            <div style={{ marginBottom: windowWidth && windowWidth < 600 ? "28px" : "32px" }}>
              <p
                style={{
                  fontFamily: "Manrope",
                  fontSize: windowWidth === undefined ? "0.85rem" : windowWidth < 600 ? "0.8rem" : "0.85rem",
                  color: currentColors.textSecondary,
                  opacity: 0.5,
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontWeight: "500",
                  transition: "color 0.5s ease",
                }}
              >
                previously
              </p>
              <p
                style={{
                  fontFamily: "Manrope",
                  fontSize: windowWidth === undefined ? "1.05rem" : windowWidth < 600 ? "1rem" : "1.05rem",
                  lineHeight: "1.7",
                  color: currentColors.textSecondary,
                  fontWeight: "300",
                  letterSpacing: "-0.01em",
                  transition: "color 0.5s ease",
                }}
              >
                built ai agents for debt collection at{" "}
                <a
                  href="https://collectwise.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: currentColors.link,
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    textDecorationColor: "rgba(128, 128, 128, 0.3)",
                    pointerEvents: "auto",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecorationColor = currentColors.link;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecorationColor = "rgba(128, 128, 128, 0.3)";
                  }}
                >
                  collectwise
                </a>{" "}
                (yc f24). scaled to 7 figure run rate in under a year.
              </p>
            </div>

            {/* Education */}
            <div style={{ marginBottom: windowWidth && windowWidth < 600 ? "28px" : "32px" }}>
              <p
                style={{
                  fontFamily: "Manrope",
                  fontSize: windowWidth === undefined ? "0.85rem" : windowWidth < 600 ? "0.8rem" : "0.85rem",
                  color: currentColors.textSecondary,
                  opacity: 0.5,
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontWeight: "500",
                  transition: "color 0.5s ease",
                }}
              >
                education
              </p>
              <p
                style={{
                  fontFamily: "Manrope",
                  fontSize: windowWidth === undefined ? "1.05rem" : windowWidth < 600 ? "1rem" : "1.05rem",
                  lineHeight: "1.7",
                  color: currentColors.textSecondary,
                  fontWeight: "300",
                  letterSpacing: "-0.01em",
                  transition: "color 0.5s ease",
                }}
              >
                studied information systems and human-computer interaction at carnegie mellon university.
              </p>
            </div>

            {/* Social Links - Mobile Only (at bottom) */}
            {windowWidth && windowWidth <= 900 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginTop: windowWidth < 600 ? "36px" : "40px",
                }}
              >
                <a
                  href="https://www.linkedin.com/in/vivek-isukapalli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "Manrope",
                    fontSize: windowWidth < 600 ? "0.85rem" : "0.9rem",
                    color: currentColors.textSecondary,
                    opacity: 0.6,
                    textDecoration: "none",
                    pointerEvents: "auto",
                    transition: "opacity 0.3s ease",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.6"; }}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/vivek-i"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "Manrope",
                    fontSize: windowWidth < 600 ? "0.85rem" : "0.9rem",
                    color: currentColors.textSecondary,
                    opacity: 0.6,
                    textDecoration: "none",
                    pointerEvents: "auto",
                    transition: "opacity 0.3s ease",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.6"; }}
                >
                  GitHub
                </a>
                <a
                  href="https://www.instagram.com/vivek.isu"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "Manrope",
                    fontSize: windowWidth < 600 ? "0.85rem" : "0.9rem",
                    color: currentColors.textSecondary,
                    opacity: 0.6,
                    textDecoration: "none",
                    pointerEvents: "auto",
                    transition: "opacity 0.3s ease",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.6"; }}
                >
                  Instagram
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
