import { baseUrl, siteName } from 'app/sitemap';

export async function GET() {
  // Create a simple RSS feed without blog posts
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>${siteName}</title>
        <link>${baseUrl}</link>
        <description>Updates and news from the Southwest Sustainability Innovation Engine Partner Directory</description>
        <!-- Blog content will be added in the future -->
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
