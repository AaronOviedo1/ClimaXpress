# ClimaXpress — Sitio web corporativo

Sitio corporativo de **ClimaXpress**, empresa de venta e instalación de aerocoolers y calentones de agua. Construido con Next.js 14 (App Router), TypeScript y Tailwind CSS. Optimizado para SEO, mobile-first y listo para desplegar en Vercel.

---

## Stack

- **Next.js 14** (App Router, RSC server-first)
- **TypeScript**
- **Tailwind CSS** con paleta de marca personalizada
- **lucide-react** para iconos
- **next/image** + **next/font** (Inter, weights 400/500/600/700)
- **ESLint** + **Prettier** (con plugin para Tailwind)

---

## Requisitos

- Node.js ≥ 20.19 (probado con 20.x / 22.x). Funciona también en 23, pero ESLint avisa.
- npm 10+ (puedes usar pnpm/yarn/bun ajustando los scripts).

---

## Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Variables de entorno
cp .env.example .env.local
# edita .env.local con tu dominio, número de WhatsApp y email reales

# 3. Servidor de desarrollo
npm run dev
# abre http://localhost:3000

# 4. Build de producción
npm run build && npm run start

# 5. Lint + format
npm run lint
npm run format
```

---

## Variables de entorno

Definidas en [.env.example](.env.example):

| Variable                       | Descripción                                                     |
| ------------------------------ | --------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | URL pública del sitio sin slash final (ej. `https://climaxpress.com`). Usada en `metadataBase`, `sitemap.xml` y JSON-LD. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`  | Número de WhatsApp en formato internacional sin `+` (ej. `521XXXXXXXXXX`). |
| `NEXT_PUBLIC_CONTACT_EMAIL`    | Email de contacto. Fallback para el botón "Enviar correo".      |

Si no defines las variables, el código usa los placeholders de [lib/site.ts](lib/site.ts) — recuerda actualizar ese archivo o exportar las env antes de hacer deploy.

---

## Estructura

```
.
├── app/
│   ├── layout.tsx              # Metadata SEO global, JSON-LD LocalBusiness, header/footer/whatsapp
│   ├── page.tsx                # Home
│   ├── productos/
│   │   ├── page.tsx            # Catálogo general
│   │   ├── aerocoolers/page.tsx
│   │   └── calentones/page.tsx
│   ├── contacto/page.tsx
│   ├── sitemap.ts              # sitemap.xml dinámico
│   ├── robots.ts               # robots.txt dinámico
│   └── globals.css
├── components/
│   ├── layout/    (Header, Footer, MobileMenu)
│   ├── sections/  (Hero, ProductCategories, WhyUs, FeaturedProducts, ContactSection, ContactForm)
│   ├── ui/        (Button, Card, Container, SectionHeading)
│   ├── product/   (ProductCard, ProductGrid)
│   └── WhatsAppButton.tsx
├── lib/
│   ├── site.ts                 # Config global (URL, WhatsApp, socials, schema.org)
│   ├── products.ts             # Catálogo (con placeholders {{...}})
│   └── cn.ts
├── public/
│   ├── logo.png                # ← Colócalo manualmente
│   └── products/               # SVG placeholders, reemplaza con fotos reales
└── tailwind.config.ts
```

---

## Cosas a completar antes de publicar

Búscalas con `grep -R "TODO\|{{" app components lib`:

1. **Logo:** confirma que `public/logo.png` existe (formato cuadrado, mínimo 512×512).
2. **Imagen Open Graph:** agrega `public/og-image.jpg` (1200×630 px).
3. **Favicon:** opcionalmente añade `app/icon.png` o sobreescribe el ícono en `app/layout.tsx > metadata.icons`.
4. **Productos:** completa nombres, descripciones, capacidades y reemplaza los SVG placeholder en `public/products/*.svg` con imágenes reales. Si cambias el formato (`.jpg`/`.webp`), actualiza `lib/products.ts`.
5. **Datos de negocio:** edita `lib/site.ts` con:
   - Teléfono real (`telephone` en el JSON-LD de `app/layout.tsx`).
   - Dirección física (campos en `siteConfig.address`).
   - Email y número de WhatsApp.
6. **Formulario de contacto:** actualmente abre WhatsApp con el mensaje pre-formateado. Conéctalo a [Resend](https://resend.com), [Formspree](https://formspree.io) o un endpoint propio (busca `TODO: conectar a backend` en [components/sections/ContactForm.tsx](components/sections/ContactForm.tsx)).

---

## Paleta de marca

Configurada en [tailwind.config.ts](tailwind.config.ts) bajo `theme.extend.colors`:

| Token              | Hex       | Uso                                          |
| ------------------ | --------- | -------------------------------------------- |
| `brand`            | `#1E6FBA` | Azul principal (botones, gradientes, links)  |
| `brand-light`      | `#4FB3D9` | Cian claro (gradiente del hero)              |
| `brand-dark`       | `#155A99` | Azul profundo (hover/acentos)                |
| `brand-sun`        | `#F5B919` | Amarillo CTA secundario / acentos puntuales  |
| `brand-sunDark`    | `#8B2E1F` | Marrón rojizo                                |
| `ink` / `ink-muted` / `ink-soft` | `#0F172A` / `#475569` / `#94A3B8` | Texto             |
| `surface` / `surface-soft` / `surface-border`     | `#FFFFFF` / `#F8FAFC` / `#E2E8F0` | Fondos y borders |

---

## SEO incluido

- `metadataBase`, títulos templados, descripciones y keywords en cada página.
- Open Graph y Twitter Card configurados globalmente.
- **JSON-LD** tipo `LocalBusiness` inyectado en el `<head>` (ver `app/layout.tsx`).
- `app/sitemap.ts` genera `sitemap.xml` con las 5 rutas estáticas.
- `app/robots.ts` permite todo y referencia el sitemap.
- `alt` descriptivo en todas las imágenes.
- `h1` único por página con jerarquía limpia.
- Skip link "Saltar al contenido" para accesibilidad.
- Focus visible en todos los elementos interactivos.

---

## Deploy a Vercel

1. Sube el repositorio a GitHub/GitLab/Bitbucket.
2. Importa el proyecto en [vercel.com/new](https://vercel.com/new).
3. Vercel detecta Next.js automáticamente — no requiere configuración extra.
4. Configura las variables de entorno en **Project Settings → Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_CONTACT_EMAIL`
5. Haz deploy. Una vez en producción, valida con [PageSpeed Insights](https://pagespeed.web.dev) y [Rich Results Test](https://search.google.com/test/rich-results).

---

## Scripts disponibles

| Script           | Acción                                       |
| ---------------- | -------------------------------------------- |
| `npm run dev`    | Servidor de desarrollo en `localhost:3000`   |
| `npm run build`  | Build de producción                          |
| `npm run start`  | Sirve el build de producción                 |
| `npm run lint`   | ESLint con `next/core-web-vitals`            |
| `npm run format` | Formatea todo el repo con Prettier           |

---

## Notas

- El botón flotante de WhatsApp aparece en todas las páginas (esquina inferior derecha).
- La navegación móvil es un overlay full-screen accesible (cierra con `Esc`, focus visible, scroll body bloqueado).
- El formulario de contacto valida en cliente y, mientras no haya backend, abre WhatsApp con el mensaje del usuario.
- Todas las imágenes pasan por `next/image` con `sizes` y `fill` configurados para layouts responsive.
