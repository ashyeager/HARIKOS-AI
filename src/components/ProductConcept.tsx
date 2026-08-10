import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const verticals = {
  Hospitality: {
    role: "Guest request coordinator",
    context: "Property policy · Service map",
    tools: "Inbox · Booking data",
    trigger: "New guest request",
    output: "Route · Draft · Escalate",
  },
  Sales: {
    role: "Lead qualification agent",
    context: "Offer · Territory · Criteria",
    tools: "CRM · Email",
    trigger: "New inbound lead",
    output: "Research · Score · Route",
  },
  Operations: {
    role: "Workflow intake agent",
    context: "Process · Owners · Rules",
    tools: "Forms · Internal systems",
    trigger: "New operational request",
    output: "Validate · Assign · Track",
  },
};

type Vertical = keyof typeof verticals;

export default function ProductConcept({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<Vertical>("Hospitality");
  const reducedMotion = useReducedMotion();
  const config = verticals[active];

  return (
    <div className={`product-concept ${compact ? "is-compact" : ""}`}>
      <div className="concept-toolbar">
        <span><i /> Product exploration</span>
        <span>Concept interface / Not released</span>
      </div>
      {!compact && (
        <div className="vertical-switcher" role="group" aria-label="Select an exploratory agent direction">
          {(Object.keys(verticals) as Vertical[]).map((vertical) => (
            <button
              type="button"
              key={vertical}
              className={active === vertical ? "is-active" : ""}
              onClick={() => setActive(vertical)}
              aria-pressed={active === vertical}
            >
              {vertical}
            </button>
          ))}
        </div>
      )}
      <motion.div
        className="concept-workspace"
        key={active}
        initial={reducedMotion ? false : { opacity: 0.55, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="agent-identity">
          <span className="agent-glyph">H</span>
          <div>
            <small>Agent / Role</small>
            <strong>{config.role}</strong>
          </div>
          <i className="live-indicator" />
        </div>
        <div className="configuration-rail">
          <div><span>01</span><small>Context</small><strong>{config.context}</strong></div>
          <div><span>02</span><small>Tools</small><strong>{config.tools}</strong></div>
          <div><span>03</span><small>Trigger</small><strong>{config.trigger}</strong></div>
        </div>
        <div className="deployment-strip">
          <span>INPUT</span>
          <i />
          <strong>{config.output}</strong>
          <button type="button" disabled>Preview deployment</button>
        </div>
      </motion.div>
    </div>
  );
}
