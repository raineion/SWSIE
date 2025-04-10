export const baseUrl = 'https://swsie.org'; // Update with your actual domain
export const siteName = 'Southwest Sustainability Innovation Engine Partner Directory';

export default async function sitemap() {
  // Just include the main routes without blog
  let routes = ['', '/partnership-benefits', '/analytics'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return routes;
}
