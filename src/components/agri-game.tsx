"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Play, RotateCcw, Home } from "lucide-react";

interface AgriGameProps {
  mode: "404" | "offline" | "500";
}

interface RoadElement {
  z: number; // 0 (horizon) to 1 (screen bottom)
  type: "obstacle" | "crop";
  subType: string;
  xOffset: number; // always 0 for center lane alignment
  collected: boolean;
  pulse: number;
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
}

export function AgriGame({ mode }: AgriGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const restartTriggerRef = useRef<(() => void) | null>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [harvestWeight, setHarvestWeight] = useState(0); // in kg
  const [highScore, setHighScore] = useState(0);
  const [achievement, setAchievement] = useState<string | null>(null);
  const [floatingText, setFloatingText] = useState<{ text: string; x: number; y: number; id: number }[]>([]);

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

  // Load high score
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sourcetrace_tractor_weight_highscore");
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

    // GAME-FIRST: Horizon at 10% — sky is just a sliver, road dominates 90%
    let horizonY = height * 0.10;
    let groundY = height;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      horizonY = height * 0.10;
      groundY = height;
    };
    window.addEventListener("resize", handleResize);

    // Game variables
    let gameSpeed = 0.011; // Slightly faster scroll
    let distanceTraveled = 0;
    let currentWeight = 0;
    let lastAchievementDistance = 0;
    let cameraShake = 0;

    // Collision Freeze states
    let freezeTimer = 0;
    let collidedItemIdx = -1;
    let cycleTimer = 0;
    let activeWeather: "sun" | "sunset" | "night" | "rain" = "sun";

    // GAME-FIRST: Tractor is THE HERO — massive, low on screen
    const tractor = {
      x: width / 2,
      y: height * 0.84, // Sits very low, dominating bottom third
      width: 400,
      height: 300,
      yOffset: 0,
      vy: 0,
      gravity: 0.9,
      jumpStrength: -22,
      isJumping: false,
      vibration: 0,
      wheelRot: 0
    };

    // Game elements moving down the road
    let roadItems: RoadElement[] = [];
    let particles: Particle[] = [];
    let roadDashes: number[] = [0, 0.2, 0.4, 0.6, 0.8]; // For road lines motion

    // Minimal background — only enough to sell the farm vibe, not distract
    const clouds = [
      { x: width * 0.25, y: horizonY * 0.35, size: 25 },
      { x: width * 0.65, y: horizonY * 0.25, size: 30 }
    ];

    const mountains = [
      { x: width * 0.05, w: width * 0.5, h: horizonY * 0.6 },
      { x: width * 0.5, w: width * 0.55, h: horizonY * 0.7 }
    ];

    // Scenery assets on the sides of the road (Pastel, de-saturated silhouettes)
    interface SceneryItem {
      z: number;
      side: "left" | "right";
      type: "tree" | "windmill";
      rot: number;
    }
    let sceneryItems: SceneryItem[] = [
      { z: 0.1, side: "left", type: "tree", rot: 0 },
      { z: 0.3, side: "right", type: "windmill", rot: 0 },
      { z: 0.5, side: "left", type: "tree", rot: 0 },
      { z: 0.7, side: "right", type: "tree", rot: 0 },
      { z: 0.9, side: "left", type: "windmill", rot: 1 }
    ];

    // Spawning control - enforcing large distances between objects
    let spawnTimer = 0;

    const triggerJump = () => {
      if (gameState === "playing" && !tractor.isJumping && freezeTimer === 0) {
        tractor.vy = tractor.jumpStrength;
        tractor.isJumping = true;
      }
    };

    const spawnSparks = (x: number, y: number, color: string) => {
      for (let i = 0; i < 10; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          size: 2.5 + Math.random() * 4,
          color,
          alpha: 1.0,
          life: 0,
          maxLife: 20 + Math.random() * 15
        });
      }
    };

    const spawnLandingDust = () => {
      for (let i = 0; i < 25; i++) {
        particles.push({
          x: width / 2 + (Math.random() - 0.5) * 110,
          y: tractor.y + 35,
          vx: (Math.random() - 0.5) * 9,
          vy: -1.5 - Math.random() * 4,
          size: 4 + Math.random() * 8,
          color: "rgba(167, 133, 100, 0.45)",
          alpha: 0.85,
          life: 0,
          maxLife: 25 + Math.random() * 20
        });
      }
      cameraShake = 9;
    };

    const triggerFloatingText = (text: string) => {
      const id = Date.now() + Math.random();
      setFloatingText((prev) => [...prev, { text, x: width / 2, y: tractor.y - 120, id }]);
      setTimeout(() => {
        setFloatingText((prev) => prev.filter((t) => t.id !== id));
      }, 1500);
    };

    const restartGame = () => {
      roadItems = [];
      particles = [];
      distanceTraveled = 0;
      currentWeight = 0;
      freezeTimer = 0;
      collidedItemIdx = -1;
      setHarvestWeight(0);
      gameSpeed = 0.011;
      tractor.yOffset = 0;
      tractor.vy = 0;
      tractor.isJumping = false;
      setGameState("playing");
    };
    restartTriggerRef.current = restartGame;

    // Keyboard trigger
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

    // ── GAME RENDERING LOOP ──
    const render = () => {
      if (!ctx || !canvas) return;

      // ── WEATHER CYCLES ──
      cycleTimer++;
      if (cycleTimer > 950) {
        cycleTimer = 0;
        const weathers: ("sun" | "sunset" | "night" | "rain")[] = ["sun", "sunset", "night", "rain"];
        const currentIdx = weathers.indexOf(activeWeather);
        activeWeather = weathers[(currentIdx + 1) % weathers.length];
      }

      // Camera Shake translate Y/X
      ctx.save();
      if (cameraShake > 0) {
        const shakeX = (Math.random() - 0.5) * cameraShake;
        const shakeY = (Math.random() - 0.5) * cameraShake;
        ctx.translate(shakeX, shakeY);
        cameraShake *= 0.88;
        if (cameraShake < 0.1) cameraShake = 0;
      }

      // Draw Sky (Pastel, de-saturated)
      let skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      if (activeWeather === "sun") {
        skyGrad.addColorStop(0, "#BAE6FD");
        skyGrad.addColorStop(1, "#E0F2FE");
      } else if (activeWeather === "sunset") {
        skyGrad.addColorStop(0, "#FDBA74");
        skyGrad.addColorStop(1, "#FFEDD5");
      } else if (activeWeather === "night") {
        skyGrad.addColorStop(0, "#0F172A");
        skyGrad.addColorStop(1, "#1E293B");
      } else if (activeWeather === "rain") {
        skyGrad.addColorStop(0, "#9CA3AF");
        skyGrad.addColorStop(1, "#D1D5DB");
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, horizonY);

      // Distant Mountains
      ctx.fillStyle = activeWeather === "night" ? "rgba(30, 41, 59, 0.12)" : "rgba(178, 220, 192, 0.15)";
      mountains.forEach((mtn) => {
        ctx.beginPath();
        ctx.moveTo(mtn.x, horizonY);
        ctx.lineTo(mtn.x + mtn.w * 0.5, horizonY - mtn.h);
        ctx.lineTo(mtn.x + mtn.w, horizonY);
        ctx.closePath();
        ctx.fill();
      });

      // ── GROUND / FARMLAND SIDE BACKGROUNDS ──
      ctx.fillStyle = activeWeather === "night" ? "#041C15" : "#EAF5EE";
      ctx.fillRect(0, horizonY, width, height - horizonY);

      // ── ROAD RENDERING (Obvious gameplay lane, 78% of viewport) ──
      const roadStartWidth = 48; // Wider vanishing point
      const roadEndWidth = width * 0.95; // Wider screen bottom road
      
      const leftHorizonX = width / 2 - roadStartWidth / 2;
      const rightHorizonX = width / 2 + roadStartWidth / 2;
      const leftBottomX = width / 2 - roadEndWidth / 2;
      const rightBottomX = width / 2 + roadEndWidth / 2;

      // Draw main dirt road body (Dark brown/sage lane)
      ctx.fillStyle = activeWeather === "night" ? "#020D09" : "#C6DCBA";
      ctx.beginPath();
      ctx.moveTo(leftHorizonX, horizonY);
      ctx.lineTo(rightHorizonX, horizonY);
      ctx.lineTo(rightBottomX, height);
      ctx.lineTo(leftBottomX, height);
      ctx.closePath();
      ctx.fill();

      // Road grass borders (shading on edges)
      ctx.strokeStyle = activeWeather === "night" ? "#052E20" : "#A1C6A0";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(leftHorizonX, horizonY);
      ctx.lineTo(leftBottomX, height);
      ctx.moveTo(rightHorizonX, horizonY);
      ctx.lineTo(rightBottomX, height);
      ctx.stroke();

      // Road dashes / dirt ridges (pseudo-3D motion lines)
      if (gameState === "playing" && freezeTimer === 0) {
        for (let i = 0; i < roadDashes.length; i++) {
          roadDashes[i] += gameSpeed * 1.5;
          if (roadDashes[i] >= 1.0) roadDashes[i] = 0;
        }
      }
      ctx.strokeStyle = activeWeather === "night" ? "rgba(11,61,46,0.2)" : "rgba(31,89,70,0.08)";
      roadDashes.forEach((z) => {
        const ry = horizonY + z * (height - horizonY);
        const rw = roadStartWidth * (1 - z) + roadEndWidth * z;
        ctx.lineWidth = 1.5 + z * 11;
        ctx.beginPath();
        ctx.moveTo(width / 2 - rw / 2, ry);
        ctx.lineTo(width / 2 + rw / 2, ry);
        ctx.stroke();
      });

      // ── SCENERY ASSETS (Parallax trees, windmills scrolling past the road sides) ──
      sceneryItems.forEach((item) => {
        if (gameState === "playing" && freezeTimer === 0) {
          item.z += gameSpeed;
          if (item.z >= 1.0) {
            item.z = 0.05;
            item.side = Math.random() > 0.5 ? "left" : "right";
            item.type = Math.random() > 0.5 ? "windmill" : "tree";
          }
        }

        const scale = Math.pow(item.z, 2); 
        const ry = horizonY + item.z * (height - horizonY);
        const rw = roadStartWidth * (1 - item.z) + roadEndWidth * item.z;
        const sideMultiplier = item.side === "left" ? -1 : 1;
        const rx = width / 2 + sideMultiplier * (rw / 2 + 80 * scale * (width * 0.002));

        ctx.save();
        ctx.translate(rx, ry);
        ctx.scale(scale * 2.0, scale * 2.0); // 40-50% scale zoom

        // Muted de-saturated silhouettes of scenery
        ctx.fillStyle = activeWeather === "night" ? "rgba(30, 41, 59, 0.12)" : "rgba(120, 155, 133, 0.25)";
        if (item.type === "tree") {
          ctx.beginPath();
          ctx.moveTo(0, -40);
          ctx.lineTo(-12, -15);
          ctx.lineTo(12, -15);
          ctx.closePath();
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(0, -25);
          ctx.lineTo(-18, 5);
          ctx.lineTo(18, 5);
          ctx.closePath();
          ctx.fill();
          ctx.fillRect(-2.5, 5, 5, 8);
        } else if (item.type === "windmill") {
          ctx.fillRect(-2, -35, 4, 35);
          item.rot += 0.012;
          ctx.save();
          ctx.translate(0, -35);
          ctx.rotate(item.rot);
          ctx.strokeStyle = activeWeather === "night" ? "rgba(255,255,255,0.03)" : "rgba(120, 155, 133, 0.2)";
          ctx.lineWidth = 1.5;
          for (let b = 0; b < 3; b++) {
            ctx.rotate((Math.PI * 2) / 3);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -18);
            ctx.stroke();
          }
          ctx.restore();
        }
        ctx.restore();
      });

      // ── GAME PLAY LOGIC & SPAWNINGS ──
      if (gameState === "playing" && freezeTimer === 0) {
        distanceTraveled += 0.25;

        // Spawning timer (Enforcing large spacing - at least Z = 0.5 difference)
        let lastItemZ = 0;
        if (roadItems.length > 0) {
          lastItemZ = roadItems[roadItems.length - 1].z;
        }

        spawnTimer++;
        if (spawnTimer > 95 && lastItemZ > 0.48) {
          spawnTimer = 0;
          const isCrop = Math.random() > 0.42;
          if (isCrop) {
            // Simplified: 2 Collectibles (Wheat, Tomato)
            const cropTypes = ["wheat", "tomato"];
            roadItems.push({
              z: 0.05,
              type: "crop",
              subType: cropTypes[Math.floor(Math.random() * cropTypes.length)],
              xOffset: 0,
              collected: false,
              pulse: Math.random() * 5
            });
          } else {
            // Simplified: 3 Obstacles (Rock, Haybale, Cow)
            const obstacleTypes = ["rock", "haybale", "cow"];
            roadItems.push({
              z: 0.05,
              type: "obstacle",
              subType: obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)],
              xOffset: 0, 
              collected: false,
              pulse: 0
            });
          }
        }

        // Tractor Physics
        tractor.vy += tractor.gravity;
        tractor.yOffset -= tractor.vy;

        // Ground Collision
        if (tractor.yOffset <= 0) {
          tractor.yOffset = 0;
          tractor.vy = 0;
          if (tractor.isJumping) {
            tractor.isJumping = false;
            spawnLandingDust();
          }
        }

        tractor.wheelRot += gameSpeed * 9;
        tractor.vibration = Math.sin(Date.now() * 0.08) * 1.1;
      }

      // ── UPDATE & DRAW GAMEPLAY ROAD ITEMS (Obstacles & Crops) ──
      for (let i = roadItems.length - 1; i >= 0; i--) {
        const item = roadItems[i];
        
        // Scroll items only when not frozen
        if (gameState === "playing" && freezeTimer === 0) {
          item.z += gameSpeed;
        }

        // GAME-FIRST: Very flat exponent = objects are MASSIVE on screen
        const scale = Math.pow(item.z, 1.2); 
        const ry = horizonY + item.z * (height - horizonY);
        const rx = width / 2;

        // Remove offscreen
        if (item.z >= 1.05) {
          roadItems.splice(i, 1);
          continue;
        }

        // ── TRACTOR COLLISION CHECK (shifted to match tractor at 84% height) ──
        if (item.z >= 0.82 && item.z <= 0.92 && freezeTimer === 0) {
          if (item.type === "obstacle") {
            const obsHeightMap = { rock: 80, haybale: 90, cow: 100 };
            const obstacleHeight = obsHeightMap[item.subType as keyof typeof obsHeightMap] || 85;
            
            if (tractor.yOffset < obstacleHeight - 15) {
              // COLLISION TRIGGERED! Start freeze frame animations
              freezeTimer = 18; // ~300ms freeze
              collidedItemIdx = i;
              cameraShake = 16;  // Intense shake
              
              // Spawn impact dust
              for (let d = 0; d < 30; d++) {
                particles.push({
                  x: rx + (Math.random() - 0.5) * 80,
                  y: ry - 20,
                  vx: (Math.random() - 0.5) * 12,
                  vy: -2 - Math.random() * 6,
                  size: 5 + Math.random() * 8,
                  color: "rgba(180, 50, 50, 0.8)", // red impact sparks
                  alpha: 1.0,
                  life: 0,
                  maxLife: 30 + Math.random() * 15
                });
              }
            }
          } else if (item.type === "crop" && !item.collected) {
            item.collected = true;
            const rewardMap = { wheat: 25, tomato: 35 };
            const weightReward = rewardMap[item.subType as keyof typeof rewardMap] || 20;
            currentWeight += weightReward;
            setHarvestWeight(currentWeight);
            
            spawnSparks(rx, ry - 30 * scale, item.subType === "wheat" ? "#FBBF24" : "#EF4444");
            triggerFloatingText(`+${weightReward} kg ${item.subType.toUpperCase()}`);
          }
        }

        // Render Item on road
        if (item.type === "obstacle") {
          /* ═══════════════════════════════════════
             HAZARDS: LARGE, DARK, MATTE, GROUNDED
             ═══════════════════════════════════════ */
          ctx.save();
          ctx.translate(rx, ry);
          
          // Collision impact enlargement + flash red
          const isCollidedThis = (collidedItemIdx === i);
          const finalScaleMultiplier = isCollidedThis ? scale * 6.0 : scale * 5.0;
          ctx.scale(finalScaleMultiplier, finalScaleMultiplier);

          // Shadow
          ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
          ctx.beginPath();
          ctx.ellipse(0, 2, 40, 10, 0, 0, Math.PI * 2);
          ctx.fill();

          if (isCollidedThis && Math.floor(Date.now() / 80) % 2 === 0) {
            // Flash Solid Red on collision
            ctx.fillStyle = "#DC2626";
            ctx.beginPath();
            ctx.arc(0, -25, 35, 0, Math.PI * 2);
            ctx.fill();
          } else {
            if (item.subType === "rock") {
              // ── LARGE BOULDER ──
              // Main body
              ctx.fillStyle = "#4B5563";
              ctx.beginPath();
              ctx.moveTo(-35, 0);
              ctx.quadraticCurveTo(-38, -25, -20, -45);
              ctx.quadraticCurveTo(-5, -55, 15, -48);
              ctx.quadraticCurveTo(35, -38, 38, -15);
              ctx.quadraticCurveTo(40, 0, 35, 0);
              ctx.closePath();
              ctx.fill();

              // Dark shaded left face
              ctx.fillStyle = "#374151";
              ctx.beginPath();
              ctx.moveTo(-35, 0);
              ctx.quadraticCurveTo(-38, -25, -20, -45);
              ctx.lineTo(-5, -30);
              ctx.lineTo(-10, 0);
              ctx.closePath();
              ctx.fill();

              // Light highlight on top
              ctx.fillStyle = "#6B7280";
              ctx.beginPath();
              ctx.moveTo(-15, -42);
              ctx.quadraticCurveTo(0, -52, 12, -46);
              ctx.quadraticCurveTo(5, -38, -10, -38);
              ctx.closePath();
              ctx.fill();

              // Crack lines
              ctx.strokeStyle = "#1F2937";
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(-8, -40);
              ctx.lineTo(0, -25);
              ctx.lineTo(8, -32);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(10, -20);
              ctx.lineTo(18, -10);
              ctx.stroke();
              
              // Small pebbles around base
              ctx.fillStyle = "#6B7280";
              ctx.beginPath();
              ctx.arc(-25, -2, 4, 0, Math.PI * 2);
              ctx.arc(28, -1, 3, 0, Math.PI * 2);
              ctx.arc(-15, 0, 2.5, 0, Math.PI * 2);
              ctx.fill();

            } else if (item.subType === "haybale") {
              // ── LARGE HAY BALE (cylinder front view) ──
              // Back circle edge
              ctx.fillStyle = "#92400E";
              ctx.beginPath();
              ctx.ellipse(0, -22, 35, 30, 0, 0, Math.PI * 2);
              ctx.fill();

              // Front face
              ctx.fillStyle = "#D97706";
              ctx.beginPath();
              ctx.ellipse(0, -22, 30, 26, 0, 0, Math.PI * 2);
              ctx.fill();

              // Straw spiral pattern
              ctx.strokeStyle = "#B45309";
              ctx.lineWidth = 2.5;
              ctx.beginPath();
              ctx.arc(0, -22, 8, 0, Math.PI * 3);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(0, -22, 16, 0.5, Math.PI * 2.5);
              ctx.stroke();

              // Twine binding bands (horizontal)
              ctx.strokeStyle = "#78350F";
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.moveTo(-28, -10);
              ctx.lineTo(28, -10);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(-25, -35);
              ctx.lineTo(25, -35);
              ctx.stroke();

              // Light highlight
              ctx.fillStyle = "rgba(255, 220, 130, 0.3)";
              ctx.beginPath();
              ctx.ellipse(-8, -30, 10, 6, -0.3, 0, Math.PI * 2);
              ctx.fill();

              // Loose straw pieces sticking out
              ctx.strokeStyle = "#D97706";
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(28, -18); ctx.lineTo(38, -22);
              ctx.moveTo(26, -28); ctx.lineTo(35, -33);
              ctx.moveTo(-27, -15); ctx.lineTo(-36, -12);
              ctx.stroke();

            } else if (item.subType === "cow") {
              // ── LARGE COW (side view) ──
              // Body
              ctx.fillStyle = "#F9FAFB";
              ctx.beginPath();
              ctx.ellipse(0, -25, 38, 22, 0, 0, Math.PI * 2);
              ctx.fill();

              // Black patches
              ctx.fillStyle = "#1F2937";
              ctx.beginPath();
              ctx.ellipse(-12, -30, 12, 8, -0.2, 0, Math.PI * 2);
              ctx.fill();
              ctx.beginPath();
              ctx.ellipse(10, -20, 9, 7, 0.3, 0, Math.PI * 2);
              ctx.fill();
              ctx.beginPath();
              ctx.ellipse(-5, -18, 6, 5, 0, 0, Math.PI * 2);
              ctx.fill();

              // Legs (4 legs)
              ctx.fillStyle = "#F3F4F6";
              ctx.fillRect(-28, -6, 8, 10);
              ctx.fillRect(-14, -6, 8, 10);
              ctx.fillRect(8, -6, 8, 10);
              ctx.fillRect(22, -6, 8, 10);
              // Hooves
              ctx.fillStyle = "#1F2937";
              ctx.fillRect(-28, 3, 8, 4);
              ctx.fillRect(-14, 3, 8, 4);
              ctx.fillRect(8, 3, 8, 4);
              ctx.fillRect(22, 3, 8, 4);

              // Head (right side)
              ctx.fillStyle = "#F9FAFB";
              ctx.beginPath();
              ctx.ellipse(35, -38, 14, 12, 0.15, 0, Math.PI * 2);
              ctx.fill();
              // Snout
              ctx.fillStyle = "#FBCFE8";
              ctx.beginPath();
              ctx.ellipse(44, -34, 8, 6, 0, 0, Math.PI * 2);
              ctx.fill();
              // Nostrils
              ctx.fillStyle = "#9F1239";
              ctx.beginPath();
              ctx.arc(42, -33, 1.5, 0, Math.PI * 2);
              ctx.arc(46, -33, 1.5, 0, Math.PI * 2);
              ctx.fill();
              // Eyes
              ctx.fillStyle = "#111827";
              ctx.beginPath();
              ctx.arc(32, -40, 3, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillStyle = "#FFF";
              ctx.beginPath();
              ctx.arc(31, -41, 1, 0, Math.PI * 2);
              ctx.fill();
              // Ears
              ctx.fillStyle = "#FBCFE8";
              ctx.beginPath();
              ctx.ellipse(26, -48, 6, 4, -0.5, 0, Math.PI * 2);
              ctx.fill();
              ctx.beginPath();
              ctx.ellipse(38, -48, 6, 4, 0.5, 0, Math.PI * 2);
              ctx.fill();
              // Horns
              ctx.fillStyle = "#D4D4D8";
              ctx.beginPath();
              ctx.moveTo(28, -48); ctx.lineTo(24, -56); ctx.lineTo(30, -50);
              ctx.fill();
              ctx.beginPath();
              ctx.moveTo(40, -48); ctx.lineTo(44, -56); ctx.lineTo(42, -50);
              ctx.fill();

              // Tail
              ctx.strokeStyle = "#1F2937";
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.moveTo(-36, -30);
              ctx.quadraticCurveTo(-50, -20, -46, -8);
              ctx.stroke();
              // Tail tuft
              ctx.fillStyle = "#1F2937";
              ctx.beginPath();
              ctx.arc(-46, -7, 4, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.restore();
        } else if (item.type === "crop" && !item.collected) {
          /* ═══════════════════════════════════════
             COLLECTIBLES: BRIGHT, GLOWING, FLOATING CROP ASSETS
             ═══════════════════════════════════════ */
          const hoverOffset = Math.sin(item.pulse) * 6 * scale;
          ctx.save();
          ctx.translate(rx, ry - 90 * scale + hoverOffset);
          ctx.scale(scale * 5.0, scale * 5.0);

          // Outer glow
          ctx.shadowBlur = 25;
          ctx.shadowColor = item.subType === "wheat" ? "#FBBF24" : "#EF4444";

          if (item.subType === "wheat") {
            // ── WHEAT BUNDLE: 3 tall golden stalks with grain heads ──
            
            // Stalks (long green-gold stems)
            ctx.strokeStyle = "#65A30D";
            ctx.lineWidth = 3;
            // Left stalk
            ctx.beginPath();
            ctx.moveTo(-8, 30); ctx.lineTo(-12, -20);
            ctx.stroke();
            // Center stalk
            ctx.beginPath();
            ctx.moveTo(0, 30); ctx.lineTo(0, -30);
            ctx.stroke();
            // Right stalk
            ctx.beginPath();
            ctx.moveTo(8, 30); ctx.lineTo(12, -20);
            ctx.stroke();

            // Small leaves on stalks
            ctx.fillStyle = "#84CC16";
            ctx.beginPath();
            ctx.ellipse(-14, 0, 8, 3, -0.6, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(14, 5, 8, 3, 0.6, 0, Math.PI * 2);
            ctx.fill();

            // Grain heads (golden oval clusters at top of each stalk)
            const grainGrad = ctx.createRadialGradient(0, -35, 3, 0, -30, 18);
            grainGrad.addColorStop(0, "#FDE047");
            grainGrad.addColorStop(1, "#D97706");
            ctx.fillStyle = grainGrad;

            // Left grain head
            ctx.beginPath();
            ctx.ellipse(-12, -28, 7, 14, -0.15, 0, Math.PI * 2);
            ctx.fill();
            // Center grain head (tallest)
            ctx.beginPath();
            ctx.ellipse(0, -38, 8, 16, 0, 0, Math.PI * 2);
            ctx.fill();
            // Right grain head
            ctx.beginPath();
            ctx.ellipse(12, -28, 7, 14, 0.15, 0, Math.PI * 2);
            ctx.fill();

            // Grain kernel texture lines
            ctx.strokeStyle = "#B45309";
            ctx.lineWidth = 1;
            [-12, 0, 12].forEach((gx, gi) => {
              const gy = gi === 1 ? -38 : -28;
              for (let k = -8; k < 10; k += 4) {
                ctx.beginPath();
                ctx.moveTo(gx - 4, gy + k);
                ctx.lineTo(gx + 4, gy + k);
                ctx.stroke();
              }
            });

            // Awns (whiskers at top)
            ctx.strokeStyle = "#D97706";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-12, -42); ctx.lineTo(-16, -52);
            ctx.moveTo(-10, -41); ctx.lineTo(-8, -50);
            ctx.moveTo(0, -54); ctx.lineTo(-3, -62);
            ctx.moveTo(2, -53); ctx.lineTo(5, -61);
            ctx.moveTo(12, -42); ctx.lineTo(16, -52);
            ctx.moveTo(10, -41); ctx.lineTo(8, -50);
            ctx.stroke();

            // Red twine tie around the bundle
            ctx.fillStyle = "#DC2626";
            ctx.beginPath();
            ctx.roundRect(-16, 15, 32, 6, 3);
            ctx.fill();
            // Twine knot
            ctx.beginPath();
            ctx.arc(0, 18, 4, 0, Math.PI * 2);
            ctx.fill();

          } else if (item.subType === "tomato") {
            // ── LARGE TOMATO: Round, glossy, with stem and leaves ──

            // Main body - large glossy red sphere
            const tomGrad = ctx.createRadialGradient(-8, -18, 5, 0, -8, 30);
            tomGrad.addColorStop(0, "#FCA5A5");
            tomGrad.addColorStop(0.4, "#EF4444");
            tomGrad.addColorStop(1, "#991B1B");
            ctx.fillStyle = tomGrad;
            ctx.beginPath();
            ctx.arc(0, -8, 28, 0, Math.PI * 2);
            ctx.fill();

            // Tomato segment lines (subtle)
            ctx.strokeStyle = "rgba(153, 27, 27, 0.3)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, -36); ctx.quadraticCurveTo(-5, -8, 0, 20);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-10, -34); ctx.quadraticCurveTo(-20, -8, -10, 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(10, -34); ctx.quadraticCurveTo(20, -8, 10, 18);
            ctx.stroke();

            // Specular highlight (big shiny spot)
            const shineGrad = ctx.createRadialGradient(-10, -20, 2, -8, -16, 14);
            shineGrad.addColorStop(0, "rgba(255, 255, 255, 0.7)");
            shineGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
            ctx.fillStyle = shineGrad;
            ctx.beginPath();
            ctx.ellipse(-10, -20, 12, 8, -0.3, 0, Math.PI * 2);
            ctx.fill();

            // Small secondary shine
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.beginPath();
            ctx.arc(12, -2, 4, 0, Math.PI * 2);
            ctx.fill();

            // Green stem
            ctx.fillStyle = "#15803D";
            ctx.beginPath();
            ctx.roundRect(-3, -42, 6, 10, 2);
            ctx.fill();

            // Star-shaped calyx (5 green leaves around stem)
            ctx.fillStyle = "#22C55E";
            for (let a = 0; a < 5; a++) {
              ctx.save();
              ctx.translate(0, -35);
              ctx.rotate((a * Math.PI * 2) / 5 - Math.PI / 2);
              ctx.beginPath();
              ctx.ellipse(10, 0, 10, 4, 0, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }
          ctx.restore();
        }
      }

      // Freeze frame countdown
      if (freezeTimer > 0) {
        freezeTimer--;
        if (freezeTimer === 0) {
          setGameState("gameover");
          if (currentWeight > highScore) {
            setHighScore(currentWeight);
            localStorage.setItem("sourcetrace_tractor_weight_highscore", currentWeight.toString());
          }
        }
      }

      // ── DRAW 3D BEHIND-VIEW CLAY TRACTOR (Gameplay Focus, 2.5x larger!) ──
      const tractorBounce = (gameState === "playing" && freezeTimer === 0) ? tractor.vibration : 0;
      const curY = tractor.y - tractor.yOffset + tractorBounce;

      ctx.save();
      // Translate to bottom center for 뒤-view drawing
      ctx.translate(tractor.x, curY);

      // Tyre Mudguards (Forest Green rounded clay)
      ctx.fillStyle = "#0B3D2E";
      ctx.beginPath();
      ctx.roundRect(-102, -26, 32, 24, 6); // left fender
      ctx.roundRect(70, -26, 32, 24, 6);   // right fender
      ctx.fill();

      // Huge Clay tyres on left and right sides
      ctx.fillStyle = "#1F2937";
      ctx.beginPath();
      ctx.roundRect(-100, -4, 26, 62, 8); // left wheel
      ctx.roundRect(74, -4, 26, 62, 8);   // right wheel
      ctx.fill();
      
      // Wheel rim yellow hub caps
      ctx.fillStyle = "#FBBF24";
      ctx.beginPath();
      ctx.arc(-87, 26, 14, 0, Math.PI * 2);
      ctx.arc(87, 26, 14, 0, Math.PI * 2);
      ctx.fill();

      // Center chassis engine block
      let clayChassis = ctx.createLinearGradient(0, -10, 0, 40);
      clayChassis.addColorStop(0, "#1F7A53");
      clayChassis.addColorStop(1, "#0B3D2E");
      ctx.fillStyle = clayChassis;
      ctx.beginPath();
      ctx.roundRect(-66, -10, 132, 50, 10);
      ctx.fill();

      // Premium rounded cabin cabin back view
      ctx.fillStyle = clayChassis;
      ctx.beginPath();
      ctx.roundRect(-46, -82, 92, 78, [18, 18, 5, 5]);
      ctx.fill();

      // Big cabin rear glass window
      let windowGrad = ctx.createLinearGradient(-34, -70, 34, -28);
      windowGrad.addColorStop(0, "#E0F2FE");
      windowGrad.addColorStop(1, "#86EFAC");
      ctx.fillStyle = windowGrad;
      ctx.beginPath();
      ctx.roundRect(-34, -70, 68, 42, 8);
      ctx.fill();

      // Window gloss line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-22, -64);
      ctx.lineTo(12, -32);
      ctx.stroke();

      // Exhaust pipe on the left side
      ctx.fillStyle = "#4B5563";
      ctx.fillRect(-58, -70, 7, 62);
      ctx.fillStyle = "#1F2937";
      ctx.fillRect(-60, -76, 11, 6);

      ctx.restore(); // restore behind-view translation

      // ── DRAW PARTICLES ──
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
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

      ctx.restore(); // restore camera shake
      animId = requestAnimationFrame(render);
    };

    render();

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

  // Convert kg into Tons / kg readability
  const formattedWeight = harvestWeight >= 1000 
    ? `${(harvestWeight / 1000).toFixed(1)} Tons` 
    : `${harvestWeight} kg`;

  return (
    <div 
      className="fixed inset-0 z-[9999] overflow-hidden select-none bg-[#F4FAF6]"
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
          HUD — Game owns the full screen, no navbar to avoid
          ═══════════════════════════════════════ */}
      
      {/* Top-Left: Error context */}
      <div className="absolute top-6 left-6 sm:left-10 z-10 bg-[#0B3D2E] border-2 border-white/20 px-7 py-5 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] max-w-md text-left pointer-events-none select-none">
        <span className="font-black text-5xl sm:text-6xl uppercase tracking-widest text-white block leading-none drop-shadow-lg">
          {headingInfo.title}
        </span>
        <h1 className="font-black text-base sm:text-lg tracking-wider uppercase text-[#86EFAC] mt-2 leading-snug">
          {headingInfo.subtitle}
        </h1>
        <p className="text-sm text-white/80 mt-1.5 font-medium leading-relaxed">
          {headingInfo.desc}
        </p>
      </div>

      {/* Top-Right: Harvest score */}
      <div className="absolute top-6 right-6 sm:right-10 z-10 pointer-events-none bg-[#0B3D2E] border-2 border-white/20 px-7 py-5 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] text-right">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#86EFAC] block mb-1">🌾 Harvest</span>
        <span className="font-black text-4xl sm:text-5xl text-white tracking-tight leading-none drop-shadow-lg">{formattedWeight}</span>
      </div>

      {/* Center-Screen Floating Indicators */}
      {floatingText.map((item) => (
        <div 
          key={item.id}
          style={{ left: item.x, top: item.y }}
          className="absolute z-20 -translate-x-1/2 font-black text-base uppercase text-[#10B981] bg-white border border-[#0B3D2E]/10 py-1.5 px-3.5 rounded-full shadow-md animate-ping"
        >
          {item.text}
        </div>
      ))}

      {/* Bottom-Center: Animated floating pill button */}
      {gameState === "playing" && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-[#0B3D2E] text-white font-extrabold text-xs tracking-widest uppercase px-6 py-3 rounded-full border border-white/10 shadow-lg backdrop-blur-md animate-bounce">
          Press Space or Tap to Jump
        </div>
      )}

      {/* Dynamic Achievement alerts */}
      {achievement && (
        <div className="absolute top-44 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-[#0B3D2E]/90 text-white font-extrabold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full border border-[#53D769]/30 shadow-lg backdrop-blur-md transition-all duration-300">
          ✔ {achievement}
        </div>
      )}

      {/* GAME START OVERLAY (Glassmorphic) */}
      {gameState === "idle" && (
        <div className="absolute inset-0 bg-[#0B3D2E]/15 backdrop-blur-[3px] flex items-center justify-center z-30">
          <div className="bg-white/95 border border-white p-8 sm:p-10 rounded-[32px] shadow-[0_16px_40px_rgba(0,77,38,0.06)] backdrop-blur-lg max-w-sm text-center relative z-40">
            <span className="text-[#1F7A53] text-xs font-bold tracking-[0.2em] uppercase mb-2 block">SourceTrace</span>
            <h2 className="text-2xl font-black text-[#0B3D2E] tracking-tight mb-3">Tractor Delivery Run</h2>
            <p className="text-xs text-[#1F5946] font-semibold leading-relaxed mb-6">
              Navigate the farm road. Jump over spreadsheets, mud, and fences to collect the harvest and digitize the first mile!
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
              <span className="font-black text-[#0B3D2E] text-base">{formattedWeight}</span>
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
