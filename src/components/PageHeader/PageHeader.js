import React, { useEffect, useRef, useState } from "react";
import { Container } from "reactstrap";

export default function PageHeader({onApplyClick}) {
  const canvasRef = useRef(null);
  const dropsRef = useRef([]);
  const [showApplyText, setShowApplyText] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const ctx = c.getContext("2d");
    let animationTimeout;

    function setupCanvas() {
      c.width = window.innerWidth;
      c.height = window.innerHeight;

      let fontSize = 12;
      let columns = Math.floor(c.width / fontSize);
      dropsRef.current = new Array(columns).fill(1);
    }

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = "#f4427d";
      ctx.font = "12px Arial";
      const matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("");

      dropsRef.current.forEach((yPos, index) => {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, index * 12, yPos * 12);

        if (yPos * 12 > c.height && Math.random() > 0.975) {
          dropsRef.current[index] = 0;
        }

        dropsRef.current[index]++;
      });

      animationTimeout = setTimeout(draw, 35); // Smooth, controlled frame pacing
    }

    setupCanvas();
    draw(); // Start animation

    window.addEventListener("resize", setupCanvas);

    return () => {
      clearTimeout(animationTimeout);
      window.removeEventListener("resize", setupCanvas);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowApplyText(true);
    }, 1500); // Show text after 1 second

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="page-header header-filter" style={{ placeItems: "center", position: "relative" }}>
      <Container style={{ textAlign: "center", position: "absolute", top: "85%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "0" }}>The</h2>
        <h1 style={{
          fontSize: "3.5rem",
          fontWeight: "bold",
          whiteSpace: "nowrap",
          display: "inline-block",
          maxWidth: "100%"
        }}>
          Duke Trading Cup
        </h1>
        <h3 style={{
          fontSize: "1.2rem",
          marginTop: "-20px",
          opacity: 0.8,
        }}>
          Spring 2025 | Cash Prizes
        </h3>
        {/* Fading "Apply Now" Text */}
        <h2 style={{
          fontSize: "1.5rem",
          marginTop: "10px",
          opacity: showApplyText ? 1 : 0,
          transition: "opacity 1.5s ease-in-out",
          cursor: "pointer",
          textDecoration: "underline"
          }}
          onClick={onApplyClick}
          >
          Apply Now
          </h2>
      </Container>

      <canvas ref={canvasRef} style={{ position: "absolute", top: "0", left: "0", zIndex: "-1" }}></canvas>
    </div>
  );
}
