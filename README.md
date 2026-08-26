# Vishal Web World

CSC 2.0 digital services centre website — government forms, documents, banking
and scheme applications.

## Development

Requires Node.js 18.18+.

```sh
npm install
npm run dev
```

The dev server runs at http://localhost:3000.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — ESLint

## Structure

```
src/app/          Next.js App Router pages (one folder per route)
src/components/   UI + section components
src/data/         Static service, scheme and testimonial data
src/lib/          Small shared helpers
public/           Static assets served from /
```

## Built with

- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS v4
- GSAP + Lenis (scroll animations)
# vishalwebworld
