import React from "react";
import { motion } from "motion/react";

interface DeveloperIllustrationProps {
  isLight: boolean;
  isFacingLeft?: boolean;
  isLogin?: boolean;
}

export default function DeveloperIllustration({ isLight, isFacingLeft = false, isLogin = true }: DeveloperIllustrationProps) {
  // Chair horizontal translation based on login state
  const chairX = isLogin ? 0 : -55;
  // Wheel rotation calculation (approx 360 degrees rotation for a 55px translation)
  const wheelRotation = isLogin ? 0 : -360;

  return (
    <div className="w-full max-w-[400px] mx-auto aspect-square relative flex items-center justify-center p-4">
      {/* Decorative ambient background blur behind the cartoon */}
      <div className="absolute inset-0 bg-gradient-to-tr from-app-accent/10 to-app-pink/10 rounded-full blur-2xl animate-pulse" />

      <svg
        id="dev-cartoon-svg"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 filter drop-shadow-2xl transition-all duration-300"
      >
        <defs>
          {/* Gradients mapping to dynamic CSS variables for reactive lighting! */}
          <linearGradient id="monitor-glow" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="var(--theme-accent-primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--theme-accent-secondary)" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="chair-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--theme-card)" />
            <stop offset="100%" stopColor="var(--theme-panel)" />
          </linearGradient>

          <linearGradient id="screen-glare" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--theme-accent-primary)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--theme-accent-secondary)" stopOpacity="0.02" />
          </linearGradient>

          <radialGradient id="ambient-bulb" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--theme-accent-secondary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--theme-accent-secondary)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. ROOM/BACKGROUND ELEMENTS (Stays stable as scene anchor) */}
        {/* Abstract floating database nodes */}
        <g className="opacity-40">
          <circle cx="80" cy="80" r="4" fill="var(--theme-accent-primary)" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="80" cy="80" r="4" fill="var(--theme-accent-primary)" />
          <line x1="80" y1="80" x2="130" y2="120" stroke="var(--theme-border)" strokeWidth="1" strokeDasharray="3 3" />
          
          <circle cx="430" cy="110" r="6" fill="var(--theme-accent-secondary)" />
          <line x1="430" y1="110" x2="380" y2="150" stroke="var(--theme-border)" strokeWidth="1" strokeDasharray="3 3" />
        </g>

        {/* Outer glowing network waves */}
        <path
          d="M 50,420 A 250,250 0 0,1 450,420"
          stroke="var(--theme-border)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="opacity-30"
        />
        <path
          d="M 90,420 A 210,210 0 0,1 410,420"
          stroke="var(--theme-accent-primary)"
          strokeWidth="1"
          strokeOpacity="0.25"
          className="opacity-50"
        />

        {/* Code loop floating abstract decoration */}
        <text x="310" y="150" fill="var(--theme-accent-primary)" fontSize="10" fontFamily="monospace" opacity="0.3" fontWeight="bold">{"{ smartFix: true }"}</text>
        <text x="70" y="270" fill="var(--theme-accent-secondary)" fontSize="11" fontFamily="monospace" opacity="0.25">{"const app = connect()"}</text>

        {/* 2. MAIN SCENE GROUP - Keeps orientation fixed to screen for realistic wheel rolling! */}
        <g 
          id="illustration-workspace" 
          className="transition-transform duration-500"
          style={isFacingLeft ? { transform: "scaleX(-1)", transformOrigin: "250px 250px" } : undefined}
        >
          
          {/* THE OFFICE DESK */}
          {/* Desk top (at y=360) */}
          <rect x="180" y="360" width="280" height="12" rx="6" fill="var(--theme-card)" stroke="var(--theme-border)" strokeWidth="1.5" />
          {/* Desk legs */}
          <path d="M220 372 L200 470" stroke="var(--theme-border)" strokeWidth="4" strokeLinecap="round" />
          <path d="M420 372 L440 470" stroke="var(--theme-border)" strokeWidth="4" strokeLinecap="round" />
          {/* Desk crossbar support */}
          <line x1="210" y1="420" x2="430" y2="420" stroke="var(--theme-border)" strokeWidth="2" opacity="0.4" />

          {/* COMPUTER HARDWARE (on the Desk) */}
          {/* Monitor Base and Stem on desk top */}
          <rect x="345" y="354" width="40" height="6" rx="2" fill="var(--theme-border)" />
          <path d="M365 354 L365 290" stroke="var(--theme-border)" strokeWidth="8" strokeLinecap="round" />
          {/* Monitor Frame */}
          <rect x="300" y="180" width="130" height="100" rx="8" fill="var(--theme-panel)" stroke="var(--theme-border)" strokeWidth="2" />
          {/* Screen Bezel shadow */}
          <rect x="305" y="185" width="120" height="90" rx="4" fill="var(--theme-bg)" />
          {/* Screen Display Content (Terminal lines looking like telemetry dashboard) */}
          <g strokeLinecap="round">
            {/* Telemetry charts on cartoon monitor */}
            <rect x="312" y="192" width="106" height="50" rx="3" fill="#000000" fillOpacity="0.25" />
            {/* Cyan chart peaks */}
            <path d="M315 225 L330 205 L345 220 L360 200 L375 215 L390 195 L410 220" stroke="var(--theme-accent-primary)" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
            <path d="M315 228 L330 215 L345 223 L360 208 L375 220 L390 205 L410 225" stroke="var(--theme-accent-secondary)" strokeWidth="1" strokeLinejoin="round" fill="none" opacity="0.7" />
            {/* Small dashboard meters */}
            <circle cx="325" cy="256" r="6" stroke="var(--theme-accent-primary)" strokeWidth="1.5" />
            <circle cx="345" cy="256" r="6" stroke="var(--theme-border)" strokeWidth="1.5" />
            <line x1="362" y1="252" x2="408" y2="252" stroke="var(--theme-text-secondary)" strokeWidth="2" />
            <line x1="362" y1="260" x2="395" y2="260" stroke="var(--theme-text-secondary)" strokeWidth="2" opacity="0.5" />
          </g>
          {/* Screen Gloss Glare */}
          <path d="M410 186 L310 274" stroke="url(#screen-glare)" strokeWidth="12" strokeLinecap="round" />

          {/* Keyboard on desk */}
          <rect x="220" y="350" width="65" height="10" rx="2" fill="var(--theme-panel)" stroke="var(--theme-border)" strokeWidth="1" />
          <line x1="225" y1="355" x2="280" y2="355" stroke="var(--theme-accent-primary)" strokeWidth="2" strokeDasharray="1 1.5" />
          {/* Mouse */}
          <rect x="295" y="352" width="10" height="7" rx="3.5" fill="var(--theme-border)" />

          {/* SCREEN GLOW LIGHT BEAM */}
          <motion.polygon
            animate={{ 
              opacity: isLogin ? 1 : 0.6,
              points: isLogin ? "300,185 300,275 140,340 140,150" : "300,185 300,275 80,340 80,150"
            }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            fill="url(#monitor-glow)"
            style={{ mixBlendMode: "screen" }}
          />

          {/* ROLLING CHAIR AND DEVELOPER COMBINED GROUP */}
          <motion.g
            id="rolling-chair-and-user"
            animate={{ x: chairX }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
          >
            {/* CHAIR FOR DEVELOPER (Fully created, gorgeous sleek high-back office chair) */}
            <g id="chair-block">
              {/* Horizontal base with dynamic shadows */}
              <path d="M80 470 L160 470" stroke="var(--theme-border)" strokeWidth="4.5" strokeLinecap="round" />
              {/* Sleek diagonal star base limbs */}
              <path d="M92 470 L120 461" stroke="var(--theme-border)" strokeWidth="3" />
              <path d="M148 470 L120 461" stroke="var(--theme-border)" strokeWidth="3" />
              
              {/* Dual casters/wheels - Animated to rotate relative to their centers! */}
              {/* Front Wheel */}
              <motion.g
                animate={{ rotate: wheelRotation }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                style={{ transformOrigin: "80px 474px" }}
              >
                <circle cx="80" cy="474" r="5" fill="var(--theme-border)" />
                {/* Spoke lines to make rotation clearly visible */}
                <line x1="76" y1="474" x2="84" y2="474" stroke="var(--theme-panel)" strokeWidth="1" />
                <line x1="80" y1="470" x2="80" y2="478" stroke="var(--theme-panel)" strokeWidth="1" />
              </motion.g>

              {/* Back Wheel */}
              <motion.g
                animate={{ rotate: wheelRotation }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                style={{ transformOrigin: "160px 474px" }}
              >
                <circle cx="160" cy="474" r="5" fill="var(--theme-border)" />
                {/* Spoke lines to make rotation clearly visible */}
                <line x1="156" y1="474" x2="164" y2="474" stroke="var(--theme-panel)" strokeWidth="1" />
                <line x1="160" y1="470" x2="160" y2="478" stroke="var(--theme-panel)" strokeWidth="1" />
              </motion.g>
              
              {/* Hydraulic cylinder stem (perfectly connecting seat to base!) */}
              <line x1="120" y1="392" x2="120" y2="470" stroke="var(--theme-border)" strokeWidth="7.5" strokeLinecap="round" />
              {/* Base block / pivot control panel */}
              <rect x="108" y="390" width="24" height="6" rx="1.5" fill="var(--theme-border)" />

              {/* Armrest mounts & padding */}
              <path d="M102 380 L102 344 L118 344" fill="none" stroke="var(--theme-border)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="110" y="341" width="16" height="5" rx="2" fill="var(--theme-text-secondary)" />

              {/* Main seat cushion pillow */}
              <rect x="95" y="380" width="50" height="12" rx="4" fill="url(#chair-grad)" stroke="var(--theme-border)" strokeWidth="1.5" />

              {/* Heavy-duty curved lumbar high-back spline */}
              <path d="M104 385 Q91 325 94 240" fill="none" stroke="var(--theme-border)" strokeWidth="5.5" strokeLinecap="round" />
              
              {/* Soft mesh back and head support cushions */}
              <rect x="85" y="248" width="16" height="75" rx="8" fill="url(#chair-grad)" stroke="var(--theme-border)" strokeWidth="1.5" />
              <rect x="87" y="210" width="12" height="24" rx="5" fill="url(#chair-grad)" stroke="var(--theme-border)" strokeWidth="1.5" />
            </g>

            {/* CARTOON DEVELOPER CHARACTER */}
            <g id="developer-character">
              {/* Person Legs (Sits comfortably on the chair and rests legs towards floor) */}
              <path d="M 125,385 L 180,385 L 185,465" stroke="var(--theme-text-primary)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 125,385 L 180,385 L 185,465" stroke="var(--theme-border)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              
              {/* Shoes flat on the floor */}
              <path d="M 182,465 L 202,467" stroke="var(--theme-text-primary)" strokeWidth="10" strokeLinecap="round" />

              {/* Main Torso/Spine body */}
              <path
                d="M 125,385 C 115,310 130,260 150,240"
                stroke="var(--theme-text-primary)"
                strokeWidth="32"
                strokeLinecap="round"
                fill="none"
              />
              {/* Accent lighting highlights on the spine/back curve */}
              <path
                d="M 121,380 C 113,310 128,260 146,242"
                stroke="var(--theme-accent-primary)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeOpacity="0.85"
                fill="none"
              />

              {/* Arms reaching/typing on the keyboard */}
              <path d="M145 255 L180 305 L225 350" stroke="var(--theme-text-primary)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* Glowing sleeve cuff highlight matching active theme accent */}
              <circle cx="180" cy="305" r="7.5" fill="var(--theme-accent-primary)" />
              {/* Hands typing */}
              <path d="M225 350 L234 352" stroke="var(--theme-accent-secondary)" strokeWidth="8" strokeLinecap="round" />

              {/* Neck */}
              <path d="M152 235 L155 210" stroke="var(--theme-text-primary)" strokeWidth="12" strokeLinecap="round" />

              {/* Head & Face profile (facing right) */}
              <circle cx="163" cy="195" r="18" fill="var(--theme-text-primary)" />
              {/* Nose looking right - locked onto monitor */}
              <path d="M178 193 L185 196 L178 199" fill="var(--theme-text-primary)" stroke="var(--theme-text-primary)" strokeWidth="2" strokeLinejoin="round" />
              
              {/* Dynamic Light Casting directly on Face from Monitor */}
              <path d="M173 181 Q183 193 173 209" fill="none" stroke="var(--theme-accent-primary)" strokeWidth="3" strokeLinecap="round" />

              {/* Nerd Glasses / Tech HUD glass */}
              <g>
                <path d="M171 189 L181 189 L183 194 L173 194 Z" fill="var(--theme-accent-secondary)" fillOpacity="0.8" />
                <path d="M163 191 L171 190" stroke="var(--theme-accent-secondary)" strokeWidth="2" />
              </g>

              {/* Modern Headphone block set over ears */}
              <rect x="149" y="181" width="8" height="24" rx="4" fill="var(--theme-accent-primary)" />
              <path d="M153 181 A 12 12 0 0 1 169 178" fill="none" stroke="var(--theme-accent-primary)" strokeWidth="2.5" />
              {/* Microphone helper */}
              <path d="M157 201 C 160 207 167 207 169 206" fill="none" stroke="var(--theme-accent-primary)" strokeWidth="1.5" />

              {/* Creative spattering nodes representing ideas or machine forecasts */}
              <g className="animate-pulse">
                <path d="M 170,175 Q 177,155 200,145" stroke="var(--theme-accent-secondary)" strokeWidth="1.5" strokeDasharray="2 2" />
                <rect x="200" y="139" width="38" height="13" rx="4" fill="var(--theme-badge-bg)" stroke="var(--theme-accent-secondary)" strokeWidth="1" />
                <text 
                  x="204" 
                  y="148" 
                  fill="var(--theme-accent-secondary)" 
                  fontSize="7" 
                  fontFamily="monospace" 
                  fontWeight="bold"
                  style={isFacingLeft ? { transform: "scaleX(-1)", transformOrigin: "219px 145px" } : undefined}
                >
                  0xFA4
                </text>
              </g>
            </g>
          </motion.g>

          {/* Ambient Warm Coffee Mug steam on the desk (Stays physically placed on the stable desk) */}
          <g>
            <rect x="195" y="342" width="12" height="13" rx="2" fill="var(--theme-accent-secondary)" />
            <path d="M 207,346 C 210,346 210,351 207,351" fill="none" stroke="var(--theme-accent-secondary)" strokeWidth="2" />
            {/* Steam loops */}
            <path d="M198 337 Q201 332 198 328" stroke="var(--theme-accent-secondary)" strokeWidth="1" strokeLinecap="round" opacity="0.6">
              <animate attributeName="opacity" values="0.1;0.8;0.1" dur="2.5s" repeatCount="indefinite" />
            </path>
            <path d="M202 337 Q205 332 202 328" stroke="var(--theme-accent-secondary)" strokeWidth="1" strokeLinecap="round" opacity="0.6">
              <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2s" repeatCount="indefinite" />
            </path>
          </g>

        </g>
      </svg>
    </div>
  );
}
