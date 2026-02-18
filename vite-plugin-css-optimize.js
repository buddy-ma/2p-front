/**
 * Vite plugin to optimize CSS loading by deferring non-critical CSS
 * This runs after Vite injects CSS files, so it will optimize the injected CSS
 */
export function cssOptimizePlugin() {
  return {
    name: 'css-optimize',
    transformIndexHtml: {
      order: 'post', // Run after Vite's default HTML transform
      handler(html, ctx) {
        // Find all stylesheet links (including those injected by Vite) and make them load asynchronously
        return html.replace(
          /<link([^>]*rel=["']stylesheet["'][^>]*)>/gi,
          (match, attrs) => {
            // Skip if already has media="print" or is a font stylesheet
            if (attrs.includes('media="print"') || attrs.includes('fonts.googleapis.com') || attrs.includes('preload')) {
              return match;
            }
            // Add media="print" and onload to defer CSS loading
            // Keep crossorigin if present
            const crossorigin = attrs.includes('crossorigin') ? ' crossorigin' : '';
            return `<link${attrs} media="print" onload="this.media='all'"${crossorigin}><noscript>${match}</noscript>`;
          }
        );
      }
    }
  };
}
