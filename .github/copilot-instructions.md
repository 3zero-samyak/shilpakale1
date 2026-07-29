# SHILPAKALE — GitHub Copilot Project Instructions

## Project purpose

Build a production-ready, story-first SHILPAKALE storefront from a clean Next.js project.

The website should present SHILPAKALE primarily as a cultural storytelling and design brand. Commerce must remain functional but visually secondary to stories, research, interpretation, objects, and ownership.

## Approved technical scope

Use only:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Shopify Storefront API
- Shopify cart and hosted checkout
- Vercel deployment
- Local TypeScript, JSON, MDX, or static content where required

## Explicit exclusions

Do not introduce:

- A custom backend
- FastAPI
- Express
- NestJS
- PostgreSQL
- MySQL
- MongoDB
- Prisma
- SQLAlchemy
- Alembic
- Firebase
- Supabase
- Custom authentication
- JWT
- Role-based access control
- Admin dashboard
- Sanity
- Contentful
- Strapi
- Razorpay
- Custom payment processing
- Shopify Admin API
- AI integrations
- Unrequested analytics or tracking libraries

Shopify is responsible for products, variants, inventory, cart, checkout, payments, orders, shipping, taxes, and discounts.

Vercel is responsible for hosting and deploying the Next.js application.

## Development rules

1. Inspect the existing project before changing files.
2. Work incrementally and do not rebuild unrelated working code.
3. Use the Next.js App Router.
4. Use TypeScript strictly.
5. Prefer React Server Components by default.
6. Use Client Components only for interactive features such as:
   - navigation menus
   - cart controls
   - galleries
   - variant selectors
   - accordions
7. Keep Shopify credentials server-side.
8. Never expose private tokens in browser code.
9. Do not use `NEXT_PUBLIC_` for confidential Shopify credentials.
10. Do not add a dependency unless it is necessary.
11. Use reusable components rather than duplicating markup.
12. Use semantic HTML and accessible controls.
13. Build mobile-first.
14. Use `next/image` for website imagery where appropriate.
15. Keep loading, empty, unavailable, and error states clear.
16. Use clean, readable file and component names.
17. Do not leave fake production functionality or unexplained TODO placeholders.
18. Do not modify multiple unrelated systems in one task.
19. Explain which files were created or changed after each task.
20. Run these checks after meaningful changes:

```bash
npm run lint
npm run build
```