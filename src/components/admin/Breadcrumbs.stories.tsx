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
      { label: 'Trang chủ', path: '/admin' },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Trang chủ', path: '/admin' },
      { label: 'Sản phẩm', path: '/admin/products' },
    ],
  },
};

export const ThreeLevels: Story = {
  args: {
    items: [
      { label: 'Trang chủ', path: '/admin' },
      { label: 'Sản phẩm', path: '/admin/products' },
      { label: 'Chi tiết sản phẩm', path: '/admin/products/123' },
    ],
  },
};

export const FourLevels: Story = {
  args: {
    items: [
      { label: 'Trang chủ', path: '/admin' },
      { label: 'Sản phẩm', path: '/admin/products' },
      { label: 'Danh mục', path: '/admin/products/categories' },
      { label: 'Trà đạo', path: '/admin/products/categories/tea' },
    ],
  },
};

export const WithActiveItem: Story = {
  args: {
    items: [
      { label: 'Trang chủ', path: '/admin' },
      { label: 'Đơn hàng', path: '/admin/orders' },
      { label: 'Chi tiết đơn hàng' },
    ],
  },
};

export const DashboardPath: Story = {
  args: {
    items: [
      { label: 'Trang chủ', path: '/admin' },
      { label: 'Tổng quan' },
    ],
  },
};

export const ProductsPath: Story = {
  args: {
    items: [
      { label: 'Trang chủ', path: '/admin' },
      { label: 'Sản phẩm', path: '/admin/products' },
      { label: 'Danh sách sản phẩm' },
    ],
  },
};

export const OrdersPath: Story = {
  args: {
    items: [
      { label: 'Trang chủ', path: '/admin' },
      { label: 'Đơn hàng', path: '/admin/orders' },
      { label: 'Chi tiết đơn hàng #12345' },
    ],
  },
};

export const CustomersPath: Story = {
  args: {
    items: [
      { label: 'Trang chủ', path: '/admin' },
      { label: 'Khách hàng', path: '/admin/customers' },
      { label: 'Chi tiết khách hàng' },
    ],
  },
};

export const SettingsPath: Story = {
  args: {
    items: [
      { label: 'Trang chủ', path: '/admin' },
      { label: 'Cài đặt', path: '/admin/settings' },
      { label: 'Cài đặt chung' },
    ],
  },
};
