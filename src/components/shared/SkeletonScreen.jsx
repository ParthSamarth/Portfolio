import React from "react";

/* ─── Inline styles ────────────────────────────────────────────────────────── */
const keyframes = `
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
`;

const shimmer = {
  background:
    "linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)",
  backgroundSize: "600px 100%",
  animation: "shimmer 1.6s infinite linear",
  borderRadius: "6px",
};

const block = (extra = {}) => ({ ...shimmer, ...extra });

/* ─── Tiny helper ──────────────────────────────────────────────────────────── */
const Bone = ({ style }) => <div style={block(style)} />;

/* ─── Hero skeleton ────────────────────────────────────────────────────────── */
function HeroSkeleton() {
  return (
    <section
      style={{
        padding: "100px 5% 60px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "720px",
      }}
    >
      {/* eyebrow label */}
      <Bone style={{ width: "120px", height: "14px" }} />
      {/* heading line 1 */}
      <Bone style={{ width: "90%", height: "52px", borderRadius: "8px" }} />
      {/* heading line 2 */}
      <Bone style={{ width: "70%", height: "52px", borderRadius: "8px" }} />
      {/* subheading */}
      <Bone style={{ width: "55%", height: "24px", marginTop: "8px" }} />
      {/* body text */}
      <Bone style={{ width: "100%", height: "14px", marginTop: "8px" }} />
      <Bone style={{ width: "88%",  height: "14px" }} />
      <Bone style={{ width: "76%",  height: "14px" }} />
      {/* CTA buttons */}
      <div style={{ display: "flex", gap: "14px", marginTop: "20px" }}>
        <Bone style={{ width: "130px", height: "42px", borderRadius: "8px" }} />
        <Bone style={{ width: "130px", height: "42px", borderRadius: "8px" }} />
      </div>
    </section>
  );
}

/* ─── Single project card skeleton ────────────────────────────────────────── */
function ProjectCardSkeleton() {
  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #222",
        borderRadius: "12px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* tag */}
      <Bone style={{ width: "70px", height: "20px", borderRadius: "20px" }} />
      {/* title */}
      <Bone style={{ width: "80%", height: "22px" }} />
      {/* description lines */}
      <Bone style={{ width: "100%", height: "13px" }} />
      <Bone style={{ width: "90%",  height: "13px" }} />
      <Bone style={{ width: "65%",  height: "13px" }} />
      {/* tech pill row */}
      <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
        {[60, 75, 55].map((w, i) => (
          <Bone key={i} style={{ width: `${w}px`, height: "24px", borderRadius: "20px" }} />
        ))}
      </div>
      {/* link row */}
      <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
        <Bone style={{ width: "90px", height: "32px", borderRadius: "6px" }} />
        <Bone style={{ width: "90px", height: "32px", borderRadius: "6px" }} />
      </div>
    </div>
  );
}

/* ─── Projects section skeleton ────────────────────────────────────────────── */
function ProjectsSkeleton() {
  return (
    <section style={{ padding: "60px 5%", maxWidth: "1200px", margin: "0 auto" }}>
      {/* section heading */}
      <Bone style={{ width: "200px", height: "32px", marginBottom: "32px" }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

/* ─── Skills grid skeleton ──────────────────────────────────────────────────── */
function SkillsSkeleton() {
  const rows = [5, 6, 4]; // pills per row
  return (
    <section style={{ padding: "60px 5%", maxWidth: "1200px", margin: "0 auto" }}>
      {/* section heading */}
      <Bone style={{ width: "160px", height: "32px", marginBottom: "32px" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {rows.map((count, ri) => (
          <div key={ri} style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {Array.from({ length: count }).map((_, i) => (
              <Bone
                key={i}
                style={{
                  width: `${70 + Math.floor(Math.random() * 50)}px`,
                  height: "36px",
                  borderRadius: "8px",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Root export ───────────────────────────────────────────────────────────── */
export default function SkeletonScreen() {
  return (
    <>
      {/* Inject keyframes once */}
      <style>{keyframes}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a0a",
          color: "transparent",
        }}
        aria-busy="true"
        aria-label="Loading portfolio content"
      >
        <HeroSkeleton />
        <ProjectsSkeleton />
        <SkillsSkeleton />
      </div>
    </>
  );
}
