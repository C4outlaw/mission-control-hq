'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';

/**
 * Pointer-tracked 3D tilt with a specular glare sweep and depth shadow.
 * The card physically leans toward the cursor; a soft gold light follows.
 * Auto-disabled on touch devices and reduced-motion.
 */
export default function Tilt({
  children,
  max = 7,            // max tilt in degrees
  glare = true,
  radius = 22,        // matches the card's border-radius so the glare clips right
  className,
  style,
  ...rest
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const px = useMotionValue(0.5); // pointer position 0..1
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 260, damping: 24, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 260, damping: 24, mass: 0.6 });

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const glareX = useTransform(sx, [0, 1], ['20%', '80%']);
  const glareY = useTransform(sy, [0, 1], ['15%', '85%']);

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setEnabled(true);
  }, [reduce]);

  if (!enabled) {
    return <div className={className} style={style} {...rest}>{children}</div>;
  }

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { px.set(0.5); py.set(0.5); };

  return (
    <div className={className} style={{ perspective: 900, ...style }} {...rest}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          height: '100%',
          willChange: 'transform',
        }}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: radius,
              pointerEvents: 'none',
              background: 'radial-gradient(320px circle at var(--gx) var(--gy), rgba(200,158,81,0.14), rgba(255,255,255,0.05) 40%, transparent 65%)',
              '--gx': glareX,
              '--gy': glareY,
              zIndex: 2,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
