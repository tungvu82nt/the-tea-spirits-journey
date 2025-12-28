import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Admin/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const SingleLevel: Story = {
  args: {
    items: [
      { label: 'Trang chủ', href: '/admin' },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Trang chủ', href: '/admin' },
      { label: 'Sản phẩm', href: '/admin/products' },
    ],
  },
};

export const ThreeLevels: Story = {
  args: {
    items: [
      { label: 'Trang chủ', href: '/admin' },
      { label: 'Sản phẩm', href: '/admin/products' },
      { label: 'Chi tiết sản phẩm', href: '/admin/products/123' },
    ],
  },
};

export const FourLevels: Story = {
  args: {
    items: [
      { label: 'Trang chủ', href: '/admin' },
      { label: 'Sản phẩm', href: '/admin/products' },
      { label: 'Danh mục', href: '/admin/products/categories' },
      { label: 'Trà đạo', href: '/admin/products/categories/tea' },
    ],
  },
};

export const WithActiveItem: Story = {
  args: {
    items: [
      { label: 'Trang chủ', href: '/admin' },
      { label: 'Đơn hàng', href: '/admin/orders' },
      { label: 'Chi tiết đơn hàng', active: true },
    ],
  },
};

export const DashboardPath: Story = {
  args: {
    items: [
      { label: 'Trang chủ', href: '/admin' },
      { label: 'Tổng quan', active: true },
    ],
  },
};

export const ProductsPath: Story = {
  args: {
    items: [
      { label: 'Trang chủ', href: '/admin' },
      { label: 'Sản phẩm', href: '/admin/products' },
      { label: 'Danh sách sản phẩm', active: true },
    ],
  },
};

export const OrdersPath: Story = {
  args: {
    items: [
      { label: 'Trang chủ', href: '/admin' },
      { label: 'Đơn hàng', href: '/admin/orders' },
      { label: 'Chi tiết đơn hàng #12345', active: true },
    ],
  },
};

export const CustomersPath: Story = {
  args: {
    items: [
      { label: 'Trang chủ', href: '/admin' },
      { label: 'Khách hàng', href: '/admin/customers' },
      { label: 'Chi tiết khách hàng', active: true },
    ],
  },
};

export const SettingsPath: Story = {
  args: {
    items: [
      { label: 'Trang chủ', href: '/admin' },
      { label: 'Cài đặt', href: '/admin/settings' },
      { label: 'Cài đặt chung', active: true },
    ],
  },
};
