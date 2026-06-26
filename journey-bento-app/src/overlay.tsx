import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import MagicBento, { type BentoCardProps } from './MagicBento.tsx';
import bentoCss from './MagicBento.css';

const JOURNEY_CARDS: BentoCardProps[] = [
  {
    color: '#120F17',
    label: 'STRATEGY',
    title: 'London',
    description:
      'Strategy & Commercial Thinking — Built a foundation in business strategy, market research, and commercial analysis. Developed the ability to identify opportunities, evaluate markets, and transform insights into practical business decisions.'
  },
  {
    color: '#120F17',
    label: 'OPERATIONS',
    title: 'Dubai',
    description:
      'Building From Zero — Supported the end-to-end setup of international business operations, including company formation, banking, compliance, operational design, and execution across cross-border environments.'
  },
  {
    color: '#120F17',
    label: 'EXPANSION',
    title: 'Singapore',
    description:
      'Regional Growth & Market Expansion — Supported partnership development, go-to-market execution, and regional business expansion by coordinating stakeholders and adapting strategies across international markets.'
  },
  {
    color: '#120F17',
    label: 'RELATIONSHIPS',
    title: 'Istanbul',
    description:
      'Cross-Cultural Relationship Building — Built trusted relationships with international partners through communication, negotiation, stakeholder management, and long-term collaboration across different cultures.'
  },
  {
    color: '#120F17',
    label: 'AI',
    title: 'Paris',
    description:
      'AI-Powered Product Building — Combined business thinking with AI-assisted development to build digital products, automate workflows, improve customer experiences, and transform ideas into scalable solutions.'
  }
];

let root: Root | null = null;
let cssInjected = false;

function injectStyles() {
  if (cssInjected) return;
  const style = document.createElement('style');
  style.textContent = bentoCss;
  document.head.appendChild(style);
  cssInjected = true;
}

function JourneyBentoApp() {
  return (
    <MagicBento
      cards={JOURNEY_CARDS}
      gridClassName="journey-bento-grid"
      textAutoHide={true}
      enableStars={true}
      enableSpotlight={true}
      enableBorderGlow={true}
      enableTilt={true}
      enableMagnetism={true}
      clickEffect={true}
      spotlightRadius={300}
      particleCount={12}
      glowColor="201, 168, 76"
    />
  );
}

export async function mountJourneyBento(container: HTMLElement) {
  injectStyles();
  if (!root) root = createRoot(container);
  root.render(<JourneyBentoApp />);
}

export function unmountJourneyBento() {
  if (root) {
    root.unmount();
    root = null;
  }
}
