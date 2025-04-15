export type Client = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive';
};

export type SortDirection = 'asc' | 'desc';

export type SortCriteria = {
  id: string;
  field: keyof Client;
  direction: SortDirection;
};

export type SortPanelProps = {
  sortCriteria: SortCriteria[];
  onSortCriteriaChange: (criteria: SortCriteria[]) => void;
};

export type ClientTableProps = {
  clients: Client[];
  sortCriteria: SortCriteria[];
}; 