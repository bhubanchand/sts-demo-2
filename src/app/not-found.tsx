"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Play, RotateCcw, ArrowLeft, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Load high score from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sourcetrace_tractor_highscore");
      if (saved) setHighScore(parseInt(saved, 10));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let scoreVal = 0;
    
    // Tractor attributes
    const tractor = {
      x: 50,
      y: 115,
      width: 44,
      height: 35,
      vy: 0,
      gravity: 0.6,
      jumpStrength: -10.5,
      isJumping: false,
      wheelAngle: 0
    };

    // Obstacle parameters
    interface Obstacle {
      x: number;
      width: number;
      height: number;
      type: "spreadsheet" | "tape";
      passed: boolean;
    }
    
    let obstacles: Obstacle[] = [];
    let obstacleTimer = 0;
    let gameSpeed = 4.2;

    // Background crop rows moving effect
    let cropOffset = 0;

    // Ground Y coordinate
    const groundY = 150;

    // Key handlers
    const handleJump = () => {
      if (gameState === "playing" && !tractor.isJumping) {
        tractor.vy = tractor.jumpStrength;
        tractor.isJumping = true;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (gameState === "idle") {
          startGame();
        } else if (gameState === "gameover") {
          startGame();
        } else {
          handleJump();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Main Game Loop
    const updateGame = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── DRAW SKY & CLOUDS ──
      ctx.fillStyle = "#F4FAF6";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "rgba(16, 185, 129, 0.05)";
      ctx.beginPath();
      ctx.arc(100, 40, 20, 0, Math.PI * 2);
      ctx.arc(120, 35, 25, 0, Math.PI * 2);
      ctx.arc(145, 40, 20, 0, Math.PI * 2);
      ctx.fill();

      // ── DRAW GROUND & CROP ROWS ──
      ctx.fillStyle = "#E2EFE7";
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
      
      // Moving crop row lines
      ctx.strokeStyle = "rgba(16, 185, 129, 0.25)";
      ctx.lineWidth = 2;
      cropOffset -= gameSpeed;
      if (cropOffset <= -40) cropOffset = 0;
      
      for (let i = cropOffset; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, groundY + 5);
        ctx.lineTo(i - 10, canvas.height);
        ctx.stroke();
      }

      // ── TRACTOR PHYSICS & DRAW ──
      if (gameState === "playing") {
        tractor.vy += tractor.gravity;
        tractor.y += tractor.vy;

        // Ground collision
        if (tractor.y >= groundY - tractor.height) {
          tractor.y = groundY - tractor.height;
          tractor.vy = 0;
          tractor.isJumping = false;
        }

        // Spin wheels
        tractor.wheelAngle += gameSpeed * 0.05;
      }

      // Draw Tractor Body (Forest Green)
      ctx.fillStyle = "#0B3D2E";
      ctx.fillRect(tractor.x + 10, tractor.y + 10, 30, 18); // Main body
      ctx.fillRect(tractor.x + 22, tractor.y, 16, 12);    // Cabin top
      
      // Cabin Window
      ctx.fillStyle = "#86EFAC";
      ctx.fillRect(tractor.x + 25, tractor.y + 2, 10, 8);
      
      // Engine Hood / Nose
      ctx.fillStyle = "#1F7A53";
      ctx.fillRect(tractor.x + 5, tractor.y + 14, 8, 14);

      // Smoking Exhaust Pipe
      ctx.strokeStyle = "#555";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tractor.x + 8, tractor.y + 14);
      ctx.lineTo(tractor.x + 8, tractor.y + 4);
      ctx.lineTo(tractor.x + 12, tractor.y + 4);
      ctx.stroke();

      // Exhaust puffs
      if (gameState === "playing" && Math.random() < 0.15) {
        ctx.fillStyle = "rgba(120, 120, 120, 0.4)";
        ctx.beginPath();
        ctx.arc(tractor.x + 14, tractor.y + 1 - (Math.random() * 5), 3 + Math.random() * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Wheels (Back and Front)
      ctx.save();
      // Back Wheel (Large)
      ctx.translate(tractor.x + 32, tractor.y + 26);
      ctx.rotate(tractor.wheelAngle);
      ctx.fillStyle = "#1F5946";
      ctx.beginPath();
      ctx.arc(0, 0, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-9, 0); ctx.lineTo(9, 0);
      ctx.moveTo(0, -9); ctx.lineTo(0, 9);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      // Front Wheel (Small)
      ctx.translate(tractor.x + 10, tractor.y + 29);
      ctx.rotate(tractor.wheelAngle * 1.3);
      ctx.fillStyle = "#1F5946";
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-6, 0); ctx.lineTo(6, 0);
      ctx.moveTo(0, -6); ctx.lineTo(0, 6);
      ctx.stroke();
      ctx.restore();

      // ── OBSTACLES MANAGEMENT ──
      if (gameState === "playing") {
        obstacleTimer++;
        if (obstacleTimer > 100 + Math.random() * 60) {
          obstacleTimer = 0;
          const type = Math.random() > 0.5 ? "spreadsheet" : "tape";
          obstacles.push({
            x: canvas.width,
            width: type === "spreadsheet" ? 22 : 16,
            height: type === "spreadsheet" ? 25 : 32,
            type,
            passed: false
          });
        }
      }

      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        if (gameState === "playing") {
          obs.x -= gameSpeed;
        }

        // Draw Obstacles
        if (obs.type === "spreadsheet") {
          // Manual Spreadsheet Pile obstacle
          ctx.fillStyle = "#FFF";
          ctx.strokeStyle = "#D1D5DB";
          ctx.lineWidth = 1;
          ctx.fillRect(obs.x, groundY - obs.height, obs.width, obs.height);
          ctx.strokeRect(obs.x, groundY - obs.height, obs.width, obs.height);
          
          // Draw spreadsheet grid lines
          ctx.strokeStyle = "rgba(31, 89, 70, 0.15)";
          ctx.beginPath();
          ctx.moveTo(obs.x + 5, groundY - obs.height + 5);
          ctx.lineTo(obs.x + obs.width - 5, groundY - obs.height + 5);
          ctx.moveTo(obs.x + 5, groundY - obs.height + 12);
          ctx.lineTo(obs.x + obs.width - 5, groundY - obs.height + 12);
          ctx.moveTo(obs.x + 5, groundY - obs.height + 18);
          ctx.lineTo(obs.x + obs.width - 5, groundY - obs.height + 18);
          ctx.stroke();
          
          // Small spreadsheet red grid indicator
          ctx.fillStyle = "rgba(239, 68, 68, 0.6)";
          ctx.fillRect(obs.x + obs.width - 6, groundY - obs.height + 3, 3, 3);
        } else {
          // Compliance Red Tape hurdle obstacle
          ctx.fillStyle = "rgba(220, 38, 38, 0.85)"; // Bold Red Tape
          ctx.fillRect(obs.x, groundY - obs.height, obs.width, obs.height);
          
          // White warning stripe
          ctx.fillStyle = "#FFF";
          ctx.fillRect(obs.x + 4, groundY - obs.height + 5, 8, obs.height - 10);
        }

        // Collision Check
        if (
          tractor.x < obs.x + obs.width &&
          tractor.x + tractor.width > obs.x &&
          tractor.y < groundY - obs.height + obs.height &&
          tractor.y + tractor.height > groundY - obs.height
        ) {
          // COLLISION DETECTED
          setGameState("gameover");
          if (scoreVal > highScore) {
            setHighScore(scoreVal);
            localStorage.setItem("sourcetrace_tractor_highscore", scoreVal.toString());
          }
        }

        // Update score
        if (gameState === "playing" && !obs.passed && obs.x + obs.width < tractor.x) {
          obs.passed = true;
          scoreVal += 10;
          setScore(scoreVal);
          // Increase speed slightly
          gameSpeed += 0.15;
        }

        // Remove offscreen obstacles
        if (obs.x < -40) {
          obstacles.splice(i, 1);
        }
      }

      // Keep animation looping
      if (gameState === "playing") {
        animationFrameId = requestAnimationFrame(updateGame);
      }
    };

    if (gameState === "playing") {
      updateGame();
    } else {
      // Draw static screen state
      ctx.fillStyle = "#F4FAF6";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Ground
      ctx.fillStyle = "#E2EFE7";
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
      
      // Static tractor
      ctx.fillStyle = "#0B3D2E";
      ctx.fillRect(tractor.x + 10, tractor.y + 10, 30, 18);
      ctx.fillRect(tractor.x + 22, tractor.y, 16, 12);
      ctx.fillStyle = "#86EFAC";
      ctx.fillRect(tractor.x + 25, tractor.y + 2, 10, 8);
      ctx.fillStyle = "#1F7A53";
      ctx.fillRect(tractor.x + 5, tractor.y + 14, 8, 14);
      ctx.fillStyle = "#1F5946";
      
      ctx.beginPath();
      ctx.arc(tractor.x + 32, tractor.y + 26, 9, 0, Math.PI * 2);
      ctx.arc(tractor.x + 10, tractor.y + 29, 6, 0, Math.PI * 2);
      ctx.fill();

      // Exhaust pipe
      ctx.strokeStyle = "#555";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tractor.x + 8, tractor.y + 14);
      ctx.lineTo(tractor.x + 8, tractor.y + 4);
      ctx.lineTo(tractor.x + 12, tractor.y + 4);
      ctx.stroke();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setGameState("playing");
  };

  return (
    <main className="min-h-screen pt-32 px-4 sm:px-8 bg-[#F4FAF6] flex items-center justify-center select-none pb-24">
      <div className="max-w-xl text-center">
        <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block text-sm">Error 404</span>
        <h1 className="text-4xl sm:text-6xl font-black mb-6 text-[#0B3D2E] tracking-tight">Content Missing</h1>
        <p className="text-[#1F5946] text-base leading-relaxed mb-8 font-semibold">
          Our developers are working their best to fix this or give you the best possible experience. Please go to the homepage and try again later, or help our tractor clear spreadsheets in the meantime!
        </p>

        {/* ── TRACTOR RUN MINIGAME ── */}
        <div className="bg-white p-4 sm:p-6 rounded-[32px] border border-[#0B3D2E]/8 shadow-[0_12px_40px_rgba(0,77,38,0.02)] text-left mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-[#0B3D2E]">
              <Gamepad2 className="w-5 h-5 text-[#1F7A53]" />
              <span className="font-extrabold text-sm uppercase tracking-wider">Tractor Run</span>
            </div>
            <div className="flex gap-6 text-xs text-[#1F5946] font-bold">
              <div>Hectares Mapped: <span className="text-[#0B3D2E] font-black">{score}</span></div>
              <div>Record: <span className="text-[#0B3D2E] font-black">{highScore}</span></div>
            </div>
          </div>

          {/* Game Screen Canvas */}
          <div className="relative w-full flex items-center justify-center bg-[#F4FAF6] rounded-xl overflow-hidden border border-[#0B3D2E]/8">
            <canvas 
              ref={canvasRef} 
              width={600} 
              height={180}
              className="w-full h-auto max-w-[600px] block cursor-pointer"
              onClick={startGame}
            />

            {/* Idle Screen Overlay */}
            {gameState === "idle" && (
              <div className="absolute inset-0 bg-[#0B3D2E]/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4">
                <p className="text-white font-extrabold text-sm uppercase tracking-widest mb-3">Tractor Supply Dash</p>
                <p className="text-emerald-100 text-xs mb-4 max-w-xs font-semibold">
                  Press Spacebar or Click to jump over spreadsheets & red tapes.
                </p>
                <Button 
                  onClick={startGame}
                  className="bg-[#53D769] hover:bg-white text-[#0B3D2E] font-bold rounded-full px-6 flex items-center gap-2 text-xs"
                >
                  <Play className="w-4 h-4 fill-current" /> Start Game
                </Button>
              </div>
            )}

            {/* Game Over Screen Overlay */}
            {gameState === "gameover" && (
              <div className="absolute inset-0 bg-[#D13C3C]/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4">
                <p className="text-white font-extrabold text-sm uppercase tracking-widest mb-2">Supply Chain Breakdown!</p>
                <p className="text-red-100 text-xs mb-4 max-w-xs font-semibold">
                  Manual spreadsheets or red tape stalled the first mile.
                </p>
                <Button 
                  onClick={startGame}
                  className="bg-white hover:bg-emerald-50 text-[#0B3D2E] font-bold rounded-full px-6 flex items-center gap-2 text-xs"
                >
                  <RotateCcw className="w-4 h-4" /> Restart
                </Button>
              </div>
            )}
          </div>

          <p className="text-[10px] text-gray-400 mt-3 text-center select-none">
            Hint: Spacebar or Tap Jump. Avoid spreadsheets. Let&apos;s digitize the first mile!
          </p>
        </div>

        <Link href="/">
          <Button className="rounded-full bg-[#0B3D2E] hover:bg-[#125c44] text-white font-bold px-8 py-5 flex items-center gap-2 mx-auto">
            <ArrowLeft className="w-4 h-4" /> Return Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
