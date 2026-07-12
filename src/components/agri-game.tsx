"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Play, RotateCcw, Home } from "lucide-react";

interface AgriGameProps {
  mode: "404" | "offline" | "500";
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  type?: "smoke" | "dust" | "sparkle";
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  color: string;
  passed: boolean;
}

interface CropCollectible {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  color: string;
  collected: boolean;
  pulse: number;
}

export function AgriGame({ mode }: AgriGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const restartTriggerRef = useRef<(() => void) | null>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [harvestScore, setHarvestScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [achievement, setAchievement] = useState<string | null>(null);

  // Configure text based on the error/offline scenario
  const headingInfo = {
    "404": {
      title: "404",
      subtitle: "We couldn't trace this page.",
      desc: "Looks like this page wandered into another field."
    },
    "offline": {
      title: "You're Offline",
      subtitle: "Connection lost.",
      desc: "While we reconnect, help deliver today's harvest."
    },
    "500": {
      title: "500 ERROR",
      subtitle: "Our systems are harvesting new data.",
      desc: "Enjoy a quick tractor run while we fix things."
    }
  }[mode];

  // Load high score from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sourcetrace_tractor_dino_highscore");
      if (saved) setHighScore(parseInt(saved, 10));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive Ground Y
    let groundY = height * 0.72;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      groundY = height * 0.72;
    };
    window.addEventListener("resize", handleResize);

    // Game Variables
    let gameSpeed = 5.2;
    let scoreDistance = 0;
    let scoreHarvestVal = 0;
    let lastAchievementDistance = 0;

    // Camera shake strength
    let cameraShake = 0;

    // Time & Weather States
    let cycleTimer = 0;
    let activeWeather: "sun" | "sunset" | "night" | "rain" = "sun";

    // Assets Coordinates / State
    // Increased size by 200% (from 60x48 to 110x88)
    const tractor = {
      x: width * 0.12,
      y: groundY - 88,
      width: 110,
      height: 88,
      vy: 0,
      gravity: 0.72,
      jumpStrength: -15.5,
      isJumping: false,
      wheelAngle: 0,
      vibrationOffset: 0,
      smokeCooldown: 0
    };

    let obstacles: Obstacle[] = [];
    let collectibles: CropCollectible[] = [];
    let particles: Particle[] = [];

    // Background decoration arrays for parallax scrolling (De-saturated and lower opacity)
    const clouds = [
      { x: 100, y: height * 0.12, size: 60, speed: 0.1 },
      { x: width * 0.45, y: height * 0.08, size: 85, speed: 0.05 },
      { x: width * 0.8, y: height * 0.18, size: 50, speed: 0.15 }
    ];

    const distantMountains = [
      { x: 0, w: width * 0.6, h: height * 0.24 },
      { x: width * 0.35, w: width * 0.7, h: height * 0.28 },
      { x: width * 0.75, w: width * 0.5, h: height * 0.2 }
    ];

    const midgroundHills = [
      { x: 0, w: width * 0.4, h: height * 0.12, color: "rgba(209, 234, 216, 0.3)" },
      { x: width * 0.28, w: width * 0.5, h: height * 0.14, color: "rgba(198, 228, 205, 0.3)" },
      { x: width * 0.68, w: width * 0.4, h: height * 0.11, color: "rgba(209, 234, 216, 0.3)" }
    ];

    const windmills = [
      { x: width * 0.22, rot: 0, size: 35 },
      { x: width * 0.78, rot: 1.5, size: 25 }
    ];

    const silos = [
      { x: width * 0.42, w: 28, h: 60 },
      { x: width * 0.88, w: 22, h: 48 }
    ];

    // ── GAME EVENTS ──
    const spawnSmoke = () => {
      // Rounded clay-like grey clouds from tractor exhaust
      particles.push({
        x: tractor.x + 20,
        y: tractor.y + 10,
        vx: -gameSpeed * 0.25 + (Math.random() - 0.5) * 0.5,
        vy: -1.2 - Math.random() * 1.5,
        size: 5 + Math.random() * 8,
        color: activeWeather === "night" ? "rgba(100, 100, 110, 0.3)" : "rgba(120, 130, 125, 0.25)",
        alpha: 0.65,
        life: 0,
        maxLife: 45 + Math.random() * 20,
        type: "smoke"
      });
    };

    const spawnLandingDust = () => {
      // Impact landing dust splashes
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: tractor.x + tractor.width * 0.5 + (Math.random() - 0.5) * 40,
          y: groundY,
          vx: -gameSpeed * 0.45 + (Math.random() - 0.5) * 6,
          vy: -1.5 - Math.random() * 4,
          size: 3 + Math.random() * 6,
          color: "rgba(167, 133, 100, 0.55)", // Dust clay particles
          alpha: 0.85,
          life: 0,
          maxLife: 35 + Math.random() * 20,
          type: "dust"
        });
      }
      cameraShake = 7; // Stronger camera shake on landing
    };

    const spawnSparkles = (x: number, y: number, color: string) => {
      // Sparkle stars floating around collectibles
      for (let i = 0; i < 6; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          size: 2 + Math.random() * 3,
          color,
          alpha: 1.0,
          life: 0,
          maxLife: 20 + Math.random() * 10,
          type: "sparkle"
        });
      }
    };

    const triggerJump = () => {
      if (gameState === "playing" && !tractor.isJumping) {
        tractor.vy = tractor.jumpStrength;
        tractor.isJumping = true;
      }
    };

    const restartGame = () => {
      obstacles = [];
      collectibles = [];
      particles = [];
      scoreDistance = 0;
      scoreHarvestVal = 0;
      setHarvestScore(0);
      gameSpeed = 5.2;
      tractor.y = groundY - tractor.height;
      tractor.vy = 0;
      tractor.isJumping = false;
      setGameState("playing");
    };
    restartTriggerRef.current = restartGame;

    // Key handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (gameState === "idle" || gameState === "gameover") {
          restartGame();
        } else {
          triggerJump();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Main Game Loop
    const updateGame = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── 1. WEATHER & TIME CYCLE ──
      cycleTimer++;
      if (cycleTimer > 950) {
        cycleTimer = 0;
        const weathers: ("sun" | "sunset" | "night" | "rain")[] = ["sun", "sunset", "night", "rain"];
        const currentIdx = weathers.indexOf(activeWeather);
        activeWeather = weathers[(currentIdx + 1) % weathers.length];
      }

      // Camera Shake translate
      ctx.save();
      if (cameraShake > 0) {
        const shakeX = (Math.random() - 0.5) * cameraShake;
        const shakeY = (Math.random() - 0.5) * cameraShake;
        ctx.translate(shakeX, shakeY);
        cameraShake *= 0.88;
        if (cameraShake < 0.1) cameraShake = 0;
      }

      // ── DRAW SKY (Muted & De-saturated background contrast) ──
      let skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (activeWeather === "sun") {
        skyGrad.addColorStop(0, "#E0F2FE"); // Muted sky blue
        skyGrad.addColorStop(1, "#F0FDFA");
      } else if (activeWeather === "sunset") {
        skyGrad.addColorStop(0, "#FFEDD5"); // Muted orange glow
        skyGrad.addColorStop(1, "#FAF5FF");
      } else if (activeWeather === "night") {
        skyGrad.addColorStop(0, "#0F172A"); // Dark slate
        skyGrad.addColorStop(1, "#1E293B");
      } else if (activeWeather === "rain") {
        skyGrad.addColorStop(0, "#D1D5DB"); // Muted rain gray
        skyGrad.addColorStop(1, "#F3F4F6");
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Muted Crescent Moon & Sun
      if (activeWeather === "night") {
        ctx.fillStyle = "rgba(254, 240, 138, 0.4)"; // Soft moon opacity
        ctx.beginPath();
        ctx.arc(width - 120, 80, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = skyGrad;
        ctx.beginPath();
        ctx.arc(width - 130, 75, 20, 0, Math.PI * 2);
        ctx.fill();
      } else if (activeWeather === "sunset") {
        ctx.fillStyle = "rgba(245, 158, 11, 0.35)"; // Soft sun opacity
        ctx.beginPath();
        ctx.arc(width * 0.4, groundY - 10, 40, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── BACKGROUND PARALLAX LAYER 1: Distant Mountains (Muted Sage Silhouettes) ──
      ctx.fillStyle = activeWeather === "night" ? "rgba(30, 41, 59, 0.15)" : "rgba(178, 220, 192, 0.18)";
      distantMountains.forEach((mtn) => {
        if (gameState === "playing") {
          mtn.x -= gameSpeed * 0.035;
          if (mtn.x + mtn.w < 0) mtn.x = width;
        }
        ctx.beginPath();
        ctx.moveTo(mtn.x, groundY);
        ctx.lineTo(mtn.x + mtn.w * 0.5, groundY - mtn.h);
        ctx.lineTo(mtn.x + mtn.w, groundY);
        ctx.closePath();
        ctx.fill();
      });

      // ── BACKGROUND PARALLAX LAYER 2: Midground Hills, Windmills, Silos (Muted Sage Silhouettes) ──
      midgroundHills.forEach((hill) => {
        if (gameState === "playing") {
          hill.x -= gameSpeed * 0.1;
          if (hill.x + hill.w < 0) hill.x = width;
        }
        ctx.fillStyle = activeWeather === "night" ? "rgba(15, 23, 42, 0.12)" : hill.color;
        ctx.beginPath();
        ctx.ellipse(hill.x + hill.w * 0.5, groundY, hill.w * 0.6, hill.h * 1.5, 0, Math.PI, 0);
        ctx.fill();
      });

      // Muted Rotating Windmills
      ctx.strokeStyle = activeWeather === "night" ? "rgba(255,255,255,0.03)" : "rgba(120, 155, 133, 0.25)";
      ctx.lineWidth = 2;
      windmills.forEach((wm) => {
        if (gameState === "playing") {
          wm.x -= gameSpeed * 0.1;
          if (wm.x < -80) wm.x = width + 80;
        }
        // Base post
        ctx.beginPath();
        ctx.moveTo(wm.x, groundY);
        ctx.lineTo(wm.x - 4, groundY - wm.size * 1.4);
        ctx.lineTo(wm.x + 4, groundY - wm.size * 1.4);
        ctx.closePath();
        ctx.fillStyle = activeWeather === "night" ? "rgba(30, 41, 59, 0.12)" : "rgba(166, 199, 179, 0.25)";
        ctx.fill();

        // Blades rotation
        wm.rot += 0.012;
        ctx.save();
        ctx.translate(wm.x, groundY - wm.size * 1.4);
        ctx.rotate(wm.rot);
        for (let b = 0; b < 3; b++) {
          ctx.rotate((Math.PI * 2) / 3);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-3, -wm.size);
          ctx.lineTo(3, -wm.size);
          ctx.closePath();
          ctx.stroke();
        }
        ctx.restore();
      });

      // Muted Silos in midground
      silos.forEach((silo) => {
        if (gameState === "playing") {
          silo.x -= gameSpeed * 0.1;
          if (silo.x < -80) silo.x = width + 80;
        }
        ctx.fillStyle = activeWeather === "night" ? "rgba(30, 41, 59, 0.12)" : "rgba(177, 213, 190, 0.25)";
        ctx.fillRect(silo.x, groundY - silo.h, silo.w, silo.h);
        ctx.beginPath();
        ctx.arc(silo.x + silo.w * 0.5, groundY - silo.h, silo.w * 0.5, Math.PI, 0);
        ctx.fill();
      });

      // ── GAMEPLAY GROUND / FIELD LAYER 3 (Higher opacity and contrast road path) ──
      ctx.fillStyle = activeWeather === "night" ? "#041B14" : "#EAF5EE";
      ctx.fillRect(0, groundY, width, height - groundY);

      // Dark forest green field separator lines
      ctx.strokeStyle = activeWeather === "night" ? "rgba(255,255,255,0.03)" : "rgba(11, 61, 46, 0.04)";
      ctx.lineWidth = 4;
      let fieldOffset = (gameState === "playing") ? -(scoreDistance * 1.2) % 60 : 0;
      for (let x = fieldOffset; x < width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, groundY);
        ctx.lineTo(x - 200, height);
        ctx.stroke();
      }

      // High-contrast agricultural dirt track road for tractor
      ctx.fillStyle = activeWeather === "night" ? "#020D09" : "#C9DFC8";
      ctx.fillRect(0, groundY, width, 95); // thicker road
      ctx.fillStyle = activeWeather === "night" ? "#010705" : "#ACD0AA";
      ctx.fillRect(0, groundY + 95, width, 14);

      // ── GAME PLAY LOGIC UPDATES ──
      if (gameState === "playing") {
        scoreDistance += 0.25;

        // Achievements triggers
        const milestoneCheck = Math.floor(scoreDistance);
        if (milestoneCheck > 0 && milestoneCheck % 200 === 0 && milestoneCheck !== lastAchievementDistance) {
          lastAchievementDistance = milestoneCheck;
          const achievements = [
            "10 Farms Digitized",
            "500 Hectares Mapped",
            "Supply Chain Restored",
            "Farmer Income Increased",
            "Carbon Data Verified",
            "Compliance Achieved",
            "Export Approved",
            "Harvest Traced Successfully"
          ];
          const textIdx = Math.floor(milestoneCheck / 200) - 1;
          setAchievement(achievements[textIdx % achievements.length]);
          setTimeout(() => setAchievement(null), 3000);
        }

        // Tractor Physics
        tractor.vy += tractor.gravity;
        tractor.y += tractor.vy;

        // Ground Collision
        if (tractor.y >= groundY - tractor.height) {
          tractor.y = groundY - tractor.height;
          tractor.vy = 0;
          if (tractor.isJumping) {
            tractor.isJumping = false;
            spawnLandingDust();
          }
        }

        // Wheel rotation
        tractor.wheelAngle += gameSpeed * 0.05;

        // Vibrations
        tractor.vibrationOffset = Math.sin(Date.now() * 0.08) * 0.65;

        // Smoke trigger
        tractor.smokeCooldown++;
        if (tractor.smokeCooldown > 7) {
          tractor.smokeCooldown = 0;
          spawnSmoke();
        }

        // Handle collectibles & obstacles spawning
        if (Math.random() < 0.014 && obstacles.length < 3) {
          const obsTypes = ["fence", "rock", "haybale", "stump"];
          const selected = obsTypes[Math.floor(Math.random() * obsTypes.length)];
          const obstacleW = selected === "haybale" ? 36 : selected === "stump" ? 28 : 24;
          const obstacleH = selected === "haybale" ? 36 : selected === "stump" ? 32 : 24;

          const lastObs = obstacles[obstacles.length - 1];
          if (!lastObs || lastObs.x < width - 280) {
            obstacles.push({
              x: width + 20,
              y: groundY - obstacleH,
              width: obstacleW,
              height: obstacleH,
              type: selected,
              color: selected === "rock" ? "#374151" : selected === "haybale" ? "#CA8A04" : "#78350F", // Large, dark, matte
              passed: false
            });
          }
        }

        // Spawn Crop Collectibles (Floating, glowing, bright)
        if (Math.random() < 0.02 && collectibles.length < 4) {
          const cropTypes = ["wheat", "coffee", "tomato", "cotton", "gps", "drone"];
          const selected = cropTypes[Math.floor(Math.random() * cropTypes.length)];
          const collectY = groundY - 60 - Math.random() * 55; // Floating height

          const lastColl = collectibles[collectibles.length - 1];
          if (!lastColl || lastColl.x < width - 180) {
            collectibles.push({
              x: width + 20,
              y: collectY,
              width: 22,
              height: 22,
              type: selected,
              color: selected === "wheat" ? "#FBBF24" : selected === "coffee" ? "#EF4444" : selected === "tomato" ? "#EF4444" : "#53D769", // Bright clay
              collected: false,
              pulse: Math.random() * 10
            });
          }
        }
      }

      // ── PARTICLES PIPELINE ──
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        if (gameState === "playing") {
          p.x += p.vx;
          p.y += p.vy;
        } else {
          p.x += p.vx * 0.1;
          p.y += p.vy * 0.1;
        }
        p.alpha = 1 - p.life / p.maxLife;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        
        // Clay-like particles rendering (Shadows and outlines)
        if (p.type === "sparkle") {
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
        }
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      // Rain / Fireflies particles
      if (activeWeather === "rain") {
        ctx.strokeStyle = "rgba(156, 163, 175, 0.22)";
        ctx.lineWidth = 1.2;
        for (let i = 0; i < 30; i++) {
          const rx = (Math.sin(i * 45) * 0.5 + 0.5) * width;
          const ry = ((Date.now() * 0.015 + i * 20) % height);
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(rx - 8, ry + 24);
          ctx.stroke();
        }
      } else if (activeWeather === "night") {
        // Glowing Fireflies
        ctx.fillStyle = "rgba(134, 239, 172, 0.4)";
        for (let i = 0; i < 15; i++) {
          const ffX = (Math.cos(Date.now() * 0.001 + i * 2) * 0.5 + 0.5) * width;
          const ffY = groundY - 10 - (Math.sin(Date.now() * 0.002 + i) * 0.5 + 0.5) * 80;
          ctx.beginPath();
          ctx.arc(ffX, ffY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── DRAW 3D CLAY-LIKE TRACTOR (Increased size by 200%) ──
      const curY = tractor.y + (gameState === "playing" ? tractor.vibrationOffset : 0);
      
      // Ground Shadow beneath Tractor (squishes as it jumps)
      ctx.save();
      const shadowScale = Math.max(0.2, 1 - (groundY - curY - tractor.height) * 0.005);
      ctx.fillStyle = "rgba(11, 61, 46, 0.2)";
      ctx.beginPath();
      ctx.ellipse(tractor.x + tractor.width * 0.5, groundY, 40 * shadowScale, 6 * shadowScale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Tractor body clay rendering
      ctx.save();
      
      // Subtle pitch tilt during jumps
      if (tractor.isJumping) {
        ctx.translate(tractor.x + tractor.width * 0.5, curY + tractor.height * 0.5);
        ctx.rotate(tractor.vy * 0.018); // tilt cabin slightly forward/backward depending on speed Y
        ctx.translate(-(tractor.x + tractor.width * 0.5), -(curY + tractor.height * 0.5));
      }

      // Tractor Cabin / Cage (Green Clay)
      let bodyGrad = ctx.createRadialGradient(
        tractor.x + 60, curY + 20, 10,
        tractor.x + 60, curY + 30, 40
      );
      bodyGrad.addColorStop(0, "#1F7A53");
      bodyGrad.addColorStop(1, "#0B3D2E");
      
      ctx.fillStyle = bodyGrad;
      // Main rounded frame
      ctx.beginPath();
      ctx.roundRect(tractor.x + 24, curY + 24, 68, 38, 12);
      ctx.roundRect(tractor.x + 50, curY + 4, 38, 28, 8);
      ctx.fill();

      // Glass windows (3D Glossy window)
      let winGrad = ctx.createLinearGradient(tractor.x + 55, curY + 8, tractor.x + 82, curY + 26);
      winGrad.addColorStop(0, "#E0F2FE");
      winGrad.addColorStop(1, "#86EFAC");
      ctx.fillStyle = winGrad;
      ctx.beginPath();
      ctx.roundRect(tractor.x + 54, curY + 8, 30, 20, 4);
      ctx.fill();
      
      // Gloss specular highlights line on window
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(tractor.x + 58, curY + 10);
      ctx.lineTo(tractor.x + 72, curY + 24);
      ctx.stroke();

      // Tractor Nose/Hood (Green clay engine block)
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.roundRect(tractor.x + 10, curY + 32, 20, 28, 8);
      ctx.fill();
      
      // Engine Grill highlights (Matte dark grey vents)
      ctx.fillStyle = "#1F2937";
      ctx.fillRect(tractor.x + 12, curY + 38, 4, 18);

      // Exhaust Pipe (Metal steel tube)
      let pipeGrad = ctx.createLinearGradient(tractor.x + 18, curY, tractor.x + 28, curY + 26);
      pipeGrad.addColorStop(0, "#9CA3AF");
      pipeGrad.addColorStop(1, "#4B5563");
      ctx.fillStyle = pipeGrad;
      ctx.fillRect(tractor.x + 18, curY + 8, 6, 26);
      // exhaust cap angle
      ctx.beginPath();
      ctx.moveTo(tractor.x + 18, curY + 8);
      ctx.lineTo(tractor.x + 24, curY + 4);
      ctx.lineTo(tractor.x + 26, curY + 8);
      ctx.closePath();
      ctx.fill();

      // Draw clay Wheels (Large Rear wheel, smaller front wheel)
      // Rear wheel (radius: 20px)
      ctx.save();
      ctx.translate(tractor.x + 76, curY + 62);
      ctx.rotate(tractor.wheelAngle);
      // tyre
      let tyreGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 24);
      tyreGrad.addColorStop(0, "#1F2937");
      tyreGrad.addColorStop(1, "#111827");
      ctx.fillStyle = tyreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.fill();
      
      // inner yellow hub cap
      ctx.fillStyle = "#FBBF24";
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      // spokes
      ctx.strokeStyle = "#D97706";
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let s = 0; s < 4; s++) {
        ctx.rotate(Math.PI / 2);
        ctx.moveTo(4, 0);
        ctx.lineTo(22, 0);
      }
      ctx.stroke();
      ctx.restore();

      // Front wheel (radius: 14px)
      ctx.save();
      ctx.translate(tractor.x + 24, curY + 68);
      ctx.rotate(tractor.wheelAngle * 1.3);
      ctx.fillStyle = tyreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 17, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = "#FBBF24";
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#D97706";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let s = 0; s < 4; s++) {
        ctx.rotate(Math.PI / 2);
        ctx.moveTo(3, 0);
        ctx.lineTo(15, 0);
      }
      ctx.stroke();
      ctx.restore();

      ctx.restore(); // restore jump tilt

      // ── DRAW DUST TRAIL PARTICLES (Grounded from wheels) ──
      if (gameState === "playing" && !tractor.isJumping) {
        if (Math.random() < 0.25) {
          particles.push({
            x: tractor.x + 12,
            y: groundY,
            vx: -gameSpeed * 0.45 + (Math.random() - 0.5) * 2,
            vy: -0.5 - Math.random() * 1.5,
            size: 2.5 + Math.random() * 4,
            color: "rgba(167, 133, 100, 0.4)",
            alpha: 0.6,
            life: 0,
            maxLife: 25 + Math.random() * 15,
            type: "dust"
          });
        }
      }

      // ── DRAW MATTE GROUNDED OBSTACLES (Faceted dark polygons / cylinders) ──
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        if (gameState === "playing") {
          obs.x -= gameSpeed;
        }

        // Drop shadow under obstacles
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        ctx.beginPath();
        ctx.ellipse(obs.x + obs.width * 0.5, groundY, obs.width * 0.6, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = obs.color;
        if (obs.type === "rock") {
          // Faceted matte dark charcoal rock (Instantly hazard)
          ctx.beginPath();
          ctx.moveTo(obs.x, groundY);
          ctx.lineTo(obs.x + obs.width * 0.25, groundY - obs.height);
          ctx.lineTo(obs.x + obs.width * 0.6, groundY - obs.height * 0.85);
          ctx.lineTo(obs.x + obs.width * 0.8, groundY - obs.height * 0.95);
          ctx.lineTo(obs.x + obs.width, groundY);
          ctx.closePath();
          ctx.fill();
          
          // Matte polygon highlights (darker side facets to build structure)
          ctx.fillStyle = "rgba(0,0,0,0.18)";
          ctx.beginPath();
          ctx.moveTo(obs.x, groundY);
          ctx.lineTo(obs.x + obs.width * 0.25, groundY - obs.height);
          ctx.lineTo(obs.x + obs.width * 0.6, groundY - obs.height * 0.85);
          ctx.lineTo(obs.x + obs.width * 0.45, groundY);
          ctx.closePath();
          ctx.fill();
        } else if (obs.type === "fence") {
          // Broken dark wooden agricultural fence
          ctx.strokeStyle = "#451A03"; // dark brown wood
          ctx.lineWidth = 4.5;
          ctx.beginPath();
          ctx.moveTo(obs.x, groundY);
          ctx.lineTo(obs.x + obs.width, groundY - obs.height);
          ctx.moveTo(obs.x + obs.width * 0.35, groundY);
          ctx.lineTo(obs.x + obs.width * 0.55, groundY - obs.height);
          ctx.moveTo(obs.x + obs.width * 0.7, groundY);
          ctx.lineTo(obs.x + obs.width * 0.9, groundY - obs.height);
          ctx.stroke();
          
          // Horizontal slat
          ctx.beginPath();
          ctx.moveTo(obs.x + 2, groundY - obs.height * 0.6);
          ctx.lineTo(obs.x + obs.width - 2, groundY - obs.height * 0.45);
          ctx.stroke();
        } else if (obs.type === "haybale") {
          // Large round roll of hay cylinder
          let hayGrad = ctx.createLinearGradient(obs.x, groundY - obs.height, obs.x + obs.width, groundY);
          hayGrad.addColorStop(0, "#EAB308"); // Warm clay gold
          hayGrad.addColorStop(1, "#CA8A04");
          ctx.fillStyle = hayGrad;
          ctx.beginPath();
          ctx.arc(obs.x + obs.width * 0.5, groundY - obs.height * 0.5, obs.width * 0.5, 0, Math.PI * 2);
          ctx.fill();
          
          // concentric swirls
          ctx.strokeStyle = "#854D0E";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(obs.x + obs.width * 0.5, groundY - obs.height * 0.5, obs.width * 0.28, 0, Math.PI * 1.6);
          ctx.stroke();
        } else {
          // Tree Stump (Dark brown trunk silhouette)
          let woodGrad = ctx.createLinearGradient(obs.x, groundY, obs.x, groundY - obs.height);
          woodGrad.addColorStop(0, "#451A03");
          woodGrad.addColorStop(1, "#78350F");
          ctx.fillStyle = woodGrad;
          ctx.beginPath();
          ctx.roundRect(obs.x, groundY - obs.height, obs.width, obs.height, [2, 2, 0, 0]);
          ctx.fill();
          // Concentric circular wood grains on top cap
          ctx.fillStyle = "#FDBA74";
          ctx.beginPath();
          ctx.ellipse(obs.x + obs.width * 0.5, groundY - obs.height, obs.width * 0.5, 4, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        // COLLISION CHECK
        if (
          tractor.x + 6 < obs.x + obs.width &&
          tractor.x + tractor.width - 8 > obs.x &&
          tractor.y + 6 < groundY &&
          tractor.y + tractor.height - 4 > groundY - obs.height
        ) {
          setGameState("gameover");
          if (scoreHarvestVal > highScore) {
            setHighScore(scoreHarvestVal);
            localStorage.setItem("sourcetrace_tractor_dino_highscore", scoreHarvestVal.toString());
          }
        }

        if (obs.x < -100) {
          obstacles.splice(i, 1);
        }
      }

      // ── DRAW GLOWING 3D CLAY COLLECTIBLES (Floating, rotating, soft shadow) ──
      for (let i = collectibles.length - 1; i >= 0; i--) {
        const coll = collectibles[i];
        if (gameState === "playing") {
          coll.x -= gameSpeed;
        }

        // Float bounce calculation
        coll.pulse += 0.06;
        const scaleOffset = Math.sin(coll.pulse) * 4;

        if (!coll.collected) {
          // Spawn sparkle particles gently
          if (gameState === "playing" && Math.random() < 0.05) {
            spawnSparkles(coll.x, coll.y + scaleOffset, coll.color);
          }

          ctx.save();
          // Add a beautiful neon outer glow to collectibles
          ctx.shadowBlur = 12;
          ctx.shadowColor = coll.color;
          
          // Draw clay-like 3D collectibles using radial gradients and glossy white highlights
          if (coll.type === "wheat") {
            // Golden Wheat bundle
            let wheatGrad = ctx.createRadialGradient(coll.x, coll.y + scaleOffset - 2, 2, coll.x, coll.y + scaleOffset, 12);
            wheatGrad.addColorStop(0, "#FCD34D");
            wheatGrad.addColorStop(1, "#D97706");
            ctx.fillStyle = wheatGrad;
            ctx.beginPath();
            ctx.ellipse(coll.x, coll.y + scaleOffset, 7, 12, 0.25, 0, Math.PI * 2);
            ctx.fill();
            // tied ribbon
            ctx.fillStyle = "#EF4444";
            ctx.fillRect(coll.x - 7, coll.y + scaleOffset + 1, 14, 3);
          } else if (coll.type === "coffee" || coll.type === "tomato") {
            // Glossy red clay cherry/tomato sphere
            let redGrad = ctx.createRadialGradient(coll.x - 3, coll.y + scaleOffset - 3, 2, coll.x, coll.y + scaleOffset, 10);
            redGrad.addColorStop(0, "#FCA5A5"); // high highlight
            redGrad.addColorStop(0.3, "#EF4444");
            redGrad.addColorStop(1, "#991B1B");
            ctx.fillStyle = redGrad;
            ctx.beginPath();
            ctx.arc(coll.x, coll.y + scaleOffset, 10, 0, Math.PI * 2);
            ctx.fill();
            
            // Specular shiny white drop dot
            ctx.fillStyle = "#FFF";
            ctx.beginPath();
            ctx.arc(coll.x - 3, coll.y + scaleOffset - 3, 2.5, 0, Math.PI * 2);
            ctx.fill();
          } else if (coll.type === "cotton") {
            // Soft white cotton pods
            let cotGrad = ctx.createRadialGradient(coll.x, coll.y + scaleOffset, 3, coll.x, coll.y + scaleOffset, 11);
            cotGrad.addColorStop(0, "#FFFFFF");
            cotGrad.addColorStop(1, "#D1D5DB");
            ctx.fillStyle = cotGrad;
            ctx.beginPath();
            ctx.arc(coll.x - 5, coll.y + scaleOffset, 7, 0, Math.PI * 2);
            ctx.arc(coll.x + 5, coll.y + scaleOffset, 7, 0, Math.PI * 2);
            ctx.arc(coll.x, coll.y - 5 + scaleOffset, 7, 0, Math.PI * 2);
            ctx.fill();
          } else if (coll.type === "gps" || coll.type === "drone") {
            // Glowing mint-green digital nodes (Tech indicators)
            let techGrad = ctx.createRadialGradient(coll.x - 2, coll.y + scaleOffset - 2, 2, coll.x, coll.y + scaleOffset, 12);
            techGrad.addColorStop(0, "#A7F3D0");
            techGrad.addColorStop(1, "#059669");
            ctx.fillStyle = techGrad;
            ctx.beginPath();
            ctx.roundRect(coll.x - 8, coll.y + scaleOffset - 8, 16, 16, 4);
            ctx.fill();
            
            // inner core
            ctx.fillStyle = "#FFF";
            ctx.beginPath();
            ctx.arc(coll.x, coll.y + scaleOffset, 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();

          // Collectible trigger collision
          if (
            tractor.x < coll.x + coll.width &&
            tractor.x + tractor.width > coll.x &&
            tractor.y < coll.y + coll.height &&
            tractor.y + tractor.height > coll.y
          ) {
            coll.collected = true;
            const reward = (coll.type === "gps" || coll.type === "drone") ? 50 : 15;
            scoreHarvestVal += reward;
            setHarvestScore(scoreHarvestVal);
            
            // spark splash
            spawnSparkles(coll.x, coll.y + scaleOffset, coll.color);
          }
        }

        if (coll.x < -80) {
          collectibles.splice(i, 1);
        }
      }

      ctx.restore(); // restore camera shake
      animId = requestAnimationFrame(updateGame);
    };

    updateGame();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [gameState]);

  const handleRestart = () => {
    if (restartTriggerRef.current) {
      restartTriggerRef.current();
    }
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden select-none bg-[#F4FAF6]"
      onClick={() => {
        if (gameState === "idle" || gameState === "gameover") handleRestart();
        else {
          const canvas = canvasRef.current;
          if (canvas) {
            const spaceEvent = new KeyboardEvent("keydown", { code: "Space" });
            window.dispatchEvent(spaceEvent);
          }
        }
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block z-0" 
      />

      {/* ═══════════════════════════════════════
          UI OVERLAYS (WCAG AA Contrast Compliant)
          ═══════════════════════════════════════ */}
      
      {/* Top-Left: Translucent dark-green glass panel */}
      <div className="absolute top-8 left-8 z-10 bg-[#0B3D2E]/90 border border-white/10 p-5 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] max-w-sm text-left pointer-events-none select-none backdrop-blur-md">
        <span className="font-black text-2xl uppercase tracking-widest text-white block leading-none">
          {headingInfo.title}
        </span>
        <h1 className="font-extrabold text-sm tracking-wider uppercase text-[#86EFAC] mt-1.5 leading-snug">
          {headingInfo.subtitle}
        </h1>
        <p className="text-xs text-[#E6FDF0] mt-1.5 font-medium leading-relaxed">
          {headingInfo.desc}
        </p>
      </div>

      {/* Top-Right: Harvest score box */}
      <div className="absolute top-8 right-8 z-10 pointer-events-none text-right font-black text-3xl text-[#0B3D2E] tracking-tight">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#1F7A53] block mb-0.5">Harvest Score</span>
        {harvestScore}
      </div>

      {/* Bottom-Center: Animated floating pill button */}
      {gameState === "playing" && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-[#0B3D2E] text-white font-extrabold text-xs tracking-widest uppercase px-6 py-3 rounded-full border border-white/10 shadow-lg backdrop-blur-md animate-bounce">
          Press Space or Tap to Jump
        </div>
      )}

      {/* Dynamic Achievement alerts */}
      {achievement && (
        <div className="absolute top-36 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-[#0B3D2E]/90 text-white font-extrabold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full border border-[#53D769]/30 shadow-lg backdrop-blur-md transition-all duration-300">
          🌾 {achievement}
        </div>
      )}

      {/* GAME START OVERLAY (Glassmorphic) */}
      {gameState === "idle" && (
        <div className="absolute inset-0 bg-[#0B3D2E]/15 backdrop-blur-[3px] flex items-center justify-center z-30">
          <div className="bg-white/95 border border-white p-8 sm:p-10 rounded-[32px] shadow-[0_16px_40px_rgba(0,77,38,0.06)] backdrop-blur-lg max-w-sm text-center relative z-40">
            <span className="text-[#1F7A53] text-xs font-bold tracking-[0.2em] uppercase mb-2 block">SourceTrace</span>
            <h2 className="text-2xl font-black text-[#0B3D2E] tracking-tight mb-3">Tractor Supply Dash</h2>
            <p className="text-xs text-[#1F5946] font-semibold leading-relaxed mb-6">
              Help our tractor jump obstacles, collect crops, and restore connected digital networks across the supply chain!
            </p>
            <button 
              onClick={(e) => { e.stopPropagation(); handleRestart(); }}
              className="w-full h-11 rounded-full bg-[#0B3D2E] hover:bg-[#125c44] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(11,61,46,0.15)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            >
              Start Harvest Run
            </button>
          </div>
        </div>
      )}

      {/* GAME OVER STATE OVERLAY (Glassmorphic) */}
      {gameState === "gameover" && (
        <div className="absolute inset-0 bg-[#D13C3C]/10 backdrop-blur-[3px] flex items-center justify-center z-30">
          <div className="bg-white/95 border border-white p-8 sm:p-10 rounded-[32px] shadow-[0_16px_40px_rgba(0,77,38,0.06)] backdrop-blur-lg max-w-sm text-center relative z-40">
            <span className="text-[#D13C3C] text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Trace Broken</span>
            <h2 className="text-2xl font-black text-[#0B3D2E] tracking-tight mb-1">Harvest Interrupted</h2>
            <p className="text-xs text-gray-500 font-medium mb-6">Silos or spreadsheets crashed the first mile.</p>
            
            <div className="bg-[#F4FAF6] border border-[#0B3D2E]/8 py-3 px-6 rounded-2xl mb-6 flex justify-between items-center text-xs">
              <span className="font-bold text-[#1F5946]">Final Harvest:</span>
              <span className="font-black text-[#0B3D2E] text-base">{harvestScore}</span>
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); handleRestart(); }}
                className="h-11 rounded-full bg-[#0B3D2E] hover:bg-[#125c44] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Play Again
              </button>
              
              <Link href="/" onClick={(e) => e.stopPropagation()} className="w-full">
                <button 
                  className="w-full h-11 rounded-full border border-[#0B3D2E]/12 hover:bg-gray-50 text-[#0B3D2E] font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" /> Return Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
