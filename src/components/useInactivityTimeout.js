import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { resetQuestionnaireState } from "../state/questionnaireState.js";

/**
 * Redirects to the home page after a period of inactivity.
 * Listens for click, touch, mousemove, and keydown events.
 * @param {number} timeoutMs - Inactivity timeout in milliseconds (default: 30000)
 */
export default function useInactivityTimeout(timeoutMs = 30000) {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        resetQuestionnaireState();
        navigate("/", { viewTransition: true });
      }, timeoutMs);
    };

    const events = ["click", "touchstart", "mousemove", "keydown"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Start the timer immediately
    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [navigate, timeoutMs]);
}
