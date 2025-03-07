"use client";

import { useEffect } from "react";

export default function StaggedAnimation() {
  useEffect(() => {
    const animationElements = document.querySelectorAll(
      ".animation-blur"
    ) as NodeListOf<HTMLElement>;
    const increment = 0.12;

    animationElements.forEach((el, index) => {
      const delay = increment + index * increment;
      el.style.animationDelay = `${delay}s`;
    });
  }, []);

  return null;
}
