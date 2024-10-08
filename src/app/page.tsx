"use client";
import Head from "next/head";
import styles from "./page.module.css";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { useState, useEffect } from "react"; // Import hooks
import AnimatedCursor from "react-animated-cursor";

const iconStyle = {
  color: "rgba(255, 255, 255, 0.4)",
  fontSize: "3.125rem", // 50px to rem
  marginTop: "15px",
  marginBottom: "15px",
};

// Function to detect if the device is an iPhone with Safari
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      // Check if the device is an iPhone with Safari
      setIsIphoneSafari(isIphoneWithSafari());

      // Cleanup event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty dependency array means this effect runs o

  return (
    <div>
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        // hasBlendMode={true}
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
          padding:
            windowWidth === undefined
              ? "200px" // Default padding
              : windowWidth < 500
              ? "120px"
              : windowWidth < 1000
              ? "180px"
              : "200px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(-220deg, rgb(0, 51, 208), rgb(200, 116, 254))",
            zIndex: 2,
            width: "100%",
            height: "100%",
          }}
        ></div>
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
          flexDirection: "column", // Change flex direction based on window width
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: isIphoneSafari ? "180px" : "0", // Add extra padding if iPhone with Safari
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
                  ? "1.5rem" // Default font size if windowWidth is undefined
                  : windowWidth < 1000
                  ? "1.25rem"
                  : "1.5rem", // Adjust font size based on window width
              textAlign: "left",
              marginTop: "50px",
              whiteSpace: "pre-line",
              paddingLeft: "20px", // Add padding for better alignment
              paddingRight: "20px",
              maxWidth: "700px",
              fontWeight: "300",
            }}
          >
            currently, i’m building at{" "}
            <a
              href="https://collectwise.co"
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
                  : "1.5rem", // Default to 1.5rem if windowWidth is undefined
              textAlign: "left",
              marginTop: "50px",
              whiteSpace: "pre-line",
              paddingLeft: "20px", // Add padding for better alignment
              maxWidth: "700px",
              fontWeight: "300",
              paddingRight: "20px",
            }}
          >
            i’m also a student at carnegie mellon university, studying
            information systems and software engineering
          </h4>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "60px", // Add gap between icons
            marginTop: "100px",
          }}
        >
          <a
            href="https://www.linkedin.com/in/vivek-isukapalli/"
            target="_blank"
            rel="noopener noreferrer"
            style={iconStyle}
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/vivek-i"
            target="_blank"
            rel="noopener noreferrer"
            style={iconStyle}
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/vivek.isu"
            target="_blank"
            rel="noopener noreferrer"
            style={iconStyle}
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
}
