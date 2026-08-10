import { Component, lazy, Suspense, type ErrorInfo, type ReactNode } from "react";
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

function CoreFallback({ variant }: { variant: CoreVariant }) {
  return (
    <div className={`core-fallback core-fallback--${variant}`} aria-hidden="true">
      <div className="fallback-shell fallback-shell--one" />
      <div className="fallback-shell fallback-shell--two" />
      <div className="fallback-engine" />
      <div className="fallback-ring" />
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
  const fallback = <CoreFallback variant={variant} />;

  return (
    <div className={`core-stage ${className}`} role="img" aria-label={label}>
      <div className="core-halo" aria-hidden="true" />
      <div className="core-index core-index--top" aria-hidden="true">H / CORE</div>
      <div className="core-index core-index--bottom" aria-hidden="true">STATE — {variant.toUpperCase()}</div>
      <CoreErrorBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          <HarikosCore variant={variant} reducedMotion={reducedMotion} />
        </Suspense>
      </CoreErrorBoundary>
    </div>
  );
}
