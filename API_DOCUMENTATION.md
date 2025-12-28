# API Documentation

## Overview

This document describes the API endpoints for The Tea Spirits Journey e-commerce platform. The API follows RESTful conventions and uses JSON for data exchange.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Most endpoints require authentication using JWT (JSON Web Token) tokens. Include the token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Authentication Flow

1. **Login**: User provides credentials to receive access and refresh tokens
2. **Access Token**: Short-lived token (1 hour) for API requests
3. **Refresh Token**: Long-lived token (7 days) for obtaining new access tokens
4. **CSRF Protection**: All state-changing requests require a valid CSRF token

## Response Format

All API responses follow this structure:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": { ... }
  }
}
```

## HTTP Status Codes

- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required or invalid
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation error
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe",
  "phone": "0123456789"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "customer"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  }
}
```

#### POST /auth/login
Authenticate a user and receive tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "customer"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  }
}
```

#### POST /auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### POST /auth/logout
Logout user and invalidate tokens.

**Headers:**
```
Authorization: Bearer <access_token>
X-CSRF-Token: <csrf_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### POST /auth/forgot-password
Request password reset email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

#### POST /auth/reset-password
Reset password using token from email.

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "password": "NewSecurePassword123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

### Products

#### GET /products
Get list of products with filtering and pagination.

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 20) - Items per page
- `category` (string) - Filter by category
- `search` (string) - Search term
- `sort` (string) - Sort field (price, name, createdAt)
- `order` (string) - Sort order (asc, desc)
- `minPrice` (number) - Minimum price filter
- `maxPrice` (number) - Maximum price filter
- `inStock` (boolean) - Filter by stock availability

**Response (200):**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "prod_123",
        "name": "Premium Green Tea",
        "description": "High-quality green tea from Japan",
        "price": 250000,
        "originalPrice": 300000,
        "images": [
          {
            "url": "https://example.com/image1.jpg",
            "alt": "Product image"
          }
        ],
        "category": {
          "id": "cat_1",
          "name": "Trà đạo",
          "slug": "tra-dao"
        },
        "stock": 50,
        "rating": 4.5,
        "reviewCount": 128,
        "featured": true,
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

#### GET /products/:id
Get product details by ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "prod_123",
    "name": "Premium Green Tea",
    "description": "High-quality green tea from Japan",
    "price": 250000,
    "originalPrice": 300000,
    "images": [...],
    "category": {...},
    "stock": 50,
    "rating": 4.5,
    "reviewCount": 128,
    "featured": true,
    "specifications": {
      "weight": "100g",
      "origin": "Japan",
      "type": "Green Tea"
    },
    "relatedProducts": [...]
  }
}
```

### Categories

#### GET /categories
Get all categories.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "cat_1",
        "name": "Trà đạo",
        "slug": "tra-dao",
        "description": "Các loại trà cao cấp",
        "image": "https://example.com/category.jpg",
        "productCount": 45,
        "subcategories": [
          {
            "id": "subcat_1",
            "name": "Trà xanh",
            "slug": "tra-xanh",
            "productCount": 20
          }
        ]
      }
    ]
  }
}
```

#### GET /categories/:slug
Get category details by slug.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "cat_1",
    "name": "Trà đạo",
    "slug": "tra-dao",
    "description": "Các loại trà cao cấp",
    "image": "https://example.com/category.jpg",
    "products": [...]
  }
}
```

### Cart

#### GET /cart
Get user's cart.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "cart_123",
    "items": [
      {
        "id": "item_1",
        "product": {...},
        "quantity": 2,
        "price": 250000,
        "subtotal": 500000
      }
    ],
    "total": 500000,
    "itemCount": 2
  }
}
```

#### POST /cart/items
Add item to cart.

**Headers:**
```
Authorization: Bearer <access_token>
X-CSRF-Token: <csrf_token>
```

**Request Body:**
```json
{
  "productId": "prod_123",
  "quantity": 2
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "item": {...},
    "cart": {...}
  }
}
```

#### PUT /cart/items/:id
Update cart item quantity.

**Headers:**
```
Authorization: Bearer <access_token>
X-CSRF-Token: <csrf_token>
```

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "item": {...},
    "cart": {...}
  }
}
```

#### DELETE /cart/items/:id
Remove item from cart.

**Headers:**
```
Authorization: Bearer <access_token>
X-CSRF-Token: <csrf_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "cart": {...}
  }
}
```

### Orders

#### GET /orders
Get user's orders.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `status` (string) - Filter by status

**Response (200):**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "order_123",
        "orderNumber": "ORD-2024-001234",
        "status": "processing",
        "total": 750000,
        "createdAt": "2024-01-15T10:00:00Z",
        "items": [...],
        "shippingAddress": {...}
      }
    ],
    "pagination": {...}
  }
}
```

#### GET /orders/:id
Get order details.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "order_123",
    "orderNumber": "ORD-2024-001234",
    "status": "processing",
    "total": 750000,
    "subtotal": 700000,
    "shipping": 50000,
    "items": [...],
    "shippingAddress": {...},
    "paymentMethod": "cod",
    "paymentStatus": "pending",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

#### POST /orders
Create new order.

**Headers:**
```
Authorization: Bearer <access_token>
X-CSRF-Token: <csrf_token>
```

**Request Body:**
```json
{
  "items": [
    {
      "productId": "prod_123",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "phone": "0123456789",
    "address": "123 Main Street",
    "city": "Ho Chi Minh City",
    "district": "District 1",
    "ward": "Ward 1"
  },
  "paymentMethod": "cod",
  "note": "Please deliver before 5 PM"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "order": {...}
  }
}
```

### Admin Endpoints

All admin endpoints require admin role and CSRF token.

#### GET /admin/products
Get all products (admin).

**Headers:**
```
Authorization: Bearer <admin_access_token>
```

**Query Parameters:**
- `page`, `limit`, `search`, `category`, `status`

#### POST /admin/products
Create new product.

**Headers:**
```
Authorization: Bearer <admin_access_token>
X-CSRF-Token: <csrf_token>
```

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 250000,
  "categoryId": "cat_1",
  "stock": 100,
  "images": ["url1", "url2"],
  "specifications": {...}
}
```

#### PUT /admin/products/:id
Update product.

**Headers:**
```
Authorization: Bearer <admin_access_token>
X-CSRF-Token: <csrf_token>
```

#### DELETE /admin/products/:id
Delete product.

**Headers:**
```
Authorization: Bearer <admin_access_token>
X-CSRF-Token: <csrf_token>
```

#### GET /admin/orders
Get all orders (admin).

**Headers:**
```
Authorization: Bearer <admin_access_token>
```

#### PUT /admin/orders/:id/status
Update order status.

**Headers:**
```
Authorization: Bearer <admin_access_token>
X-CSRF-Token: <csrf_token>
```

**Request Body:**
```json
{
  "status": "shipped"
}
```

#### GET /admin/customers
Get all customers.

**Headers:**
```
Authorization: Bearer <admin_access_token>
```

#### GET /admin/analytics
Get analytics data.

**Headers:**
```
Authorization: Bearer <admin_access_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalRevenue": 50000000,
    "totalOrders": 250,
    "totalCustomers": 150,
    "averageOrderValue": 200000,
    "revenueByMonth": [...],
    "topProducts": [...],
    "recentOrders": [...]
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `AUTH_INVALID_CREDENTIALS` | Invalid email or password |
| `AUTH_TOKEN_EXPIRED` | Access token has expired |
| `AUTH_INVALID_TOKEN` | Invalid or malformed token |
| `AUTH_EMAIL_EXISTS` | Email already registered |
| `VALIDATION_ERROR` | Request validation failed |
| `RESOURCE_NOT_FOUND` | Requested resource not found |
| `INSUFFICIENT_STOCK` | Not enough stock available |
| `PAYMENT_FAILED` | Payment processing failed |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `CSRF_TOKEN_INVALID` | Invalid or missing CSRF token |
| `PERMISSION_DENIED` | Insufficient permissions |

## Rate Limiting

- **Anonymous requests**: 100 requests per 15 minutes
- **Authenticated requests**: 1000 requests per 15 minutes
- **Admin requests**: 5000 requests per 15 minutes

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Webhooks

### Order Status Update

Webhook URL configured in admin settings will receive POST requests when order status changes.

**Payload:**
```json
{
  "event": "order.status.updated",
  "data": {
    "orderId": "order_123",
    "orderNumber": "ORD-2024-001234",
    "status": "shipped",
    "timestamp": "2024-01-15T10:00:00Z"
  }
}
```

## SDK / Client Libraries

### JavaScript/TypeScript

```typescript
import { apiClient } from '@/lib/api';

// Get products
const products = await apiClient.get('/products', {
  params: { page: 1, limit: 20 }
});

// Create order
const order = await apiClient.post('/orders', {
  items: [...],
  shippingAddress: {...}
});
```

### Authentication Helper

```typescript
import { authUtils } from '@/lib/auth';

// Login
const response = await authUtils.login(email, password);
authUtils.setTokens(response.data.tokens);

// Make authenticated request
const data = await secureFetch('/api/orders', {
  headers: {
    'Authorization': `Bearer ${authUtils.getAccessToken()}`
  }
});
```

## Support

For API support, contact: api-support@teaspirits.com

## Changelog

### Version 1.0.0 (2024-01-15)
- Initial API release
- Authentication endpoints
- Product and category endpoints
- Cart and order management
- Admin dashboard endpoints
