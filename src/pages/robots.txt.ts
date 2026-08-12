import type { APIRoute } from 'astro';
import { config } from '@/lib/config';

export const GET: APIRoute = async () => {
  const siteUrl = config.siteUrl.replace(/\/$/, '');

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
