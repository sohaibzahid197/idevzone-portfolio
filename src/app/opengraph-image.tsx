/**
 * Generates the 1200x630 social card at /opengraph-image, wired up from the
 * metadata in layout.tsx. Satori (behind ImageResponse) needs an explicit
 * `display: flex` on every element and has no access to the next/font CSS
 * variables, so this stays on the built-in default font.
 */

import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site-config';

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0a0a0a',
          color: '#f2f2f2',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, letterSpacing: '0.18em', color: '#3b82f6' }}>
          {siteConfig.brand}
        </div>
        <div style={{ display: 'flex', fontSize: 88, fontWeight: 700, marginTop: 28, letterSpacing: '-0.03em' }}>
          {siteConfig.name}
        </div>
        <div style={{ display: 'flex', fontSize: 40, marginTop: 20, color: '#999999' }}>
          {siteConfig.role}
        </div>
        <div style={{ display: 'flex', width: 160, height: 6, marginTop: 56, background: '#3b82f6', borderRadius: 3 }} />
      </div>
    ),
    { ...size }
  );
}
