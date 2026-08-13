# Product Requirements Document (PRD) — KALYA SALON

## 1. Overview & Brand Identity
- **Business Name:** KALYA SALON
- **Descriptor:** Hair Design & Treatment
- **Location:** Jl. Slamet Riyadi No.8, Klegen, Kec. Kartoharjo, Kota Madiun, Jawa Timur 63117
- **Category:** Salon Kecantikan
- **Rating:** 4.8 / 5 (284+ Google Reviews)
- **Opening Hours:** Every Day 09:00–20:00 WIB
- **Contact:** 0838-4549-4574 (WhatsApp: `6283845494574`)
- **Socials:** Instagram `@kalyasalonmadiun`, TikTok `KALYA SALON BEAUTYBAR`

---

## 2. Core Design Rules & Visual Guidelines

### 2.1 Color Palette
- **Backgrounds:** Warm Ivory (`#FFFDFC`), Marble White (`#F5F3EF`)
- **Emotional Sections:** Blush Pink (`#E8D4D4`), Soft Pink (`#F3E7E7`)
- **Accents:** Champagne Gold (`#C9A45C`), Soft Gold (`#D8B96C`)
- **Typography & Dark Contrast:** Dark Brown (`#5A4635`), Charcoal (`#292522`)

### 2.2 Typography
- **Headings & Display:** Playfair Display
- **Body & Captions:** Manrope

### 2.3 Strict Icon & Logo Rules
> [!IMPORTANT]
> **NO SPARKLE ICONS RULE:**
> Dilarang keras menggunakan icon atau logo bertema **Sparkle / Sparkles** (`<Sparkle />`, `<Sparkles />`, `WandSparkles`, dll.) di seluruh bagian website ini.
>
> **Alasan & Arah Desain:**
> - Kalya Salon mengusung estetika salon kecantikan mewah, elegan, editorial, dan profesional (*Quiet Luxury & Warm Editorial*).
> - Icon sparkle memberikan kesan "AI-generated generic template", "magic/gimmick", atau "childish" yang bertolak belakang dengan identitas salon profesional.
> - Sebagai pengganti, gunakan elemen visual premium seperti:
>   - Garis aksen tipis champagne-gold (*gold dividers / accent rules*)
>   - Dot/bullet aksen minimalis
>   - Ikon fungsional yang relevan (`Scissors`, `Sparkle` diganti `CheckCircle2`, `Award`, `HeartHandshake`, `UserCheck`, `ShieldCheck`, `Calendar`, `Clock`, `MapPin`, `Phone`, `MessageSquare`, `ArrowRight`, `ArrowUpRight`, `Star`, `Quote`)
>   - Tipografi editorial dan bingkai lengkung (*architectural arch*) yang bersih.

### 2.4 Architectural Motif
- Cermin lengkung (*arch shape*) sebagai bingkai foto dan dekorasi halus khas interior fisik Kalya Salon.

---

## 3. Technical Architecture
- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript (Strict)
- **Styling:** Tailwind CSS v4
- **UI System:** shadcn/ui primitives + Lucide React
- **Animation:** Motion for React (subtle 300–600ms transitions, no excessive bounce/particles)
- **Data Source:** Static business data in `/data/` and constants in `/lib/`
