"use client";
import { useState, useEffect } from "react";

type ToastType = "success" | "error" | "info" | "warning" | "default";

interface ToastProps {
  title: string;
  message: string;
  type: ToastType;
  position?:
    | "top"
    | "top-left"
    | "top-right"
    | "right"
    | "bottom"
    | "bottom-left"
    | "bottom-right"
    | "left";
  duration?: number;
  icon?: React.ReactNode;
}

const ToastComponent: React.FC<ToastProps> = ({
  title,
  message,
  type,
  position = "bottom-right",
  duration = 5000,
  icon,
}) => {
  const [visible, setVisible] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    // clearTimeout(timer);

    const checkBottom = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // If user is near the bottom (20px threshold), set `isAtBottom` to true
      setIsAtBottom(scrollY + windowHeight >= docHeight - 20);
    };

    window.addEventListener("scroll", checkBottom);
    checkBottom(); // Check on initial render

    // return () => window.removeEventListener("scroll", checkBottom);
    return () => {
      clearTimeout(timer); // Clean up the timer on unmount
      window.removeEventListener("scroll", checkBottom);
    };
  }, [duration]);

  const closeToast = () => setVisible(false);

  if (!visible) return null;

  let backgroundColor: string;
  let positionClass: string;

  switch (type) {
    case "success":
      backgroundColor = "bg-green-500";
      break;
    case "error":
      backgroundColor = "bg-red-500";
      break;
    case "info":
      backgroundColor = "bg-blue-500";
      break;
    case "warning":
      backgroundColor = "bg-yellow-500";
      break;
    case "default":
      backgroundColor = "bg-gray-100";
      break;
    default:
      backgroundColor = "bg-gray-500";
  }

  switch (position) {
    case "top":
      positionClass = "top-5";
      break;
    case "top-left":
      positionClass = "top-5 left-5";
      break;
    case "top-right":
      positionClass = "top-5 right-5";
      break;
    case "right":
      positionClass = "right-5";
      break;
    case "bottom":
      positionClass = "bottom-5";
      break;
    case "bottom-left":
      positionClass = "bottom-5 left-5";
      break;
    case "bottom-right":
      positionClass = isAtBottom ? "bottom-20 right-5" : "bottom-5 right-5";
      break;
    case "left":
      positionClass = "left-5";
      break;
    default:
      positionClass = "bottom-5";
  }
  return (
    <div
      className={`fixed flex flex-col min-w-96 max-w-min text-white rounded shadow transition-all ${positionClass} ${backgroundColor}`}
    >
      <div className="flex justify-start gap-2 pl-4 grow py-1  rounded-t">
        {icon}
        <span className="text-lg font-semibold text-gray-800">{title}</span>
      </div>
      <div className="flex px-4 py-2 border-t-2 border-gray-200">
        <span className="text-gray-700 break-keep">{message}</span>
      </div>
      <div>
        <div
          className={`flex justify-end gap-2 p-2 rounded-b`}
        >
          <button className="text-xs text-gray-800" onClick={closeToast}>Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default ToastComponent;
