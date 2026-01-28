# 🎨 VISUAL COMPONENT GUIDE

## Component Hierarchy

```
App.jsx
├── CartProvider (Context Wrapper)
├── Header.jsx
│   ├── Logo: UNIQUEOFY
│   ├── Login Button
│   └── Cart Display
│       ├── Cart Badge (count)
│       └── Cart Total (₹)
│
├── main.jsx → Home.jsx
│   ├── Hero Section
│   │   ├── Main Title
│   │   └── Subtitle
│   │
│   ├── Categories Section
│   │   ├── AC Services Card → [ACServicesModal.jsx]
│   │   │   ├── AC Servicing [+]
│   │   │   └── AC Installation [+]
│   │   │
│   │   └── Home Services Card → [HomeServicesModal.jsx]
│   │       ├── Bathroom Section
│   │       │   ├── Washbasin [+/-]
│   │       │   ├── Toilet [+/-]
│   │       │   └── Tiles [+/-]
│   │       ├── Kitchen Section
│   │       │   ├── Exhaust Fan [+/-]
│   │       │   └── Washbasin [+/-]
│   │       └── Water Tank Section
│   │           └── Water Tank [+]
│   │
│   └── Cart.jsx
│       ├── Item 1 [Qty Control] [Remove]
│       ├── Item 2 [Qty Control] [Remove]
│       ├── Subtotal
│       ├── Min Order Warning (if < ₹399)
│       └── Checkout Button
```

---

## Page Layout Wireframe

### Desktop View (1280px)
```
┌────────────────────────────────────────┐
│           HEADER (Sticky)              │
│  LOGO     [Login]  [Cart] [₹1299]      │
├────────────────────────────────────────┤
│                                        │
│           HERO SECTION                 │
│   Gradient Blue Background             │
│   "We have served 1000+ customers"     │
│   "Trusted home service platform"      │
│                                        │
├────────────────────────────────────────┤
│                                        │
│        SELECT A SERVICE                │
│  ┌────────────────┐  ┌────────────────┐│
│  │ ❄️ AC SERVICES │  │ 🏠 HOME SVCS  ││
│  │ Servicing &    │  │ Cleaning &     ││
│  │ Installation   │  │ Maintenance    ││
│  │      →        │  │      →        ││
│  └────────────────┘  └────────────────┘│
│                                        │
├────────────────────────────────────────┤
│                                        │
│        YOUR CART (3 items)             │
│  AC Servicing     ₹299  [-]1[+] [x]    │
│  Bathroom Tiles   ₹249  [-]2[+] [x]    │
│  ──────────────────────────────────── │
│  Subtotal: ₹797                        │
│  Minimum order: ₹399 (Need ₹399 more)  │
│  [Add More Items]                      │
│                                        │
└────────────────────────────────────────┘
```

### Mobile View (< 480px)
```
┌──────────────────────┐
│      HEADER          │
│ UNIQUEOFY [Login][🛒]│
├──────────────────────┤
│                      │
│   HERO (Compact)     │
│   "1000+ Customers"  │
│   "Trusted Platform" │
│                      │
├──────────────────────┤
│                      │
│   SELECT SERVICE     │
│  ┌────────────────┐  │
│  │ ❄️ AC SERVICES │  │
│  │      →        │  │
│  └────────────────┘  │
│  ┌────────────────┐  │
│  │ 🏠 HOME SVCS  │  │
│  │      →        │  │
│  └────────────────┘  │
│                      │
├──────────────────────┤
│                      │
│   YOUR CART (3)      │
│  AC Servicing        │
│  ₹299 [-]1[+]   [x]  │
│  ──────────────────  │
│  Bathroom Tiles      │
│  ₹249 [-]2[+]   [x]  │
│  ──────────────────  │
│  Total: ₹797         │
│  ⚠️ Add ₹399 more     │
│  [Add More]          │
│                      │
└──────────────────────┘
```

---

## Modal Layouts

### AC Services Modal
```
┌─────────────────────────────────┐
│  AC Services              [×]   │
├─────────────────────────────────┤
│                                 │
│  ┌────────────┐ ┌────────────┐ │
│  │  Image     │ │  Image     │ │
│  │            │ │            │ │
│  │AC Servicing│ │AC Install  │ │
│  │₹299        │ │₹1999       │ │
│  │45-60 mins  │ │2-3 hours   │ │
│  │[Add]       │ │[Add]       │ │
│  └────────────┘ └────────────┘ │
│                                 │
└─────────────────────────────────┘
```

### Home Services Modal
```
┌──────────────────────────────────┐
│  Home Services            [×]    │
├──────────────────────────────────┤
│                                  │
│ 🛁 BATHROOM CLEANING             │
│ ┌────┐ ┌────┐ ┌────┐            │
│ │Wash│ │Toit│ │Tile│            │
│ │£149│ │£199│ │£249│            │
│ │[+-]│ │[+-]│ │[+-]│            │
│ └────┘ └────┘ └────┘            │
│                                  │
│ 🍳 KITCHEN CLEANING              │
│ ┌────┐ ┌────┐                   │
│ │Exha│ │Wash│                   │
│ │£199│ │£149│                   │
│ │[+-]│ │[+-]│                   │
│ └────┘ └────┘                   │
│                                  │
│ 🚰 WATER TANK CLEANING           │
│ ┌──────────────────────────────┐ │
│ │Water Tank Cleaning           │ │
│ │₹399 · 1-2 hours              │ │
│ │[Add]                         │ │
│ └──────────────────────────────┘ │
│                                  │
└──────────────────────────────────┘
```

---

## Component Color States

### Buttons
```
Normal State:
┌─────────────────┐
│ [Add] Button    │  Blue (#0b74ff)
└─────────────────┘

Hover State:
┌─────────────────┐
│ [Add] Button    │  Darker Blue (#095ecb)
└─────────────────┘

Disabled State:
┌─────────────────┐
│ [Add More]      │  Gray (#ccc)
└─────────────────┘
```

### Cards
```
Normal:
┌────────────────┐
│ Service Card   │  White with gray border
│                │  #fff, #e6e9ef
└────────────────┘

Hover:
┌────────────────┐
│ Service Card   │  Blue border + shadow
│ ▲ (lifted)     │  #0b74ff, elevation
└────────────────┘
```

---

## Quantity Selector Component

### Visual
```
[-] 1 [+]
```

### States
```
Value 0:
[-] 0 [+]  (Show, but disabled add)

Value 1:
[-] 1 [+]

Value 5:
[-] 5 [+]

Value 100+:
[-] 100 [+]
```

---

## Cart Item Display

### Single Item
```
┌──────────────────────────────────────────┐
│                                          │
│ AC Servicing                             │
│ ₹299 each          [-] 1 [+]    [Remove] │
│                                          │
│                        ₹299 (Total)      │
└──────────────────────────────────────────┘
```

### Multiple Items
```
┌──────────────────────────────────────────┐
│                                          │
│ AC Servicing                             │
│ ₹299 each          [-] 1 [+]    [Remove] │
│                                          │
│                        ₹299              │
├──────────────────────────────────────────┤
│                                          │
│ Bathroom Tiles                           │
│ ₹249 each          [-] 2 [+]    [Remove] │
│                                          │
│                        ₹498              │
└──────────────────────────────────────────┘
```

---

## Cart Warnings & States

### Minimum Order Warning
```
⚠️ Minimum order value is ₹399
   Add ₹152 more to proceed with order

[Style: Yellow background, dark text]
```

### Empty Cart
```
Your cart is empty
[Add some items to get started!]

[Style: Centered gray text]
```

### Checkout Ready
```
[Proceed to Checkout]

✅ ✓ Order ≥ ₹399
✅ ✓ Items added
✅ ✓ Button enabled

[Style: Blue button, active]
```

---

## Header Badge Animation

### Cart Badge States

**No Items:**
```
[🛒]  (No badge)
```

**1-9 Items:**
```
[🛒]
  ●  (Red circle badge showing count)
  1
```

**10+ Items:**
```
[🛒]
  ●
  12  (Badge shows count)
```

---

## Responsive Breakpoints Visual

### Breakpoint 1: Mobile (< 480px)
```
Single column
Large touch targets
Stacked elements
Compact header
```

### Breakpoint 2: Small Tablet (480px - 640px)
```
2-column grid possible
Touch targets good
Better spacing
Simplified header
```

### Breakpoint 3: Large Tablet (640px - 768px)
```
2-column layout
Good spacing
Most features visible
Compact header elements
```

### Breakpoint 4: Desktop (768px+)
```
Full layout
Max 1280px width
Centered content
All features visible
Sticky header
```

---

## Hero Section Animation

```
Before:
┌─────────────────────────────────┐
│ Large title (2.5rem)            │
│ Subtitle (1.2rem)               │
│ Blue gradient background        │
│ 80px padding (vertical)         │
└─────────────────────────────────┘

On Mobile:
┌──────────────────┐
│ Smaller (1.6rem) │
│ Tighter spacing  │
│ Same gradient    │
│ 40px padding     │
└──────────────────┘
```

---

## Category Card Hover Effect

### Static
```
┌────────────────────┐
│                    │
│  ❄️ AC Services    │
│  Servicing &       │
│  Installation      │
│                →   │
│                    │
└────────────────────┘
```

### On Hover
```
┌────────────────────┐
│ ↓ Lifts up         │
│                    │
│  ❄️ AC Services    │
│  Servicing &       │
│  Installation      │
│              → (moves) │
│                    │
└────────────────────┘
✓ Shadow added
✓ Border color changes
✓ Transform: translateY(-4px)
```

---

## Service Card Component

### Image Section
```
┌─────────────────┐
│                 │
│     IMAGE       │  Height: 160px
│   (Cover)       │  Background: #f5f5f5
│                 │
└─────────────────┘
```

### Info Section
```
┌─────────────────┐
│ AC Servicing    │  Title: bold, 1rem
│ 45-60 mins      │  Duration: light gray
│                 │
│ ₹299      [Add] │  Price: blue + button
└─────────────────┘
```

---

## Color Palette Visual

```
Primary Blue        Hover Blue          Light Gray
#0b74ff            #095ecb              #f8fafc
█████              █████                █████

Border Gray        Text Dark           Text Light
#e6e9ef            #213547              #888
█████              █████                █████

Success            Warning              Error
#22c55e            #eab308              #ff4444
█████              █████                █████
```

---

## Spacing & Sizing Guide

```
Header Height: 60px (including padding)
Gap (standard): 16px
Padding (section): 40px (desktop), 24px (tablet), 16px (mobile)
Card Border Radius: 10px
Button Padding: 8-12px
Modal Max Width: 700px
Max Content Width: 1280px

Font Sizes:
- Hero Title: 2.5rem (desktop), 2rem (tablet), 1.6rem (mobile)
- Section Title: 1.5rem
- Card Title: 1rem
- Price: 1.1rem (bold)
- Duration: 0.95rem
- Body: 0.95rem
```

---

## Animation Timings

```
Hover Effects: 0.2-0.3s ease
Transitions: smooth
Transform: translateY, scale
Shadow: smooth appearance
Colors: quick change (0.2s)
```

---

## Accessibility Features

```
✓ Semantic HTML (header, main, article)
✓ Color contrast (text readable)
✓ Button keyboard accessible
✓ Modal click-outside to close
✓ Touch targets 44px+ (mobile)
✓ Focus states for keyboard nav
✓ Alt text on images
```

---

## Summary

**This visual guide shows:**
- ✅ Layout structure
- ✅ Component hierarchy
- ✅ Color usage
- ✅ Spacing & sizing
- ✅ Responsive behavior
- ✅ Animation states
- ✅ Interactive elements

**For detailed component code**, see `COMPONENT_API.md`  
**For color codes**, search for hex values in CSS files  
**For animations**, check `*.css` files for transitions
