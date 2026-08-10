import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowUp, MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 170, damping: 30, mass: 0.22 });

  return (
    <div className="scroll-progress" aria-hidden="true">
      <motion.span style={{ scaleX: progress }} />
    </div>
  );
}

function RouteSignal() {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(true);

  useEffect(() => {
    setActive(true);
    const timer = window.setTimeout(() => setActive(false), reducedMotion ? 120 : 520);
    return () => window.clearTimeout(timer);
  }, [pathname, reducedMotion]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="route-signal"
          aria-hidden="true"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.18 }}
        >
          <motion.i
            initial={reducedMotion ? false : { scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.16, 1, 0.3, 1] }}
          />
          <span>HARIKOS / LOADING</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function PointerAura() {
  const auraRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const aura = auraRef.current;
    const supportsPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!aura || reducedMotion || !supportsPointer) return;

    let frame = 0;
    let targetX = -80;
    let targetY = -80;
    let currentX = targetX;
    let currentY = targetY;

    const draw = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      aura.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      aura.classList.add("is-visible");
    };
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      aura.classList.toggle("is-interactive", Boolean(target?.closest("a, button, input, textarea, label")));
    };
    const onPointerDown = () => aura.classList.add("is-pressed");
    const onPointerUp = () => aura.classList.remove("is-pressed");
    const onPointerLeave = () => aura.classList.remove("is-visible");

    frame = window.requestAnimationFrame(draw);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [reducedMotion]);

  return <span ref={auraRef} className="pointer-aura" aria-hidden="true" />;
}

function FloatingUtilityDock() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const [showTop, setShowTop] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = latest > 0.16;
    setShowTop((current) => current === next ? current : next);
  });

  return (
    <motion.aside
      className="experience-dock"
      aria-label="Quick actions"
      initial={reducedMotion ? false : { opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: reducedMotion ? 0 : 0.8, duration: 0.5 }}
    >
      <Link to="/products/harikos-ai" aria-label="Explore HARIKOS AI" data-tooltip="Explore AI">
        <Sparkles aria-hidden="true" />
      </Link>
      <Link to="/contact" aria-label="Start a conversation" data-tooltip="Contact">
        <MessageCircle aria-hidden="true" />
      </Link>
      <AnimatePresence initial={false}>
        {showTop ? (
          <motion.button
            type="button"
            aria-label="Back to top"
            data-tooltip="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.72 }}
          >
            <ArrowUp aria-hidden="true" />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </motion.aside>
  );
}

export default function ExperienceLayer() {
  return (
    <>
      <ScrollProgress />
      <RouteSignal />
      <PointerAura />
      <FloatingUtilityDock />
    </>
  );
}
