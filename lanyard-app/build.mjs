import * as esbuild from 'esbuild';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../public/lanyard');

await mkdir(outDir, { recursive: true });

// Copy static assets for runtime URL resolution
await esbuild.build({
  entryPoints: [path.resolve(__dirname, 'src/overlay.tsx')],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  outfile: path.join(outDir, 'lanyard-overlay.js'),
  target: ['es2020'],
  jsx: 'automatic',
  jsxImportSource: 'react',
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
    '.css': 'text',
    '.glb': 'file',
    '.png': 'file'
  },
  assetNames: 'assets/[name]-[hash]',
  define: { 'process.env.NODE_ENV': '"production"' },
  minify: true,
  sourcemap: true
});

// Copy portrait for card generation at runtime
import { copyFile } from 'node:fs/promises';
await copyFile(
  path.resolve(__dirname, '../public/portrait.png'),
  path.join(outDir, 'portrait.png')
);

console.log('Built lanyard overlay to public/lanyard/lanyard-overlay.js');
