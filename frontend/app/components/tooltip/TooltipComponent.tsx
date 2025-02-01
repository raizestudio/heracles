"use client";
import { useState, useRef, useEffect } from "react";

interface TooltipComponentProps {
  text: string;
  position?: "top" | "right" | "bottom" | "left" | "auto";
  children: React.ReactNode;
}

const TooltipComponent: React.FC<TooltipComponentProps> = ({ text, position = "top", children }) => {
  const [visible, setVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<"top" | "right" | "bottom" | "left">(position === "auto" ? "top" : position);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || position !== "auto") return;

    const adjustTooltipPosition = () => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate available space
      const spaceTop = triggerRect.top;
      const spaceBottom = viewportHeight - triggerRect.bottom;
      const spaceLeft = triggerRect.left;
      const spaceRight = viewportWidth - triggerRect.right;

      let bestPosition: "top" | "bottom" | "left" | "right" = "top";

      if (spaceBottom >= tooltipRect.height) {
        bestPosition = "bottom";
      } else if (spaceTop >= tooltipRect.height) {
        bestPosition = "top";
      } else if (spaceRight >= tooltipRect.width) {
        bestPosition = "right";
      } else if (spaceLeft >= tooltipRect.width) {
        bestPosition = "left";
      }

      setTooltipPos(bestPosition);
    };

    // Adjust position on show and when resizing
    adjustTooltipPosition();
    window.addEventListener("resize", adjustTooltipPosition);
    return () => window.removeEventListener("resize", adjustTooltipPosition);
  }, [visible, position]);

  const positionStyles = {
    top: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "8px" },
    right: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: "8px" },
    bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "8px" },
    left: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: "8px" },
  };

  return (
    <div className="relative flex" ref={triggerRef}>
      {/* Trigger Element */}
      <div 
        onMouseEnter={() => {
          setVisible(true);
          if (position === "auto") setTimeout(() => window.dispatchEvent(new Event("resize")), 10); // Force recalculation
        }}
        onMouseLeave={() => setVisible(false)}
        className="inline-flex"
      >
        {children}
      </div>

      {/* Tooltip */}
      {visible && (
        <div
          ref={tooltipRef}
          style={positionStyles[tooltipPos]}
          className="absolute px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg"
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default TooltipComponent;
