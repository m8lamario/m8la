"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useGridContext } from "@/components/background/GridContext";
import { PIXEL_CHARS } from "@/lib/pixelFont";
import styles from "./PixelTitle.module.css";

/* ============================================
   PixelTitle — titolo "Mario M8LA" a griglia SVG
   Integrato visivamente nel GridCanvas
   ============================================ */

const TITLE = "Mario M8LA";
const PIXEL_UNIT = 0.7;
const CHAR_GAP = 1;
const REVEAL_DURATION = 0.4;

// Parametri hover — identici al GridCanvas
const MAX_SCALE = 0.9;
const MIN_SCALE = 0.1;
const FALLOFF = 0.004;
const LERP_SPEED = 0.07;
const GLOW_RADIUS = 200;

/* ============================================
   Tipi
   ============================================ */

interface RectData {
  x: number;
  y: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
  delay: number;
}

/* ============================================
   Helpers
   ============================================ */

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function buildLayout(text: string): {
  rects: RectData[];
  totalCols: number;
  totalRows: number;
} {
  const rects: RectData[] = [];
  let col = 0;
  const totalRows = 7;

  for (const char of text) {
    const def = PIXEL_CHARS[char];
    if (!def) {
      col += 3 + CHAR_GAP;
      continue;
    }

    for (const [px, py] of def.pixels) {
      const x = (col + px) * PIXEL_UNIT;
      const y = py * PIXEL_UNIT;
      rects.push({
        x,
        y,
        w: PIXEL_UNIT,
        h: PIXEL_UNIT,
        cx: x + PIXEL_UNIT / 2,
        cy: y + PIXEL_UNIT / 2,
        delay: Math.random() * REVEAL_DURATION,
      });
    }
    col += def.width + CHAR_GAP;
  }

  return { rects, totalCols: col - CHAR_GAP, totalRows };
}

/* ============================================
   Componente
   ============================================ */

export default function PixelTitle() {
  const svgRef = useRef<SVGSVGElement>(null);
  const rectRefs = useRef<Map<number, SVGRectElement>>(new Map());
  const scalesRef = useRef<number[]>([]);
  const animFrameRef = useRef<number>(0);
  const { mouseRef } = useGridContext();
  const [revealed, setRevealed] = useState(false);
  const [layout] = useState(() => buildLayout(TITLE));

  // Inizializza scale array
  useEffect(() => {
    scalesRef.current = new Array(layout.rects.length).fill(MIN_SCALE);
  }, [layout.rects.length]);

  // Reveal completato dopo REVEAL_DURATION + margine
  useEffect(() => {
    const timer = setTimeout(
      () => setRevealed(true),
      REVEAL_DURATION * 1000 + 400
    );
    return () => clearTimeout(timer);
  }, []);

  // Loop hover — reagisce al mouse come il GridCanvas
  useEffect(() => {
    if (!revealed) return;

    const svg = svgRef.current;
    if (!svg) return;

    let running = true;

    function animate() {
      if (!running || !svg) return;

      const svgRect = svg.getBoundingClientRect();
      const localMouseX = mouseRef.current.x - svgRect.left;
      const localMouseY = mouseRef.current.y - svgRect.top;

      // Converti da pixel CSS a unità viewBox SVG
      const scaleX = layout.totalCols / svgRect.width;
      const scaleY = layout.totalRows / svgRect.height;
      const svgMouseX = localMouseX * scaleX;
      const svgMouseY = localMouseY * scaleY;

      for (let i = 0; i < layout.rects.length; i++) {
        const r = layout.rects[i];
        const rect = rectRefs.current.get(i);
        if (!rect) continue;

        const dx = r.cx - svgMouseX;
        const dy = r.cy - svgMouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetScale = MAX_SCALE - distance * FALLOFF;
        targetScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, targetScale));

        scalesRef.current[i] = lerp(
          scalesRef.current[i],
          targetScale,
          LERP_SPEED
        );
        const s = scalesRef.current[i];

        // Scala dal centro del rettangolo
        rect.style.transform = `scale(${s})`;
        rect.style.transformOrigin = `${r.cx}px ${r.cy}px`;
        rect.style.transformBox = "fill-box";

        // Opacità proporzionale alla vicinanza
        const glowFactor = Math.max(0, 1 - distance / GLOW_RADIUS);
        const alpha = 0.7 + glowFactor * 0.3;
        rect.setAttribute("opacity", String(alpha));
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [revealed, layout, mouseRef]);

  // Callback per registrare i ref dei rect
  const setRectRef = useCallback(
    (i: number) => (el: SVGRectElement | null) => {
      if (el) {
        rectRefs.current.set(i, el);
      } else {
        rectRefs.current.delete(i);
      }
    },
    []
  );

  return (
    <div className={styles.wrapper}>
      <svg
        ref={svgRef}
        className={styles.svg}
        viewBox={`0 0 ${layout.totalCols} ${layout.totalRows}`}
        preserveAspectRatio="xMidYMid meet"
        aria-label={TITLE}
      >
        {layout.rects.map((r, i) => (
          <rect
            key={i}
            ref={setRectRef(i)}
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            rx={0.15}
            fill="var(--brown-red)"
            className={`${styles.pixel} ${revealed ? styles.revealed : ""}`}
            style={{ animationDelay: `${r.delay}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
