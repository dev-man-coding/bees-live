# Bees Live – Projektplan & Entwicklungsdokumentation

> Diese Dokumentation dient als Grundlage für die Entwicklung des Browserspiels **Bees Live** und richtet sich an Entwickler und KI-Agenten, die das Projekt weiterentwickeln.

---

## 1. Spielkonzept (Game Design Document)

### 1.1 Kurzbeschreibung

**Bees Live** ist ein einfaches 2D-Browserspiel mit Top-Down-Perspektive. Der Spieler steuert eine Biene über eine Blumenwiese, sammelt Blütenstaub (Pollen) von Blumen ein und erhält dafür Punkte. Ein ablaufender Countdown-Timer sorgt für Zeitdruck. Am Ende wird der erreichte Punktestand angezeigt.

### 1.2 Spielmechaniken

| Mechanik | Beschreibung |
|----------|-------------|
| **Steuerung** | Tastatur (WASD oder Pfeiltasten) oder Maus/Touch für die Bewegung der Biene |
| **Pollen sammeln** | Biene bewegt sich zu einer Blume → Blume leuchtet auf → Pollen werden eingesammelt → Punkte werden addiert |
| **Blumenregenerierung** | Gesammelte Blumen regenerieren nach einer bestimmten Zeit und können erneut besucht werden |
| **Timer** | Countdown von z. B. 60 Sekunden; wenn der Timer 0 erreicht, endet die Runde |
| **Punktesystem** | Jede gesammelte Blume gibt Punkte (z. B. +10); Combo-Bonus möglich bei schnellem Wechsel zwischen Blumen |
| **Game Over** | Nach Ablauf des Timers wird der Endstand angezeigt; Option zum Neustart |

### 1.3 Spielablauf

```
[Start-Bildschirm]
       ↓
[Spielfeld laden – Biene + Blumen erscheinen]
       ↓
[Countdown startet (z. B. 60 s)]
       ↓
[Spieler steuert Biene von Blume zu Blume]
       ↓
[Blumen sammeln → Punkte steigen]
       ↓
[Timer läuft ab]
       ↓
[Game-Over-Bildschirm mit Punktestand]
       ↓
[Neustart oder Bestenliste]
```

### 1.4 Visueller Stil

- Niedliches, farbenfrohes 2D-Pixel-Art- oder Cartoon-Design
- Hintergrund: grüne Wiese mit Texturtiling
- Biene: animierter Sprite (Flügelanimation, Bewegungsrichtung)
- Blumen: mehrere Typen mit unterschiedlichen Farben; Lichteffekt beim Sammeln
- UI: Punkte oben links, Timer oben rechts, großer Schriftzug am Ende

---

## 2. Technologie-Stack

### 2.1 Begründung der Technologiewahl

Für ein modernes, wartbares Browserspiel werden folgende Technologien empfohlen:

| Kategorie | Technologie | Version | Begründung |
|-----------|------------|---------|-----------|
| **Sprache** | TypeScript | `^5.x` | Typsicherheit, bessere IDE-Unterstützung, weniger Laufzeitfehler |
| **Game Engine** | [Phaser 3](https://phaser.io/) | `^3.80` | Meistgenutzte HTML5-Spielebibliothek; vollständige 2D-Engine mit Physics, Animation, Input, Audio |
| **Build-Tool** | [Vite](https://vitejs.dev/) | `^6.x` | Blitzschneller Dev-Server mit HMR, optimierter Production-Build, native ES-Modules |
| **Testing** | [Vitest](https://vitest.dev/) | `^2.x` | Nahtlose Vite-Integration, Jest-kompatible API, schnelle Ausführung |
| **Linting** | [ESLint](https://eslint.org/) + [typescript-eslint](https://typescript-eslint.io/) | aktuell | Statische Codeanalyse für TypeScript |
| **Formatierung** | [Prettier](https://prettier.io/) | `^3.x` | Konsistente Code-Formatierung |
| **Paketmanager** | [npm](https://www.npmjs.com/) | `>=10` | Standard; alternativ pnpm für schnellere Installs |

### 2.2 Warum Phaser 3?

- **Battle-tested**: Phaser ist die mit Abstand am weitesten verbreitete HTML5-Spielebibliothek
- **Feature-vollständig**: Integrierte Physik (Arcade Physics für dieses Spiel ideal), Animationssystem, Tilemap-Support, Input-Management, Audiomanager
- **TypeScript-Support**: Offizielle Type Definitions vorhanden
- **Szenensystem**: Trennung von Logik in wiederverwendbare Szenen (Boot, Preload, Game, GameOver)
- **Große Community**: Viele Beispiele, Tutorials, aktive Weiterentwicklung

---

## 3. Projektstruktur

```
bees-live/
├── docs/
│   └── PLAN.md               ← Diese Dokumentation
├── public/
│   └── assets/
│       ├── images/
│       │   ├── bee.png        ← Bienen-Sprite (Spritesheet)
│       │   ├── flower_*.png   ← Blumen-Sprites
│       │   └── grass_bg.png   ← Hintergrundtextur
│       ├── audio/
│       │   ├── collect.mp3    ← Sound beim Pollen sammeln
│       │   └── bgm.mp3        ← Hintergrundmusik
│       └── favicon.ico
├── src/
│   ├── main.ts               ← Phaser-Game-Konfiguration + Einstiegspunkt
│   ├── config.ts             ← Globale Spielkonstanten (Spielbreite, Timer, Punkte etc.)
│   ├── scenes/
│   │   ├── BootScene.ts      ← Minimales Laden, Weiterleitungslogik
│   │   ├── PreloadScene.ts   ← Alle Assets laden + Ladebalken
│   │   ├── MenuScene.ts      ← Startbildschirm
│   │   ├── GameScene.ts      ← Hauptspiellogik
│   │   └── GameOverScene.ts  ← Endbildschirm mit Punktestand
│   ├── objects/
│   │   ├── Bee.ts            ← Bienen-Klasse (Bewegung, Animation, Kollision)
│   │   └── Flower.ts         ← Blumen-Klasse (Zustand: frisch/gesammelt/regeneriert)
│   └── ui/
│       ├── ScoreDisplay.ts   ← Punkteanzeige
│       └── TimerDisplay.ts   ← Countdown-Anzeige
├── test/
│   ├── objects/
│   │   ├── Bee.test.ts
│   │   └── Flower.test.ts
│   └── config.test.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
├── package.json
└── README.md
```

---

## 4. Architektur & Implementierungsdetails

### 4.1 Phaser-Szenen-Ablauf

```
BootScene
  └──► PreloadScene   (Assets laden)
         └──► MenuScene    (Start-Button)
                └──► GameScene   (Hauptspiel)
                       └──► GameOverScene  (Ergebnis)
                              └──► MenuScene (Neustart)
```

### 4.2 GameScene – Kern-Logik

```typescript
// Pseudocode-Überblick GameScene

class GameScene extends Phaser.Scene {
  private bee: Bee;
  private flowers: Phaser.GameObjects.Group;
  private score: number = 0;
  private timeLeft: number = 60; // Sekunden

  create() {
    this.createBackground();
    this.spawnFlowers();
    this.bee = new Bee(this, centerX, centerY);
    this.setupPhysicsOverlap();  // Biene <-> Blumen
    this.startCountdown();
    this.createUI();
  }

  update() {
    this.bee.handleInput();
  }

  private onPollenCollected(bee: Bee, flower: Flower) {
    if (!flower.isCollected) {
      flower.collect();
      this.score += flower.pointValue;
      this.updateScoreDisplay();
      this.scheduleFlowerRegen(flower);
    }
  }

  private onTimerEnd() {
    this.scene.start('GameOverScene', { score: this.score });
  }
}
```

### 4.3 Bienen-Klasse (Bee)

- Erbt von `Phaser.Physics.Arcade.Sprite`
- Bewegt sich via Arcade Physics Velocity basierend auf Cursor/WASD-Input
- Drehung in Bewegungsrichtung (Phaser `Math.Angle.BetweenPoints`)
- Flügel-Animation als Looping-Spritesheet-Animation

### 4.4 Blumen-Klasse (Flower)

- Erbt von `Phaser.Physics.Arcade.Image`
- Zustände: `FRESH` → `COLLECTED` → `REGENERATING` → `FRESH`
- Visual Feedback: Tween-basiertes Aufleuchten beim Sammeln
- Punkte-Wert konfigurierbar (verschiedene Blumentypen mit verschiedenen Punkten möglich)

### 4.5 Konfigurationsdatei (`config.ts`)

```typescript
export const GAME_CONFIG = {
  width: 800,
  height: 600,
  gameDuration: 60,       // Sekunden
  beeSpeed: 220,          // Pixel/Sekunde
  flowerCount: 12,
  baseFlowerPoints: 10,
  flowerRegenTime: 8000,  // Millisekunden
  comboWindow: 2000,      // ms für Combo-Bonus
  comboMultiplier: 1.5,
} as const;
```

---

## 5. Entwicklungs-Roadmap

### Phase 1 – Grundgerüst (MVP)

- [ ] Projekt-Setup: Vite + TypeScript + Phaser 3 initialisieren
- [ ] Szenen-Grundstruktur anlegen (Boot, Preload, Menu, Game, GameOver)
- [ ] Biene: Bewegung per Tastatur, einfacher Sprite
- [ ] Blumen: Statisch platziert, Kollisionserkennung
- [ ] Pollen-Sammeln: Punkte-Zähler
- [ ] Timer: Countdown, automatisches Spielende
- [ ] Game-Over-Bildschirm: Punktestand anzeigen, Neustart

### Phase 2 – Spielgefühl verbessern

- [ ] Animierter Bienen-Sprite (Flügelschlag)
- [ ] Blumen-Regeneration mit visueller Rückmeldung
- [ ] Sound-Effekte (Sammeln, Hintergrundmusik)
- [ ] Partikeleffekt beim Pollen-Sammeln
- [ ] Combo-Bonus-System

### Phase 3 – Polishing & Features

- [ ] Verschiedene Blumentypen mit unterschiedlichen Punktewerten
- [ ] Responsive Design (Mobile Touch-Steuerung)
- [ ] Lokale Bestenliste (localStorage)
- [ ] Schwierigkeitsgrade (Timer-Länge, Blumenanzahl)
- [ ] Hintergrund mit animierten Elementen (Wind, Wolken)

### Phase 4 – Optionale Erweiterungen

- [ ] Online-Bestenliste (Backend-Integration)
- [ ] Power-ups (Zeitverlängerung, Doppelte Punkte)
- [ ] Mehrere Level/Maps
- [ ] Multiplayer-Modus (WebSocket)

---

## 6. Entwicklungs-Setup & Befehle

### 6.1 Projekt initialisieren

```bash
# Repository klonen
git clone https://github.com/dev-man-coding/bees-live.git
cd bees-live

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten (mit HMR)
npm run dev

# Production-Build erstellen
npm run build

# Build-Ergebnis lokal vorschauen
npm run preview

# Tests ausführen
npm run test

# Linting
npm run lint

# Formatierung prüfen
npm run format:check

# Formatierung anwenden
npm run format
```

### 6.2 Empfohlene `package.json`-Skripte

```json
{
  "scripts": {
    "dev":            "vite",
    "build":          "tsc && vite build",
    "preview":        "vite preview",
    "test":           "vitest run",
    "test:watch":     "vitest",
    "test:coverage":  "vitest run --coverage",
    "lint":           "eslint src --ext .ts",
    "format":         "prettier --write \"src/**/*.ts\"",
    "format:check":   "prettier --check \"src/**/*.ts\""
  }
}
```

### 6.3 Empfohlene `vite.config.ts`

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser'],
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
```

---

## 7. Best Practices

### 7.1 Code-Qualität

- **TypeScript strict mode** einschalten (`"strict": true` in `tsconfig.json`)
- Keine `any`-Types; stattdessen präzise Interfaces/Types definieren
- Spielkonstanten immer in `config.ts` auslagern, nie Magic Numbers im Code
- Phaser-Szenen als Klassen mit klaren `create()` / `update()` Methoden strukturieren

### 7.2 Asset-Management

- Alle Assets in `PreloadScene` laden – niemals in anderen Szenen
- Asset-Schlüssel als Konstanten definieren (z. B. `export const ASSET_KEYS = { BEE: 'bee', ... }`)
- Spritesheets für Animationen nutzen (besser als einzelne Frames)
- Atlases (Texture Atlases) für Performance bei vielen Sprites verwenden

### 7.3 Git-Workflow

- Feature Branches: `feature/<beschreibung>` (z. B. `feature/bee-movement`)
- Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`
- PRs mit kurzer Beschreibung und Screenshots/GIFs bei visuellen Änderungen
- Keine direkten Commits auf `main`

### 7.4 Testing-Strategie

- **Unit-Tests**: Spiellogik unabhängig von Phaser testen (Punkteberechnung, Timer-Logik, Zustandsübergänge)
- **Phaser-abhängige Logik** in Szenen und Sprites muss im Browser getestet werden (manuell oder mit Playwright/Cypress E2E)
- Ziel: kritische Spiellogik zu ~80% durch Unit-Tests abdecken
- Vitest mit `jsdom` Environment für DOM-Tests

### 7.5 Performance

- `Phaser.GameObjects.Group` für Blumen nutzen (Object Pooling möglich)
- Physik nur wo nötig aktivieren (Arcade Physics ist leichtgewichtig)
- Partikeleffekte mit `Phaser.GameObjects.Particles` (integriert, sehr performant)
- FPS-Ziel: stabiles 60fps auch auf Mid-Range-Mobilgeräten

---

## 8. Deployment

| Plattform | Beschreibung | Befehle/Schritte |
|-----------|-------------|-----------------|
| **GitHub Pages** | Einfachste Option; kostenlos; direkt aus dem Repo | `npm run build` → deploy `dist/` mit GitHub Actions |
| **Netlify** | Automatisches Deploy bei Push; einfache Konfiguration | Repo verbinden → Build-Befehl: `npm run build`, Publish Dir: `dist` |
| **Vercel** | Ähnlich Netlify; sehr schnelle CDN-Verteilung | `vercel` CLI oder Web-Interface |

### Empfohlene GitHub Actions (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 9. Abhängigkeiten (initiale `package.json`)

```json
{
  "name": "bees-live",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev":           "vite",
    "build":         "tsc && vite build",
    "preview":       "vite preview",
    "test":          "vitest run",
    "test:watch":    "vitest",
    "lint":          "eslint src --ext .ts",
    "format":        "prettier --write \"src/**/*.ts\""
  },
  "dependencies": {
    "phaser": "^3.80.0"
  },
  "devDependencies": {
    "typescript":                   "^5.4.0",
    "vite":                         "^6.0.0",
    "vitest":                       "^2.0.0",
    "@vitest/coverage-v8":          "^2.0.0",
    "eslint":                       "^9.0.0",
    "typescript-eslint":            "^8.0.0",
    "prettier":                     "^3.2.0"
  }
}
```

---

## 10. Glossar

| Begriff | Erklärung |
|---------|-----------|
| **Phaser Scene** | Unabhängige Spielzustände (z. B. Menü, Spiel, Game Over) in Phaser 3 |
| **Arcade Physics** | Leichtgewichtiges Physiksystem in Phaser für einfache Kollisionserkennung |
| **Spritesheet** | Einzelnes Bild, das mehrere Animationsframes enthält |
| **Tween** | Animierte Eigenschaftsübergänge (z. B. Opacity, Scale) in Phaser |
| **HMR** | Hot Module Replacement – Vite aktualisiert den Browser ohne Neustart |
| **Tilemap** | Kachelbasierter Spielhintergrund, aus wiederholbaren Kacheln zusammengesetzt |
| **Object Pooling** | Wiederverwendung von Spielobjekten statt ständiger Neu-Erstellung (Performance) |

---

*Zuletzt aktualisiert: 2026-06-25 | Version: 1.0.0*
