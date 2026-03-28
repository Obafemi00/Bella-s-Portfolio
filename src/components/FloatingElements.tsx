'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High depth (foreground)
  const fg1Ref = useRef<HTMLImageElement>(null);
  const fg2Ref = useRef<HTMLImageElement>(null);
  // Midground
  const mg1Ref = useRef<HTMLImageElement>(null);
  const mg2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Shared GSAP logic for floating with variations
    const animateFloat = (target: Element | null, variantY: number, variantX: number, duration: number, delay: number) => {
      if (!target) return;
      gsap.to(target, {
        y: `random(-${variantY}, ${variantY})`,
        x: `random(-${variantX}, ${variantX})`,
        duration: `random(${duration * 0.8}, ${duration * 1.2})`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      });
      // Add slight rotation for extra fluidity
      gsap.to(target, {
        rotation: `random(-10, 10)`,
        duration: `random(${duration}, ${duration * 1.5})`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay * 1.5
      });
    };

    // Foreground has larger movements
    animateFloat(fg1Ref.current, 30, 15, 4, 0);
    animateFloat(fg2Ref.current, 25, 20, 3.5, 0.5);
    
    // Midground has subtler movements
    animateFloat(mg1Ref.current, 15, 8, 5, 1);
    animateFloat(mg2Ref.current, 18, 10, 4.5, 0.2);

    return () => {
      // Cleanup on unmount
      gsap.killTweensOf([fg1Ref.current, fg2Ref.current, mg1Ref.current, mg2Ref.current]);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'hidden'
      }}
    >
      {/* Midground Elements (z-index smaller, smaller scale, subtle blur) */}
      <img 
        ref={mg1Ref}
        src="/logos/6.png" 
        alt="" 
        style={{
          position: 'absolute', top: '20%', left: '15%',
          width: '120px', filter: 'blur(3px)', opacity: 0.6,
          transform: 'scale(0.8)'
        }} 
      />
      <img 
        ref={mg2Ref}
        src="/logos/13.png" 
        alt="" 
        style={{
          position: 'absolute', bottom: '25%', right: '15%',
          width: '150px', filter: 'blur(2px)', opacity: 0.5,
          transform: 'scale(0.85)'
        }} 
      />

      {/* Foreground Elements (z-index larger, sharp, larger scale) */}
      <img 
        ref={fg1Ref}
        src="/logos/11.png" 
        alt="" 
        style={{
          position: 'absolute', top: '15%', right: '10%',
          width: '200px', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))'
        }} 
      />
      <img 
        ref={fg2Ref}
        src="/logos/4.png" 
        alt="" 
        style={{
          position: 'absolute', bottom: '15%', left: '8%',
          width: '240px', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))'
        }} 
      />
    </div>
  );
}
