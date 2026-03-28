'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(headlineRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    ).fromTo(subheadlineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh', position: 'relative' }}
    >
      {/* Background Video */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          backgroundColor: '#000'
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
        >
          <source src="/3D Animation/3D Product Animation Headphones Blender.mp4" type="video/mp4" />
        </video>
        {/* Subtle Dark / Primary Tint Overlay */}
        <div 
          style={{ 
            position: 'absolute', inset: 0, 
            backgroundColor: 'var(--primary)', 
            opacity: 0.1, 
            mixBlendMode: 'overlay' 
          }} 
        />
        <div 
          style={{ 
            position: 'absolute', inset: 0, 
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.8) 100%)' 
          }} 
        />
      </div>

      {/* Hero Content */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '800px',
          padding: '0 2rem'
        }}
      >
        <h1 
          ref={headlineRef}
          style={{ 
            fontSize: 'clamp(3rem, 8vw, 6rem)', 
            lineHeight: 1.1, 
            marginBottom: '1.5rem',
            color: 'var(--text-main)',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            opacity: 0 // initial state for GSAP
          }}
        >
          Crafting Digital<br/><span style={{ color: 'var(--primary)' }}>Dimensions.</span>
        </h1>
        <p 
          ref={subheadlineRef}
          style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', 
            color: 'var(--text-main)', 
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          Dollhouse Studios: Where Branding meets the fluid motion of 2D and 3D storytelling.
        </p>
      </div>
    </section>
  );
}
