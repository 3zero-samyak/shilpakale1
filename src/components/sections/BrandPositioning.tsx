"use client";

import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const BRAND_POSITION_COPY = `SHILPAKALE traces the intelligence embedded in places, materials, systems, and traditions. Each object begins with research and is shaped through evidence, context, and present relevance. The result is not generic décor, but a considered physical archive. Every form is designed to preserve a story with precision, restraint, and permanence. Together, these objects create a collectible record of ideas that continue to shape the present. SHILPAKALE exists to turn researched narratives into forms worthy of being kept.`;

export default function BrandPositioning() {
  return (
    <section
      className="brand-position-illustration-section"
      aria-label="SHILPAKALE brand position"
    >
      {/* Accessible paragraph for screen readers and SEO */}
      <p className="sr-only">{BRAND_POSITION_COPY}</p>

      <ScrollReveal direction="up" distance={20} duration={800} threshold={0.2}>
        <div className="brand-position-illustration-wrapper">
          <Image
            src="/images/brand/bp.jpg"
            alt="Archival SHILPAKALE illustration of a large tree sheltering two seated figures, with a sunrise and historic architecture in the distance"
            width={1600}
            height={1200}
            sizes="100vw"
            className="brand-position-illustration-image block w-full h-auto"
            priority={false}
            quality={90}
          />

          <div className="brand-position-copy-overlay" aria-label="Brand positioning statement">
            <p className="brand-position-line">SHILPAKALE traces forgotten stories through evidence, context, and craft.</p>
            <p className="brand-position-line">We translate their intelligence into objects shaped for the present.</p>
            <p className="brand-position-line brand-position-line-strong">Not replicas. Not décor. Physical archives meant to be kept.</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
