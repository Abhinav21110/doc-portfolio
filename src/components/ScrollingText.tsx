import { useRef, useEffect } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface ScrollingTextProps {
  words: string[];
  direction?: 'left' | 'right';
  className?: string;
}

const ScrollingText = ({ words, direction = 'left', className = '' }: ScrollingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const completion = useScrollProgress();

  useEffect(() => {
    if (containerRef.current) {
      const moveValue = completion * 500; // Adjust multiplier for speed
      containerRef.current.style.transform = `translateX(${direction === 'left' ? '-' : ''}${moveValue}px)`;
    }
  }, [completion, direction]);

  const textContent = Array(5).fill(words.join(' • ')).join(' • ');

  return (
    <div 
      className={`absolute w-full left-0 select-none overflow-hidden z-0 ${className}`}>
      <div ref={containerRef} className="whitespace-nowrap text-8xl font-bold opacity-5">
        {textContent}
      </div>
    </div>
  );
};

export default ScrollingText;
