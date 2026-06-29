"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BIO } from "@/lib/constants";
import styles from "./About.module.css";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className={styles.section}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Brand */}
        <div className={styles.brand}>
          <span className={styles.logo}>M8LA</span>
        </div>

        {/* Etichetta sezione */}
        <span className={styles.label}>Chi sono</span>

        {/* Bio */}
        <p className={styles.bio}>{BIO}</p>

        {/* Quick facts */}
        <div className={styles.facts}>
          <div className={styles.fact}>
            <span className={styles.factValue}>17</span>
            <span className={styles.factLabel}>anni</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.fact}>
            <span className={styles.factValue}>Brescia</span>
            <span className={styles.factLabel}>Italia</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.fact}>
            <span className={styles.factValue}>ITIS Castelli</span>
            <span className={styles.factLabel}>5° anno</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
