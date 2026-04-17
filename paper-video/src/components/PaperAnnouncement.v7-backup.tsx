import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
  spring,
} from "remotion";
import { loadFont as loadNewsreader } from "@remotion/google-fonts/Newsreader";
import { loadFont as loadIBMPlex } from "@remotion/google-fonts/IBMPlexSans";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: newsreader } = loadNewsreader();
const { fontFamily: ibmPlex } = loadIBMPlex();
const { fontFamily: dmSans } = loadDMSans();
const { fontFamily: jetbrains } = loadJetBrains();

const colors = {
  bg: "#faf9f7",
  bgEnd: "#f5f4f2",
  accent: "#2d7a7a",
  accentSubtle: "rgba(45, 122, 122, 0.08)",
  textPrimary: "#1c1917",
  textSecondary: "#44403c",
  textTertiary: "#78716c",
  border: "#e7e5e4",
  negative: "#9a3412",
  negativeBg: "rgba(154, 52, 18, 0.06)",
};

const TOTAL_FRAMES = 510;

// ─── Animation ───────────────────────────────────────────────

const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 26, stiffness: 120 } });

  return (
    <div
      style={{
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(progress, [0, 1], [28, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const SlideScene: React.FC<{
  children: React.ReactNode;
  exitStart: number;
}> = ({ children, exitStart }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enterProgress = spring({ frame, fps, config: { damping: 22, stiffness: 180 } });
  const exitProgress = spring({ frame: frame - exitStart, fps, config: { damping: 22, stiffness: 180 } });
  const isExiting = frame >= exitStart;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: isExiting
          ? interpolate(exitProgress, [0, 1], [1, 0])
          : interpolate(enterProgress, [0, 1], [0, 1]),
        transform: `translateX(${isExiting
          ? interpolate(exitProgress, [0, 1], [0, -300])
          : interpolate(enterProgress, [0, 1], [300, 0])
        }px)`,
      }}
    >
      {children}
    </div>
  );
};

// ─── Math primitives ─────────────────────────────────────────

const mathBase: React.CSSProperties = {
  fontFamily: newsreader,
  fontStyle: "italic",
  color: colors.textPrimary,
};

const Sub: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ fontSize: "0.58em", verticalAlign: "sub", fontStyle: "italic", letterSpacing: "0.02em" }}>
    {children}
  </span>
);

const Sup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ fontSize: "0.58em", verticalAlign: "super", fontStyle: "italic" }}>
    {children}
  </span>
);

const Op: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ fontStyle: "normal", padding: "0 14px", opacity: 0.55 }}>{children}</span>
);

const Hl: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: colors.accent }}>{children}</span>
);

const Frac: React.FC<{
  num: React.ReactNode;
  den: React.ReactNode;
  size?: number;
}> = ({ num, den, size = 54 }) => (
  <span
    style={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      verticalAlign: "middle",
      padding: "0 16px",
    }}
  >
    <span style={{ fontSize: size, lineHeight: 1.25, ...mathBase }}>{num}</span>
    <span
      style={{
        width: "calc(100% + 24px)",
        height: 3,
        backgroundColor: colors.textPrimary,
        margin: "10px 0",
        borderRadius: 2,
      }}
    />
    <span style={{ fontSize: size, lineHeight: 1.25, ...mathBase }}>{den}</span>
  </span>
);

// ─── Atmosphere ──────────────────────────────────────────────

const GrainOverlay: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      opacity: 0.05,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: "256px 256px",
      pointerEvents: "none",
      zIndex: 5,
    }}
  />
);

const DotGrid: React.FC = () => (
  <svg
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 3,
    }}
  >
    <defs>
      <pattern id="dotgrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="1.2" fill={colors.textPrimary} opacity="0.12" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dotgrid)" />
  </svg>
);

const RadialVignette: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "radial-gradient(ellipse 60% 50% at 50% 42%, transparent 0%, rgba(0,0,0,0.07) 100%)",
      pointerEvents: "none",
      zIndex: 4,
    }}
  />
);

const TimelineBar: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = frame / TOTAL_FRAMES;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: `${progress * 100}%`,
        height: 4,
        backgroundColor: colors.accent,
        zIndex: 10,
        transition: "width 0.05s linear",
      }}
    />
  );
};

const SceneCounter: React.FC<{ scene: number }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - 5, fps, config: { damping: 30, stiffness: 120 } });

  return (
    <div
      style={{
        position: "absolute",
        top: 36,
        left: 48,
        fontFamily: jetbrains,
        fontSize: 16,
        fontWeight: 400,
        color: colors.textTertiary,
        letterSpacing: "0.05em",
        opacity: interpolate(progress, [0, 1], [0, 0.6]),
        zIndex: 10,
      }}
    >
      {String(scene).padStart(2, "0")}
    </div>
  );
};

const ProgressDots: React.FC<{ active: number; total: number }> = ({ active, total }) => (
  <div
    style={{
      position: "absolute",
      bottom: 36,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: 10,
      zIndex: 10,
    }}
  >
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === active ? 24 : 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: i === active ? colors.accent : colors.border,
        }}
      />
    ))}
  </div>
);

// ─── Centered stack layout — shifted to optical center ───────

const CenterStack: React.FC<{
  children: React.ReactNode;
  gap?: number;
}> = ({ children, gap = 40 }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      padding: "0 140px",
      gap,
      marginTop: "0px",
    }}
  >
    {children}
  </div>
);

const MathLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: dmSans,
      fontSize: 19,
      fontWeight: 500,
      color: colors.textTertiary,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      paddingLeft: 16,
      borderLeft: `3px solid ${colors.accent}`,
    }}
  >
    {children}
  </div>
);

// ─── Scene 1: Hook ───────────────────────────────────────────

const SceneHook: React.FC = () => (
  <CenterStack gap={44}>
    <FadeUp delay={8}>
      <div
        style={{
          fontFamily: newsreader,
          fontSize: 82,
          fontWeight: 400,
          color: colors.textPrimary,
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          textAlign: "center",
        }}
      >
        In prediction markets,{" "}
        <span style={{ fontWeight: 600, fontSize: 90 }}>money talks.</span>
      </div>
    </FadeUp>
    <FadeUp delay={24}>
      <MathLabel>Capital-weighted aggregation</MathLabel>
    </FadeUp>
    <FadeUp delay={28}>
      <div style={{ fontSize: 80, ...mathBase, textAlign: "center" }}>
        p<Sub>j</Sub><Sup>C</Sup>
        <Op>=</Op>
        <Frac
          size={54}
          num={<>Σ<Sub>i</Sub> <Hl>s<Sub>i</Sub></Hl> · p<Sub>i,j</Sub></>}
          den={<>Σ<Sub>i</Sub> <Hl>s<Sub>i</Sub></Hl></>}
        />
      </div>
    </FadeUp>
  </CenterStack>
);

// ─── Scene 2: Question (stripped down — just question + equation) ─

const SceneQuestion: React.FC = () => (
  <CenterStack gap={48}>
    <FadeUp delay={6}>
      <div
        style={{
          fontFamily: newsreader,
          fontSize: 88,
          fontWeight: 500,
          fontStyle: "italic",
          color: colors.accent,
          textAlign: "center",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
        }}
      >
        But is it worth its salt?
      </div>
    </FadeUp>
    <FadeUp delay={22}>
      <div style={{ fontSize: 58, ...mathBase, textAlign: "center" }}>
        Brier(p<Sup>C</Sup>)
        <Op>&lt;</Op>
        Brier(p<Sup>E</Sup>)
        <Op>?</Op>
      </div>
    </FadeUp>
  </CenterStack>
);

// ─── Scene 3: Problem (badge-first, inverted) ───────────────

const SceneProblem: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      height: "100%",
      padding: "0 100px",
      gap: 80,
    }}
  >
    {/* Left: copy */}
    <div style={{ flex: "0 0 52%", display: "flex", flexDirection: "column", gap: 20 }}>
      <FadeUp delay={6}>
        <div
          style={{
            fontFamily: newsreader,
            fontSize: 66,
            fontWeight: 400,
            color: colors.textPrimary,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
          }}
        >
          When forecasters are wrong, but rich,{" "}
          <span style={{ color: colors.accent, fontWeight: 500 }}>
            signal fidelity degrades.
          </span>
        </div>
      </FadeUp>

      <FadeUp delay={44}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
          <div
            style={{
              fontFamily: dmSans,
              fontSize: 44,
              fontWeight: 700,
              color: colors.negative,
              letterSpacing: "-0.02em",
            }}
          >
            −1.21%
          </div>
          <div
            style={{
              fontFamily: dmSans,
              fontSize: 20,
              fontWeight: 500,
              color: colors.negative,
              opacity: 0.7,
            }}
          >
            worse than equal-weighted
          </div>
        </div>
      </FadeUp>
    </div>

    {/* Right: math */}
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
      <FadeUp delay={24}>
        <MathLabel>Regime B: anti-correlated</MathLabel>
      </FadeUp>
      <FadeUp delay={28}>
        <div style={{ fontSize: 46, ...mathBase, textAlign: "center", whiteSpace: "nowrap" }}>
          Corr(<Hl>s<Sub>i</Sub></Hl>, σ<Sub>i</Sub>)
          <Op>&gt;</Op>0
          <Op>→</Op>
          Brier(p<Sup>C</Sup>)
          <Op>&gt;</Op>
          Brier(p<Sup>E</Sup>)
        </div>
      </FadeUp>
    </div>
  </div>
);

// ─── Scene 4: Claim + caveat ─────────────────────────────────

const SceneClaim: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const underlineProgress = spring({ frame: frame - 50, fps, config: { damping: 200, stiffness: 80 } });
  const underlineWidth = interpolate(underlineProgress, [0, 1], [0, 100]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
        padding: "0 100px",
        gap: 80,
      }}
    >
      {/* Left: copy */}
      <div style={{ flex: "0 0 52%", display: "flex", flexDirection: "column", gap: 20 }}>
        <FadeUp delay={6}>
          <div
            style={{
              fontFamily: newsreader,
              fontSize: 52,
              fontWeight: 400,
              color: colors.textTertiary,
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
            }}
          >
            Reputation-weighted aggregation corrects for this
          </div>
        </FadeUp>

        <FadeUp delay={30}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <span
              style={{
                fontFamily: newsreader,
                fontSize: 76,
                fontWeight: 600,
                color: colors.textPrimary,
                letterSpacing: "-0.02em",
              }}
            >
              —but only modestly.
            </span>
            <div
              style={{
                position: "absolute",
                bottom: -6,
                left: 0,
                width: `${underlineWidth}%`,
                height: 4,
                backgroundColor: colors.accent,
                borderRadius: 2,
              }}
            />
          </div>
        </FadeUp>

        <FadeUp delay={70}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
            <div
              style={{
                fontFamily: dmSans,
                fontSize: 44,
                fontWeight: 700,
                color: colors.accent,
                letterSpacing: "-0.02em",
              }}
            >
              +0.14% Brier
            </div>
            <div
              style={{
                fontFamily: dmSans,
                fontSize: 20,
                fontWeight: 500,
                color: colors.accent,
                opacity: 0.7,
              }}
            >
              p &lt; 10⁻¹⁵
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Right: math */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <FadeUp delay={48}>
          <MathLabel>Reputation-weighted aggregation</MathLabel>
        </FadeUp>
        <FadeUp delay={52}>
          <div style={{ fontSize: 72, ...mathBase, textAlign: "center" }}>
            p<Sub>j</Sub><Sup>R</Sup>
            <Op>=</Op>
            <Frac
              size={48}
              num={<>Σ<Sub>i</Sub> <Hl>r<Sub>i</Sub></Hl> · s<Sub>i</Sub> · p<Sub>i,j</Sub></>}
              den={<>Σ<Sub>i</Sub> <Hl>r<Sub>i</Sub></Hl> · s<Sub>i</Sub></>}
            />
          </div>
        </FadeUp>
      </div>
    </div>
  );
};

// ─── Scene 5: End card ───────────────────────────────────────

const SceneEndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dividerProgress = spring({ frame: frame - 28, fps, config: { damping: 200, stiffness: 100 } });
  const dividerWidth = interpolate(dividerProgress, [0, 1], [0, 600]);
  const bandProgress = spring({ frame: frame - 2, fps, config: { damping: 28, stiffness: 100 } });
  const bandHeight = interpolate(bandProgress, [0, 1], [0, 160]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", backgroundColor: colors.bg }}>
      {/* Teal bottom band */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: bandHeight,
          backgroundColor: colors.accent,
          zIndex: 2,
        }}
      />

      {/* Top zone: badge + title */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 160,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 28,
          padding: "0 120px",
          zIndex: 3,
        }}
      >
        <FadeUp delay={8}>
          <div
            style={{
              fontFamily: dmSans,
              fontSize: 15,
              fontWeight: 600,
              color: colors.accent,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Submitted to D2 at Columbia Business School
          </div>
        </FadeUp>

        <FadeUp delay={16}>
          <div
            style={{
              fontFamily: newsreader,
              fontSize: 60,
              fontWeight: 400,
              color: colors.textPrimary,
              textAlign: "center",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
            }}
          >
            Reputation-Weighted Prediction Markets
            <br />
            Under Wealth Heterogeneity and Heavy Tails
          </div>
        </FadeUp>

        <div style={{ width: dividerWidth, height: 2, backgroundColor: colors.accent, borderRadius: 1 }} />

        <FadeUp delay={34}>
          <div style={{ fontFamily: dmSans, fontSize: 22, color: colors.textTertiary, textAlign: "center" }}>
            2.6M Monte Carlo simulations · 3 wealth-skill regimes · 9 inequality levels
          </div>
        </FadeUp>


      </div>

      {/* Bottom zone: CTA inside teal band */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 120px",
          zIndex: 3,
        }}
      >
        <FadeUp delay={48}>
          <div
            style={{
              fontFamily: jetbrains,
              fontSize: 30,
              fontWeight: 400,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.02em",
            }}
          >
            research-paper-chat.vercel.app
          </div>
        </FadeUp>
      </div>
    </div>
  );
};

// ─── Main composition ────────────────────────────────────────

export const PaperAnnouncement: React.FC = () => {
  const frame = useCurrentFrame();

  let activeScene = 0;
  if (frame >= 390) activeScene = 4;
  else if (frame >= 270) activeScene = 3;
  else if (frame >= 180) activeScene = 2;
  else if (frame >= 90) activeScene = 1;

  return (
    <div
      style={{
        backgroundColor: colors.bg,
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <TimelineBar />
      <DotGrid />
      <GrainOverlay />
      <RadialVignette />

      <Sequence from={0} durationInFrames={90}>
        <SceneCounter scene={1} />
        <SlideScene exitStart={72}><SceneHook /></SlideScene>
      </Sequence>

      <Sequence from={90} durationInFrames={90}>
        <SceneCounter scene={2} />
        <SlideScene exitStart={72}><SceneQuestion /></SlideScene>
      </Sequence>

      <Sequence from={180} durationInFrames={90}>
        <SceneCounter scene={3} />
        <SlideScene exitStart={72}><SceneProblem /></SlideScene>
      </Sequence>

      <Sequence from={270} durationInFrames={120}>
        <SceneCounter scene={4} />
        <SlideScene exitStart={102}><SceneClaim /></SlideScene>
      </Sequence>

      <Sequence from={390} durationInFrames={120}>
        <SceneCounter scene={5} />
        <SlideScene exitStart={999}><SceneEndCard /></SlideScene>
      </Sequence>

      <ProgressDots active={activeScene} total={5} />
    </div>
  );
};
