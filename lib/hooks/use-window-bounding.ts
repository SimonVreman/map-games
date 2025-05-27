import { useEffect, useRef } from "react";

export function useWindowBounding() {
  const bounding = useRef<DOMRect>(document.body.getBoundingClientRect());

  useEffect(() => {
    const updateBounding = () =>
      (bounding.current = document.body.getBoundingClientRect());
    window.addEventListener("resize", updateBounding);
    return () => window.removeEventListener("resize", updateBounding);
  }, []);

  return bounding;
}
