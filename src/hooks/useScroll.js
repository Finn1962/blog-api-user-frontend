import { useState, useEffect } from "react";

export function useScroll() {
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
    let ticking = false;

    function handleScroll() {
      const currentScroll =
        window.scrollY || document.documentElement.scrollTop;

      if (Math.abs(currentScroll - lastScrollTop) < 10) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScroll > lastScrollTop) {
            setScrollDirection("down");
          } else if (currentScroll < lastScrollTop) {
            setScrollDirection("up");
          }
          lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollDirection };
}
