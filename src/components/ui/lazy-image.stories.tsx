import type { Meta, StoryObj } from '@storybook/react';
import { LazyImage } from './lazy-image';

const meta: Meta<typeof LazyImage> = {
  title: 'UI/LazyImage',
  component: LazyImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    threshold: {
      control: 'number',
      min: 0,
      max: 1,
      step: 0.1,
    },
  },
};

export default meta;
type Story = StoryObj<typeof LazyImage>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop',
    alt: 'Trà đạo',
    className: 'w-80 h-60 object-cover rounded-lg',
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=600&fit=crop',
    alt: 'Trà xanh',
    placeholder: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23d1fae5"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%23065f46"%3EĐang tải hình ảnh...%3C/text%3E%3C/svg%3E',
    className: 'w-80 h-60 object-cover rounded-lg',
  },
};

export const WithCustomThreshold: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&h=600&fit=crop',
    alt: 'Trà hoa',
    threshold: 0.5,
    className: 'w-80 h-60 object-cover rounded-lg',
  },
};

export const WithOnLoad: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&h=600&fit=crop',
    alt: 'Trà sữa',
    className: 'w-80 h-60 object-cover rounded-lg',
    onLoad: () => console.log('Image loaded!'),
  },
};

export const WithOnError: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    alt: 'Hình ảnh lỗi',
    className: 'w-80 h-60 object-cover rounded-lg',
    onError: () => console.log('Image failed to load!'),
  },
};

export const MultipleImages: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <LazyImage
        src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop"
        alt="Trà đạo 1"
        className="w-64 h-48 object-cover rounded-lg"
      />
      <LazyImage
        src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop"
        alt="Trà đạo 2"
        className="w-64 h-48 object-cover rounded-lg"
      />
      <LazyImage
        src="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&h=300&fit=crop"
        alt="Trà đạo 3"
        className="w-64 h-48 object-cover rounded-lg"
      />
      <LazyImage
        src="https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=400&h=300&fit=crop"
        alt="Trà đạo 4"
        className="w-64 h-48 object-cover rounded-lg"
      />
    </div>
  ),
};

export const Portrait: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=800&fit=crop',
    alt: 'Trà đạo portrait',
    className: 'w-48 h-64 object-cover rounded-lg',
  },
};

export const Square: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop',
    alt: 'Trà đạo square',
    className: 'w-64 h-64 object-cover rounded-lg',
  },
};
