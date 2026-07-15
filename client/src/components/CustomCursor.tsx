import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide default cursor on desktop
    if (window.innerWidth < 768) return;

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseEnter = () => {
      isHovering.current = true;
      cursor.classList.add("hovering");
    };

    const onMouseLeave = () => {
      isHovering.current = false;
      cursor.classList.remove("hovering");
    };

    document.addEventListener("mousemove", onMouseMove);

    // Add hover detection for interactive elements
    const interactiveEls = document.querySelectorAll("a, button, [data-cursor-hover]");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    // Smooth cursor follow
    const animate = () => {
      curX += (mouseX - curX) * 0.15;
      curY += (mouseY - curY) * 0.15;
      cursor.style.left = `${curX}px`;
      cursor.style.top = `${curY}px`;
      requestAnimationFrame(animate);
    };
    animate();

    // Observer for dynamically added elements
    const observer = new MutationObserver(() => {
      const newEls = document.querySelectorAll("a, button, [data-cursor-hover]");
      newEls.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor hidden md:block"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
}
