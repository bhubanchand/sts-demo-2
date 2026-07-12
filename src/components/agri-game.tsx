"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Play, RotateCcw, Home } from "lucide-react";

interface AgriGameProps {
  mode: "404" | "offline" | "500";
}

interface RoadElement {
  z: number; // 0 (horizon) to 1 (screen bottom)
  type: "obstacle" | "crop" | "scenery";
  subType: string;
  xOffset: number; // -1 (left road edge) to +1 (right road edge)
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

    // Horizon Y coordinate (Road starts here)
    let horizonY = height * 0.45;
    let groundY = height;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      horizonY = height * 0.45;
      groundY = height;
    };
    window.addEventListener("resize", handleResize);

    // Game variables
    let gameSpeed = 0.009; // Scroll increment for Z axis
    let distanceTraveled = 0;
    let currentWeight = 0;
    let lastAchievementDistance = 0;
    let cameraShake = 0;
    let cycleTimer = 0;
    let activeWeather: "sun" | "sunset" | "night" | "rain" = "sun";

    // 3D Tractor properties (Positioned bottom center looking down the road)
    const tractor = {
      x: width / 2,
      y: height * 0.88,
      width: 140, // Large, detailed 3D clay size
      height: 110,
      yOffset: 0, // Vertical offset from jumping
      vy: 0,
      gravity: 0.7,
      jumpStrength: -15,
      isJumping: false,
      vibration: 0,
      wheelRot: 0
    };

    // Game elements moving down the road
    let roadItems: RoadElement[] = [];
    let particles: Particle[] = [];
    let roadDashes: number[] = [0, 0.25, 0.5, 0.75]; // For road lines motion

    // Background decoration items
    const clouds = [
      { x: width * 0.15, y: height * 0.12, size: 60 },
      { x: width * 0.55, y: height * 0.08, size: 85 },
      { x: width * 0.85, y: height * 0.16, size: 50 }
    ];

    // Distant mountain coordinates (Muted, de-saturated)
    const mountains = [
      { x: width * 0.1, w: width * 0.4, h: height * 0.18 },
      { x: width * 0.45, w: width * 0.5, h: height * 0.22 },
      { x: width * 0.75, w: width * 0.35, h: height * 0.15 }
    ];

    // Scenery assets on the sides of the road (Trees, windmills, sheds)
    interface SceneryItem {
      z: number;
      side: "left" | "right";
      type: "tree" | "windmill" | "silo" | "building";
      rot: number;
    }
    let sceneryItems: SceneryItem[] = [
      { z: 0.1, side: "left", type: "tree", rot: 0 },
      { z: 0.3, side: "right", type: "windmill", rot: 0 },
      { z: 0.5, side: "left", type: "silo", rot: 0 },
      { z: 0.7, side: "right", type: "tree", rot: 0 },
      { z: 0.9, side: "left", type: "windmill", rot: 1 }
    ];

    // Spawning controls
    let spawnTimer = 0;

    const triggerJump = () => {
      if (gameState === "playing" && !tractor.isJumping) {
        tractor.vy = tractor.jumpStrength;
        tractor.isJumping = true;
      }
    };

    const spawnSparks = (x: number, y: number, color: string) => {
      for (let i = 0; i < 8; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          size: 2 + Math.random() * 3,
          color,
          alpha: 1.0,
          life: 0,
          maxLife: 20 + Math.random() * 15
        });
      }
    };

    const spawnLandingDust = () => {
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: width / 2 + (Math.random() - 0.5) * 60,
          y: tractor.y + 10,
          vx: (Math.random() - 0.5) * 6,
          vy: -1 - Math.random() * 3,
          size: 3 + Math.random() * 6,
          color: "rgba(167, 133, 100, 0.4)",
          alpha: 0.8,
          life: 0,
          maxLife: 25 + Math.random() * 15
        });
      }
      cameraShake = 8; // landing camera shake
    };

    const triggerFloatingText = (text: string) => {
      const id = Date.now() + Math.random();
      setFloatingText((prev) => [...prev, { text, x: width / 2, y: tractor.y - 60, id }]);
      setTimeout(() => {
        setFloatingText((prev) => prev.filter((t) => t.id !== id));
      }, 1500);
    };

    const restartGame = () => {
      roadItems = [];
      particles = [];
      distanceTraveled = 0;
      currentWeight = 0;
      setHarvestWeight(0);
      gameSpeed = 0.009;
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

      // ── TIME/WEATHER CYCLES ──
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

      // Moon / Sun
      if (activeWeather === "night") {
        ctx.fillStyle = "rgba(254, 240, 138, 0.4)";
        ctx.beginPath();
        ctx.arc(width - 120, 70, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = skyGrad;
        ctx.beginPath();
        ctx.arc(width - 130, 65, 20, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── PARALLAX LAYER 1: Distant Mountains ──
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

      // ── ROAD RENDERING (VANISHING PERSPECTIVE ROAD) ──
      // Trapezoid road geometry
      const roadStartWidth = 24; // Width at vanishing point
      const roadEndWidth = width * 0.72; // Width at bottom of screen
      
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
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(leftHorizonX, horizonY);
      ctx.lineTo(leftBottomX, height);
      ctx.moveTo(rightHorizonX, horizonY);
      ctx.lineTo(rightBottomX, height);
      ctx.stroke();

      // Road dashes / dirt ridges (pseudo-3D motion lines)
      if (gameState === "playing") {
        for (let i = 0; i < roadDashes.length; i++) {
          roadDashes[i] += gameSpeed * 1.5;
          if (roadDashes[i] >= 1.0) roadDashes[i] = 0;
        }
      }
      ctx.strokeStyle = activeWeather === "night" ? "rgba(11,61,46,0.2)" : "rgba(31,89,70,0.08)";
      roadDashes.forEach((z) => {
        // Perspective Y
        const ry = horizonY + z * (height - horizonY);
        // Perspective Width
        const rw = roadStartWidth * (1 - z) + roadEndWidth * z;
        ctx.lineWidth = 1 + z * 8;
        ctx.beginPath();
        ctx.moveTo(width / 2 - rw / 2, ry);
        ctx.lineTo(width / 2 + rw / 2, ry);
        ctx.stroke();
      });

      // ── SCENERY ASSETS (Parallax trees, windmills scrolling past the road sides) ──
      sceneryItems.forEach((item) => {
        if (gameState === "playing") {
          item.z += gameSpeed;
          if (item.z >= 1.0) {
            item.z = 0.05;
            item.side = Math.random() > 0.5 ? "left" : "right";
            item.type = Math.random() > 0.5 ? "windmill" : "tree";
          }
        }

        const scale = Math.pow(item.z, 2); // Exponential scaling for realistic 3D appearance
        const ry = horizonY + item.z * (height - horizonY);
        const rw = roadStartWidth * (1 - item.z) + roadEndWidth * item.z;
        
        // Offset away from the road edges based on scale
        const sideMultiplier = item.side === "left" ? -1 : 1;
        const rx = width / 2 + sideMultiplier * (rw / 2 + 50 * scale * (width * 0.002));

        ctx.save();
        ctx.translate(rx, ry);
        ctx.scale(scale * 1.5, scale * 1.5);

        // Muted de-saturated silhouettes of scenery
        ctx.fillStyle = activeWeather === "night" ? "rgba(30, 41, 59, 0.12)" : "rgba(120, 155, 133, 0.25)";
        if (item.type === "tree") {
          // Rounded clay-like pine tree shape
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
          
          // Trunk
          ctx.fillRect(-2.5, 5, 5, 8);
        } else if (item.type === "windmill") {
          // Windmill
          ctx.fillRect(-2, -35, 4, 35);
          
          item.rot += 0.015;
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

      // ── GAME PLAYPHYSICS & GAMEPLAY SPAWNINGS ──
      if (gameState === "playing") {
        distanceTraveled += 0.25;

        // Spawning timer (Crops and Obstacles)
        spawnTimer++;
        if (spawnTimer > 75) {
          spawnTimer = 0;
          const isCrop = Math.random() > 0.4;
          if (isCrop) {
            const cropTypes = ["wheat", "coffee", "tomato", "cotton"];
            roadItems.push({
              z: 0.05,
              type: "crop",
              subType: cropTypes[Math.floor(Math.random() * cropTypes.length)],
              xOffset: (Math.random() - 0.5) * 0.4, // float near center lane
              collected: false,
              pulse: Math.random() * 5
            });
          } else {
            const obstacleTypes = ["rock", "haybale", "stump", "cow"];
            roadItems.push({
              z: 0.05,
              type: "obstacle",
              subType: obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)],
              xOffset: 0, // Hazards always block the center lane!
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

        tractor.wheelRot += gameSpeed * 8;
        tractor.vibration = Math.sin(Date.now() * 0.08) * 0.8;
      }

      // ── UPDATE & DRAW GAMEPLAY ROAD ITEMS (Obstacles & Crops) ──
      for (let i = roadItems.length - 1; i >= 0; i--) {
        const item = roadItems[i];
        if (gameState === "playing") {
          item.z += gameSpeed;
        }

        const scale = Math.pow(item.z, 2.5); // Fast scale up as it comes near
        const ry = horizonY + item.z * (height - horizonY);
        const rw = roadStartWidth * (1 - item.z) + roadEndWidth * item.z;
        const rx = width / 2 + item.xOffset * scale * (width * 0.25);

        // Remove offscreen
        if (item.z >= 1.05) {
          roadItems.splice(i, 1);
          continue;
        }

        // ── TRACTOR COLLISION CHECK (At Z ≈ 0.82 to 0.90) ──
        if (item.z >= 0.80 && item.z <= 0.90) {
          if (item.type === "obstacle") {
            // Check if jumping (Jumping offset is > height of obstacle)
            const obsHeightMap = { rock: 35, haybale: 45, stump: 38, cow: 55 };
            const obstacleHeight = obsHeightMap[item.subType as keyof typeof obsHeightMap] || 40;
            
            if (tractor.yOffset < obstacleHeight - 10) {
              setGameState("gameover");
              if (currentWeight > highScore) {
                setHighScore(currentWeight);
                localStorage.setItem("sourcetrace_tractor_weight_highscore", currentWeight.toString());
              }
            }
          } else if (item.type === "crop" && !item.collected) {
            item.collected = true;
            const rewardMap = { wheat: 25, coffee: 15, tomato: 35, cotton: 40 };
            const weightReward = rewardMap[item.subType as keyof typeof rewardMap] || 20;
            currentWeight += weightReward;
            setHarvestWeight(currentWeight);
            
            // Spark splash and floating text
            spawnSparks(rx, ry - 30 * scale, item.subType === "wheat" ? "#FBBF24" : item.subType === "coffee" ? "#EF4444" : "#10B981");
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
          ctx.scale(scale * 2.2, scale * 2.2);

          // Ambient drop shadow beneath hazard
          ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
          ctx.beginPath();
          ctx.ellipse(0, 0, 15, 4, 0, 0, Math.PI * 2);
          ctx.fill();

          if (item.subType === "rock") {
            // Faceted Dark Charcoal Matte Rock
            ctx.fillStyle = "#374151";
            ctx.beginPath();
            ctx.moveTo(-12, 0);
            ctx.lineTo(-8, -16);
            ctx.lineTo(6, -14);
            ctx.lineTo(12, 0);
            ctx.closePath();
            ctx.fill();
            
            ctx.fillStyle = "#1F2937"; // Shaded side
            ctx.beginPath();
            ctx.moveTo(-12, 0);
            ctx.lineTo(-8, -16);
            ctx.lineTo(-2, 0);
            ctx.closePath();
            ctx.fill();
          } else if (item.subType === "haybale") {
            // Matte cylindrical straw hay bale
            ctx.fillStyle = "#B45309";
            ctx.beginPath();
            ctx.ellipse(0, -10, 12, 10, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#F59E0B";
            ctx.beginPath();
            ctx.ellipse(0, -10, 10, 8, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = "#78350F";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(0, -10, 5, 0, Math.PI * 1.5);
            ctx.stroke();
          } else if (item.subType === "stump") {
            // Tree Stump
            ctx.fillStyle = "#451A03";
            ctx.fillRect(-8, -15, 16, 15);
            ctx.fillStyle = "#FDBA74"; // wood core top
            ctx.beginPath();
            ctx.ellipse(0, -15, 8, 2.5, 0, 0, Math.PI * 2);
            ctx.fill();
          } else if (item.subType === "cow") {
            // Grounded blocky clay cow shape
            ctx.fillStyle = "#F3F4F6"; // White body
            ctx.beginPath();
            ctx.roundRect(-14, -18, 28, 18, 4);
            ctx.fill();
            // Black patches
            ctx.fillStyle = "#111827";
            ctx.beginPath();
            ctx.arc(-8, -14, 5, 0, Math.PI * 2);
            ctx.arc(4, -12, 4, 0, Math.PI * 2);
            ctx.fill();
            // Head
            ctx.fillStyle = "#F3F4F6";
            ctx.beginPath();
            ctx.roundRect(8, -26, 10, 12, 3);
            ctx.fill();
            // snout
            ctx.fillStyle = "#FCA5A5";
            ctx.fillRect(14, -20, 4, 6);
          }
          ctx.restore();
        } else if (item.type === "crop" && !item.collected) {
          /* ═══════════════════════════════════════
             COLLECTIBLES: BRIGHT, GLOWING, FLOATING CROP ASSETS
             ═══════════════════════════════════════ */
          const hoverOffset = Math.sin(item.pulse) * 5 * scale;
          ctx.save();
          ctx.translate(rx, ry - 35 * scale + hoverOffset);
          ctx.scale(scale * 2.2, scale * 2.2);

          // Glowing Outer Shadow Glow
          ctx.shadowBlur = 15;
          ctx.shadowColor = item.subType === "wheat" ? "#F59E0B" : item.subType === "coffee" ? "#EF4444" : "#10B981";

          if (item.subType === "wheat") {
            // Golden Wheat bundle
            let cropGrad = ctx.createRadialGradient(0, -6, 2, 0, 0, 12);
            cropGrad.addColorStop(0, "#FDE047");
            cropGrad.addColorStop(1, "#CA8A04");
            ctx.fillStyle = cropGrad;
            ctx.beginPath();
            ctx.ellipse(0, 0, 6, 12, 0.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#EF4444"; // red ribbon tie
            ctx.fillRect(-6, 1, 12, 2.5);
          } else if (item.subType === "coffee") {
            // Glossy Coffee Cherries (Clay styled)
            let redGrad = ctx.createRadialGradient(-3, -3, 1, 0, 0, 8);
            redGrad.addColorStop(0, "#FCA5A5");
            redGrad.addColorStop(1, "#B91C1C");
            ctx.fillStyle = redGrad;
            ctx.beginPath();
            ctx.arc(-4, 2, 6, 0, Math.PI * 2);
            ctx.arc(4, 0, 6, 0, Math.PI * 2);
            ctx.fill();
            // Specular highlights
            ctx.fillStyle = "#FFF";
            ctx.beginPath();
            ctx.arc(-5, 0, 1.5, 0, Math.PI * 2);
            ctx.arc(3, -2, 1.5, 0, Math.PI * 2);
            ctx.fill();
          } else if (item.subType === "tomato") {
            // Glossy bright clay Tomato
            let tomGrad = ctx.createRadialGradient(-2, -3, 1, 0, 0, 9);
            tomGrad.addColorStop(0, "#FCA5A5");
            tomGrad.addColorStop(1, "#DC2626");
            ctx.fillStyle = tomGrad;
            ctx.beginPath();
            ctx.arc(0, 0, 9, 0, Math.PI * 2);
            ctx.fill();
            // spec highlight
            ctx.fillStyle = "#FFF";
            ctx.beginPath();
            ctx.arc(-2, -3, 2, 0, Math.PI * 2);
            ctx.fill();
            // green leaf cap
            ctx.fillStyle = "#10B981";
            ctx.beginPath();
            ctx.moveTo(0, -9);
            ctx.lineTo(-4, -12);
            ctx.lineTo(4, -12);
            ctx.closePath();
            ctx.fill();
          } else if (item.subType === "cotton") {
            // Fluffy white Cotton
            ctx.fillStyle = "#FFF";
            ctx.shadowColor = "#D1D5DB";
            ctx.beginPath();
            ctx.arc(-4, 0, 6, 0, Math.PI * 2);
            ctx.arc(4, 0, 6, 0, Math.PI * 2);
            ctx.arc(0, -4, 6, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      }

      // ── DRAW 3D BEHIND-VIEW CLAY TRACTOR (Gameplay Focus) ──
      // Dynamic bouncing offset
      const tractorBounce = gameState === "playing" ? tractor.vibration : 0;
      const curY = tractor.y - tractor.yOffset + tractorBounce;

      ctx.save();
      // Translate to bottom center for 뒤-view drawing
      ctx.translate(tractor.x, curY);

      // Tyre Mudguards (Forest Green rounded clay)
      ctx.fillStyle = "#0B3D2E";
      ctx.beginPath();
      ctx.roundRect(-66, -18, 22, 16, 5); // left fender
      ctx.roundRect(44, -18, 22, 16, 5);  // right fender
      ctx.fill();

      // Huge Clay tyres on left and right sides
      ctx.fillStyle = "#1F2937";
      ctx.beginPath();
      ctx.roundRect(-64, -2, 18, 42, 6); // left wheel
      ctx.roundRect(46, -2, 18, 42, 6);  // right wheel
      ctx.fill();
      
      // Wheel rim yellow circles (spinning wheel lines)
      ctx.fillStyle = "#FBBF24";
      ctx.beginPath();
      ctx.arc(-55, 18, 10, 0, Math.PI * 2);
      ctx.arc(55, 18, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#D97706";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-60, 18); ctx.lineTo(-50, 18);
      ctx.moveTo(50, 18); ctx.lineTo(60, 18);
      ctx.stroke();

      // Center chassis engine block
      let clayChassis = ctx.createLinearGradient(0, -10, 0, 30);
      clayChassis.addColorStop(0, "#1F7A53");
      clayChassis.addColorStop(1, "#0B3D2E");
      ctx.fillStyle = clayChassis;
      ctx.beginPath();
      ctx.roundRect(-42, -6, 84, 34, 8);
      ctx.fill();

      // Premium rounded cabin cabin back view
      ctx.fillStyle = clayChassis;
      ctx.beginPath();
      ctx.roundRect(-30, -56, 60, 52, [12, 12, 4, 4]);
      ctx.fill();

      // Big cabin rear glass window
      let windowGrad = ctx.createLinearGradient(-22, -48, 22, -18);
      windowGrad.addColorStop(0, "#E0F2FE");
      windowGrad.addColorStop(1, "#86EFAC");
      ctx.fillStyle = windowGrad;
      ctx.beginPath();
      ctx.roundRect(-22, -48, 44, 28, 6);
      ctx.fill();

      // Window gloss line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-14, -44);
      ctx.lineTo(8, -22);
      ctx.stroke();

      // Exhaust pipe on the left side blowing smoke circles
      ctx.fillStyle = "#4B5563";
      ctx.fillRect(-38, -48, 5, 42);
      ctx.fillStyle = "#1F2937";
      ctx.fillRect(-39, -52, 7, 4);

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
          HUD UI OVERLAYS (WCAG AA Contrast Compliant)
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
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#1F7A53] block mb-0.5">🌾 Harvest</span>
        {formattedWeight}
      </div>

      {/* Center-Screen Floating Indicators */}
      {floatingText.map((item) => (
        <div 
          key={item.id}
          style={{ left: item.x, top: item.y }}
          className="absolute z-20 -translate-x-1/2 font-black text-sm uppercase text-[#10B981] bg-white border border-[#0B3D2E]/10 py-1.5 px-3.5 rounded-full shadow-md animate-ping"
        >
          {item.text}
        </div>
      ))}

      {/* Bottom-Center: Animated floating pill button */}
      {gameState === "playing" && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-[#0B3D2E] text-white font-extrabold text-xs tracking-widest uppercase px-6 py-3 rounded-full border border-white/10 shadow-lg backdrop-blur-md animate-bounce">
          Press Space or Tap to Jump
        </div>
      )}

      {/* Dynamic Achievement alerts */}
      {achievement && (
        <div className="absolute top-36 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-[#0B3D2E]/90 text-white font-extrabold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full border border-[#53D769]/30 shadow-lg backdrop-blur-md transition-all duration-300">
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
