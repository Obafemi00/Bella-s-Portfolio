import React from 'react';
import Hero from '@/components/Hero';
import FloatingElements from '@/components/FloatingElements';
import ContentSection from '@/components/ContentSection';

export default function Home() {
  const sections = [
    {
      title: "Identity with Intent.",
      description: "We build brands that don't just exist—they breathe."
    },
    {
      title: "Motion that Matters.",
      description: "Specializing in high-fidelity 3D product visualization and expressive 2D character work."
    },
    {
      title: "The Future of Footage.",
      description: "Integrating AI-driven video workflows to push the boundaries of modern content creation."
    }
  ];

  return (
    <main style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
      <FloatingElements />
      <Hero />
      
      <section className="section-padding">
        {sections.map((section, index) => (
          <ContentSection 
            key={index}
            index={index}
            title={section.title}
            description={section.description}
          />
        ))}
      </section>
    </main>
  );
}
