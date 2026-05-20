// Cloudflare Worker - Reverse proxy for GitHub Pages
// Serves learning-apps content without needing VPN to access GitHub Pages

const GITHUB_PAGES = "https://ducerducer.github.io/learning-apps";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Default to index.html for root
    if (path === '/' || path === '') {
      path = '/index.html';
    }

    // Proxy to GitHub Pages
    const target = `${GITHUB_PAGES}${path}`;
    
    try {
      const response = await fetch(target, {
        method: request.method,
        headers: {
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "User-Agent": "CloudflareWorker"
        }
      });

      if (response.ok || response.status === 404) {
        // Clone response to add CORS headers
        const newHeaders = new Headers(response.headers);
        newHeaders.set("Access-Control-Allow-Origin", "*");
        newHeaders.set("Cache-Control", "public, max-age=3600");

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders
        });
      }

      return response;
    } catch (e) {
      return new Response(`Proxy error: ${e.message}`, { status: 502 });
    }
  }
};
