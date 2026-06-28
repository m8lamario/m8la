"use client";

import { useEffect, useRef } from "react";
import styles from "./GridCanvas.module.css";

/* ============================================
   GridCanvas — Sfondo interattivo a griglia
   Quadrati che scalano in base alla distanza dal mouse
   ============================================ */

interface Square {
  x: number;           // centro x
  y: number;           // centro y
  baseSize: number;    // dimensione base del quadrato
  currentScale: number;// scala corrente (interpolata)
  targetScale: number; // scala target (da raggiungere via lerp)
}

// Configurazione responsive
function getConfig(width: number) {
  const isMobile = width < 768;
  return {
    cellSize: isMobile ? 20 : 10,       // dimensione cella griglia
    squareRatio: 0.8,                    // quadrato = 60% della cella
    maxScale: 1.1,                       // scala massima vicino al mouse
    minScale: 0.1,                       // scala minima lontano dal mouse
    falloff: 0.005,                     // attenuazione distanza
    lerpSpeed: 0.05,                     // velocità interpolazione
    glowRadius: 100,                     // raggio effetto glow (px)
  };
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export default function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const squaresRef = useRef<Square[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Costruisce la griglia di quadrati
    function buildGrid() {
      const { cellSize, squareRatio } = getConfig(window.innerWidth);
      const squareSize = cellSize * squareRatio;
      const cols = Math.ceil(window.innerWidth / cellSize) + 1;
      const rows = Math.ceil(window.innerHeight / cellSize) + 1;

      const squares: Square[] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          squares.push({
            x: col * cellSize + cellSize / 2,
            y: row * cellSize + cellSize / 2,
            baseSize: squareSize,
            currentScale: 0.5,
            targetScale: 0.5,
          });
        }
      }
      squaresRef.current = squares;
    }

    // Ridimensiona canvas e ricostruisce griglia
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildGrid();
    }

    // Traccia posizione mouse
    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    // Loop di animazione
    function animate() {
      if (!ctx || !canvas) return;
      const config = getConfig(canvas.width);
      const { maxScale, minScale, falloff, lerpSpeed, glowRadius } = config;
      const { x: mx, y: my } = mouseRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const sq of squaresRef.current) {
        // Distanza dal mouse
        const dx = sq.x - mx;
        const dy = sq.y - my;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Formula: scale = maxScale - (distance * falloff)
        let targetScale = maxScale - distance * falloff;
        targetScale = Math.max(minScale, Math.min(maxScale, targetScale));
        sq.targetScale = targetScale;

        // Interpolazione fluida verso il target
        sq.currentScale = lerp(sq.currentScale, sq.targetScale, lerpSpeed);

        const size = sq.baseSize * sq.currentScale;
        const halfSize = size / 2;

        // Glow: più vicino = più luminoso
        const glowFactor = Math.max(0, 1 - distance / glowRadius);

        // Riempimento con alpha variabile (gradiente dimensionale)
        const fillAlpha = 0.12 + glowFactor * 0.45;
        ctx.fillStyle = `rgba(173, 40, 49, ${fillAlpha})`;
        ctx.fillRect(sq.x - halfSize, sq.y - halfSize, size, size);

        // Bordo sottile, più visibile vicino al mouse
        const borderAlpha = 0.06 + glowFactor * 0.22;
        ctx.strokeStyle = `rgba(173, 40, 49, ${borderAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(sq.x - halfSize, sq.y - halfSize, size, size);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }

    // Inizializzazione
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    animFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
