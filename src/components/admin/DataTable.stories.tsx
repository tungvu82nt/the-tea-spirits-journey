import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';

interface TestData {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  role: 'admin' | 'user' | 'moderator';
  createdAt: string;
}

const mockData: TestData[] = [
  { id: '1', name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', status: 'active', role: 'admin', createdAt: '2024-01-15' },
  { id: '2', name: 'Trần Thị B', email: 'tranthib@example.com', status: 'active', role: 'user', createdAt: '2024-02-20' },
  { id: '3', name: 'Lê Văn C', email: 'levanc@example.com', status: 'inactive', role: 'user', createdAt: '2024-03-10' },
  { id: '4', name: 'Phạm Thị D', email: 'phamthid@example.com', status: 'pending', role: 'moderator', createdAt: '2024-04-05' },
  { id: '5', name: 'Hoàng Văn E', email: 'hoangvane@example.com', status: 'active', role: 'user', createdAt: '2024-05-12' },
  { id: '6', name: 'Đặng Thị F', email: 'dangthif@example.com', status: 'active', role: 'user', createdAt: '2024-06-18' },
  { id: '7', name: 'Vũ Văn G', email: 'vuvang@example.com', status: 'inactive', role: 'user', createdAt: '2024-07-22' },
  { id: '8', name: 'Bùi Thị H', email: 'buithih@example.com', status: 'pending', role: 'user', createdAt: '2024-08-30' },
  { id: '9', name: 'Đỗ Văn I', email: 'dovani@example.com', status: 'active', role: 'moderator', createdAt: '2024-09-14' },
  { id: '10', name: 'Ngô Thị K', email: 'ngthik@example.com', status: 'active', role: 'user', createdAt: '2024-10-25' },
  { id: '11', name: 'Dương Văn L', email: 'duongvanl@example.com', status: 'inactive', role: 'user', createdAt: '2024-11-08' },
  { id: '12', name: 'Lý Thị M', email: 'lythim@example.com', status: 'active', role: 'user', createdAt: '2024-12-01' },
];

const columns = [
  { key: 'name' as const, title: 'Tên', sortable: true },
  { key: 'email' as const, title: 'Email', sortable: true },
  { 
    key: 'status' as const, 
    title: 'Trạng thái', 
    sortable: true,
    render: (value: string) => {
      const statusMap: Record<string, { label: string; className: string }> = {
        active: { label: 'Hoạt động', className: 'bg-green-100 text-green-800' },
        inactive: { label: 'Không hoạt động', className: 'bg-gray-100 text-gray-800' },
        pending: { label: 'Đang chờ', className: 'bg-yellow-100 text-yellow-800' },
      };
      const status = statusMap[value] || { label: value, className: 'bg-gray-100 text-gray-800' };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
          {status.label}
        </span>
      );
    },
  },
  { key: 'role' as const, title: 'Vai trò', sortable: true },
  { key: 'createdAt' as const, title: 'Ngày tạo', sortable: true },
];

const meta: Meta<typeof DataTable<TestData>> = {
  title: 'Admin/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    pageSize: {
      control: 'number',
      min: 1,
      max: 50,
    },
    loading: {
      control: 'boolean',
    },
    mobileView: {
      control: 'boolean',
    },
    selectable: {
      control: 'boolean',
    },
    searchable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<TestData>>;

export const Default: Story = {
  args: {
    data: mockData,
    columns,
    idField: 'id',
    pageSize: 10,
  },
};

export const WithSearch: Story = {
  args: {
    data: mockData,
    columns,
    idField: 'id',
    pageSize: 10,
    searchable: true,
    searchPlaceholder: 'Tìm kiếm người dùng...',
    searchableFields: ['name', 'email'],
  },
};

export const WithSelection: Story = {
  args: {
    data: mockData,
    columns,
    idField: 'id',
    pageSize: 10,
    selectable: true,
    selectedIds: ['1', '3'],
    onSelectionChange: (ids) => console.log('Selected IDs:', ids),
  },
};

export const WithRowClick: Story = {
  args: {
    data: mockData,
    columns,
    idField: 'id',
    pageSize: 10,
    onRowClick: (row) => console.log('Row clicked:', row),
  },
};

export const Loading: Story = {
  args: {
    data: mockData,
    columns,
    idField: 'id',
    pageSize: 10,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    idField: 'id',
    pageSize: 10,
    emptyMessage: 'Không tìm thấy người dùng nào',
  },
};

export const MobileView: Story = {
  args: {
    data: mockData,
    columns,
    idField: 'id',
    pageSize: 10,
    mobileView: true,
    searchable: true,
    searchPlaceholder: 'Tìm kiếm người dùng...',
    searchableFields: ['name', 'email'],
  },
};

export const SmallPageSize: Story = {
  args: {
    data: mockData,
    columns,
    idField: 'id',
    pageSize: 5,
  },
};

export const LargeDataset: Story = {
  args: {
    data: [...mockData, ...mockData.map((item, i) => ({ ...item, id: `${i + 13}`, name: `${item.name} ${i + 2}` }))],
    columns,
    idField: 'id',
    pageSize: 15,
  },
};

export const WithAllFeatures: Story = {
  args: {
    data: mockData,
    columns,
    idField: 'id',
    pageSize: 10,
    searchable: true,
    searchPlaceholder: 'Tìm kiếm người dùng...',
    searchableFields: ['name', 'email'],
    selectable: true,
    onRowClick: (row) => console.log('Row clicked:', row),
    onSelectionChange: (ids) => console.log('Selected IDs:', ids),
  },
};
