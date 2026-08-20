---
name: Nexus Academic System
colors:
  surface: '#101415'
  surface-dim: '#101415'
  surface-bright: '#363a3b'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#191c1e'
  surface-container: '#1d2022'
  surface-container-high: '#272a2c'
  surface-container-highest: '#323537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#c6c6cd'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#909097'
  outline-variant: '#45464d'
  surface-tint: '#bec6e0'
  primary: '#bec6e0'
  on-primary: '#283044'
  primary-container: '#0f172a'
  on-primary-container: '#798098'
  inverse-primary: '#565e74'
  secondary: '#e0b6ff'
  on-secondary: '#4a067a'
  secondary-container: '#632892'
  on-secondary-container: '#d49fff'
  tertiary: '#adc6ff'
  on-tertiary: '#002e6a'
  tertiary-container: '#00163a'
  on-tertiary-container: '#357df1'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#f2daff'
  secondary-fixed-dim: '#e0b6ff'
  on-secondary-fixed: '#2d004f'
  on-secondary-fixed-variant: '#632892'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#101415'
  on-background: '#e0e3e5'
  surface-variant: '#323537'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is engineered for the high-velocity environment of modern campus life. It balances academic rigor with the innovative energy of a tech startup. The aesthetic, "College-tech," leverages a sophisticated dark foundation punctuated by vibrant, neon-inflected accents to signify activity and digital fluency.

The style is a hybrid of **Modern Corporate** and **Glassmorphism**. Surfaces are primarily dark and structured, but utilize translucent overlays and subtle radial glows to create a sense of depth and "active" energy. This approach ensures the platform feels organized for administrators while remaining exciting and forward-thinking for students.

## Colors

The palette is anchored in a deep **Midnight Navy (#0F172A)**, providing a stable, high-contrast background for academic content. **Deep Purple (#581C87)** serves as the secondary brand color, used for structural navigation and grouping.

Energy is injected through two primary accent colors: **Electric Blue (#3B82F6)** for primary actions and system feedback, and **Neon Violet (#A855F7)** for secondary highlights, event categories, and high-energy touchpoints. Backgrounds should use subtle gradients between the Navy and Purple to prevent a flat appearance. Text and icons primarily utilize the Neutral palette for maximum legibility against the dark base.

## Typography

This design system utilizes **Inter** exclusively to maintain a systematic, "developer-grade" clarity. The type scale relies on heavy weights (Bold/ExtraBold) for headlines to establish a strong hierarchy against dark backgrounds. 

Letter spacing is slightly tightened for large display type to create a "compact-tech" feel, while labels and captions receive slight tracking increases to ensure legibility on high-density event dashboards. All typography should prioritize high-contrast neutral tones, with Electric Blue reserved for links and interactive labels.

## Layout & Spacing

The system follows a **12-column fluid grid** for desktop and a **4-column grid** for mobile. A strict 8px spatial scale is used to ensure alignment and rhythmic consistency. 

Layouts should favor high-density information displays with generous external margins (48px+) to frame the content. To maintain the "high-energy" feel, use asymmetric spacing in sections—for example, larger top padding on event headers to allow "breathability" before the data-heavy event details begin. Breakpoints are set at 640px (Mobile), 1024px (Tablet), and 1440px (Desktop).

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Glassmorphism**. 
1.  **Base:** The primary background (#0F172A).
2.  **Surface:** Containers use a slightly lighter navy with a 1px border (opacity 10%) of the primary accent.
3.  **Overlays:** Modals and dropdowns utilize a "Glass" effect—20px backdrop blur with a 40% opaque Deep Purple background.
4.  **Active Depth:** Interactive elements like cards do not use traditional shadows; instead, they use a subtle **Radial Glow** of the accent color (#3B82F6) behind the element upon hover, simulating a backlit hardware interface.

## Shapes

The design system employs a **Rounded (2)** shape language, with a specific emphasis on **2XL corners (1.5rem / 24px)** for primary cards and containers. This softened geometry contrasts with the technical typography to create a welcoming, approachable atmosphere. 

Smaller components like buttons and tags should scale down to `rounded-lg` (16px), while input fields maintain the standard `rounded` (8px) for a more precise, functional appearance.

## Components

### Buttons & CTAs
Primary buttons feature a **Soft Gradient** from Electric Blue (#3B82F6) to Neon Violet (#A855F7) at a 135-degree angle. Text inside buttons must be bold and white. Secondary buttons use a "Ghost" style with a 1.5px solid Electric Blue border and a low-opacity fill on hover.

### Cards
Event cards are the centerpiece. They use the `rounded-xl` setting with a dark surface color. On hover, the border should transition from a subtle neutral-10% to a vibrant Electric Blue glow. Use an image aspect ratio of 16:9 for event banners.

### Chips & Badges
Badges (for event categories or status) use high-saturation backgrounds with 10% opacity and 100% opacity text of the same color (e.g., a "Live" badge with a Neon Violet background at 10% and white/violet text).

### Input Fields
Fields are dark-filled with a subtle bottom-only or full-border stroke. Focus states are indicated by the border changing to Electric Blue and a subtle inner-glow.

### Glass Overlays
Drawers and modal windows should always use the `backdrop-blur` property (min 16px) to maintain the "College-tech" depth, allowing the vibrant background glows of the platform to bleed through the UI layer.