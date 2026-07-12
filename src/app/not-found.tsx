"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Home, HelpCircle } from "lucide-react";

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

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const restartTriggerRef = useRef<(() => void) | null>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [harvestScore, setHarvestScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [achievement, setAchievement] = useState<string | null>(null);

  const handleRestart = () => {
    if (restartTriggerRef.current) {
      restartTriggerRef.current();
    }
  };

  // Read high score from local storage
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
    let gameSpeed = 5;
    let scoreDistance = 0;
    let scoreHarvestVal = 0;
    let lastAchievementDistance = 0;

    // Camera shake strength
    let cameraShake = 0;

    // Time & Weather States
    let cycleTimer = 0;
    let activeWeather: "sun" | "sunset" | "night" | "rain" = "sun";

    // Assets Coordinates / State
    const tractor = {
      x: width * 0.12,
      y: groundY - 50,
      width: 60,
      height: 48,
      vy: 0,
      gravity: 0.65,
      jumpStrength: -13.5,
      isJumping: false,
      wheelAngle: 0,
      vibrationOffset: 0,
      smokeCooldown: 0
    };

    let obstacles: Obstacle[] = [];
    let collectibles: CropCollectible[] = [];
    let particles: Particle[] = [];

    // Background decoration arrays for parallax scrolling
    const clouds = [
      { x: 100, y: height * 0.15, size: 50, speed: 0.1 },
      { x: width * 0.5, y: height * 0.08, size: 70, speed: 0.05 },
      { x: width * 0.8, y: height * 0.2, size: 45, speed: 0.15 }
    ];

    const distantMountains = [
      { x: 0, w: width * 0.6, h: height * 0.28 },
      { x: width * 0.4, w: width * 0.7, h: height * 0.32 },
      { x: width * 0.8, w: width * 0.5, h: height * 0.24 }
    ];

    const midgroundHills = [
      { x: 0, w: width * 0.4, h: height * 0.15, color: "#D1EAD8" },
      { x: width * 0.3, w: width * 0.5, h: height * 0.18, color: "#C6E4CD" },
      { x: width * 0.7, w: width * 0.4, h: height * 0.14, color: "#D1EAD8" }
    ];

    // Background Windmills & Buildings
    const windmills = [
      { x: width * 0.25, rot: 0, size: 40 },
      { x: width * 0.75, rot: 1.5, size: 30 }
    ];

    const silos = [
      { x: width * 0.45, w: 32, h: 70 },
      { x: width * 0.9, w: 26, h: 55 }
    ];

    // ── GAME EVENTS ──
    const spawnSmoke = () => {
      particles.push({
        x: tractor.x + 12,
        y: tractor.y + 4,
        vx: -gameSpeed * 0.3 + (Math.random() - 0.5) * 0.5,
        vy: -1 - Math.random() * 1.5,
        size: 3 + Math.random() * 5,
        color: activeWeather === "night" ? "rgba(100, 100, 110, 0.25)" : "rgba(80, 80, 80, 0.18)",
        alpha: 0.7,
        life: 0,
        maxLife: 40 + Math.random() * 20
      });
    };

    const spawnLandingDust = () => {
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: tractor.x + tractor.width * 0.5 + (Math.random() - 0.5) * 20,
          y: groundY,
          vx: -gameSpeed * 0.5 + (Math.random() - 0.5) * 4,
          vy: -Math.random() * 4,
          size: 2 + Math.random() * 4,
          color: "rgba(139, 90, 43, 0.45)", // Dirt color
          alpha: 0.8,
          life: 0,
          maxLife: 30 + Math.random() * 20
        });
      }
      cameraShake = 5; // trigger camera shake
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
      gameSpeed = 5;
      tractor.y = groundY - tractor.height;
      tractor.vy = 0;
      tractor.isJumping = false;
      setGameState("playing");
    };
    restartTriggerRef.current = restartGame;

    // Keyboard handlers
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

    // ── ANIMATION & RENDERING LOOP ──
    const render = () => {
      if (!ctx || !canvas) return;

      // 1. Time / Weather Cycle
      cycleTimer++;
      if (cycleTimer > 900) {
        cycleTimer = 0;
        // Shift weather
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
        cameraShake *= 0.9; // decay
        if (cameraShake < 0.1) cameraShake = 0;
      }

      // ── SKY GRADIENTS (Based on Weather / Time) ──
      let skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (activeWeather === "sun") {
        skyGrad.addColorStop(0, "#BAE6FD"); // Sky blue
        skyGrad.addColorStop(1, "#F0FDFA"); // Light mint transition
      } else if (activeWeather === "sunset") {
        skyGrad.addColorStop(0, "#FDBA74"); // Orange glow
        skyGrad.addColorStop(1, "#FDF2F8"); // Light pink transition
      } else if (activeWeather === "night") {
        skyGrad.addColorStop(0, "#0F172A"); // Dark slate
        skyGrad.addColorStop(1, "#1E293B"); // Muted blue
      } else if (activeWeather === "rain") {
        skyGrad.addColorStop(0, "#9CA3AF"); // Gray rain clouds
        skyGrad.addColorStop(1, "#E5E7EB");
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Star twinkles at night
      if (activeWeather === "night") {
        ctx.fillStyle = "#FFF";
        for (let i = 0; i < 30; i++) {
          const starX = (Math.sin(i * 123.4) * 0.5 + 0.5) * width;
          const starY = (Math.cos(i * 987.6) * 0.5 + 0.5) * (height * 0.4);
          const alpha = 0.3 + Math.sin(Date.now() * 0.003 + i) * 0.4;
          ctx.globalAlpha = alpha;
          ctx.fillRect(starX, starY, 2, 2);
        }
        ctx.globalAlpha = 1.0;
        
        // Crescent Moon
        ctx.fillStyle = "#FEF08A";
        ctx.beginPath();
        ctx.arc(width - 120, 80, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = skyGrad; // Subtract sky color to form crescent
        ctx.beginPath();
        ctx.arc(width - 132, 74, 24, 0, Math.PI * 2);
        ctx.fill();
      }

      // Golden Sun during Sunset
      if (activeWeather === "sunset") {
        ctx.fillStyle = "#F59E0B";
        ctx.beginPath();
        ctx.arc(width * 0.4, groundY - 20, 48, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── PARALLAX LAYER 1: Distant Mountains (Speed: 0.05 * gameSpeed) ──
      ctx.fillStyle = activeWeather === "night" ? "#1E293B" : "#B2DCC0";
      distantMountains.forEach((mtn) => {
        if (gameState === "playing") {
          mtn.x -= gameSpeed * 0.04;
          if (mtn.x + mtn.w < 0) mtn.x = width;
        }
        ctx.beginPath();
        ctx.moveTo(mtn.x, groundY);
        ctx.lineTo(mtn.x + mtn.w * 0.5, groundY - mtn.h);
        ctx.lineTo(mtn.x + mtn.w, groundY);
        ctx.closePath();
        ctx.fill();
      });

      // ── PARALLAX LAYER 2: Midground Hills, Windmills, Silos (Speed: 0.15 * gameSpeed) ──
      midgroundHills.forEach((hill) => {
        if (gameState === "playing") {
          hill.x -= gameSpeed * 0.12;
          if (hill.x + hill.w < 0) hill.x = width;
        }
        ctx.fillStyle = activeWeather === "night" ? "#0F172A" : hill.color;
        ctx.beginPath();
        ctx.ellipse(hill.x + hill.w * 0.5, groundY, hill.w * 0.6, hill.h * 1.5, 0, Math.PI, 0);
        ctx.fill();
      });

      // Rotating Windmills in background
      ctx.strokeStyle = activeWeather === "night" ? "rgba(255,255,255,0.06)" : "#789B85";
      ctx.lineWidth = 2.5;
      windmills.forEach((wm) => {
        if (gameState === "playing") {
          wm.x -= gameSpeed * 0.12;
          if (wm.x < -80) wm.x = width + 80;
        }
        // Base post
        ctx.beginPath();
        ctx.moveTo(wm.x, groundY);
        ctx.lineTo(wm.x - 5, groundY - wm.size * 1.4);
        ctx.lineTo(wm.x + 5, groundY - wm.size * 1.4);
        ctx.closePath();
        ctx.fillStyle = activeWeather === "night" ? "#1E293B" : "#A6C7B3";
        ctx.fill();

        // Blades
        wm.rot += 0.015;
        ctx.save();
        ctx.translate(wm.x, groundY - wm.size * 1.4);
        ctx.rotate(wm.rot);
        for (let b = 0; b < 3; b++) {
          ctx.rotate((Math.PI * 2) / 3);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-4, -wm.size);
          ctx.lineTo(4, -wm.size);
          ctx.closePath();
          ctx.stroke();
        }
        ctx.restore();
      });

      // Distant silos/warehouses
      silos.forEach((silo) => {
        if (gameState === "playing") {
          silo.x -= gameSpeed * 0.12;
          if (silo.x < -80) silo.x = width + 80;
        }
        ctx.fillStyle = activeWeather === "night" ? "#1E293B" : "#B1D5BE";
        ctx.fillRect(silo.x, groundY - silo.h, silo.w, silo.h);
        // Silo dome top
        ctx.beginPath();
        ctx.arc(silo.x + silo.w * 0.5, groundY - silo.h, silo.w * 0.5, Math.PI, 0);
        ctx.fill();
      });

      // ── CROP FIELDS BACKGROUND SHADOWS (Layer 3: ground/road) ──
      ctx.fillStyle = activeWeather === "night" ? "#062C21" : "#EAF5EE";
      ctx.fillRect(0, groundY, width, height - groundY);

      // Draw agricultural rows on the field
      ctx.strokeStyle = activeWeather === "night" ? "rgba(255,255,255,0.03)" : "rgba(31,89,70,0.06)";
      ctx.lineWidth = 4;
      let fieldOffset = (gameState === "playing") ? -(scoreDistance * 1.2) % 60 : 0;
      for (let x = fieldOffset; x < width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, groundY);
        ctx.lineTo(x - 200, height);
        ctx.stroke();
      }

      // Ground Road (Tractor Track)
      ctx.fillStyle = activeWeather === "night" ? "#041B14" : "#DCEFE4";
      ctx.fillRect(0, groundY, width, 55);
      ctx.fillStyle = activeWeather === "night" ? "#020D09" : "#CCE9D6";
      ctx.fillRect(0, groundY + 55, width, 12);

      // ── SPONTANEOUS PARALLAX GRAPHICS: Supply Chain Milestones ──
      // Show agricultural nodes sliding past depending on distance score
      const currentMilestone = Math.floor(scoreDistance / 100);
      if (gameState === "playing") {
        // Draw physical milestone anchors on field
        const anchorX = width - ((scoreDistance * 0.8) % (width + 300));
        ctx.fillStyle = activeWeather === "night" ? "#0B3D2E" : "#86EFAC";
        
        // Evolving environmental objects based on current milestones
        if (currentMilestone >= 3 && currentMilestone < 6) {
          // Farmer portal / Collection shed
          ctx.fillRect(anchorX, groundY - 45, 40, 45);
          ctx.fillStyle = "#A3E635";
          ctx.beginPath(); // roof
          ctx.moveTo(anchorX - 5, groundY - 45);
          ctx.lineTo(anchorX + 20, groundY - 60);
          ctx.lineTo(anchorX + 45, groundY - 45);
          ctx.fill();
        } else if (currentMilestone >= 6 && currentMilestone < 9) {
          // Logistics warehouse/Silo stack
          ctx.fillRect(anchorX, groundY - 60, 55, 60);
          ctx.fillStyle = "#0B3D2E";
          ctx.fillRect(anchorX + 8, groundY - 80, 18, 20); // vertical tower
          ctx.beginPath();
          ctx.arc(anchorX + 17, groundY - 80, 9, Math.PI, 0);
          ctx.fill();
        } else if (currentMilestone >= 9) {
          // Connected digital node tree (glowing network)
          ctx.strokeStyle = "#53D769";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(anchorX + 20, groundY);
          ctx.lineTo(anchorX + 20, groundY - 70);
          ctx.stroke();
          
          // Nodes circles
          ctx.fillStyle = "#0B3D2E";
          ctx.beginPath();
          ctx.arc(anchorX + 20, groundY - 70, 7, 0, Math.PI * 2);
          ctx.arc(anchorX + 5, groundY - 50, 5, 0, Math.PI * 2);
          ctx.arc(anchorX + 35, groundY - 50, 5, 0, Math.PI * 2);
          ctx.fill();
          
          // Lines connecting
          ctx.beginPath();
          ctx.moveTo(anchorX + 20, groundY - 70);
          ctx.lineTo(anchorX + 5, groundY - 50);
          ctx.moveTo(anchorX + 20, groundY - 70);
          ctx.lineTo(anchorX + 35, groundY - 50);
          ctx.stroke();
        }
      }

      // ── GAME PLAY LOGIC UPDATES ──
      if (gameState === "playing") {
        // Distance increase
        scoreDistance += 0.25;

        // Trigger milestone achievements
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
          const oldY = tractor.y;
          tractor.y = groundY - tractor.height;
          tractor.vy = 0;
          if (tractor.isJumping) {
            tractor.isJumping = false;
            spawnLandingDust(); // Landing reaction!
          }
        }

        // Wheel rotation
        tractor.wheelAngle += gameSpeed * 0.05;

        // Vibrations
        tractor.vibrationOffset = Math.sin(Date.now() * 0.08) * 0.45;

        // Smoke trigger
        tractor.smokeCooldown++;
        if (tractor.smokeCooldown > 7) {
          tractor.smokeCooldown = 0;
          spawnSmoke();
        }

        // Handle collectibles & obstacles spawning
        if (Math.random() < 0.015 && obstacles.length < 3) {
          const obsTypes = ["fence", "rock", "haybale", "machinery"];
          const selected = obsTypes[Math.floor(Math.random() * obsTypes.length)];
          const obstacleW = selected === "machinery" ? 38 : selected === "haybale" ? 28 : 22;
          const obstacleH = selected === "machinery" ? 34 : selected === "haybale" ? 28 : 20;

          // Make sure it doesn't overlap existing obstacles closely
          const lastObs = obstacles[obstacles.length - 1];
          if (!lastObs || lastObs.x < width - 250) {
            obstacles.push({
              x: width + 20,
              y: groundY - obstacleH,
              width: obstacleW,
              height: obstacleH,
              type: selected,
              color: selected === "rock" ? "#9CA3AF" : selected === "haybale" ? "#EAB308" : "#EF4444",
              passed: false
            });
          }
        }

        // Spawn Crop Collectibles
        if (Math.random() < 0.02 && collectibles.length < 4) {
          const cropTypes = ["wheat", "coffee", "cocoa", "cotton", "gps", "drone"];
          const selected = cropTypes[Math.floor(Math.random() * cropTypes.length)];
          const collectY = groundY - 45 - Math.random() * 45; // float in air

          const lastColl = collectibles[collectibles.length - 1];
          if (!lastColl || lastColl.x < width - 150) {
            collectibles.push({
              x: width + 20,
              y: collectY,
              width: 16,
              height: 16,
              type: selected,
              color: selected === "wheat" ? "#F59E0B" : selected === "coffee" ? "#B45309" : selected === "cotton" ? "#F3F4F6" : "#10B981",
              collected: false,
              pulse: 0
            });
          }
        }
      }

      // ── UPDATE & DRAW PARTICLES ──
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        if (gameState === "playing") {
          p.x += p.vx;
          p.y += p.vy;
        } else {
          // Drifting effect when static
          p.x += p.vx * 0.1;
          p.y += p.vy * 0.1;
        }
        p.alpha = 1 - p.life / p.maxLife;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      // Twinkling Fireflies at night
      if (activeWeather === "night") {
        ctx.fillStyle = "rgba(134, 239, 172, 0.4)";
        for (let i = 0; i < 15; i++) {
          const ffX = (Math.cos(Date.now() * 0.001 + i * 2) * 0.5 + 0.5) * width;
          const ffY = groundY - 10 - (Math.sin(Date.now() * 0.002 + i) * 0.5 + 0.5) * 80;
          ctx.beginPath();
          ctx.arc(ffX, ffY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Rain weather streaks
      if (activeWeather === "rain") {
        ctx.strokeStyle = "rgba(156, 163, 175, 0.22)";
        ctx.lineWidth = 1.2;
        for (let i = 0; i < 40; i++) {
          const rx = (Math.sin(i * 45) * 0.5 + 0.5) * width;
          const ry = ((Date.now() * 0.015 + i * 20) % height);
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(rx - 8, ry + 24);
          ctx.stroke();
        }
      }

      // ── DRAW TRACTOR CHARACTER ──
      const curY = tractor.y + (gameState === "playing" ? tractor.vibrationOffset : 0);

      // Draw Tractor Cab Cabin (Forest green body, mint green glass window)
      ctx.fillStyle = "#0B3D2E";
      ctx.fillRect(tractor.x + 12, curY + 12, 34, 20); // main chassis
      ctx.fillRect(tractor.x + 26, curY + 2, 18, 14);  // cab cage
      ctx.fillStyle = "#86EFAC";
      ctx.fillRect(tractor.x + 29, curY + 4, 12, 10);  // window

      // Nose engine block
      ctx.fillStyle = "#1F7A53";
      ctx.fillRect(tractor.x + 5, curY + 18, 9, 14);

      // Exhaust pipe
      ctx.strokeStyle = "#4B5563";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(tractor.x + 9, curY + 18);
      ctx.lineTo(tractor.x + 9, curY + 4);
      ctx.lineTo(tractor.x + 13, curY + 4);
      ctx.stroke();

      // Wheels (Back wheel large, front wheel small)
      ctx.save();
      // Back Wheel
      ctx.translate(tractor.x + 36, curY + 30);
      ctx.rotate(tractor.wheelAngle);
      ctx.fillStyle = "#1F5946";
      ctx.beginPath();
      ctx.arc(0, 0, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#FFF";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-11, 0); ctx.lineTo(11, 0);
      ctx.moveTo(0, -11); ctx.lineTo(0, 11);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      // Front Wheel
      ctx.translate(tractor.x + 11, curY + 33);
      ctx.rotate(tractor.wheelAngle * 1.3);
      ctx.fillStyle = "#1F5946";
      ctx.beginPath();
      ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#FFF";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-7.5, 0); ctx.lineTo(7.5, 0);
      ctx.moveTo(0, -7.5); ctx.lineTo(0, 7.5);
      ctx.stroke();
      ctx.restore();

      // ── DRAW AND MANAGE OBSTACLES ──
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        if (gameState === "playing") {
          obs.x -= gameSpeed;
        }

        // Draw obstacle base shapes
        ctx.fillStyle = activeWeather === "night" ? "#0F172A" : obs.color;
        if (obs.type === "rock") {
          // Jagged rock
          ctx.beginPath();
          ctx.moveTo(obs.x, groundY);
          ctx.lineTo(obs.x + obs.width * 0.3, groundY - obs.height);
          ctx.lineTo(obs.x + obs.width * 0.7, groundY - obs.height * 0.9);
          ctx.lineTo(obs.x + obs.width, groundY);
          ctx.closePath();
          ctx.fill();
        } else if (obs.type === "fence") {
          // Broken agricultural fence
          ctx.strokeStyle = activeWeather === "night" ? "#1E293B" : "#B45309";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(obs.x, groundY);
          ctx.lineTo(obs.x + obs.width, groundY - obs.height);
          ctx.moveTo(obs.x + obs.width * 0.4, groundY);
          ctx.lineTo(obs.x + obs.width * 0.6, groundY - obs.height);
          ctx.stroke();
        } else if (obs.type === "haybale") {
          // Roll of hay
          ctx.beginPath();
          ctx.arc(obs.x + obs.width * 0.5, groundY - obs.height * 0.5, obs.width * 0.5, 0, Math.PI * 2);
          ctx.fill();
          // Inner swirls
          ctx.strokeStyle = activeWeather === "night" ? "#1E293B" : "#CA8A04";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(obs.x + obs.width * 0.5, groundY - obs.height * 0.5, obs.width * 0.25, 0, Math.PI * 1.5);
          ctx.stroke();
        } else {
          // Broken machinery block
          ctx.fillRect(obs.x, groundY - obs.height, obs.width, obs.height);
        }

        // COLLISION CHECK
        if (
          tractor.x + 4 < obs.x + obs.width &&
          tractor.x + tractor.width - 4 > obs.x &&
          tractor.y + 4 < groundY &&
          tractor.y + tractor.height - 2 > groundY - obs.height
        ) {
          setGameState("gameover");
          if (scoreHarvestVal > highScore) {
            setHighScore(scoreHarvestVal);
            localStorage.setItem("sourcetrace_tractor_dino_highscore", scoreHarvestVal.toString());
          }
        }

        // Remove offscreen
        if (obs.x < -80) {
          obstacles.splice(i, 1);
        }
      }

      // ── DRAW AND MANAGE COLLECTIBLES ──
      for (let i = collectibles.length - 1; i >= 0; i--) {
        const coll = collectibles[i];
        if (gameState === "playing") {
          coll.x -= gameSpeed;
        }

        // Spin pulse scale
        coll.pulse += 0.08;
        const scaleOffset = Math.sin(coll.pulse) * 2;

        if (!coll.collected) {
          ctx.save();
          // Glow filter on tech items
          if (coll.type === "gps" || coll.type === "drone") {
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#53D769";
          }

          ctx.fillStyle = coll.color;
          if (coll.type === "wheat") {
            // Wheat stalk
            ctx.beginPath();
            ctx.ellipse(coll.x, coll.y + scaleOffset, 5, 8 + scaleOffset * 0.2, 0.2, 0, Math.PI * 2);
            ctx.fill();
          } else if (coll.type === "coffee") {
            // Red coffee cherry
            ctx.beginPath();
            ctx.arc(coll.x, coll.y + scaleOffset, 7, 0, Math.PI * 2);
            ctx.fill();
          } else if (coll.type === "cotton") {
            // Cotton cloud
            ctx.beginPath();
            ctx.arc(coll.x - 4, coll.y + scaleOffset, 6, 0, Math.PI * 2);
            ctx.arc(coll.x + 4, coll.y + scaleOffset, 6, 0, Math.PI * 2);
            ctx.arc(coll.x, coll.y - 4 + scaleOffset, 6, 0, Math.PI * 2);
            ctx.fill();
          } else if (coll.type === "gps") {
            // GPS Pin node
            ctx.beginPath();
            ctx.arc(coll.x, coll.y + scaleOffset - 4, 5, 0, Math.PI * 2);
            ctx.moveTo(coll.x, coll.y + scaleOffset - 4);
            ctx.lineTo(coll.x, coll.y + scaleOffset + 6);
            ctx.stroke();
            ctx.fill();
          } else {
            // Quadcopter Drone icon
            ctx.fillRect(coll.x - 8, coll.y + scaleOffset - 2, 16, 4);
            ctx.fillStyle = "#FFF";
            ctx.fillRect(coll.x - 10, coll.y + scaleOffset - 4, 3, 3);
            ctx.fillRect(coll.x + 7, coll.y + scaleOffset - 4, 3, 3);
          }
          ctx.restore();

          // Collection Collision check
          if (
            tractor.x < coll.x + coll.width &&
            tractor.x + tractor.width > coll.x &&
            tractor.y < coll.y + coll.height &&
            tractor.y + tractor.height > coll.y
          ) {
            coll.collected = true;
            // Crop values vs Drone rewards
            const reward = (coll.type === "gps" || coll.type === "drone") ? 50 : 15;
            scoreHarvestVal += reward;
            setHarvestScore(scoreHarvestVal);
            
            // Spawn spark particles on collection
            for (let s = 0; s < 8; s++) {
              particles.push({
                x: coll.x,
                y: coll.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                size: 2.2,
                color: coll.color,
                alpha: 1.0,
                life: 0,
                maxLife: 25
              });
            }
          }
        }

        // Remove offscreen
        if (coll.x < -80) {
          collectibles.splice(i, 1);
        }
      }

      ctx.restore(); // restore from camera shake

      // ── FOREGROUND POLLENS / LEAVES BLOWING ──
      // Subtle organic pollen drift
      ctx.fillStyle = activeWeather === "night" ? "rgba(255,255,255,0.08)" : "rgba(83, 215, 105, 0.12)";
      for (let i = 0; i < 10; i++) {
        const driftX = ((Date.now() * 0.05 + i * 200) % (width + 100)) - 50;
        const driftY = (Math.sin(Date.now() * 0.001 + i) * 0.5 + 0.5) * height;
        ctx.beginPath();
        ctx.arc(driftX, driftY, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Loop request
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [gameState]);

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden select-none bg-[#F4FAF6]"
      onClick={() => {
        if (gameState === "idle" || gameState === "gameover") handleRestart();
        else {
          // Trigger jump via screen tap
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
          MINIMAL HUD OVERLAY
          ═══════════════════════════════════════ */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none text-left">
        <span className="font-black text-2xl uppercase tracking-widest text-[#0B3D2E] block">404</span>
        <h1 className="font-extrabold text-[13px] tracking-wider uppercase text-[#1F7A53] mt-1">We couldn&apos;t trace this page.</h1>
        <p className="text-[10px] text-[#1F5946]/70 mt-1 font-semibold">Looks like this page wandered into another field.</p>
      </div>

      <div className="absolute top-8 right-8 z-10 pointer-events-none text-right font-black text-2xl text-[#0B3D2E] tracking-tight">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#1F7A53] block mb-0.5">Harvest Score</span>
        {harvestScore}
      </div>

      {gameState === "playing" && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center font-extrabold text-[10px] tracking-widest uppercase text-[#1F7A53] animate-pulse">
          Press Space or Tap to Jump
        </div>
      )}

      {/* ── ACHIEVEMENT RADAR ALERT (Fades in dynamically) ── */}
      {achievement && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-[#0B3D2E]/90 text-white font-extrabold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full border border-[#53D769]/30 shadow-lg backdrop-blur-md transition-all duration-300">
          🌾 {achievement}
        </div>
      )}

      {/* ═══════════════════════════════════════
          GAME OVER / START STATE OVERLAYS (Glassmorphic)
          ═══════════════════════════════════════ */}
      {gameState === "idle" && (
        <div className="absolute inset-0 bg-[#0B3D2E]/15 backdrop-blur-[3px] flex items-center justify-center z-30">
          <div className="bg-white/90 border border-white p-8 sm:p-10 rounded-[32px] shadow-[0_16px_40px_rgba(0,77,38,0.06)] backdrop-blur-lg max-w-sm text-center relative z-40">
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

      {gameState === "gameover" && (
        <div className="absolute inset-0 bg-[#D13C3C]/10 backdrop-blur-[3px] flex items-center justify-center z-30">
          <div className="bg-white/90 border border-white p-8 sm:p-10 rounded-[32px] shadow-[0_16px_40px_rgba(0,77,38,0.06)] backdrop-blur-lg max-w-sm text-center relative z-40">
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
