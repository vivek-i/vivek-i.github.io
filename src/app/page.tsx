"use client";
import Head from "next/head";
import styles from "./page.module.css";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import AnimatedCursor from "react-animated-cursor";

type Position = {
  x: number;
  y: number;
};

const blobStyle = {
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(60px)',
  transition: 'transform 0.3s ease-out',
  width: '800px',
  height: '800px',
  background: 'linear-gradient(-220deg, rgb(0, 51, 208) 0%, rgb(200, 116, 254) 40%, rgb(255, 198, 41) 80%)',
} as const;

const iconStyle = {
  color: "rgba(255, 255, 255, 0.4)",
  fontSize: "3.125rem", 
  marginTop: "15px",
  marginBottom: "15px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  pointerEvents: "auto" as const,
  transform: "scale(1)",
};

const iconHoverStyle = {
  ...iconStyle,
  color: "rgba(255, 255, 255, 0.9)",
  transform: "scale(1.2)",
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    setMousePosition({ x: e.pageX, y: e.pageY });
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

  const calculateBlobTransform = (mouseX: number, mouseY: number, factor: number) => {
    if (!isMounted) return '';
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const deltaX = (mouseX - centerX) * factor;
    const deltaY = (mouseY - centerY) * factor;
    
    return `translate(${deltaX}px, ${deltaY}px)`;
  };

  return (
    <div onPointerMove={handlePointerMove}>
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        innerStyle={{
          backgroundColor: "white",
        }}
        outerStyle={{
          border: "3px solid white",
        }}
      />

      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#242424",
          position: "relative",
          overflow: "hidden",
          padding: windowWidth === undefined ? "200px" : windowWidth < 500 ? "120px" : windowWidth < 1000 ? "180px" : "200px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            ...blobStyle,
            transform: isMounted ? calculateBlobTransform(mousePosition.x, mousePosition.y, -0.35) : '',
            left: '50%',
            top: '50%',
            marginLeft: '-400px',
            marginTop: '-400px',
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
          backgroundColor: "rgba(36,36,36,0.4)",
          zIndex: 10,
          backdropFilter: "blur(130px)",
          WebkitBackdropFilter: "blur(130px)",
          display: "flex",
          flexDirection: "column", 
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: isIphoneSafari ? "180px" : "0", 
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent:
              windowWidth === undefined
                ? "flex-start"
                : windowWidth < 1000
                ? "flex-start"
                : "center",
            alignItems: "flex-start",
            marginTop: "100px",
          }}
        >
          <h1
            style={{
              fontFamily: "Manrope",
              color: "white",
              fontSize: "3rem", // 48px to rem
              textAlign: "left",
              marginTop: "0",
              paddingLeft: "20px", // Add padding for better alignment
              fontWeight: "600",
              paddingRight: "20px",
            }}
          >
            hi, i'm vivek
          </h1>
          <h4
            style={{
              fontFamily: "'Manrope', sans-serif",
              color: "white",
              fontSize:
                windowWidth === undefined
                  ? "1.5rem" 
                  : windowWidth < 1000
                  ? "1.25rem"
                  : "1.5rem",
              textAlign: "left",
              marginTop: "50px",
              whiteSpace: "pre-line",
              paddingLeft: "20px",
              paddingRight: "20px",
              maxWidth: "700px",
              fontWeight: "300",
            }}
          >
            currently, i’m building{" "}
            <a
              href="https://collectwise.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", textDecoration: "underline" }}
            >
              collectwise
            </a>{" "}
            (yc f24), where we use AI to automate debt collections 
            {/* making recovery faster, cheaper, and more effective. */}
          </h4>
          <h4
            style={{
              fontFamily: "'Manrope', sans-serif",
              color: "white",
              fontSize:
                windowWidth === undefined
                  ? "1.5rem"
                  : windowWidth < 1000
                  ? "1.25rem"
                  : "1.5rem", 
              textAlign: "left",
              marginTop: "50px",
              whiteSpace: "pre-line",
              paddingLeft: "20px", 
              maxWidth: "700px",
              fontWeight: "300",
              paddingRight: "20px",
            }}
          >
            i also attended carnegie mellon university to study
            information systems and human computer interaction
          </h4>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "60px", 
            marginTop: "100px",
          }}
        >
          <a
            href="https://www.linkedin.com/in/vivek-isukapalli/"
            target="_blank"
            rel="noopener noreferrer"
            style={iconStyle}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, iconHoverStyle);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, iconStyle);
            }}
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/vivek-i"
            target="_blank"
            rel="noopener noreferrer"
            style={iconStyle}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, iconHoverStyle);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, iconStyle);
            }}
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/vivek.isu"
            target="_blank"
            rel="noopener noreferrer"
            style={iconStyle}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, iconHoverStyle);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, iconStyle);
            }}
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
}
