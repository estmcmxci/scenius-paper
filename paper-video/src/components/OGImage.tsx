import React from "react";
import { loadFont as loadNewsreader } from "@remotion/google-fonts/Newsreader";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: newsreader } = loadNewsreader();
const { fontFamily: dmSans } = loadDMSans();
const { fontFamily: jetbrains } = loadJetBrains();

const colors = {
  bg: "#faf9f7",
  accent: "#2d7a7a",
  textPrimary: "#1c1917",
  textTertiary: "#78716c",
};

export const OGImage: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: colors.bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <defs>
          <pattern id="og-dotgrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="16" cy="16" r="1" fill={colors.textPrimary} opacity="0.10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#og-dotgrid)" />
      </svg>

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 42%, transparent 0%, rgba(0,0,0,0.06) 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Teal bottom band */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          backgroundColor: colors.accent,
          zIndex: 3,
        }}
      />

      {/* Top zone: content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 100,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
          gap: 20,
          zIndex: 4,
        }}
      >
        <div
          style={{
            fontFamily: dmSans,
            fontSize: 13,
            fontWeight: 600,
            color: colors.accent,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Submitted to D2 at Columbia Business School
        </div>

        <div
          style={{
            fontFamily: newsreader,
            fontSize: 46,
            fontWeight: 400,
            color: colors.textPrimary,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          Reputation-Weighted Prediction Markets
          <br />
          Under Wealth Heterogeneity and Heavy Tails
        </div>

        <div
          style={{
            width: 80,
            height: 2,
            backgroundColor: colors.accent,
            borderRadius: 1,
            marginTop: 4,
          }}
        />

        <div
          style={{
            fontFamily: dmSans,
            fontSize: 16,
            color: colors.textTertiary,
          }}
        >
          estmcmxci.eth · Trece Research
        </div>
      </div>

      {/* Bottom band content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          zIndex: 4,
        }}
      >
        <div
          style={{
            fontFamily: dmSans,
            fontSize: 15,
            color: "rgba(255,255,255,0.65)",
          }}
        >
          AI-powered research companion — read, ask, simulate
        </div>
        <div
          style={{
            fontFamily: jetbrains,
            fontSize: 18,
            fontWeight: 400,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "0.02em",
          }}
        >
          research-paper-chat.vercel.app
        </div>
      </div>
    </div>
  );
};
