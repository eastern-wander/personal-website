import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import Lanyard from './Lanyard.tsx';
import lanyardCss from './Lanyard.css';

let root: Root | null = null;
let cssInjected = false;
let photoClickHandler: (() => void) | null = null;

function injectStyles() {
  if (cssInjected) return;
  const style = document.createElement('style');
  style.textContent = lanyardCss;
  document.head.appendChild(style);
  const heroStyle = document.createElement('style');
  heroStyle.textContent = `
    .lanyard-hero-canvas { width: 100%; height: 100%; overflow: hidden; }
    .lanyard-hero-canvas .lanyard-wrapper {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      padding: 4% 0 0 0;
      transform-origin: top right;
    }
    .lanyard-hero-canvas canvas {
      width: 100% !important;
      height: 100% !important;
    }
  `;
  document.head.appendChild(heroStyle);
  cssInjected = true;
}

async function buildCardFrontImage(): Promise<string> {
  const portraitUrl = '/public/portrait.png';
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.crossOrigin = 'anonymous';
    el.onload = () => resolve(el);
    el.onerror = reject;
    el.src = portraitUrl;
  });

  const W = 1024;
  const H = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, W, H);

  const headerHeight = 190;
  ctx.fillStyle = '#f0ede6';
  ctx.font = 'bold 112px Inter, Helvetica, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('XIA', W / 2, 112);

  ctx.fillStyle = '#c9a84c';
  ctx.font = '500 22px Inter, Helvetica, Arial, sans-serif';
  ctx.fillText('BUSINESS DEVELOPMENT · STRATEGY', W / 2, 158);

  const photoTop = headerHeight;
  const photoHeight = H - photoTop;
  const scale = Math.max((W - 80) / img.width, photoHeight / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  const dx = (W - dw) / 2;
  const dy = photoTop + Math.min(0, (photoHeight - dh) / 2) + 18;
  ctx.save();
  ctx.beginPath();
  ctx.rect(40, photoTop, W - 80, photoHeight);
  ctx.clip();
  ctx.drawImage(img, dx, dy, dw, dh);
  ctx.restore();

  return canvas.toDataURL('image/png');
}

function HeroLanyardApp({ frontImage }: { frontImage: string }) {
  return (
    <div className="lanyard-hero-canvas">
      <Lanyard
        position={[1.2, 0, 22]}
        gravity={[0, -40, 0]}
        fov={19}
        transparent={true}
        frontImage={frontImage}
        imageFit="cover"
        lanyardWidth={1}
        onCardClick={() => photoClickHandler?.()}
      />
    </div>
  );
}

export type LanyardMountOptions = {
  onPhotoClick?: () => void;
};

export async function mountHeroLanyard(container: HTMLElement, options?: LanyardMountOptions) {
  injectStyles();
  photoClickHandler = options?.onPhotoClick ?? null;
  const frontImage = await buildCardFrontImage();
  if (!root) root = createRoot(container);
  root.render(<HeroLanyardApp frontImage={frontImage} />);
}

export function unmountHeroLanyard() {
  if (root) {
    root.unmount();
    root = null;
  }
  photoClickHandler = null;
}
