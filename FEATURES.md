# Uniqueofy Frontend - Home Page & Service Selection UI

## 🎯 Features Implemented

### 1. **Enhanced Header Component**
- **Logo**: "UNIQUEOFY" with blue branding
- **Login Button**: Static button for future authentication
- **Cart Icon**: Shows cart count and total price
- **Sticky Header**: Stays at top while scrolling

### 2. **Hero Section**
- Gradient blue background (modern, clean design)
- Main heading: "We have served 1000+ customers"
- Subheading: "Uniqueofy is a trusted home service platform"
- Fully responsive design

### 3. **Service Category Cards**
Two large clickable cards that open modals:
- **❄️ AC Services**: AC Servicing & Installation
- **🏠 Home Services**: Bathroom, Kitchen, Water Tank Cleaning

Features:
- Smooth hover effects
- Interactive arrow animation
- Clear category descriptions

### 4. **AC Services Modal** 
Shows 2 services:
- **AC Servicing** (₹299, 45–60 mins)
- **AC Installation** (₹1999, 2–3 hours)

Each service card includes:
- High-quality image
- Service name & duration
- Price display
- "Add" button to add to cart

### 5. **Home Services Modal**
Shows 3 sections with quantity selectors:

#### 🛁 **Bathroom Cleaning** (3 sub-services)
- Washbasin Cleaning (₹149)
- Toilet Pot Cleaning (₹199)
- Bathroom Tiles Cleaning (₹249)

#### 🍳 **Kitchen Cleaning** (2 sub-services)
- Exhaust Fan Cleaning (₹199)
- Washbasin Cleaning (₹149)

#### 🚰 **Water Tank Cleaning**
- Fixed service at ₹399, 1–2 hours

**Features**:
- Quantity selector (+/−) for each service
- Add to cart with selected quantity
- Service images and pricing

### 6. **Cart System**
Location: Bottom of home page

**Functionality**:
- Shows all added items
- Quantity adjustment (+ / −)
- Remove individual items
- Subtotal calculation
- **Minimum Order Warning**: "Minimum order value is ₹399"
  - Checkout button disabled if total < ₹399
  - Shows how much more is needed
- Checkout button (when minimum met)

**State Management**:
- React Context API (`CartContext`)
- Global cart state
- Functions: `addToCart()`, `removeFromCart()`, `updateQuantity()`, `getTotal()`, `getCartCount()`

---

## 📁 File Structure

```
src/
├── components/
│   ├── Header.jsx              # Enhanced header with cart
│   ├── header.css
│   ├── Cart.jsx                # Cart display & management
│   ├── cart.css
│   ├── ServiceCard.jsx         # Reusable service card
│   ├── serviceCard.css
│   ├── ACServicesModal.jsx     # AC Services modal
│   ├── HomeServicesModal.jsx   # Home Services modal
│   ├── categoryModal.css       # Modal styling
│   └── ...
├── context/
│   └── CartContext.jsx         # Cart state management
├── pages/
│   ├── Home.jsx                # Main home page
│   ├── home.css
│   └── ...
├── data/
│   └── services.js             # Mock service data
├── App.jsx                      # Updated with CartProvider
└── index.css                    # Updated global styles
```

---

## 🎨 Design Features

### Modern UI
- **Color Scheme**: Blue primary (#0b74ff), clean whites, light grays
- **Typography**: Clear hierarchy with proper font sizes
- **Spacing**: Consistent padding and margins
- **Shadows**: Subtle elevation for depth
- **Hover Effects**: Smooth transitions and transforms

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px
- Touch-friendly buttons and interactions
- Full-width on mobile, centered on desktop

### Components
- **Modals**: Overlay with click-outside to close
- **Cards**: Hover animations and visual feedback
- **Buttons**: Color-coded (blue primary, red danger)
- **Quantity Selectors**: Intuitive +/− controls

---

## 🚀 How to Use

### Adding Items to Cart
1. Click on "AC Services" or "Home Services" category card
2. Select services and adjust quantities
3. Click "Add to Cart" or "Add X to Cart"
4. Cart updates automatically

### Managing Cart
1. Scroll to cart section on home page
2. Adjust quantities with +/− buttons
3. Remove items with "Remove" button
4. View total price and minimum order warning
5. Proceed to checkout when minimum (₹399) is met

### Mock Data
All services use mock data from `src/data/services.js`:
- **acServices**: AC Servicing and Installation
- **bathroomServices**: 3 bathroom cleaning services
- **kitchenServices**: 2 kitchen cleaning services
- **waterTankService**: Single water tank service

---

## 💡 Technical Details

### State Management
- **CartContext**: Provides cart state to entire app
- **CartProvider**: Wraps app at root level (App.jsx)
- **useCart Hook**: Use in components to access cart

### Key Functions
```javascript
// CartContext provides:
addToCart(service)              // Add service to cart
removeFromCart(serviceId)       // Remove by ID
updateQuantity(serviceId, qty)  // Update quantity
getTotal()                      // Calculate total price
getCartCount()                  // Count total items
clearCart()                     // Empty cart
```

### Component Props
- **Modal**: `isOpen`, `onClose`, `title`, `children`
- **ServiceCard**: `service`, `onAddClick`, `showQuantity`, `quantity`, `onQuantityChange`
- **Cart**: No props (uses useCart hook)

---

## 🎯 Future Enhancements
- Backend API integration
- User authentication
- Payment gateway
- Order history
- Service reviews & ratings
- Booking confirmation emails
- Address management
- Promotional codes

---

## ✅ Test Scenarios

1. **Add Single Service**: Click AC Services → AC Servicing → Add
2. **Add with Quantity**: Click Home Services → Bathroom → Set quantity → Add
3. **View Total**: Check header cart and cart section
4. **Minimum Order**: Add items under ₹399 and see warning
5. **Adjust Quantity**: Use +/− in cart section
6. **Remove Item**: Click Remove button
7. **Responsive**: Test on mobile (< 640px) and tablet (640px - 768px)
8. **Modal Close**: Click outside modal or X button

---

## 📝 Notes
- All services use placeholder images from Unsplash
- Cart is stored in React state (lost on page refresh)
- No backend integration yet
- All prices are in Indian Rupees (₹)
