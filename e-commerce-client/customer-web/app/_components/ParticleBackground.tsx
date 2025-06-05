
"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

interface ParticlesBackgroundProps {
  className?: string;
  zIndex?: number;
}

const ParticlesBackground = ({ className = "", zIndex = -1 }: ParticlesBackgroundProps) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const bubbleOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false, zIndex },
      particles: {
        number: {
          value: 50,
          density: { enable: true, area: 1000 },
        },
        color: { value: "#4ade80" },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.3, max: 0.7 },
          animation: { enable: true, speed: 1, sync: false },
        },
        size: {
          value: { min: 6, max: 15 },
          animation: { enable: true, speed: 3, sync: false },
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          outModes: { default: "bounce" },
          random: true,
          straight: false,
          bounce: true,
        },
        wobble: { enable: true, speed: 3 },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "bubble",
            parallax: { enable: false },
          },
        },
        modes: {
          bubble: {
            distance: 200,
            size: 15,
            duration: 2,
            opacity: 0.8,
            color: "#843041",
          },
        },
      },
      detectRetina: true,
    }),
    [zIndex]
  );

  return (
    <div className={`absolute inset-0 ${className}`}>
      {init && <Particles id="tsparticles" options={bubbleOptions} />}
    </div>
  );
};

export default ParticlesBackground;