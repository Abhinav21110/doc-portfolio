import { useRef, useEffect } from 'react';

interface Tilt3DOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  reset?: boolean;
}

export const use3DTilt = (options: Tilt3DOptions = {}) => {
  const {
    maxTilt = 20,
    perspective = 1000,
    scale = 1.05,
    speed = 300,
    reset = true,
  } = options;

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    if (!mediaQuery.matches) return;

    let requestId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * maxTilt;
      const rotateY = ((centerX - x) / centerX) * maxTilt;

      requestId = requestAnimationFrame(() => {
        element.style.transform = `
          perspective(${perspective}px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale(${scale})
        `;
        element.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
      });
    };

    const handleMouseLeave = () => {
      if (reset) {
        requestId = requestAnimationFrame(() => {
          element.style.transform = `
            perspective(${perspective}px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
          `;
          element.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
        });
      }
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, perspective, scale, speed, reset]);

  return ref;
};