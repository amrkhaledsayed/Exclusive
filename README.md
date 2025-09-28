# 🛍️ E-Commerce Shop - [Exclusive](https://exclusive-udl4.vercel.app)

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/) [![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF.svg)](https://vitejs.dev/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.12-38B2AC.svg)](https://tailwindcss.com/) [![Supabase](https://img.shields.io/badge/Supabase-2.56.0-green.svg)](https://supabase.com/)

## 📋 Project Overview

A full-stack e-commerce platform built as a Frontend Diploma capstone project. This modern, scalable solution delivers a complete online shopping experience with advanced features including multi-language support, real-time cart management, secure authentication, and responsive design.

## ✨ Core Features

### 🛒 **Advanced Product Management**

- **Dynamic Product Catalog** with high-resolution image galleries
- **Smart Categorization** with nested category filtering
- **Real-time Search** with instant suggestions and filters
- **Product Comparison** and detailed specifications
- **Customer Reviews & Ratings** system with moderation

### 🛍️ **Intelligent Shopping Cart**

- **Real-time Cart Updates** with instant price calculations
- **Persistent Storage** across browser sessions
- **Guest Checkout** and registered user support
- **Cart Abandonment** recovery features
- **Bulk Operations** for multiple items

### 👤 **Comprehensive User Management**

- **Secure Authentication** with JWT tokens via Supabase
- **Social Login** integration ready
- **Password Recovery** with email verification
- **Profile Management** with address book
- **Wishlist & Favorites** with sync across devices

### 📦 **Complete Order Management**

- **Order Processing Pipeline** with status tracking
- **Order History** with detailed invoices
- **Order Modification** and cancellation system
- **Shipping Integration** ready
- **PDF Invoice Generation** for orders

### 🌍 **Internationalization (i18n)**

- **5 Language Support**: Arabic (RTL), English, Turkish, Spanish, Italian
- **Dynamic Language Switching** without page reload
- **RTL Layout Support** for Arabic interface
- **Localized Content** management system

### 💳 **Secure Payment Integration**

- **Multiple Payment Gateways**: PayPal, Stripe, Credit Cards
- **Secure Payment Processing** with PCI compliance
- **Payment Method Management** for users
- **Transaction History** and receipts

## 🛠️ Technology Stack

### **Frontend Architecture**

| Technology       | Version | Purpose                                              |
| ---------------- | ------- | ---------------------------------------------------- |
| **React**        | 19.1.1  | Modern UI library with hooks and concurrent features |
| **Vite**         | 7.1.2   | Lightning-fast build tool and dev server             |
| **JavaScript**   | Latest  | JavaScript development                               |
| **React Router** | 7.9.3   | Client-side routing and navigation                   |

### **UI/UX Framework**

| Technology        | Version  | Purpose                             |
| ----------------- | -------- | ----------------------------------- |
| **Tailwind CSS**  | 4.1.12   | Utility-first CSS framework         |
| **Framer Motion** | 12.23.15 | Production-ready motion library     |
| **Radix UI**      | Latest   | Accessible component primitives     |
| **Material-UI**   | 7.3.2    | React component library             |
| **Lucide React**  | 0.540.0  | Beautiful & consistent icon toolkit |

### **State Management & Data**

| Technology          | Version  | Purpose                                         |
| ------------------- | -------- | ----------------------------------------------- |
| **TanStack Query**  | 5.85.5   | Powerful data synchronization for React         |
| **React Hook Form** | 7.62.0   | Performant, flexible forms with easy validation |
| **Context API**     | Built-in | Global state management                         |

### **Backend & Database**

| Technology             | Version  | Purpose                          |
| ---------------------- | -------- | -------------------------------- |
| **Supabase**           | 2.56.0   | Open source Firebase alternative |
| **Row Level Security** | Built-in | Database-level security policies |

## 🚀 Quick Start

### **Prerequisites**

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ or **yarn** 1.22+
- **Git** for version control

### **Environment Setup**

1. **Clone & Install**

```bash
git clone https://github.com/your-username/E-Commerce-shop.git
cd E-Commerce-shop
npm install
```

2. **Environment Configuration**

```bash
# Create .env.local file
cp .env.example .env.local

# Required environment variables
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_URL=http://localhost:5173
```

3. **Database Setup**

```bash
# Run Supabase migrations (if available)
npm run db:migrate

# Seed database with sample data
npm run db:seed
```

4. **Development Server**

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 📁 Project Architecture

```
src/
├── components/              # React Components
│   ├── common/             # Reusable UI components
│   ├── Layouts/            # Page-level components
│   ├── Hooks/              # Custom React hooks
│   └── ui/                 # Design system components
├── Supabase/               # Database & API layer
│   ├── supabase-client.js  # Supabase configuration
│   ├── useCart.js          # Cart management hooks
│   ├── useAuth.js          # Authentication hooks
│   └── useOrders.js        # Order management hooks
├── utils/                  # Utility functions
│   ├── context.js          # React Context providers
│   ├── data.json           # Static data
│   └── observer.js         # Intersection Observer
├── assets/                 # Static assets
├── lib/                    # Third-party library configs
└── locales/                # Internationalization files
    ├── en/                 # English translations
    ├── ar/                 # Arabic translations
    └── ...                 # Other languages
```

## 🌐 Application Routes

| Route            | Component      | Description                         |
| ---------------- | -------------- | ----------------------------------- |
| `/`              | Home           | Landing page with featured products |
| `/products`      | AllProducts    | Complete product catalog            |
| `/product/:id`   | ProductDetails | Individual product page             |
| `/cart`          | ShoppingCart   | Cart management                     |
| `/checkout`      | Checkout       | Order completion                    |
| `/account`       | UserAccount    | Profile management                  |
| `/orders`        | OrderHistory   | Order tracking                      |
| `/wishlist`      | Wishlist       | Saved products                      |
| `/auth/login`    | SignIn         | User authentication                 |
| `/auth/register` | SignUp         | User registration                   |
| `/contact`       | Contact        | Contact information                 |
| `/about`         | About          | Company information                 |

## 🎨 Technical Highlights

### **Performance Optimization**

- ⚡ **Vite Build System** - Sub-second hot module replacement
- 🖼️ **Image Optimization** - WebP format with lazy loading
- 📦 **Code Splitting** - Route-based and component-based splitting
- 🚀 **Tree Shaking** - Eliminates unused code
- 💾 **Caching Strategy** - Intelligent data and asset caching

### **User Experience Excellence**

- 🌍 **RTL Support** - Complete Arabic language support
- 🎭 **Smooth Animations** - 60fps transitions with Framer Motion
- 🔔 **Smart Notifications** - Context-aware user feedback
- ♿ **Accessibility** - WCAG 2.1 AA compliant

## 🤝 Contributing Guidelines

We welcome contributions! Please follow our development workflow:

### **Development Process**

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Follow** our coding standards (ESLint + Prettier)
4. **Write** tests for new features
5. **Commit** with conventional commits (`git commit -m 'feat: add amazing feature'`)
6. **Push** to your branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request with detailed description

## 👨‍💻 Developer Information

**Frontend Developer** - Diploma Graduate

- 🐙 **GitHub**:amrkhaledsayed
- 💼 **LinkedIn**:Amr Khaled
- 📧 **Email**: amrkhaled286@gmail.com

### **Skills Demonstrated**

- Modern React Development (Hooks, Context, Custom Hooks)
- State Management (TanStack Query, Context API)
- UI/UX Design (Responsive, RTL, Accessibility)
- Backend Integration (Supabase, REST APIs)
- Internationalization (i18n, RTL Support)
- Performance Optimization (Code Splitting, Lazy Loading)
- Testing (Unit, Integration, E2E)

### **Learning Resources**

- Almadrasa
- React Documentation
- Supabase Documentation
- Tailwind CSS Documentation
- MDN Web Docs
- Stack Overflow Community

---

<div align="center">

### ⭐ **Star this repository if you found it helpful!** ⭐

**Built with ❤️ by a Frontend Developer**

[![GitHub stars](https://img.shields.io/github/stars/your-username/E-Commerce-shop?style=social)](https://github.com/your-username/E-Commerce-shop)
[![GitHub forks](https://img.shields.io/github/forks/your-username/E-Commerce-shop?style=social)](https://github.com/your-username/E-Commerce-shop)

</div>
