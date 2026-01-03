import { useEffect, useRef } from 'react';

export default function SplashCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'white',
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.2s, height 0.2s',
      }}
    />
  );
}

