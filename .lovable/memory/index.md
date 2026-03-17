ABUAD Law Department platform - light/white university website with ABUAD red/navy branding.

## Design System
- Colors: White base (#FFFFFF), light gray surface (#F5F7FA), navy accent (#2C266C), red primary (#DC2727)
- Hero/Footer: Dark navy (#2C266C / #1A1A2E) backgrounds with white text
- Cards: White bg, #E5E7EB border, subtle shadow, red top border on hover
- Primary = red (#DC2727), Secondary = navy (#2C266C)
- Fonts: Cormorant Garamond (display), Libre Baskerville (headings), Lora (body), DM Sans (UI), JetBrains Mono (code)
- Border radius: 4px cards, 2px buttons
- Transitions: 200ms ease-out
- Section rules: 2px red lines under section headings

## Architecture
- Public website with Navbar/Footer layout, 10 pages
- Admin dashboard at /admin/* with sidebar layout, auth-protected
- Supabase backend: 6 tables (executives, lecturers, announcements, gallery_images, timetable_entries, site_settings)
- 4 storage buckets: executive-photos, lecturer-photos, gallery-images, announcement-images
- All data fetching via TanStack Query, forms via React Hook Form + Zod
- Types in src/types/index.ts, validation in src/lib/validation.ts

## Key decisions
- Admin = any authenticated Supabase user (no roles table needed)
- Platform never processes payments, display-only
- Students never create accounts
- Navbar: white bg, red "AFE BABALOLA" + navy "LAW" logo text
- Footer: dark #1A1A2E bg, red horizontal rules above columns
