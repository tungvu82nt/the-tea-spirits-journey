# 茶灵之旅 - Frontend Documentation

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Available Scripts](#available-scripts)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [Routing](#routing)
- [API Integration](#api-integration)
- [Styling Guide](#styling-guide)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Deployment](#deployment)

---

## 🎯 Project Overview

**茶灵之旅** (The Tea Spirits Journey) is a premium e-commerce platform specializing in Chinese tea and spirits. The application provides a seamless shopping experience with features including:

- Product browsing and search
- Shopping cart management
- Multi-step checkout process
- User authentication and account management
- Order tracking and history
- Wishlist and collections
- Payment methods management
- Coupon system
- Customer support

**Current Version:** 1.0.0  
**Last Updated:** 2024-01-15

---

## 🛠 Technology Stack

### Core Framework
- **React 18.x** - UI library
- **TypeScript 5.x** - Type safety
- **Vite 5.x** - Build tool and dev server

### UI Components
- **shadcn/ui** - Component library based on Radix UI
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **Lucide React** - Icon library

### Routing & State
- **React Router v6** - Client-side routing
- **TanStack Query (React Query)** - Server state management
- **React Context API** - Client state management

### Utilities
- **Sonner** - Toast notifications
- **clsx** - Conditional class names
- **tailwind-merge** - Tailwind class merging

---

## 📁 Project Structure

```
the-tea-spirits-journey/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, icons
│   ├── components/         # Reusable components
│   │   └── ui/         # shadcn/ui components
│   ├── lib/              # Utility functions
│   │   └── utils.ts     # Helper functions
│   ├── pages/            # Page components
│   │   ├── Index.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── Orders.tsx
│   │   ├── OrderDetail.tsx
│   │   ├── Wishlist.tsx
│   │   ├── Collection.tsx
│   │   ├── Addresses.tsx
│   │   ├── PaymentMethods.tsx
│   │   ├── Coupons.tsx
│   │   ├── Settings.tsx
│   │   ├── Contact.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── TermsOfService.tsx
│   │   └── ReturnPolicy.tsx
│   ├── App.tsx           # Root component with routing
│   └── main.tsx          # Application entry point
├── components.json         # shadcn/ui configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

---

## 🚀 Development Setup

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher
- Git (for version control)

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd the-tea-spirits-journey
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open browser**
Navigate to `http://localhost:5173`

---

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Quality Assurance
```bash
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

---

## 🧩 Component Architecture

### Component Organization

Components are organized by responsibility:

1. **Page Components** (`src/pages/`)
   - Full-page components
   - Handle routing and navigation
   - Manage page-level state

2. **UI Components** (`src/components/ui/`)
   - Reusable, atomic components
   - Based on shadcn/ui
   - Highly customizable

3. **Business Components** (`src/components/`)
   - Domain-specific components
   - Composed from UI components
   - Encapsulate business logic

### Component Best Practices

```typescript
// ✅ Good: Clear props with TypeScript interfaces
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  variant?: 'default' | 'compact';
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart,
  variant = 'default' 
}) => {
  return (
    <Card className={variant === 'compact' ? 'p-4' : 'p-6'}>
      {/* Component content */}
    </Card>
  );
};

// ✅ Good: Memoize expensive components
const ExpensiveList = React.memo(({ items }) => {
  return <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
});
```

---

## 📊 State Management

### Client State (React Hooks)

```typescript
// Local component state
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState<FormData>({ name: '', email: '' });

// Derived state
const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);

// Side effects
useEffect(() => {
  document.title = '茶灵之旅';
}, []);
```

### Server State (TanStack Query)

```typescript
// Query for fetching data
const { data, isLoading, error } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
});

// Mutation for updating data
const mutation = useMutation({
  mutationFn: updateProduct,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
    toast.success('Product updated successfully');
  },
});
```

### Global State (React Context)

```typescript
// Create context
interface AppContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Use context
const { cart, addToCart } = useContext(AppContext);
```

---

## 🧭 Routing

### Route Structure

```typescript
// App.tsx
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/tea" element={<TeaSelection />} />
  <Route path="/liquor" element={<LiquorCollection />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/account/orders" element={<Orders />} />
  <Route path="/account/orders/:orderId" element={<OrderDetail />} />
  <Route path="/account/wishlist" element={<Wishlist />} />
  <Route path="/account/collections" element={<Collection />} />
  <Route path="/account/addresses" element={<Addresses />} />
  <Route path="/account/payment-methods" element={<PaymentMethods />} />
  <Route path="/account/coupons" element={<Coupons />} />
  <Route path="/account/settings" element={<Settings />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/privacy" element={<PrivacyPolicy />} />
  <Route path="/terms" element={<TermsOfService />} />
  <Route path="/return-policy" element={<ReturnPolicy />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Navigation Patterns

```typescript
// Programmatic navigation
const navigate = useNavigate();
navigate('/cart');

// Navigation with state
navigate('/checkout', { state: { from: '/cart' } });

// Back navigation
navigate(-1);
```

---

## 🔌 API Integration

### API Client Setup

```typescript
// src/lib/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### API Endpoints

```typescript
// src/lib/api/endpoints.ts
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  products: {
    list: '/products',
    detail: (id: string) => `/products/${id}`,
    search: '/products/search',
  },
  cart: {
    get: '/cart',
    add: '/cart/items',
    update: (id: string) => `/cart/items/${id}`,
    remove: (id: string) => `/cart/items/${id}`,
  },
  orders: {
    list: '/orders',
    detail: (id: string) => `/orders/${id}`,
    create: '/orders',
  },
  // ... more endpoints
};
```

### Using TanStack Query

```typescript
// src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api';
import { endpoints } from '@/lib/api/endpoints';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await apiClient.get(endpoints.products.list);
      return response.data;
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const response = await apiClient.get(endpoints.products.detail(id));
      return response.data;
    },
    enabled: !!id,
  });
}
```

---

## 🎨 Styling Guide

### Color Palette

```css
/* Primary Colors */
--wine: hsl(var(--wine));              /* #722F37 */
--wine-light: hsl(var(--wine-light));    /* #A8555F */

--gold: hsl(var(--gold));              /* #D4AF37 */
--gold-light: hsl(var(--gold-light));    /* #E8F5A3 */

--tea-brown: hsl(var(--tea-brown));      /* #8B4513 */

/* Semantic Colors */
--background: hsl(var(--background));    /* #FAFAF9 */
--foreground: hsl(var(--foreground));    /* #1C1917 */

--muted: hsl(var(--muted));            /* #F5F5F4 */
--muted-foreground: hsl(var(--muted-foreground)); /* #737373 */

--border: hsl(var(--border));            /* #E5E5E5 */
--input: hsl(var(--input));              /* #E5E5E5 */

/* Status Colors */
--destructive: hsl(var(--destructive));  /* #EF4444 */
--success: hsl(var(--success));          /* #10B981 */
--warning: hsl(var(--warning));          /* #F59E0B */
```

### Typography

```typescript
// Font Families
font-display: 'Playfair Display', 'Noto Serif SC', serif
font-serif: 'Noto Serif SC', 'Georgia', serif
font-sans: 'system-ui', '-apple-system', sans-serif

// Font Sizes
text-xs: 0.75rem      /* 12px */
text-sm: 0.875rem     /* 14px */
text-base: 1rem        /* 16px */
text-lg: 1.125rem     /* 18px */
text-xl: 1.25rem      /* 20px */
text-2xl: 1.5rem      /* 24px */
text-3xl: 1.875rem    /* 30px */
text-4xl: 2.25rem     /* 36px */
```

### Tailwind Custom Classes

```typescript
// Custom utilities in tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      display: ['"Playfair Display"', '"Noto Serif SC"', 'serif'],
      serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
      sans: ['system-ui', '-apple-system', 'sans-serif'],
    },
    colors: {
      wine: {
        DEFAULT: "hsl(var(--wine))",
        light: "hsl(var(--wine-light))",
      },
      gold: {
        DEFAULT: "hsl(var(--gold))",
        light: "hsl(var(--gold-light))",
      },
      tea: {
        brown: "hsl(var(--tea-brown))",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    animation: {
      shimmer: "shimmer 2s infinite linear",
      float: "float 6s ease-in-out infinite",
    },
  },
}
```

---

## 📝 Code Standards

### TypeScript Guidelines

```typescript
// ✅ Use interfaces for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Use type aliases for unions
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// ✅ Use generics for reusable components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// ✅ Avoid 'any' type
// ❌ const data: any = fetchData();
// ✅ const data: unknown = fetchData();

// ✅ Use readonly for immutable arrays
function processItems(items: readonly Product[]) {
  return items.map(item => item.price);
}
```

### React Best Practices

```typescript
// ✅ Use functional components
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};

// ✅ Destructure props
const MyComponent = ({ title, description, onAction }) => {
  return <Card title={title} onAction={onAction} />;
};

// ✅ Use proper key props
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}

// ✅ Handle loading and error states
const { data, isLoading, error } = useQuery(...);
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage />;

// ✅ Use useCallback for event handlers
const handleClick = useCallback(() => {
  onAction(id);
}, [id, onAction]);
```

### Naming Conventions

```typescript
// Components: PascalCase
ProductCard.tsx
ShoppingCart.tsx

// Functions: camelCase
formatPrice()
validateEmail()

// Constants: UPPER_SNAKE_CASE
API_BASE_URL
MAX_ITEMS_PER_PAGE

// Types/Interfaces: PascalCase
interface Product {}
type OrderStatus = 'pending' | 'completed';

// Files: kebab-case
product-card.tsx
shopping-cart.tsx
```

---

## 🧪 Testing

### Unit Testing (Jest + React Testing Library)

```typescript
// ProductCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  it('renders product information', () => {
    const product = {
      id: '1',
      name: '普洱茶',
      price: 580,
      image: '/product.jpg',
    };
    
    render(<ProductCard product={product} />);
    
    expect(screen.getByText('普洱茶')).toBeInTheDocument();
    expect(screen.getByText('¥580')).toBeInTheDocument();
  });

  it('calls onAddToCart when button is clicked', () => {
    const onAddToCart = vi.fn();
    const product = { id: '1', name: '普洱茶', price: 580 };
    
    render(<ProductCard product={product} onAddToCart={onAddToCart} />);
    
    fireEvent.click(screen.getByRole('button', { name: /加入购物车/ }));
    expect(onAddToCart).toHaveBeenCalledWith('1');
  });
});
```

### Integration Testing

```typescript
// Checkout.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkout from './Checkout';

describe('Checkout Flow', () => {
  it('completes checkout process', async () => {
    render(<Checkout />);
    
    // Step 1: Shipping
    await userEvent.type(screen.getByLabelText(/收货人姓名/), '张三');
    await userEvent.type(screen.getByLabelText(/手机号码/), '138****8888');
    await userEvent.click(screen.getByRole('button', { name: /下一步/ }));
    
    // Step 2: Payment
    await waitFor(() => {
      expect(screen.getByText(/支付方式/)).toBeInTheDocument();
    });
    
    // Step 3: Review
    await userEvent.click(screen.getByRole('button', { name: /下一步/ }));
    
    // Complete order
    await userEvent.click(screen.getByRole('button', { name: /确认订单/ }));
    
    await waitFor(() => {
      expect(screen.getByText(/订单提交成功/)).toBeInTheDocument();
    });
  });
});
```

---

## 🚢 Deployment

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env.production` file:

```env
VITE_API_URL=https://api.teaspirits.com
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### Deployment Platforms

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

#### Docker
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]
```

---

## 📚 Additional Resources

### Documentation
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query/latest)

### Tools
- [Vite](https://vitejs.dev)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Vitest](https://vitest.dev)

---

## 🤝 Contributing

### Development Workflow

1. Create a new branch from `main`
2. Make your changes
3. Run tests and linting
4. Commit with clear messages
5. Push to remote
6. Create a pull request

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Example:**
```
feat(cart): add coupon code validation

- Validate coupon codes on server
- Show error message for invalid codes
- Update cart total with discount

Closes #123
```

---

## 📞 Support

For questions or issues, please contact:
- **Email:** support@teaspirits.com
- **Documentation:** https://docs.teaspirits.com
- **Issue Tracker:** https://github.com/teaspirits/issues

---

**Last Updated:** 2024-01-15  
**Version:** 1.0.0
