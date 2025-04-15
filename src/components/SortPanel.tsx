import { useState } from 'react';
import { ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';
import { SortCriteria, SortPanelProps, Client } from '@/types';

export const SortPanel = ({
  sortCriteria,
  onSortCriteriaChange,
}: SortPanelProps) => {
  const [localSortCriteria, setLocalSortCriteria] = useState<SortCriteria[]>(sortCriteria);

  const handleSortOptionClick = (field: keyof Client, direction: 'asc' | 'desc') => {
    const existingIndex = localSortCriteria.findIndex(c => c.field === field);
    if (existingIndex >= 0) {
      // Remove if clicking the same direction
      if (localSortCriteria[existingIndex].direction === direction) {
        setLocalSortCriteria(localSortCriteria.filter(c => c.field !== field));
      } else {
        // Update direction if clicking different direction
        setLocalSortCriteria(localSortCriteria.map(c => 
          c.field === field ? { ...c, direction } : c
        ));
      }
    } else {
      // Add new sort criteria
      setLocalSortCriteria([...localSortCriteria, {
        id: Math.random().toString(),
        field,
        direction,
      }]);
    }
  };

  const handleClearAll = () => {
    setLocalSortCriteria([]);
  };

  const handleApplySort = () => {
    onSortCriteriaChange(localSortCriteria);
  };

  const isOptionSelected = (field: keyof Client, direction: 'asc' | 'desc') => {
    return localSortCriteria.some(c => c.field === field && c.direction === direction);
  };

  const SortOption = ({ 
    label, 
    field, 
    ascLabel = 'A-Z', 
    descLabel = 'Z-A' 
  }: { 
    label: string; 
    field: keyof Client; 
    ascLabel?: string; 
    descLabel?: string; 
  }) => (
    <div className="flex items-center gap-2 py-3 border-b border-gray-100 last:border-0">
      <span className="w-32 text-sm text-gray-600">{label}</span>
      <div className="flex gap-2">
        <button
          onClick={() => handleSortOptionClick(field, 'asc')}
          className={`px-3 py-1.5 rounded text-sm flex items-center gap-1.5 transition-colors cursor-pointer ${
            isOptionSelected(field, 'asc')
              ? 'bg-blue-100 text-blue-800'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ArrowUp className="h-3.5 w-3.5" />
          {ascLabel}
        </button>
        <button
          onClick={() => handleSortOptionClick(field, 'desc')}
          className={`px-3 py-1.5 rounded text-sm flex items-center gap-1.5 transition-colors cursor-pointer ${
            isOptionSelected(field, 'desc')
              ? 'bg-blue-100 text-blue-800'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ArrowDown className="h-3.5 w-3.5" />
          {descLabel}
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-[400px] bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500" />
            <h3 className="font-medium text-gray-500">Sort By</h3>
          </div>
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-1">
          <SortOption 
            label="Client Name" 
            field="name" 
          />
          <SortOption 
            label="Created At" 
            field="createdAt" 
            ascLabel="Newest to Oldest"
            descLabel="Oldest to Newest"
          />
          <SortOption 
            label="Updated At" 
            field="updatedAt" 
            ascLabel="Newest to Oldest"
            descLabel="Oldest to Newest"
          />
          <SortOption 
            label="Client ID" 
            field="id" 
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleApplySort}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm font-medium cursor-pointer"
          >
            Apply Sort
          </button>
        </div>
      </div>
    </div>
  );
}; 