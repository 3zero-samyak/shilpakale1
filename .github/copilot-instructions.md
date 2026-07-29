@'
# SHILPAKALE - GitHub Copilot Project Instructions

## Project purpose

Build a production-ready, story-first SHILPAKALE storefront from a clean Next.js project.

SHILPAKALE must be presented primarily as a cultural storytelling and design brand. Commerce must remain functional but visually secondary to stories, research, interpretation, objects, and ownership.

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

- Custom backend services
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
- Admin dashboards
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
2. Work incrementally.
3. Do not rebuild unrelated working code.
4. Use the Next.js App Router.
5. Use strict TypeScript.
6. Prefer React Server Components by default.
7. Use Client Components only where browser interaction is required.
8. Keep Shopify credentials server-side.
9. Never expose confidential tokens in browser code.
10. Do not use NEXT_PUBLIC_ for confidential Shopify credentials.
11. Do not add dependencies unless necessary.
12. Use reusable components instead of duplicated markup.
13. Use semantic HTML and accessible controls.
14. Build mobile-first.
15. Use next/image where appropriate.
16. Include clear loading, empty, unavailable, and error states.
17. Use clean and descriptive file names.
18. Do not leave fake production functionality.
19. Do not perform unrelated refactoring.
20. Explain every file created or modified.

## Brand rule

Do not invent the visual system, page structure, copy, navigation, product presentation, or interaction style.

These requirements will be supplied section by section and must be implemented precisely.

The previous website ZIP is reference material only. Do not copy its code, dependencies, or technical architecture.

## Product photography rule

When using approved SHILPAKALE product photographs:

- Preserve the exact approved product exterior.
- Do not alter geometry, proportions, relief details, colours, materials, markings, quantity, or structural details.
- Background, lighting, crop, angle, and composition may change only when specifically requested.

## Shopify rule

Use the Shopify Storefront API only for customer-facing commerce.

Expected features may include:

- Product fetching
- Collection fetching
- Variant selection
- Availability
- Cart creation
- Add to cart
- Quantity updates
- Remove from cart
- Shopify-hosted checkout redirect

Do not build custom order, inventory, customer, shipping, payment, or checkout systems.

## Working method

For every implementation request:

1. State which files will be affected.
2. Inspect existing files.
3. Implement only the requested scope.
4. Avoid unrelated changes.
5. Run verification.
6. Summarize:
   - files created
   - files modified
   - behaviour implemented
   - remaining placeholders
   - verification results

## Required verification

After meaningful changes, run:

npm run lint
npm run build
'@ | Set-Content -Encoding utf8 .github\copilot-instructions.md