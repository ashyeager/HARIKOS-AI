export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden bg-[#07070a]">
      <div className="mesh-gradient absolute inset-0 opacity-90" />
      <div className="ambient-glow absolute left-[-12%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-[#E5A93C]/25 blur-[160px]" />
      <div className="ambient-glow absolute bottom-[-12%] right-[-8%] h-[24rem] w-[24rem] rounded-full bg-sky-400/18 blur-[170px]" />
      <div className="absolute left-[22%] top-[16%] h-40 w-40 rounded-full border border-white/10 bg-white/[0.03] blur-[80px]" />
      <div className="absolute bottom-[18%] left-[12%] h-28 w-28 rounded-full border border-[#E5A93C]/20 bg-[#E5A93C]/10 blur-[70px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(229,169,60,0.08),transparent_28%),radial-gradient(circle_at_85%_70%,rgba(56,189,248,0.06),transparent_30%)]" />
      <div className="grid-bg absolute inset-0 opacity-[0.12]" />
      <div className="noise-bg absolute inset-0 opacity-30 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(5,5,5,0.72)_100%)]" />
    </div>
  );
}
