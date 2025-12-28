import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable } from '@/components/admin/DataTable';

interface MockData {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

const mockData: MockData[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'active' },
];

const mockColumns = [
  {
    key: 'name' as keyof MockData,
    title: 'Name',
    sortable: true,
  },
  {
    key: 'email' as keyof MockData,
    title: 'Email',
    sortable: true,
  },
  {
    key: 'status' as keyof MockData,
    title: 'Status',
    render: (value: string) => (
      <span data-testid={`status-${value}`}>{value}</span>
    ),
  },
];

describe('DataTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders table with data', () => {
    render(
      <DataTable<MockData>
        data={mockData}
        columns={mockColumns}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    render(
      <DataTable<MockData>
        data={[]}
        columns={mockColumns}
        emptyMessage="No data available"
      />
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(
      <DataTable<MockData>
        data={[]}
        columns={mockColumns}
        loading
      />
    );

    expect(screen.getByText('Đang tải...')).toBeInTheDocument();
  });

  it('filters data by search term', async () => {
    const user = userEvent.setup();
    
    render(
      <DataTable<MockData>
        data={mockData}
        columns={mockColumns}
        searchableFields={['name', 'email']}
      />
    );

    const searchInput = screen.getByPlaceholderText('Tìm kiếm...');
    await user.type(searchInput, 'John');

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });

  it('sorts data by column', async () => {
    const user = userEvent.setup();
    
    render(
      <DataTable<MockData>
        data={mockData}
        columns={mockColumns}
      />
    );

    const nameHeader = screen.getByText('Name');
    await user.click(nameHeader);

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Bob Johnson');
  });

  it('paginates data', async () => {
    const user = userEvent.setup();
    
    render(
      <DataTable<MockData>
        data={mockData}
        columns={mockColumns}
        pageSize={2}
      />
    );

    expect(screen.getByText('Hiển thị 1 đến 2 trong tổng số 3 kết quả')).toBeInTheDocument();

    const nextButton = screen.getByText('Sau');
    await user.click(nextButton);

    expect(screen.getByText('Hiển thị 3 đến 3 trong tổng số 3 kết quả')).toBeInTheDocument();
  });

  it('handles row click', async () => {
    const user = userEvent.setup();
    const handleRowClick = vi.fn();
    
    render(
      <DataTable<MockData>
        data={mockData}
        columns={mockColumns}
        onRowClick={handleRowClick}
      />
    );

    const firstRow = screen.getByText('John Doe').closest('tr');
    if (firstRow) {
      await user.click(firstRow);
    }

    expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it('handles selection', async () => {
    const user = userEvent.setup();
    const handleSelectionChange = vi.fn();
    
    render(
      <DataTable<MockData>
        data={mockData}
        columns={mockColumns}
        selectable
        selectedIds={[]}
        onSelectionChange={handleSelectionChange}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);

    expect(handleSelectionChange).toHaveBeenCalledWith(['1']);
  });
});
