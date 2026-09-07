"use client";

import React, { useEffect, useState } from "react";
import styles from "./ProductsClouds.module.css";

interface ProductsCloudsProps {
  variant?: "hero" | "ambient" | "dense";
  className?: string;
}

export function ProductsClouds({ variant = "ambient", className }: ProductsCloudsProps) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`${styles.cloudsContainer} ${styles[variant]} ${className || ""}`} aria-hidden="true">
      {/* Cloud 1 - Top Left */}
      <div
        className={`${styles.cloud} ${styles.cloud1}`}
        style={{
          transform: `translate3d(${mouseOffset.x * -0.8}px, ${mouseOffset.y * -0.6}px, 0)`,
        }}
      >
        <img
          src="https://framerusercontent.com/images/1ndcuDegEnGUBfzx2Nj9uggXBE.png?width=734&height=402"
          alt=""
          className={styles.cloudImg}
        />
      </div>

      {/* Cloud 2 - Top Right */}
      <div
        className={`${styles.cloud} ${styles.cloud2}`}
        style={{
          transform: `translate3d(${mouseOffset.x * 0.9}px, ${mouseOffset.y * 0.7}px, 0)`,
        }}
      >
        <img
          src="/assets/9RhTCwsHfKi8X6BzFNEwnwEZFcQ-4eca13928a.png"
          alt=""
          className={styles.cloudImg}
        />
      </div>

      {/* Cloud 3 - Mid/Bottom Left */}
      <div
        className={`${styles.cloud} ${styles.cloud3}`}
        style={{
          transform: `translate3d(${mouseOffset.x * 0.5}px, ${mouseOffset.y * -0.4}px, 0)`,
        }}
      >
        <img
          src="https://framerusercontent.com/images/a5O2zgpjk7dpSRywZk2WFA6yvk.png?width=746&height=581"
          alt=""
          className={styles.cloudImg}
        />
      </div>

      {/* Cloud 4 - Bottom Right */}
      <div
        className={`${styles.cloud} ${styles.cloud4}`}
        style={{
          transform: `translate3d(${mouseOffset.x * -1.1}px, ${mouseOffset.y * 0.8}px, 0)`,
        }}
      >
        <img
          src="https://framerusercontent.com/images/jAGSUTL93CEWkmnaWHTxb8Ao.png?width=1002&height=882"
          alt=""
          className={styles.cloudImg}
        />
      </div>
    </div>
  );
}
