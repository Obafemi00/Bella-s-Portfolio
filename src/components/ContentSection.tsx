'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ContentSection({ 
  title, 
  description, 
  index 
}: { 
  title: string, 
  description: string, 
  index: number 
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div 
      ref={sectionRef} 
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: isEven ? 'row' : 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '6rem',
        gap: '4rem',
        minHeight: '400px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div 
        ref={textRef}
        style={{ flex: 1 }}
      >
        <h2 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          color: 'var(--primary)',
          marginBottom: '1.5rem',
          lineHeight: 1.1
        }}>
          {title}
        </h2>
        <p style={{ 
          fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', 
          lineHeight: 1.8,
          color: 'var(--text-main)',
          opacity: 0.9,
          maxWidth: '500px'
        }}>
          {description}
        </p>
      </div>
      
      {/* Decorative Placeholder / Abstract Shape */}
      <div style={{ flex: 1, display: 'flex', justifyContent: isEven ? 'flex-end' : 'flex-start' }}>
        <div style={{
          width: '300px',
          height: '300px',
          borderRadius: isEven ? '30% 70% 70% 30% / 30% 30% 70% 70%' : '70% 30% 30% 70% / 70% 70% 30% 30%',
          background: 'radial-gradient(circle at top left, var(--primary) 0%, transparent 70%)',
          opacity: 0.2,
          border: '1px solid var(--primary)',
          filter: 'blur(10px)'
        }} />
      </div>
    </div>
  );
}
