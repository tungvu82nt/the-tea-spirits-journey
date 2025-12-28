import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('user can login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:8080/login');

    await page.fill('input[name="phone"]', '0901234567');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/account/);
    await expect(page.locator('text=欢迎回来')).toBeVisible();
  });

  test('admin can login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:8080/admin/login');

    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/admin\/dashboard/);
    await expect(page.locator('text=Đăng nhập thành công')).toBeVisible();
  });

  test('admin cannot login with invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:8080/admin/login');

    await page.fill('input[name="username"]', 'invalid');
    await page.fill('input[name="password"]', 'invalid');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Tên người dùng hoặc mật khẩu không đúng')).toBeVisible();
  });
});

test.describe('Shopping Cart Flow', () => {
  test('user can add items to cart', async ({ page }) => {
    await page.goto('http://localhost:8080/tea');

    await page.click('text=班章古树普洱');
    await page.click('button:has-text("Thêm vào giỏ")');

    await page.goto('http://localhost:8080/cart');
    await expect(page.locator('text=班章古树普洱')).toBeVisible();
  });

  test('user can update cart quantity', async ({ page }) => {
    await page.goto('http://localhost:8080/cart');

    const quantityInput = page.locator('input[type="number"]').first();
    await quantityInput.fill('2');

    await expect(page.locator('text=2')).toBeVisible();
  });

  test('user can remove item from cart', async ({ page }) => {
    await page.goto('http://localhost:8080/cart');

    await page.click('button[aria-label="Remove item"]');

    await expect(page.locator('text=已移除商品')).toBeVisible();
  });
});

test.describe('Checkout Flow', () => {
  test('user can complete checkout process', async ({ page }) => {
    await page.goto('http://localhost:8080/checkout');

    await page.fill('input[name="fullName"]', 'Nguyễn Văn A');
    await page.fill('input[name="phone"]', '0901234567');
    await page.fill('input[name="address"]', '123 Đường Nguyễn Huệ');

    await page.click('button:has-text("Tiếp tục")');

    await page.click('button:has-text("Thanh toán")');

    await expect(page.locator('text=Đặt hàng thành công')).toBeVisible();
  });
});

test.describe('Admin Dashboard Flow', () => {
  test('admin can view dashboard', async ({ page }) => {
    await page.goto('http://localhost:8080/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=总收入')).toBeVisible();
    await expect(page.locator('text=订单数量')).toBeVisible();
    await expect(page.locator('text=客户数量')).toBeVisible();
  });

  test('admin can search products', async ({ page }) => {
    await page.goto('http://localhost:8080/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await page.click('text=Quản lý sản phẩm');
    await page.fill('input[placeholder="Tìm kiếm..."]', 'Oolong');

    await expect(page.locator('text=Trà Oolong Đài Loan')).toBeVisible();
  });

  test('admin can update order status', async ({ page }) => {
    await page.goto('http://localhost:8080/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await page.click('text=Quản lý đơn hàng');
    
    const statusSelect = page.locator('select').first();
    await statusSelect.selectOption('shipped');

    await expect(page.locator('text=Đã cập nhật trạng thái')).toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test('mobile view works correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:8080/');

    await expect(page.locator('button[aria-label="Open menu"]')).toBeVisible();
    await page.click('button[aria-label="Open menu"]');

    await expect(page.locator('text=首页')).toBeVisible();
    await expect(page.locator('text=茗茶萃取')).toBeVisible();
  });

  test('tablet view works correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:8080/');

    await expect(page.locator('text=首页')).toBeVisible();
    await expect(page.locator('text=茗茶萃取')).toBeVisible();
  });
});

test.describe('Security Features', () => {
  test('protected routes redirect to login', async ({ page }) => {
    await page.goto('http://localhost:8080/admin/dashboard');

    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('logout clears authentication', async ({ page }) => {
    await page.goto('http://localhost:8080/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await page.click('button:has-text("Đăng xuất")');

    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
