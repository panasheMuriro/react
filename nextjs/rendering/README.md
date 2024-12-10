# Rendering

## Static Site Generation (SSG):
Pages are generated at build time.
Content is static and remains the same until the next build.
Best for pages with infrequent updates (e.g., blogs, product pages).

## Server-Side Rendering (SSR):
Pages are generated on each request.
Content is dynamic and up-to-date.
Best for pages with frequently changing data or user-specific content.

## Client-Side Rendering (CSR):
Content is fetched and rendered in the browser after the page loads.
Provides a faster initial load but requires JavaScript to fetch data.
Best for interactive applications.


## Incremental Static Regeneration (ISR) in Next.js
Incremental Static Regeneration (ISR) allows you to update static content after a certain period without rebuilding the entire site. This combines the benefits of Static Site Generation (fast and pre-rendered pages) with the flexibility of Server-Side Rendering (dynamic updates).