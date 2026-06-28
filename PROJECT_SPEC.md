# 🚀 AI Project Specification — M8LA Portfolio

## 🧠 Overview

Portfolio web di **Mario Mottola (M8LA)** — Full-stack Developer, 17 anni, Brescia.
Esperienza immersiva single-page con sfondo interattivo a griglia di quadrati, scroll fluido e design futuristico.

---

## 👤 Identità

| Campo       | Valore                        |
|-------------|-------------------------------|
| Nome reale  | Mario Mottola                 |
| Brand       | **M8LA**                      |
| Ruolo       | Full-stack Developer          |
| Città       | Brescia, Italia               |
| Formazione  | ITIS Castelli – 5° anno       |

### Profilo / Bio

> Sono Mario Mottola, studente di 17 anni appassionato di sviluppo web e tecnologia.
> Mi piace progettare e realizzare soluzioni software funzionali, curate nei dettagli e orientate all'efficienza.
> Sono una persona curiosa, determinata e interessata anche al mondo dell'intelligenza artificiale.
> Programmo spesso con la musica in sottofondo, che fa parte del mio processo creativo.

---

## 🎯 Obiettivi del sito

- Presentare M8LA come developer serio e distintivo
- Mostrare progetti reali (scolastici, personali e industriali)
- Trasmettere identità forte tramite design futuristico
- Offrire un punto di contatto professionale

---

## ⚙️ Stack Tecnologico

| Layer        | Tecnologia                     |
|--------------|--------------------------------|
| Framework    | Next.js 14+ (App Router)       |
| Linguaggio   | TypeScript                     |
| Stile        | CSS Modules + CSS custom puro  |
| Animazioni   | Framer Motion                  |
| Scroll       | Lenis (smooth scroll)          |
| Rendering    | Canvas API (background custom) |
| DB / ORM     | Prisma (non usato nel sito statico, ma conoscenza da mostrare) |

---

## 🎨 Design System

### Palette

```css
--rich-mahogany:   #250902;
--rich-mahogany-2: #38040e;
--black-cherry:    #640d14;
--dark-wine:       #800e13;
--brown-red:       #ad2831;
```

### Stile

- Dark, elegante, futuristico
- Background scuri dominanti
- Elementi UI traslucidi con glass effect
- Geometrie quadrate come pattern ricorrente (coerenza con GridCanvas)
- Font moderno: `Inter` o `Space Grotesk`

---

## 🧱 Architettura

```
/app
  layout.tsx          ← Layout globale con GridCanvas + Lenis
  page.tsx            ← Composizione sezioni
/components
  /background
    GridCanvas.tsx    ← Canvas interattivo (CORE FEATURE)
  /sections
    Hero.tsx
    About.tsx
    Skills.tsx
    Experience.tsx
    Projects.tsx
    Contact.tsx
  /ui
    Button.tsx
    Card.tsx
    Tag.tsx
/styles
  globals.css         ← variabili CSS, reset, font, utility globali
  /components         ← (generati automaticamente come Hero.module.css ecc.)
/lib
  constants.ts        ← dati statici (projects, experience, skills)
```

---

## 📄 Sezioni

### 1. Hero

**Headline:**
```
Building digital solutions that work.
```

**Subheadline:**
```
Full-stack Developer — Next.js, TypeScript, Prisma.
Studente, builder, appassionato di tecnologia.
```

**CTA:**
- `Vedi i progetti` → scroll a Projects
- `Contattami` → scroll a Contact

**Animazione:** fade-in + slide-up all'entrata, staggered sui 3 elementi

---

### 2. About

**Contenuto:**
Breve card traslucida con bio completa (vedi sezione Identità).

**UI:** glass card, blur background, icona/avatar opzionale (iniziale M o logo M8LA)

---

### 3. Skills

**Categorie e tecnologie:**

| Frontend         | Backend / DB         | Tools & Other         |
|------------------|----------------------|-----------------------|
| Next.js          | Node.js              | Git / GitHub          |
| React            | Prisma               | Arduino               |
| TypeScript       | SQL                  | Python (base)         |
| Tailwind CSS     | REST API             | NFC / IoT             |
| Framer Motion    | —                    | Progettazione 3D      |
| HTML / CSS / JS  | —                    | —                     |

**UI:** grid di badge/card con hover interattivo e reveal animato

---

### 4. Experience

#### Stagista — Trim Informatica
- **Periodo:** Estate 2025
- **Descrizione:** Prima esperienza lavorativa in ambito IT, contatto con ambienti professionali e processi aziendali.

#### Web Developer / IT — G&B & LCS
- **Periodo:** Inverno 2025
- **Descrizione:** Sviluppo di software e strumenti interni per ottimizzare i processi aziendali. Collaborazione con LCS per la piattaforma estudentsleague.com.

#### Stagista (retribuito) — G&B
- **Periodo:** Estate 2026
- **Descrizione:** Stage retribuito in contesto professionale. Continuazione del lavoro su tool interni e sviluppo web.

**UI:** timeline verticale, card per ogni voce, animazione al reveal

---

### 5. Projects

> Mostrare prima i 3 principali, poi sezione "altri progetti" collassabile opzionale.

---

#### ⭐ Lega Calcio Studenti (LCS)
- **Descrizione:** Piattaforma per la gestione di un torneo di calcio tra licei italiani. Valorizza lo sport nel contesto scolastico, con opportunità formative per gli studenti.
- **Stack:** Next.js, TypeScript
- **Anno:** 2025
- **Link live:** https://estudentsleague.com
- **GitHub:** https://github.com/molecup/frontend-lcs
- **Tag:** `Freelance` `Web` `Sport`

---

#### ⭐ SchoolFanta
- **Descrizione:** App di fantacalcio dedicata agli studenti delle scuole superiori. In sviluppo attivo.
- **Stack:** Next.js, TypeScript
- **Anno:** 2026
- **Link live:** https://schoolfanta.app
- **GitHub:** https://github.com/m8lamario/schoolfanta
- **Tag:** `In sviluppo` `Web App` `Sport`

---

#### ⭐ AirSense
- **Descrizione:** Dashboard IoT per monitoraggio ambientale con Arduino. I dati vengono inviati via socket Python e visualizzati in tempo reale su web.
- **Stack:** Arduino, Python, Web Dashboard
- **Anno:** 2026
- **Link live:** https://air-sense-zeta.vercel.app
- **GitHub:** https://github.com/m8lamario/AirSense
- **Tag:** `IoT` `Arduino` `Scolastico`

---

#### S400-Call *(industria)*
- **Descrizione:** Software per linee di assemblaggio industriale. Permette agli operatori di richiedere materiale e aggiorna automaticamente le scorte e il magazzino.
- **Stack:** HTML, CSS, JavaScript, SQL
- **Anno:** 2026
- **Tag:** `Industriale` `Desktop` `Interno`

---

#### Sentinella Utensili *(industria)*
- **Descrizione:** Web app per monitoraggio dell'usura di utensili su macchine CNC. Acquisisce dati via rete, calcola l'usura in tempo reale e segnala le sostituzioni.
- **Stack:** Next.js
- **Anno:** 2026
- **Tag:** `Industriale` `CNC` `Real-time`

---

#### Tracciamento Cassette NFC
- **Descrizione:** Sistema per tracciare cassette con pezzi tramite tag NFC. Include progettazione e stampa 3D di contenitori in policarbonato per ambienti industriali (fino a ~90°C).
- **Stack:** Next.js, NFC, progettazione 3D
- **Anno:** 2026
- **GitHub:** https://github.com/m8lamario/TracciamentoCassette
- **Tag:** `NFC` `IoT` `3D` `Industriale`

---

### 6. Contact

| Canale     | Valore / Link                                             |
|------------|-----------------------------------------------------------|
| Email      | mario.m8la@gmail.com                                      |
| LinkedIn   | https://www.linkedin.com/in/mario-mottola-250218306/      |
| GitHub     | https://github.com/m8lamario/                             |
| Instagram  | @mariom8la                                                |

**UI:** minimal, centrato, CTA chiaro per email + icone social

---

## 🔹 STEP-BY-STEP TASK LIST (per AI / sviluppo)

### STEP 1 — Setup progetto
- Crea progetto Next.js 14 con App Router e TypeScript
- Installa: `framer-motion`, `lenis`, `@types/node`
- CSS Modules attivi di default in Next.js — nessuna configurazione extra necessaria
- Configura struttura cartelle come da architettura

### STEP 2 — Layout globale
- Crea `layout.tsx` con `<GridCanvas />` in background fisso
- Inizializza Lenis per smooth scroll
- Imposta font (`Space Grotesk` o `Inter`) via `next/font` + `globals.css`

### STEP 3 — GridCanvas (CORE)
- Canvas full-screen con griglia di quadrati
- Ogni quadrato scala in base alla distanza dal mouse:
  ```
  scale = maxScale - (distance * falloff)
  ```
- Interpolazione per smoothness (lerp)
- `requestAnimationFrame` per loop
- Responsive: meno quadrati su mobile
- Effetti: glow leggero vicino al mouse, gradiente dimensionale

### STEP 4 — Hero Section
- Titolo, subheadline, 2 CTA
- Animazione staggered (fade + slide-up) con Framer Motion

### STEP 5 — About
- Card traslucida con glass effect
- Bio da `constants.ts`

### STEP 6 — Skills
- Grid di badge per categoria
- Animazione al reveal (viewport)

### STEP 7 — Experience
- Timeline verticale
- Dati da `constants.ts`
- Animazione al reveal

### STEP 8 — Projects
- Grid responsive (2 col desktop, 1 col mobile)
- Card con: titolo, descrizione, stack, link, tag
- Hover: zoom + overlay con link
- Sezione "altri progetti" collassabile (opzionale)

### STEP 9 — Contact
- Layout minimal centrato
- Link diretti email + social icons

### STEP 10 — Animazioni globali
- Lenis smooth scroll attivo globalmente
- Framer Motion: `useInView` per reveal sezioni
- Stagger sugli elementi nelle sezioni Skills e Projects

### STEP 11 — Loader iniziale
- Schermata full-screen con logo M8LA
- Animazione con quadrati (coerente con GridCanvas)
- Durata: 1.5s + fade-out fluido

### STEP 12 — Ottimizzazione
- Ridurre densità griglia su mobile
- Throttle eventi mouse su canvas
- Lazy load sezioni pesanti

### STEP 13 — UX Refinement
- Controllare contrasto testo su background scuro
- Verificare hover state su tutti gli elementi interattivi
- Test responsività su 375px, 768px, 1440px con media query CSS

---

## 🧠 Linee guida per AI

- Usare solo le librerie indicate nello stack
- Tutti i dati statici (progetti, esperienze, skills) in `/lib/constants.ts`
- Componenti modulari e riutilizzabili
- Stile con CSS Modules per ogni componente + variabili CSS globali in `globals.css`
- Nessun layout rigido — usare CSS Grid e Flexbox con unità relative (rem, %, vw/vh)
- Animazioni: mai blokking, sempre fluide
- Canvas: ottimizzare per non bloccare il main thread
- Commenti in italiano o inglese (coerenti)

---

## ✅ Output Atteso

- Progetto Next.js funzionante e deployabile su Vercel
- Background interattivo GridCanvas attivo su tutte le sezioni
- Contenuti reali di M8LA integrati
- Design coerente con palette dark-wine
- Esperienza fluida e memorabile

---

*Spec preparata per Mario Mottola — M8LA — Giugno 2026*
