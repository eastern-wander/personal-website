import * as esbuild from 'esbuild';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../public/journey');

await mkdir(outDir, { recursive: true });

await esbuild.build({
  entryPoints: [path.resolve(__dirname, 'src/overlay.tsx')],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  outfile: path.join(outDir, 'journey-bento.js'),
  target: ['es2020'],
  jsx: 'automatic',
  jsxImportSource: 'react',
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
    '.css': 'text'
  },
  define: { 'process.env.NODE_ENV': '"production"' },
  minify: true,
  sourcemap: true
});

console.log('Built journey bento to public/journey/journey-bento.js');
