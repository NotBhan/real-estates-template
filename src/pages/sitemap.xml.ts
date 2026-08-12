import type { APIRoute } from 'astro';
import { config } from '@/lib/config';
import { getAllProperties } from '@/data/demo-properties';

export const GET: APIRoute = async () => {
  const siteUrl = config.siteUrl.replace(/\/$/, '');
  const properties = getAllProperties();

  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/properties', priority: '0.9', changefreq: 'daily' },
    { url: '/services', priority: '0.8', changefreq: 'weekly' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
  ];

  const nowISO = new Date().toISOString();

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${nowISO}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
${properties
  .map(
    (p) => `  <url>
    <loc>${siteUrl}/properties/${p.slug}</loc>
    <lastmod>${p.updatedAt || p.createdAt || nowISO}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
