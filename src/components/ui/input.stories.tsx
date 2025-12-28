import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Nhập thông tin...',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '••••••••',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '123',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Giá trị mặc định',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Vô hiệu hóa',
  },
};

export const WithClassName: Story = {
  args: {
    className: 'w-64',
    placeholder: 'Input với chiều rộng',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Tìm kiếm...',
    className: 'w-80',
  },
};

export const Phone: Story = {
  args: {
    type: 'tel',
    placeholder: '0123 456 789',
  },
};

export const Url: Story = {
  args: {
    type: 'url',
    placeholder: 'https://example.com',
  },
};
