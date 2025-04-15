import { Client } from '@/types';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-06-20T14:45:00Z',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    createdAt: '2023-02-20T09:15:00Z',
    updatedAt: '2023-07-10T11:20:00Z',
    status: 'active',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    createdAt: '2023-03-10T14:20:00Z',
    updatedAt: '2023-08-05T16:30:00Z',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    createdAt: '2023-04-05T11:45:00Z',
    updatedAt: '2023-09-15T13:10:00Z',
    status: 'active',
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    createdAt: '2023-05-12T16:30:00Z',
    updatedAt: '2023-10-20T09:45:00Z',
    status: 'inactive',
  },
]; 