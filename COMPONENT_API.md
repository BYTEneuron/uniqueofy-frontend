# Component API Reference

## Context & Hooks

### `CartContext` & `CartProvider`
**File**: `src/context/CartContext.jsx`

Provides global cart state management to the entire application.

```jsx
import { CartProvider } from './context/CartContext'
import { useCart } from './context/CartContext'

// Wrap app with provider
<CartProvider>
  <App />
</CartProvider>

// Use in components
function MyComponent() {
  const { cart, addToCart, removeFromCart, getTotal, getCartCount } = useCart()
}
```

#### Methods
| Method | Params | Returns | Description |
|--------|--------|---------|-------------|
| `addToCart()` | `service` | - | Add service to cart or increment quantity |
| `removeFromCart()` | `serviceId` | - | Remove service from cart |
| `updateQuantity()` | `serviceId, quantity` | - | Set quantity (0 removes item) |
| `getTotal()` | - | `number` | Get total cart value in ₹ |
| `getCartCount()` | - | `number` | Get total item count |
| `clearCart()` | - | - | Empty entire cart |

#### Properties
```javascript
{
  cart: [                    // Array of items in cart
    {
      id: string,
      name: string,
      price: number,
      duration: string,
      image: string,
      quantity: number      // Added by cart
    }
  ]
}
```

---

## Components

### `Header`
**File**: `src/components/Header.jsx`

Enhanced navigation header with logo, login button, and cart display.

```jsx
import Header from './components/Header'
<Header />
```

**Features**:
- Sticky positioning
- Logo with brand color
- Login button (static)
- Cart icon with badge showing item count
- Cart total display (hidden on mobile)

**Uses**: `useCart` hook

---

### `ServiceCard`
**File**: `src/components/ServiceCard.jsx`

Reusable card component for displaying services.

```jsx
import ServiceCard from './components/ServiceCard'

<ServiceCard 
  service={serviceObject}
  onAddClick={() => console.log('Added!')}
  showQuantity={false}
  quantity={1}
  onQuantityChange={(qty) => setQty(qty)}
/>
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `service` | Object | Required | Service data object |
| `onAddClick` | Function | - | Callback when "Add" clicked |
| `showQuantity` | Boolean | false | Show qty selector instead of button |
| `quantity` | Number | 1 | Current quantity |
| `onQuantityChange` | Function | - | Qty selector change handler |

**Service Object Structure**:
```javascript
{
  id: string,
  name: string,
  price: number,
  duration: string,
  image: string,    // Can be placeholder if broken
}
```

---

### `Cart`
**File**: `src/components/Cart.jsx`

Displays cart items, allows quantity adjustment, shows total and minimum order warning.

```jsx
import Cart from './components/Cart'
<Cart />
```

**Features**:
- Empty state message
- Item list with quantities
- Remove button per item
- Subtotal calculation
- Minimum order (₹399) warning
- Disabled checkout if under minimum

**Uses**: `useCart` hook

---

### `Modal`
**File**: `src/components/Modal.jsx`

Generic modal container with overlay and close button.

```jsx
import Modal from './components/Modal'

<Modal 
  isOpen={true}
  onClose={() => setOpen(false)}
  title="Modal Title"
>
  <p>Modal content here</p>
</Modal>
```

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | Boolean | Show/hide modal |
| `onClose` | Function | Called when close button clicked |
| `title` | String | Modal header title |
| `children` | ReactNode | Modal body content |

**Features**:
- Click-outside to close
- Close button (×)
- Scrollable body
- Sticky header
- Backdrop overlay

---

### `ACServicesModal`
**File**: `src/components/ACServicesModal.jsx`

Modal displaying AC-related services.

```jsx
import ACServicesModal from './components/ACServicesModal'

<ACServicesModal 
  isOpen={showModal}
  onClose={() => setShowModal(false)}
/>
```

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | Boolean | Show/hide modal |
| `onClose` | Function | Called when closing |

**Shows**:
- AC Servicing (₹299)
- AC Installation (₹1999)

Each service has "Add" button that adds to cart.

---

### `HomeServicesModal`
**File**: `src/components/HomeServicesModal.jsx`

Modal displaying home cleaning services with quantity selectors.

```jsx
import HomeServicesModal from './components/HomeServicesModal'

<HomeServicesModal 
  isOpen={showModal}
  onClose={() => setShowModal(false)}
/>
```

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | Boolean | Show/hide modal |
| `onClose` | Function | Called when closing |

**Shows 3 Sections**:
1. **Bathroom Cleaning** (3 services)
   - Washbasin Cleaning
   - Toilet Pot Cleaning
   - Bathroom Tiles Cleaning

2. **Kitchen Cleaning** (2 services)
   - Exhaust Fan Cleaning
   - Washbasin Cleaning

3. **Water Tank Cleaning** (1 service)
   - Water Tank Cleaning

Each service (except water tank) has quantity selectors (+/−).

---

## Pages

### `Home`
**File**: `src/pages/Home.jsx`

Main landing page with hero section, category cards, and cart.

```jsx
import Home from './pages/Home'
```

**Sections**:
1. **Hero Section**: Heading + subheading
2. **Categories**: AC Services & Home Services cards
3. **Cart**: Full cart display
4. **Modals**: AC and Home services modals

**Features**:
- Manages modal state
- Category card click handlers
- Responsive grid layout

---

## Data

### `services.js`
**File**: `src/data/services.js`

Mock data for all services.

**Exports**:
```javascript
export const acServices = [...]        // AC services
export const bathroomServices = [...]  // Bathroom cleaning
export const kitchenServices = [...]   // Kitchen cleaning
export const waterTankService = {...}  // Water tank (single)
export const services = [...]          // Legacy services
```

**Service Object**:
```javascript
{
  id: string,              // Unique identifier
  name: string,            // Service name
  price: number,           // Price in ₹
  duration: string,        // "45–60 mins" format
  image: string,           // Image URL
  description: string,     // Service description (optional)
  category: string         // Service category
}
```

---

## Styling

### CSS Files Overview

| File | Purpose | Key Classes |
|------|---------|-------------|
| `header.css` | Header styling | `.site-header`, `.header-actions`, `.cart-icon-btn` |
| `home.css` | Home page layout | `.hero-section`, `.category-cards-grid`, `.category-card` |
| `serviceCard.css` | Service card design | `.service-card-modern`, `.quantity-selector` |
| `cart.css` | Cart component | `.cart-section`, `.cart-item`, `.checkout-btn` |
| `categoryModal.css` | Modal styling | `.modal-overlay`, `.modal-content`, `.service-section` |

### Color Scheme
```css
Primary Blue:    #0b74ff
Hover Blue:      #095ecb
Light Gray:      #f8fafc
Border Gray:     #e6e9ef
Text Dark:       #213547
Text Light:      #888
Success/Warning: #ff4444
```

### Responsive Breakpoints
```css
Mobile:    < 480px   (single column)
Tablet:    640px     (2 columns)
Desktop:   768px+    (full layout)
```

---

## Usage Examples

### Adding Service to Cart
```jsx
import { useCart } from './context/CartContext'

function MyComponent() {
  const { addToCart } = useCart()
  
  const handleAdd = () => {
    addToCart({
      id: 'ac-servicing',
      name: 'AC Servicing',
      price: 299,
      duration: '45–60 mins',
      image: 'image-url'
    })
  }
  
  return <button onClick={handleAdd}>Add to Cart</button>
}
```

### Getting Cart Total
```jsx
import { useCart } from './context/CartContext'

function PriceDisplay() {
  const { getTotal, getCartCount } = useCart()
  
  return (
    <div>
      Total: ₹{getTotal().toLocaleString()}
      Items: {getCartCount()}
    </div>
  )
}
```

### Conditional Rendering Based on Minimum Order
```jsx
const { getTotal } = useCart()
const total = getTotal()
const minOrder = 399

{total < minOrder && (
  <p>Add ₹{minOrder - total} more to order</p>
)}
```
