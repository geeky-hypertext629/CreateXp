'use client';

import { useState, useEffect } from 'react';
import { SortPanel } from '@/components/SortPanel';
import { ClientTable } from '@/components/ClientTable';
import { AddClientModal } from '@/components/AddClientModal';
import { mockClients } from '@/data/mockClients';
import { SortCriteria, Client } from '@/types';
import { Plus, Filter, Search } from 'lucide-react';

export default function Home() {
  const [sortCriteria, setSortCriteria] = useState<SortCriteria[]>([]);
  const [showSortPanel, setShowSortPanel] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchQuery, setSearchQuery] = useState('');

  // Load sort criteria from localStorage on initial render
  useEffect(() => {
    const savedSortCriteria = localStorage.getItem('sortCriteria');
    if (savedSortCriteria) {
      setSortCriteria(JSON.parse(savedSortCriteria));
    }
  }, []);

  // Save sort criteria to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sortCriteria', JSON.stringify(sortCriteria));
  }, [sortCriteria]);

  const handleAddClient = (newClient: Omit<Client, 'id'>) => {
    const clientWithId: Client = {
      ...newClient,
      id: (clients.length + 1).toString(),
    };
    setClients([...clients, clientWithId]);
  };

  const filteredClients = clients.filter(client => {
    const searchLower = searchQuery.toLowerCase();
    return (
      client.name.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.id.toLowerCase().includes(searchLower)
    );
  });

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm"
              />
            </div>
            <button
              onClick={() => setShowSortPanel(!showSortPanel)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer"
            >
              <Filter className="h-4 w-4 mr-2" />
              Sort
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </button>
          </div>
        </div>

        <div className="relative">
          {showSortPanel && (
            <div className="absolute right-0 top-0 z-10">
              <SortPanel
                sortCriteria={sortCriteria}
                onSortCriteriaChange={setSortCriteria}
              />
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow">
            <ClientTable clients={filteredClients} sortCriteria={sortCriteria} />
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddClientModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddClient}
        />
      )}
    </main>
  );
}
