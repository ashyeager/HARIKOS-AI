import { Component, lazy, Suspense, useEffect, useRef, useState, type ErrorInfo, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import type { CoreVariant } from "./HarikosCore";

const HarikosCore = lazy(() => import("./HarikosCore"));

class CoreErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("HARIKOS Core fell back to the lightweight renderer.", error, info.componentStack);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function CoreFallback({ variant, loading = false }: { variant: CoreVariant; loading?: boolean }) {
  return (
    <div className={`core-fallback core-fallback--${variant} ${loading ? "is-loading" : ""}`} aria-hidden="true">
      <div className="fallback-shell fallback-shell--one" />
      <div className="fallback-shell fallback-shell--two" />
      <div className="fallback-engine" />
      <div className="fallback-ring" />
      {loading ? <span className="core-loader-label">INITIALISING CORE</span> : null}
    </div>
  );
}

type CoreStageProps = {
  variant?: CoreVariant;
  label?: string;
  className?: string;
};

export default function CoreStage({
  variant = "complete",
  label = "The HARIKOS Core, an interactive engineered computational object",
  className = "",
}: CoreStageProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [active, setActive] = useState(false);
  const fallback = <CoreFallback variant={variant} />;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof IntersectionObserver === "undefined") {
      setHasEntered(true);
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting);
      if (entry.isIntersecting) setHasEntered(true);
    }, { rootMargin: "180px 0px", threshold: 0.01 });

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={stageRef} className={`core-stage ${className}`} role="img" aria-label={label} data-core-active={active}>
      <div className="core-halo" aria-hidden="true" />
      <div className="core-index core-index--top" aria-hidden="true">H / CORE</div>
      <div className="core-index core-index--bottom" aria-hidden="true">STATE — {variant.toUpperCase()}</div>
      <CoreErrorBoundary fallback={fallback}>
        {hasEntered ? (
          <Suspense fallback={<CoreFallback variant={variant} loading />}>
            <HarikosCore variant={variant} reducedMotion={reducedMotion} active={active} />
          </Suspense>
        ) : <CoreFallback variant={variant} loading />}
      </CoreErrorBoundary>
    </div>
  );
}
