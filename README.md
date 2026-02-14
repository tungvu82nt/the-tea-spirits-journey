# 雅韵茶酒 — YA YUN COLLECTION

> **Nền tảng thương mại điện tử cao cấp chuyên về Trà & Rượu Trung Quốc**
> Premium E-Commerce Platform for Chinese Tea & Spirits

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev)

---

## 📋 Mục Lục

1. [Tổng Quan Dự Án](#1-tổng-quan-dự-án)
2. [Kiến Trúc Hệ Thống](#2-kiến-trúc-hệ-thống)
3. [Cấu Trúc Thư Mục](#3-cấu-trúc-thư-mục)
4. [Frontend — Thiết Kế & Chức Năng](#4-frontend--thiết-kế--chức-năng)
5. [Backend — Thiết Kế & Kiến Trúc](#5-backend--thiết-kế--kiến-trúc)
6. [Design System](#6-design-system)
7. [Công Nghệ Sử Dụng](#7-công-nghệ-sử-dụng)
8. [Lộ Trình Phát Triển (Roadmap)](#8-lộ-trình-phát-triển-roadmap)
9. [Hướng Dẫn Cài Đặt & Phát Triển](#9-hướng-dẫn-cài-đặt--phát-triển)
10. [Kiểm Thử (Testing)](#10-kiểm-thử-testing)
11. [Triển Khai (Deployment)](#11-triển-khai-deployment)
12. [Hiệu Năng & Tối Ưu](#12-hiệu-năng--tối-ưu)
13. [Bảo Mật](#13-bảo-mật)
14. [Đa Ngôn Ngữ (i18n)](#14-đa-ngôn-ngữ-i18n)
15. [Đóng Góp & Quy Ước](#15-đóng-góp--quy-ước)

---

## 1. Tổng Quan Dự Án

### 1.1 Mục Đích

**雅韵茶酒 (Nhã Vận Trà Tửu)** là nền tảng e-commerce cao cấp phân phối Trà và Rượu Trung Quốc chính hãng, phục vụ thị trường Việt Nam và Đông Nam Á.

### 1.2 Đối Tượng Khách Hàng

| Phân Khúc | Độ Tuổi | Nhu Cầu Chính |
|-----------|---------|----------------|
| **Doanh nhân** | 35-50 | Quà tặng đối tác, sưu tầm rượu quý |
| **Gia đình** | 30-55 | Biếu bố mẹ, ông bà dịp lễ Tết |
| **Nhà sưu tầm** | 40-60+ | Rượu limited edition, trà cổ thụ quý hiếm |
| **Người mới** | 25-35 | Tìm hiểu văn hóa trà rượu, quà tặng |

### 1.3 Giá Trị Cốt Lõi

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   🏛️ CHÍNH HÃNG        🎁 QUÀ TẶNG CAO CẤP     🔍 TRUY XUẤT   │
│   100% nguồn gốc      Cá nhân hóa, khắc        Mã QR chống   │
│   xác thực             tên, hộp gỗ sơn mài      hàng giả      │
│                                                                 │
│   🎓 HỌC VIỆN          🚚 GIAO HÀNG             👨‍💼 CONCIERGE  │
│   Video, bài viết      Toàn quốc, bảo quản     VIP 1-1        │
│   kiến thức chuyên sâu  đặc biệt cho rượu      tư vấn riêng   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Kiến Trúc Hệ Thống

### 2.1 Tổng Quan Kiến Trúc

```
┌─────────────────────────────────────────────────────────────────┐
│                        NGƯỜI DÙNG                               │
│                    (Browser / Mobile)                            │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (SPA)                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │  React   │ │ React    │ │ TanStack │ │  i18next          │   │
│  │  Router  │ │ Context  │ │  Query   │ │  (VN/EN/CN)       │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │ Shadcn/  │ │ Tailwind │ │  Vite    │ │ React Hook Form  │   │
│  │   UI     │ │   CSS    │ │ (Build)  │ │  + Zod           │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS / REST API
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Lovable Cloud)                        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐    │
│  │  PostgreSQL   │ │     Auth     │ │   Edge Functions     │    │
│  │  (Database)   │ │ (JWT + RLS)  │ │   (Serverless)       │    │
│  └──────────────┘ └──────────────┘ └──────────────────────┘    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐    │
│  │   Storage     │ │  Realtime    │ │   Secrets Manager    │    │
│  │ (Files/Media) │ │ (WebSocket)  │ │   (API Keys)         │    │
│  └──────────────┘ └──────────────┘ └──────────────────────┘    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   DỊCH VỤ BÊN THỨ BA                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │
│  │ Stripe │ │  Email │ │  SMS   │ │  Maps  │ │CDN/    │       │
│  │Payment │ │Service │ │  OTP   │ │ Google │ │Images  │       │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Luồng Dữ Liệu

```
User Action → React Component → React Query (Cache) → API Call → Lovable Cloud
                                      ↓                              ↓
                                  Cache Hit?                    PostgreSQL
                                    Yes → Return                     ↓
                                    No  → Fetch ← ← ← ← ← ←  RLS Policy
                                             ↓                 (Row Level
                                         Update UI              Security)
```

---

## 3. Cấu Trúc Thư Mục

```
雅韵茶酒/
│
├── 📂 public/                          # Tài nguyên tĩnh
│   ├── favicon.ico                     # Icon tab trình duyệt
│   ├── placeholder.svg                 # Ảnh placeholder
│   └── robots.txt                      # SEO crawlers config
│
├── 📂 src/                             # Mã nguồn chính
│   │
│   ├── 📂 assets/                      # Hình ảnh & media
│   │   ├── hero-liquor-cellar.jpg      # Hero banner rượu
│   │   ├── hero-tea-mountain.jpg       # Hero banner trà
│   │   ├── gift-set.jpg                # Hình bộ quà
│   │   ├── product-baijiu.jpg          # Sản phẩm rượu
│   │   └── product-puerh-tea.jpg       # Sản phẩm trà
│   │
│   ├── 📂 components/                  # Components tái sử dụng
│   │   │
│   │   ├── 📂 ui/                      # Shadcn/UI base components (40+ files)
│   │   │   ├── button.tsx              # Button variants
│   │   │   ├── card.tsx                # Card component
│   │   │   ├── dialog.tsx              # Modal dialogs
│   │   │   ├── form.tsx                # Form wrapper
│   │   │   ├── input.tsx               # Text input
│   │   │   ├── select.tsx              # Select dropdown
│   │   │   ├── table.tsx               # Data table
│   │   │   ├── tabs.tsx                # Tab navigation
│   │   │   ├── toast.tsx               # Toast notifications
│   │   │   ├── lazy-image.tsx          # Lazy loading images
│   │   │   ├── optimized-image.tsx     # Responsive images
│   │   │   ├── virtual-scroll.tsx      # Virtual scrolling
│   │   │   ├── empty-state.tsx         # Empty state display
│   │   │   ├── form-field.tsx          # Reusable form field
│   │   │   ├── progress-steps.tsx      # Step indicator
│   │   │   ├── advanced-filters.tsx    # Filter components
│   │   │   ├── theme-toggle.tsx        # Dark/Light mode
│   │   │   └── ...                     # + 25 more Shadcn components
│   │   │
│   │   ├── 📂 home/                    # Trang chủ sections
│   │   │   ├── HeroSection.tsx         # Banner hero chính
│   │   │   ├── FeaturedProducts.tsx     # Sản phẩm nổi bật
│   │   │   ├── CategoryShowcase.tsx    # Giới thiệu danh mục
│   │   │   ├── BrandStory.tsx          # Câu chuyện thương hiệu
│   │   │   ├── ServicesSection.tsx      # Dịch vụ đặc biệt
│   │   │   └── NewsletterSection.tsx    # Đăng ký nhận tin
│   │   │
│   │   ├── 📂 layout/                  # Layout components
│   │   │   ├── Header.tsx              # Navigation chính
│   │   │   └── Footer.tsx              # Footer thông tin
│   │   │
│   │   ├── 📂 admin/                   # Admin components
│   │   │   ├── AdminHeader.tsx         # Header quản trị
│   │   │   ├── Sidebar.tsx             # Menu bên trái
│   │   │   ├── Breadcrumbs.tsx         # Đường dẫn phân cấp
│   │   │   ├── DataTable.tsx           # Bảng dữ liệu chung
│   │   │   ├── Skeleton.tsx            # Loading skeleton
│   │   │   └── ProtectedRoute.tsx      # Route bảo vệ auth
│   │   │
│   │   ├── ErrorBoundary.tsx           # Error boundary toàn cục
│   │   ├── SectionErrorBoundary.tsx    # Error boundary cục bộ
│   │   ├── LanguageSwitcher.tsx        # Chuyển đổi ngôn ngữ
│   │   └── NavLink.tsx                 # Navigation link active
│   │
│   ├── 📂 pages/                       # Page components (Routing)
│   │   │
│   │   ├── ── CLIENT PAGES ──────────
│   │   │
│   │   ├── Index.tsx                   # 🏠 Trang chủ (/)
│   │   ├── TeaSelection.tsx            # 🍵 Danh mục Trà (/tea)
│   │   ├── LiquorCollection.tsx        # 🍷 Danh mục Rượu (/liquor)
│   │   ├── GiftCenter.tsx              # 🎁 Trung tâm Quà tặng (/gifts)
│   │   ├── CultureTraceability.tsx     # 🏛️ Văn hóa & Truy xuất (/culture)
│   │   │
│   │   ├── TeaProductDetail.tsx        # Chi tiết sản phẩm trà (/tea/:id)
│   │   ├── LiquorProductDetail.tsx     # Chi tiết sản phẩm rượu (/liquor/:id)
│   │   ├── Collection.tsx              # Bộ sưu tập (/account/collections)
│   │   │
│   │   ├── Cart.tsx                    # 🛒 Giỏ hàng (/cart)
│   │   ├── Checkout.tsx                # 💳 Thanh toán (/checkout)
│   │   │
│   │   ├── Account.tsx                 # 👤 Tài khoản (/account)
│   │   ├── Orders.tsx                  # 📦 Đơn hàng (/account/orders)
│   │   ├── OrderDetail.tsx             # Chi tiết đơn (/account/orders/:id)
│   │   ├── Wishlist.tsx                # ♡ Yêu thích (/account/wishlist)
│   │   ├── Addresses.tsx               # 📍 Địa chỉ (/account/addresses)
│   │   ├── PaymentMethods.tsx          # 💳 Thanh toán (/account/payment-methods)
│   │   ├── Coupons.tsx                 # 🎟️ Mã giảm giá (/account/coupons)
│   │   ├── Settings.tsx                # ⚙️ Cài đặt (/account/settings)
│   │   │
│   │   ├── Login.tsx                   # 🔐 Đăng nhập (/login)
│   │   ├── Register.tsx                # 📝 Đăng ký (/register)
│   │   ├── ForgotPassword.tsx          # Quên mật khẩu (/forgot-password)
│   │   ├── VerifyPhone.tsx             # Xác thực SĐT (/verify-phone)
│   │   │
│   │   ├── Contact.tsx                 # 📞 Liên hệ (/contact)
│   │   ├── PrivacyPolicy.tsx           # Chính sách bảo mật (/privacy)
│   │   ├── TermsOfService.tsx          # Điều khoản (/terms)
│   │   ├── ReturnPolicy.tsx            # Chính sách đổi trả (/return-policy)
│   │   ├── NotFound.tsx                # 404 (*)
│   │   │
│   │   ├── ── ADMIN PAGES ──────────
│   │   │
│   │   └── 📂 admin/
│   │       ├── AdminLayout.tsx         # Layout khung admin
│   │       ├── Login.tsx               # Đăng nhập admin (/admin/login)
│   │       ├── Dashboard.tsx           # 📊 Bảng điều khiển (/admin/dashboard)
│   │       │
│   │       ├── 📂 products/
│   │       │   ├── Products.tsx        # Danh sách SP (/admin/products)
│   │       │   ├── ProductForm.tsx     # Thêm/sửa SP (/admin/products/new|:id/edit)
│   │       │   ├── Categories.tsx      # Danh mục (/admin/categories)
│   │       │   └── Inventory.tsx       # Kho hàng (/admin/inventory)
│   │       │
│   │       ├── 📂 orders/
│   │       │   ├── Orders.tsx          # Quản lý đơn (/admin/orders)
│   │       │   └── OrderDetail.tsx     # Chi tiết đơn (/admin/orders/:id)
│   │       │
│   │       ├── 📂 customers/
│   │       │   ├── Customers.tsx       # Khách hàng (/admin/customers)
│   │       │   └── CustomerDetail.tsx  # Chi tiết KH (/admin/customers/:id)
│   │       │
│   │       ├── 📂 analytics/
│   │       │   └── Analytics.tsx       # Phân tích (/admin/analytics)
│   │       │
│   │       └── 📂 settings/
│   │           └── Settings.tsx        # Cài đặt hệ thống (/admin/settings)
│   │
│   ├── 📂 contexts/                    # React Context providers
│   │   └── ThemeContext.tsx             # Dark/Light mode context
│   │
│   ├── 📂 hooks/                       # Custom React hooks
│   │   ├── use-mobile.tsx              # Detect mobile device
│   │   └── use-toast.ts                # Toast notification hook
│   │
│   ├── 📂 lib/                         # Utilities & helpers
│   │   ├── utils.ts                    # cn(), formatPrice(), etc.
│   │   ├── auth.ts                     # Auth utilities
│   │   └── undo.ts                     # Undo/Redo logic
│   │
│   ├── 📂 locales/                     # Bản dịch đa ngôn ngữ
│   │   ├── 📂 vi/
│   │   │   └── common.json            # Tiếng Việt
│   │   ├── 📂 en/
│   │   │   └── common.json            # English
│   │   └── 📂 zh/
│   │       └── common.json            # 中文 (Tiếng Trung)
│   │
│   ├── 📂 utils/                       # Utility functions
│   │   ├── accessibility.ts            # A11y helpers
│   │   └── security.ts                 # XSS/CSRF protection
│   │
│   ├── 📂 test/                        # Test files
│   │   ├── setup.ts                    # Vitest setup
│   │   ├── 📂 components/
│   │   │   └── DataTable.test.tsx      # Component tests
│   │   └── 📂 e2e/
│   │       └── auth-flow.spec.ts       # E2E tests (Playwright)
│   │
│   ├── 📂 stories/                     # Storybook stories
│   │   ├── Button.stories.ts
│   │   ├── Header.stories.ts
│   │   └── Page.stories.ts
│   │
│   ├── App.tsx                         # Root component + Router
│   ├── App.css                         # App-specific styles
│   ├── main.tsx                        # Entry point (ReactDOM)
│   ├── index.css                       # Global styles + Design tokens
│   ├── i18n.ts                         # i18next configuration
│   └── vite-env.d.ts                   # Vite type declarations
│
├── 📂 docs/                            # Tài liệu chi tiết từng trang
│   ├── README.md                       # Mục lục tài liệu
│   ├── 📂 client/                      # Tài liệu trang khách hàng
│   └── 📂 admin/                       # Tài liệu trang quản trị
│
├── 📂 .storybook/                      # Storybook configuration
│   ├── main.ts
│   └── preview.ts
│
├── index.html                          # HTML entry
├── vite.config.ts                      # Vite config (code splitting)
├── vitest.config.ts                    # Test runner config
├── tailwind.config.ts                  # Tailwind + Design tokens
├── tsconfig.json                       # TypeScript strict config
├── tsconfig.app.json                   # App-specific TS config
├── tsconfig.node.json                  # Node TS config
├── eslint.config.js                    # Linting rules
├── postcss.config.js                   # PostCSS plugins
├── playwright.config.ts                # E2E test config
├── components.json                     # Shadcn/UI config
├── DOCUMENTATION.md                    # Tài liệu kỹ thuật
├── API_DOCUMENTATION.md                # Tài liệu API
└── DEPLOYMENT_GUIDE.md                 # Hướng dẫn triển khai
```

---

## 4. Frontend — Thiết Kế & Chức Năng

### 4.1 Trang Client (Khách Hàng)

#### 4.1.1 Trang Chủ (`/`)

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER: Logo | Trà | Rượu | Quà | Văn Hóa | 🔍 🛒 👤 🌐  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    HERO SECTION                              │
│            (Full-screen banner + CTA buttons)               │
│            "Tinh Hoa Trà Rượu Trung Hoa"                   │
│            [KHÁM PHÁ TRÀ]  [KHÁM PHÁ RƯỢU]               │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                  SẢN PHẨM NỔI BẬT                          │
│  [Tất cả] [Trà] [Rượu]                                    │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                              │
│  │ P1 │ │ P2 │ │ P3 │ │ P4 │  (Grid 4 cột, hover effects)│
│  └────┘ └────┘ └────┘ └────┘                              │
├─────────────────────────────────────────────────────────────┤
│              GIỚI THIỆU DANH MỤC                           │
│    ┌──────────────┐  ┌──────────────┐                      │
│    │ TRÀ THƯỢNG   │  │ RƯỢU QUÝ    │                      │
│    │ HẠNG         │  │ HIẾM        │                      │
│    └──────────────┘  └──────────────┘                      │
├─────────────────────────────────────────────────────────────┤
│               CÂU CHUYỆN THƯƠNG HIỆU                      │
│   ┌────────┐  Story text + Statistics (25+ năm, 500+ SP)   │
│   │ IMAGE  │  Count-up animations on scroll                │
│   └────────┘                                               │
├─────────────────────────────────────────────────────────────┤
│               DỊCH VỤ ĐẶC BIỆT                            │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐             │
│  │ Gói quà│ │Giao hàng│ │Truy xuất││Tư vấn │             │
│  │ cao cấp│ │toàn quốc│ │nguồn gốc││cá nhân│             │
│  └────────┘ └────────┘ └────────┘ └────────┘             │
├─────────────────────────────────────────────────────────────┤
│               ĐĂNG KÝ NHẬN TIN                             │
│    [Email input]  [ĐĂNG KÝ] — Giảm 10% đơn đầu           │
├─────────────────────────────────────────────────────────────┤
│ FOOTER: About | Links | Contact | Social | © 2024          │
└─────────────────────────────────────────────────────────────┘
```

**Components**: `HeroSection`, `FeaturedProducts`, `CategoryShowcase`, `BrandStory`, `ServicesSection`, `NewsletterSection`

#### 4.1.2 Danh Mục Trà (`/tea`)

| Tính Năng | Chi Tiết |
|-----------|----------|
| **Lọc theo loại** | Phổ Nhĩ, Ô Long, Trà Xanh, Hồng Trà, Bạch Trà, Hoàng Trà |
| **Lọc theo xuất xứ** | Vân Nam, Phúc Kiến, An Huy, Chiết Giang, Đài Loan |
| **Lọc theo hình thức** | Trà Bánh, Trà Rời, Trà Túi Lọc, Trà Gạch |
| **Khoảng giá** | Slider range từ 0 - 50.000.000₫ |
| **Sắp xếp** | Nổi bật, Mới nhất, Giá thấp→cao, Giá cao→thấp, Bán chạy |
| **Hiển thị** | Grid (2-4 cột) / List view toggle |
| **Phân trang** | 12/24/48 sản phẩm mỗi trang |

#### 4.1.3 Danh Mục Rượu (`/liquor`)

| Tính Năng | Chi Tiết |
|-----------|----------|
| **Xác minh tuổi** | Modal xác nhận 18+ (lưu localStorage) |
| **Lọc theo hương** | Tương Hương (酱香), Nồng Hương (浓香), Thanh Hương (清香) |
| **Lọc theo niên đại** | 5 năm, 10 năm, 15 năm, 20 năm, 30+ năm |
| **Lọc theo thương hiệu** | Mao Đài, Ngũ Lương Dịch, Lô Châu, Phần Tửu |
| **Bộ sưu tập đặc biệt** | Limited Edition, Zodiac, Anniversary, Vintage |

#### 4.1.4 Trung Tâm Quà Tặng (`/gifts`)

```
Danh mục quà:
├── 🏢 Doanh Nghiệp (Đối tác, khách VIP, nhân viên)
├── 👨‍👩‍👧‍👦 Gia Đình (Cha mẹ, ông bà, người thân)
└── 🎊 Dịp Đặc Biệt (Tết, sinh nhật, kỷ niệm)

Dịch vụ cá nhân hóa:
├── Khắc chữ (nhiều font, đa ngôn ngữ)
├── Hộp quà (Gỗ sơn mài, Da cao cấp, Tre thủ công)
├── Phụ kiện (Thiệp, ruy băng, ấm chén, ly pha lê)
└── Giải pháp doanh nghiệp (Số lượng lớn, in logo, VAT)
```

#### 4.1.5 Văn Hóa & Truy Xuất (`/culture`)

| Tab | Nội Dung |
|-----|----------|
| **Học Viện** | Video courses, bài viết, pha chế, bảo quản, lịch sử |
| **Truy Xuất** | Nhập mã / Quét QR → Xác thực chính hãng + Lộ trình sản phẩm |
| **Vùng Đất** | Bản đồ tương tác, tour ảo 360°, livestream vùng nguyên liệu |
| **Nghệ Nhân** | Profile, giải thưởng, video phỏng vấn, sản phẩm đại diện |

#### 4.1.6 Trang Tài Khoản (`/account`)

```
Account Dashboard
├── 📊 Tổng quan (Stats, đơn gần đây, ưu đãi riêng)
├── 📦 Đơn hàng (Lịch sử, trạng thái, theo dõi)
├── 🏆 Bộ sưu tập (Sản phẩm đã mua + theo dõi giá trị tăng)
├── ♡ Yêu thích (Wishlist)
├── 📍 Địa chỉ (CRUD địa chỉ giao hàng)
├── 💳 Thanh toán (Quản lý thẻ/ví điện tử)
├── 🎟️ Mã giảm giá (Kho voucher)
└── ⚙️ Cài đặt (Thông tin, mật khẩu, thông báo)
```

#### 4.1.7 Luồng Mua Hàng

```
Trang SP → [Thêm vào giỏ] → Giỏ hàng → Checkout
                                            │
                                    ┌───────┼───────┐
                                    ▼       ▼       ▼
                                Step 1   Step 2   Step 3
                                Giao     Vận      Thanh
                                hàng     chuyển   toán
                                    │       │       │
                                    └───────┼───────┘
                                            ▼
                                         Step 4
                                      Xác nhận →  ✅ Thành công
                                      Đặt hàng    #ORD-2024-XXXX
```

**Phương thức thanh toán**: Thẻ tín dụng, Chuyển khoản QR, Ví điện tử (Momo/ZaloPay/VNPay), COD

#### 4.1.8 Xác Thực Người Dùng

```
Đăng nhập (/login)
├── Email + Mật khẩu
├── Số điện thoại + OTP (6 số)
└── Social Login (Google, Facebook)

Đăng ký (/register)
├── Form đầy đủ (Tên, Email, SĐT, Mật khẩu)
├── Password strength indicator
├── Email verification
└── Welcome email + Mã giảm 10% (WELCOME10)
```

#### 4.1.9 Trang Thông Tin

| Trang | Route | Mô Tả |
|-------|-------|--------|
| Liên hệ | `/contact` | Form liên hệ, bản đồ, thông tin công ty |
| Chính sách bảo mật | `/privacy` | Quy định về thu thập và xử lý dữ liệu |
| Điều khoản dịch vụ | `/terms` | Điều kiện sử dụng website |
| Chính sách đổi trả | `/return-policy` | Quy trình hoàn trả và bảo hành |
| 404 | `*` | Trang không tìm thấy |

---

### 4.2 Trang Admin (Quản Trị)

> ⚠️ Tất cả trang admin được bảo vệ bởi `ProtectedRoute` — yêu cầu đăng nhập admin.

#### 4.2.1 Dashboard (`/admin/dashboard`)

```
┌─────────────────────────────────────────────────────────────┐
│ SIDEBAR        │           DASHBOARD                         │
│                │                                             │
│ ▸ Dashboard    │  ┌────────┐ ┌────────┐ ┌────────┐ ┌──────┐│
│ ▸ Sản phẩm    │  │Doanh thu│ │Đơn hàng│ │Khách   │ │Tồn kho││
│ ▸ Danh mục    │  │ 1.2 tỷ  │ │  234   │ │ 1,892  │ │  567 ││
│ ▸ Kho hàng    │  │ +15%↑  │ │ +8%↑   │ │ +12%↑  │ │ -3%↓ ││
│ ▸ Đơn hàng    │  └────────┘ └────────┘ └────────┘ └──────┘│
│ ▸ Khách hàng  │                                             │
│ ▸ Phân tích   │  ┌─────────────────────────────────────┐   │
│ ▸ Cài đặt     │  │        BIỂU ĐỒ DOANH THU           │   │
│                │  │        (Recharts line chart)        │   │
│                │  └─────────────────────────────────────┘   │
│                │                                             │
│                │  ĐƠN HÀNG GẦN ĐÂY        SẢN PHẨM BÁN CHẠY│
│                │  ┌──────────────┐         ┌──────────────┐ │
│                │  │ Table 5 rows │         │ Top 5 list   │ │
│                │  └──────────────┘         └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### 4.2.2 Quản Lý Sản Phẩm

| Route | Chức Năng |
|-------|-----------|
| `/admin/products` | Danh sách sản phẩm, tìm kiếm, lọc, xóa hàng loạt |
| `/admin/products/new` | Form thêm sản phẩm mới (React Hook Form + Zod) |
| `/admin/products/:id/edit` | Form chỉnh sửa sản phẩm |
| `/admin/categories` | CRUD danh mục (cây phân cấp) |
| `/admin/inventory` | Quản lý tồn kho, cảnh báo hết hàng, nhập/xuất |

#### 4.2.3 Quản Lý Đơn Hàng

| Route | Chức Năng |
|-------|-----------|
| `/admin/orders` | Danh sách đơn, lọc theo trạng thái, tìm kiếm |
| `/admin/orders/:id` | Chi tiết đơn, cập nhật trạng thái, in hóa đơn |

**Luồng trạng thái đơn hàng**:
```
Chờ xác nhận → Đã xác nhận → Đang chuẩn bị → Đang giao → Đã giao
                     │                                        │
                     └─── Đã hủy                              └─── Hoàn trả
```

#### 4.2.4 Quản Lý Khách Hàng

| Route | Chức Năng |
|-------|-----------|
| `/admin/customers` | Danh sách khách hàng, lọc theo tier VIP |
| `/admin/customers/:id` | Hồ sơ chi tiết, lịch sử mua, hành vi |

#### 4.2.5 Phân Tích & Báo Cáo (`/admin/analytics`)

- Doanh thu theo ngày/tuần/tháng/năm (Recharts)
- Top sản phẩm bán chạy
- Phân tích khách hàng (Acquisition, Retention)
- Tỷ lệ chuyển đổi funnel

#### 4.2.6 Cài Đặt Hệ Thống (`/admin/settings`)

- Thông tin cửa hàng
- Email/SMS templates
- Cấu hình thanh toán
- SEO settings

---

## 5. Backend — Thiết Kế & Kiến Trúc

### 5.1 Database Schema (PostgreSQL)

```sql
-- Core Tables
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   profiles   │    │   products   │    │   orders     │
├──────────────┤    ├──────────────┤    ├──────────────┤
│ id (uuid)    │    │ id (uuid)    │    │ id (uuid)    │
│ full_name    │    │ name         │    │ user_id (fk) │
│ phone        │    │ name_cn      │    │ status       │
│ email        │    │ category_id  │    │ total        │
│ avatar_url   │    │ price        │    │ address_id   │
│ tier (VIP)   │    │ origin       │    │ payment_type │
│ points       │    │ stock        │    │ tracking_no  │
│ created_at   │    │ images[]     │    │ created_at   │
└──────────────┘    │ rating       │    └──────────────┘
                    │ description  │
┌──────────────┐    │ metadata{}   │    ┌──────────────┐
│  categories  │    └──────────────┘    │ order_items  │
├──────────────┤                        ├──────────────┤
│ id           │    ┌──────────────┐    │ order_id(fk) │
│ name         │    │  addresses   │    │ product_id   │
│ parent_id    │    ├──────────────┤    │ quantity     │
│ type (tea/   │    │ user_id (fk) │    │ unit_price   │
│  liquor)     │    │ full_name    │    │ subtotal     │
│ icon         │    │ phone        │    └──────────────┘
└──────────────┘    │ province     │
                    │ district     │    ┌──────────────┐
┌──────────────┐    │ ward         │    │   coupons    │
│  wishlists   │    │ address      │    ├──────────────┤
├──────────────┤    │ is_default   │    │ code         │
│ user_id (fk) │    └──────────────┘    │ discount_type│
│ product_id   │                        │ value        │
│ created_at   │    ┌──────────────┐    │ min_order    │
└──────────────┘    │  reviews     │    │ max_discount │
                    ├──────────────┤    │ expires_at   │
┌──────────────┐    │ product_id   │    │ usage_limit  │
│ collections  │    │ user_id      │    └──────────────┘
├──────────────┤    │ rating       │
│ user_id      │    │ comment      │    ┌──────────────┐
│ product_id   │    │ images[]     │    │traceability  │
│ purchase_price│   └──────────────┘    ├──────────────┤
│ purchase_date│                        │ product_id   │
│ notes        │                        │ batch_code   │
│ status       │                        │ qr_code      │
└──────────────┘                        │ scan_count   │
                                        │ journey[]    │
                                        └──────────────┘
```

### 5.2 Authentication

```
┌─────────────────────────────────────────────────────┐
│                  AUTH FLOW                            │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Client                    Lovable Cloud            │
│    │                           │                    │
│    │── Email/Password ────────▶│                    │
│    │                           │── Verify ─▶ DB    │
│    │◀── JWT Token ─────────────│                    │
│    │                           │                    │
│    │── API Request + JWT ─────▶│                    │
│    │                           │── RLS Check        │
│    │◀── Protected Data ────────│                    │
│    │                           │                    │
│  ┌─────────────────────────────────────────────┐   │
│  │ JWT contains: user_id, email, role, exp     │   │
│  │ RLS ensures: users see only THEIR data      │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 5.3 Edge Functions (Serverless)

| Function | Mô Tả |
|----------|--------|
| `process-payment` | Xử lý thanh toán qua Stripe/VNPay |
| `send-email` | Gửi email xác nhận, thông báo |
| `send-sms` | Gửi OTP qua SMS |
| `verify-product` | Xác minh sản phẩm chống hàng giả |
| `generate-report` | Tạo báo cáo doanh thu/khách hàng |
| `sync-inventory` | Đồng bộ tồn kho realtime |

### 5.4 Row Level Security (RLS)

```sql
-- Users can only see their own orders
CREATE POLICY "Users view own orders"
ON orders FOR SELECT
USING (auth.uid() = user_id);

-- Admin can view all orders
CREATE POLICY "Admin view all orders"
ON orders FOR SELECT
USING (auth.jwt() ->> 'role' = 'admin');

-- Users can only modify their own profile
CREATE POLICY "Users update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);
```

### 5.5 Storage Buckets

| Bucket | Mô Tả | Access |
|--------|--------|--------|
| `product-images` | Ảnh sản phẩm (WebP, tối ưu) | Public read |
| `user-avatars` | Avatar người dùng | Owner only |
| `order-documents` | Hóa đơn, chứng nhận | Owner + Admin |
| `gift-designs` | Thiết kế hộp quà custom | Owner only |

---

## 6. Design System

### 6.1 Bảng Màu

```
LIGHT MODE                          DARK MODE
─────────────────────────           ─────────────────────────
Background  #FAF7F2 (Cream)         Background  #1A1510 (Deep Brown)
Foreground  #2D2117 (Ink)           Foreground  #EDE8E0 (Light Cream)
Primary     #6B2D2D (Wine Red)      Primary     #D4A040 (Gold)
Secondary   #E8D5A8 (Champagne)     Secondary   #2D2820 (Dark Brown)
Accent      #D4A040 (Rich Gold)     Accent      #D4A040 (Rich Gold)
Muted       #E8E0D5 (Warm Gray)     Muted       #2D2820 (Dark Muted)
```

### 6.2 Typography

```
Font Display:  Playfair Display (Headings)       — Italic serif, luxury feel
Font Serif:    Noto Serif SC (Body, Chinese)     — Multi-language support
Font Sans:     System UI (UI elements)           — Clean, performant
```

### 6.3 Brand Colors (Custom CSS Variables)

| Variable | Light Mode | Dark Mode | Usage |
|----------|-----------|-----------|-------|
| `--wine` | `0 45% 28%` | `0 40% 40%` | Primary brand, buttons |
| `--wine-light` | `0 35% 45%` | `0 35% 55%` | Hover states |
| `--gold` | `38 70% 50%` | `38 70% 55%` | Accents, badges, CTAs |
| `--gold-light` | `38 60% 70%` | `38 60% 65%` | Subtle highlights |
| `--tea-brown` | `25 40% 30%` | `25 35% 40%` | Tea category |
| `--ink` | `220 15% 20%` | `220 10% 85%` | Dark text |
| `--cream` | `40 30% 97%` | `20 20% 8%` | Light backgrounds |

### 6.4 Animation System

```css
fadeUp:   translateY(30px) → 0    | 0.8s ease-out   — Section reveals
fadeIn:   opacity 0 → 1           | 0.6s ease-out   — Gentle appear
scaleIn:  scale(0.95) → 1         | 0.5s ease-out   — Card entrances
shimmer:  background position     | 2s linear loop  — Loading skeleton
float:    translateY ±10px        | 6s ease-in-out  — Decorative float
```

### 6.5 Custom Utility Classes

```
.text-gradient-gold    — Gold gradient text (for headings)
.bg-gradient-hero      — Deep burgundy gradient (hero overlays)
.bg-gradient-cream     — Subtle cream gradient (section backgrounds)
.shadow-soft           — 4px 20px subtle shadow
.shadow-medium         — 8px 30px medium shadow
.shadow-gold           — Gold-tinted glow shadow
```

---

## 7. Công Nghệ Sử Dụng

### 7.1 Frontend Stack

| Công Nghệ | Version | Vai Trò |
|------------|---------|---------|
| **React** | 18.x | UI Library |
| **TypeScript** | 5.x | Type Safety |
| **Vite** | 5.x | Build Tool + HMR |
| **Tailwind CSS** | 3.x | Utility-first Styling |
| **Shadcn/UI** | Latest | Component Library (Radix UI based) |
| **React Router** | 6.x | Client-side Routing + Lazy Loading |
| **TanStack Query** | 5.x | Server State Management + Caching |
| **React Hook Form** | 7.x | Form Management |
| **Zod** | 3.x | Schema Validation |
| **i18next** | 25.x | Internationalization (VN/EN/CN) |
| **Recharts** | 2.x | Charts & Graphs |
| **Lucide React** | 0.46x | Icon Library |
| **Sonner** | 1.x | Toast Notifications |
| **Embla Carousel** | 8.x | Touch-friendly Carousels |
| **date-fns** | 3.x | Date Manipulation |
| **next-themes** | 0.3 | Dark/Light Mode |

### 7.2 Backend Stack

| Công Nghệ | Vai Trò |
|------------|---------|
| **Lovable Cloud** | Full-stack Backend Platform |
| **PostgreSQL** | Relational Database |
| **Edge Functions** | Serverless API (Deno Runtime) |
| **RLS Policies** | Row-level Security |
| **Realtime** | WebSocket subscriptions |
| **Storage** | File/Image hosting |

### 7.3 Testing & Quality

| Tool | Vai Trò |
|------|---------|
| **Vitest** | Unit & Integration Testing |
| **Playwright** | E2E Testing |
| **Storybook** | Component Documentation & Visual Testing |
| **ESLint** | Code Linting |
| **TypeScript Strict** | Static Type Checking |

### 7.4 Build & Optimization

| Feature | Implementation |
|---------|---------------|
| **Code Splitting** | `React.lazy()` + `Suspense` cho 15+ routes |
| **Manual Chunks** | vendor, ui, forms, query (Vite rollupOptions) |
| **Tree Shaking** | Vite tự động loại bỏ dead code |
| **Image Optimization** | LazyImage + OptimizedImage components |
| **Bundle Analysis** | `rollup-plugin-visualizer` (mode: analyze) |

---

## 8. Lộ Trình Phát Triển (Roadmap)

### Phase 1: Nền Tảng & UI (Tuần 1-4)

```
┌─────────────────────────────────────────────────────────────┐
│  🟢 PHASE 1: FOUNDATION                  Status: ✅ HOÀN THÀNH│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Tuần 1-2: Setup & Core UI                                  │
│  ├── ✅ Khởi tạo dự án (Vite + React + TypeScript)         │
│  ├── ✅ Thiết lập Design System (colors, fonts, tokens)     │
│  ├── ✅ Cài đặt Shadcn/UI (40+ components)                 │
│  ├── ✅ Tạo Layout components (Header, Footer)              │
│  ├── ✅ Cấu hình Tailwind themes (Light/Dark mode)          │
│  ├── ✅ Setup i18n (VN, EN, CN)                             │
│  └── ✅ ErrorBoundary + SectionErrorBoundary                │
│                                                             │
│  Tuần 3-4: Client Pages                                     │
│  ├── ✅ Trang chủ (Hero, Featured, Categories, Story)       │
│  ├── ✅ Danh mục Trà (Filters, Grid/List, Pagination)       │
│  ├── ✅ Danh mục Rượu (Age gate, Aroma types)               │
│  ├── ✅ Trung tâm Quà tặng (Categories, Customization)     │
│  ├── ✅ Văn hóa & Truy xuất (Tabs: Academy/Verify/Origins) │
│  ├── ✅ Chi tiết sản phẩm (Tea + Liquor detail pages)       │
│  ├── ✅ Trang xác thực (Login, Register, Forgot Password)   │
│  └── ✅ Trang thông tin (Privacy, Terms, Return, Contact)   │
│                                                             │
│  Deliverables:                                               │
│  ☑ 27 trang client hoàn chỉnh UI                           │
│  ☑ Responsive trên Desktop, Tablet, Mobile                  │
│  ☑ Dark/Light mode hoạt động                                │
│  ☑ 3 ngôn ngữ (VI/EN/ZH)                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Phase 2: Admin Panel & Cart/Checkout (Tuần 5-8)

```
┌─────────────────────────────────────────────────────────────┐
│  🟢 PHASE 2: ADMIN & COMMERCE             Status: ✅ HOÀN THÀNH│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Tuần 5-6: Admin Panel                                      │
│  ├── ✅ Admin Layout (Sidebar, Header, Breadcrumbs)         │
│  ├── ✅ Dashboard (Stats cards, Charts, Recent orders)       │
│  ├── ✅ Products CRUD (List, Form, Categories, Inventory)   │
│  ├── ✅ Orders Management (List, Detail, Status flow)       │
│  ├── ✅ Customers Management (List, Detail, VIP tiers)      │
│  ├── ✅ Analytics (Revenue charts, Top products)             │
│  ├── ✅ Settings (Store config)                              │
│  ├── ✅ Admin Authentication + ProtectedRoute               │
│  └── ✅ Reusable DataTable component                        │
│                                                             │
│  Tuần 7-8: Shopping Flow                                    │
│  ├── ✅ Giỏ hàng (Add/Remove/Quantity/Coupon)               │
│  ├── ✅ Checkout 4 bước (Address → Shipping → Payment → Confirm)│
│  ├── ✅ Trang tài khoản (Dashboard, Collection tracking)    │
│  ├── ✅ Quản lý đơn hàng (List, Detail, Tracking)           │
│  ├── ✅ Wishlist (Add/Remove, Move to cart)                  │
│  ├── ✅ Addresses CRUD                                       │
│  ├── ✅ Payment Methods management                           │
│  └── ✅ Coupons wallet                                       │
│                                                             │
│  Deliverables:                                               │
│  ☑ 14 trang admin hoàn chỉnh                               │
│  ☑ Full shopping flow (Browse → Cart → Checkout → Order)    │
│  ☑ Account management suite                                 │
│  ☑ Lazy loading cho tất cả routes phụ                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Phase 3: Backend Integration (Tuần 9-14)

```
┌─────────────────────────────────────────────────────────────┐
│  🟡 PHASE 3: BACKEND                      Status: 🔜 SẮP TỚI │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Tuần 9-10: Database & Auth                                 │
│  ├── ⬜ Enable Lovable Cloud                                │
│  ├── ⬜ Thiết kế & tạo database schema (10+ tables)         │
│  ├── ⬜ Cấu hình RLS policies cho mọi table                │
│  ├── ⬜ Implement Auth (Email + Phone OTP + Social)         │
│  ├── ⬜ User profiles + VIP tier system                     │
│  ├── ⬜ Protected routes với real auth                       │
│  └── ⬜ Session management + Token refresh                   │
│                                                             │
│  Tuần 11-12: Core API Integration                           │
│  ├── ⬜ Products API (CRUD + filters + search)              │
│  ├── ⬜ Cart API (Persistent cart per user)                  │
│  ├── ⬜ Orders API (Create, status updates, history)        │
│  ├── ⬜ Wishlist/Collection API                             │
│  ├── ⬜ Addresses API                                        │
│  ├── ⬜ Coupons API (Validation, application)               │
│  ├── ⬜ Reviews API                                          │
│  └── ⬜ Replace all mock data với real data                  │
│                                                             │
│  Tuần 13-14: Advanced Features                              │
│  ├── ⬜ Payment integration (Stripe / VNPay)                │
│  ├── ⬜ Email notifications (Order confirmation, shipping)  │
│  ├── ⬜ SMS OTP service                                      │
│  ├── ⬜ Product traceability (QR code verification)         │
│  ├── ⬜ Image upload + Storage                               │
│  ├── ⬜ Search với full-text search PostgreSQL               │
│  └── ⬜ Realtime order status updates                        │
│                                                             │
│  Deliverables:                                               │
│  ☐ Database schema hoàn chỉnh (10+ tables)                  │
│  ☐ Auth flow hoạt động end-to-end                           │
│  ☐ Tất cả CRUD APIs functional                              │
│  ☐ Payment processing                                       │
│  ☐ Email/SMS notifications                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Phase 4: Testing & QA (Tuần 15-17)

```
┌─────────────────────────────────────────────────────────────┐
│  🔵 PHASE 4: TESTING & QA                 Status: 🔜 SẮP TỚI │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Tuần 15: Unit & Integration Tests                          │
│  ├── ⬜ Component tests (Vitest + RTL)                       │
│  │   ├── ProductCard, CartItem, OrderCard                   │
│  │   ├── Form validation (Login, Register, Checkout)        │
│  │   ├── Filter/Sort logic                                  │
│  │   └── Cart calculations (subtotal, discount, total)      │
│  ├── ⬜ Hook tests (useCart, useAuth, useProducts)           │
│  ├── ⬜ Utility tests (formatPrice, validateCoupon)         │
│  └── ⬜ API integration tests                                │
│                                                             │
│  Tuần 16: E2E Tests (Playwright)                            │
│  ├── ⬜ Auth flow (Register → Login → Logout)               │
│  ├── ⬜ Shopping flow (Browse → Cart → Checkout → Order)    │
│  ├── ⬜ Admin flow (Login → CRUD products → View orders)    │
│  ├── ⬜ Search & Filter flow                                │
│  ├── ⬜ Language switching                                    │
│  ├── ⬜ Responsive tests (Mobile, Tablet, Desktop)          │
│  └── ⬜ Cross-browser (Chrome, Firefox, Safari)             │
│                                                             │
│  Tuần 17: QA & Bug Fixes                                    │
│  ├── ⬜ Performance audit (Lighthouse score ≥ 90)           │
│  ├── ⬜ Accessibility audit (WCAG 2.1 AA)                   │
│  ├── ⬜ Security audit (XSS, CSRF, SQL Injection)           │
│  ├── ⬜ SEO audit (Meta tags, Structured data, Sitemap)     │
│  ├── ⬜ Edge case testing                                    │
│  └── ⬜ Bug fixes & polish                                   │
│                                                             │
│  Kết Quả Mong Đợi:                                         │
│  ☐ Test coverage ≥ 80%                                      │
│  ☐ 0 critical/high severity bugs                            │
│  ☐ Lighthouse Performance ≥ 90                              │
│  ☐ WCAG 2.1 AA compliance                                   │
│  ☐ All E2E scenarios passing                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Phase 5: Tối Ưu & Launch (Tuần 18-20)

```
┌─────────────────────────────────────────────────────────────┐
│  🔴 PHASE 5: OPTIMIZATION & LAUNCH        Status: 🔜 SẮP TỚI │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Tuần 18: Performance Optimization                          │
│  ├── ⬜ Bundle size optimization (target < 200KB gzipped)   │
│  ├── ⬜ Image optimization (WebP, lazy load, srcset)        │
│  ├── ⬜ Critical CSS inlining                                │
│  ├── ⬜ Service Worker (offline support)                     │
│  ├── ⬜ CDN configuration                                    │
│  ├── ⬜ Database query optimization (indexes, caching)      │
│  └── ⬜ API response time < 200ms                           │
│                                                             │
│  Tuần 19: Pre-Launch                                        │
│  ├── ⬜ Staging environment deployment                       │
│  ├── ⬜ UAT (User Acceptance Testing)                       │
│  ├── ⬜ Load testing (1000+ concurrent users)               │
│  ├── ⬜ SSL certificate + Custom domain setup               │
│  ├── ⬜ Monitoring & Alerting (Error tracking)              │
│  ├── ⬜ Analytics integration (Google Analytics)            │
│  ├── ⬜ Legal review (Privacy, Terms)                        │
│  └── ⬜ Content review (Products, Descriptions, Images)     │
│                                                             │
│  Tuần 20: LAUNCH 🚀                                         │
│  ├── ⬜ Production deployment                                │
│  ├── ⬜ DNS propagation + Domain verification               │
│  ├── ⬜ Smoke tests on production                            │
│  ├── ⬜ Seed initial product data                            │
│  ├── ⬜ Admin accounts setup                                 │
│  ├── ⬜ Monitoring dashboards active                         │
│  └── ⬜ Launch announcement                                  │
│                                                             │
│  Kết Quả Mong Đợi:                                         │
│  ☐ Website live và ổn định                                  │
│  ☐ FCP < 1.5s, LCP < 2.5s, CLS < 0.1                      │
│  ☐ 99.9% uptime                                            │
│  ☐ Xử lý 1000+ concurrent users                            │
│  ☐ Monitoring & alerting active                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Phase 6: Post-Launch & Growth (Liên tục)

```
┌─────────────────────────────────────────────────────────────┐
│  ⚪ PHASE 6: GROWTH                       Status: TƯƠNG LAI   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Tháng 1-2: Iteration                                       │
│  ├── ⬜ User feedback collection & analysis                 │
│  ├── ⬜ A/B testing (CTA, layout, pricing)                  │
│  ├── ⬜ Conversion rate optimization                         │
│  ├── ⬜ SEO improvements based on analytics                 │
│  └── ⬜ Bug fixes from production                            │
│                                                             │
│  Tháng 3-6: Feature Expansion                               │
│  ├── ⬜ Mobile app (React Native / PWA)                     │
│  ├── ⬜ AI-powered recommendations                          │
│  ├── ⬜ Chatbot tư vấn 24/7                                 │
│  ├── ⬜ Loyalty/Points system                               │
│  ├── ⬜ Flash sales & Auction                               │
│  ├── ⬜ Affiliate program                                    │
│  ├── ⬜ Blog / Content marketing                            │
│  └── ⬜ Multi-vendor marketplace                            │
│                                                             │
│  Tháng 6-12: Scale                                          │
│  ├── ⬜ Regional expansion (SEA markets)                    │
│  ├── ⬜ Multi-warehouse inventory                           │
│  ├── ⬜ Advanced analytics & BI                             │
│  ├── ⬜ ERP integration                                      │
│  └── ⬜ Microservices architecture migration                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. Hướng Dẫn Cài Đặt & Phát Triển

### 9.1 Yêu Cầu Hệ Thống

```
Node.js    ≥ 18.x
npm        ≥ 9.x  (hoặc bun)
Git        ≥ 2.x
Browser    Chrome/Firefox/Safari (latest)
```

### 9.2 Cài Đặt

```bash
# Clone repository
git clone <repository-url>
cd ya-yun-collection

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Truy cập
# → http://localhost:8080
```

### 9.3 Scripts

| Script | Lệnh | Mô Tả |
|--------|-------|--------|
| Dev | `npm run dev` | Chạy dev server (HMR, port 8080) |
| Build | `npm run build` | Build production |
| Preview | `npm run preview` | Preview production build |
| Lint | `npm run lint` | Kiểm tra code với ESLint |
| Test | `npm run test` | Chạy unit tests (Vitest) |
| Test E2E | `npx playwright test` | Chạy E2E tests |
| Storybook | `npm run storybook` | Chạy Storybook (component docs) |
| Analyze | `npm run build -- --mode analyze` | Phân tích bundle size |

### 9.4 Biến Môi Trường

```env
# .env.local (Development)
VITE_APP_TITLE=雅韵茶酒
VITE_API_URL=http://localhost:3000/api

# .env.production
VITE_APP_TITLE=雅韵茶酒
VITE_API_URL=https://api.yayun.com
VITE_GA_ID=G-XXXXXXXXXX
```

---

## 10. Kiểm Thử (Testing)

### 10.1 Chiến Lược Testing

```
                    ┌─────────────────┐
                    │   E2E Tests     │  ← Playwright
                    │  (10% effort)   │     Full user flows
                   ╱└─────────────────┘╲
                  ╱                      ╲
                 ╱  ┌─────────────────┐   ╲
                ╱   │ Integration     │    ╲
               ╱    │  Tests (30%)    │     ╲  ← Vitest + MSW
              ╱     └─────────────────┘      ╲
             ╱                                 ╲
            ╱    ┌─────────────────────────┐    ╲
           ╱     │    Unit Tests (60%)     │     ╲  ← Vitest
          ╱      │ Components, Hooks, Utils │      ╲
         ╱       └─────────────────────────┘       ╲
        └───────────────────────────────────────────┘
```

### 10.2 Kịch Bản Test Chính

| Loại | Kịch Bản | Kết Quả Mong Đợi |
|------|----------|-------------------|
| **Unit** | Tính tổng giỏ hàng | Đúng giá, đúng giảm giá, đúng phí ship |
| **Unit** | Validate form đăng ký | Báo lỗi đúng field, đúng message |
| **Unit** | Format giá VND | 1000000 → "1.000.000₫" |
| **Integration** | Thêm sản phẩm vào giỏ | Cập nhật count, tính lại tổng |
| **Integration** | Apply coupon | Giảm giá đúng, validate min order |
| **Integration** | Lọc sản phẩm | URL params update, products refresh |
| **E2E** | Đăng ký → Đăng nhập | Tạo account, redirect đúng trang |
| **E2E** | Browse → Cart → Checkout → Order | Đơn hàng tạo thành công |
| **E2E** | Admin: CRUD sản phẩm | Thêm, sửa, xóa sản phẩm |

### 10.3 Chạy Tests

```bash
# Unit + Integration tests
npm run test

# Với coverage report
npm run test -- --coverage

# Watch mode (development)
npm run test -- --watch

# E2E tests
npx playwright test

# E2E với UI mode
npx playwright test --ui

# Specific test file
npm run test -- src/test/components/DataTable.test.tsx
```

---

## 11. Triển Khai (Deployment)

### 11.1 Quy Trình Triển Khai

```
Developer → Push Code → Lovable Build → Preview → Review → Publish
               │                           │          │
               ▼                           ▼          ▼
         TypeScript Check            Auto Preview   Manual QA
         ESLint Check                URL Generated  Stakeholder Review
         Build Check                               Approval
```

### 11.2 Môi Trường

| Môi Trường | URL | Mô Tả |
|------------|-----|--------|
| **Preview** | `*-preview--*.lovable.app` | Auto-deploy mỗi khi edit |
| **Production** | `grand-sip-view.lovable.app` | Publish thủ công |
| **Custom Domain** | `yayun.com` (dự kiến) | Sau khi launch |

### 11.3 Checklist Trước Khi Publish

```
Pre-Publish Checklist:
├── ☐ Build thành công (0 errors)
├── ☐ TypeScript compile (0 type errors)
├── ☐ ESLint pass (0 warnings)
├── ☐ Unit tests pass (≥80% coverage)
├── ☐ E2E tests pass (all scenarios)
├── ☐ Responsive check (Mobile, Tablet, Desktop)
├── ☐ Cross-browser check (Chrome, Firefox, Safari)
├── ☐ Performance audit (Lighthouse ≥ 90)
├── ☐ Accessibility audit (no critical issues)
├── ☐ SEO meta tags present on all pages
├── ☐ Error pages working (404, 500)
├── ☐ Analytics tracking verified
└── ☐ Security headers configured
```

---

## 12. Hiệu Năng & Tối Ưu

### 12.1 Code Splitting Strategy

```typescript
// vite.config.ts - Manual chunks
manualChunks: {
  'vendor':  ['react', 'react-dom', 'react-router-dom'],       // ~45KB
  'ui':      ['@radix-ui/react-dialog', '...dropdown', '...tabs'], // ~30KB
  'forms':   ['react-hook-form', '@hookform/resolvers', 'zod'], // ~25KB
  'query':   ['@tanstack/react-query'],                          // ~15KB
}

// React.lazy() cho 15+ routes
const LazyCheckout = lazy(() => import('./pages/Checkout'));
const LazyAdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
// ... etc
```

### 12.2 Mục Tiêu Hiệu Năng

| Metric | Target | Hiện Tại |
|--------|--------|----------|
| **FCP** (First Contentful Paint) | < 1.5s | Measuring... |
| **LCP** (Largest Contentful Paint) | < 2.5s | Measuring... |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Measuring... |
| **TTI** (Time to Interactive) | < 3.5s | Measuring... |
| **Bundle Size** (gzipped) | < 200KB | Measuring... |
| **Lighthouse Score** | ≥ 90 | Measuring... |

### 12.3 Image Optimization

```
Strategy:
├── Hero images:    Preload, high priority, WebP
├── Product images: LazyImage component, IntersectionObserver
├── Thumbnails:     400x300, WebP, progressive loading
├── Icons:          Lucide React (tree-shakeable SVGs)
└── Placeholders:   Blur-up effect / Skeleton
```

---

## 13. Bảo Mật

### 13.1 Các Biện Pháp Bảo Mật

| Layer | Biện Pháp |
|-------|-----------|
| **Authentication** | JWT tokens, Refresh rotation, Session timeout |
| **Authorization** | RLS policies, Role-based access (user/admin) |
| **Input Validation** | Zod schemas, Server-side validation |
| **XSS Prevention** | React auto-escaping, CSP headers |
| **CSRF Protection** | SameSite cookies, CSRF tokens |
| **Data Protection** | HTTPS only, Encrypted at rest |
| **Rate Limiting** | Login (5 attempts/15min), OTP (3/10min) |
| **Secrets** | Environment variables, Lovable Cloud Secrets Manager |

### 13.2 Security Headers

```
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 14. Đa Ngôn Ngữ (i18n)

### 14.1 Ngôn Ngữ Hỗ Trợ

| Mã | Ngôn Ngữ | File | Trạng Thái |
|----|----------|------|------------|
| `vi` | 🇻🇳 Tiếng Việt | `src/locales/vi/common.json` | ✅ Mặc định |
| `en` | 🇺🇸 English | `src/locales/en/common.json` | ✅ Hoàn chỉnh |
| `zh` | 🇨🇳 中文 (Giản thể) | `src/locales/zh/common.json` | ✅ Hoàn chỉnh |

### 14.2 Sử Dụng

```typescript
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation();
  return <h1>{t('home.hero.title')}</h1>;
};
```

### 14.3 Chuyển Đổi Ngôn Ngữ

Component `LanguageSwitcher` trên Header cho phép chuyển đổi ngôn ngữ realtime. Lưu preference vào `localStorage`.

---

## 15. Đóng Góp & Quy Ước

### 15.1 Quy Ước Code

```
Naming:
├── Components:     PascalCase      (ProductCard.tsx)
├── Functions:      camelCase       (formatPrice())
├── Constants:      UPPER_SNAKE     (MAX_ITEMS_PER_PAGE)
├── Types/Interfaces: PascalCase   (interface Product {})
├── CSS Variables:  kebab-case      (--wine-light)
└── Files:          PascalCase      (TeaSelection.tsx)

Structure:
├── 1 component per file (default export)
├── Props interface above component
├── Hooks at top of component
├── Event handlers with handle* prefix
└── JSX return at bottom
```

### 15.2 Commit Convention

```
<type>(<scope>): <subject>

Types: feat | fix | docs | style | refactor | test | chore

Examples:
feat(cart): add coupon code validation
fix(auth): resolve token refresh loop
docs(readme): update roadmap phase 3
style(home): adjust hero section spacing
refactor(admin): extract DataTable component
test(checkout): add payment flow E2E test
```

### 15.3 Branch Strategy

```
main (production)
├── develop (integration)
│   ├── feature/cart-coupon
│   ├── feature/admin-analytics
│   ├── fix/login-redirect
│   └── docs/api-documentation
```

---

## 📞 Liên Hệ & Hỗ Trợ

- **Website**: [grand-sip-view.lovable.app](https://grand-sip-view.lovable.app)
- **Tài liệu chi tiết**: Xem thư mục `docs/`
- **API Documentation**: Xem `API_DOCUMENTATION.md`
- **Deployment Guide**: Xem `DEPLOYMENT_GUIDE.md`

---

<div align="center">

**雅韵茶酒 — YA YUN COLLECTION**

*Tinh hoa trà rượu, trọn vẹn nghĩa tình*

茶酒之道，品味人生

© 2024-2025 YA YUN COLLECTION. All Rights Reserved.

</div>
