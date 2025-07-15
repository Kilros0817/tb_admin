'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, FileText, Calendar, User, Search, Filter, Eye } from 'lucide-react';
import { useState, useMemo } from 'react';

interface UserDocument {
  id: number;
  name: string;
  type: string;
  size: string;
  createdDate: string;
  lastModified: string;
  status: string;
}

export default function UserDocuments() {
  const params = useParams();
  const router = useRouter();
  const userId = parseInt(params.id as string);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Get user name based on ID
  const getUserName = (id: number): string => {
    const users = [
      { id: 1, name: 'John Smith' },
      { id: 2, name: 'Sarah Johnson' },
      { id: 3, name: 'Mike Chen' },
      { id: 4, name: 'Emily Davis' },
      { id: 5, name: 'Robert Wilson' }
    ];
    return users.find(user => user.id === id)?.name || 'Unknown User';
  };

  // Get documents created by specific user
  const getUserDocuments = (id: number): UserDocument[] => {
    const allDocuments = [
      // John Smith (ID: 1)
      { id: 1, name: 'Q1 Financial Report', type: 'PDF', size: '2.4 MB', createdDate: '2024-01-15', lastModified: '2024-01-15 10:30:00', status: 'Active' },
      { id: 6, name: 'Budget Analysis', type: 'XLSX', size: '2.1 MB', createdDate: '2024-01-05', lastModified: '2024-01-13 14:45:00', status: 'Active' },
      
      // Sarah Johnson (ID: 2)
      { id: 2, name: 'Marketing Strategy 2024', type: 'DOCX', size: '1.8 MB', createdDate: '2024-01-14', lastModified: '2024-01-15 09:15:00', status: 'Active' },
      { id: 7, name: 'Meeting Notes', type: 'DOCX', size: '245 KB', createdDate: '2024-01-03', lastModified: '2024-01-12 11:20:00', status: 'Archived' },
      
      // Mike Chen (ID: 3)
      { id: 3, name: 'Employee Handbook', type: 'PDF', size: '3.2 MB', createdDate: '2024-01-10', lastModified: '2024-01-15 09:45:00', status: 'Active' },
      { id: 8, name: 'Technical Specifications', type: 'PDF', size: '4.7 MB', createdDate: '2023-12-28', lastModified: '2024-01-11 15:10:00', status: 'Active' },
      
      // Emily Davis (ID: 4)
      { id: 4, name: 'Project Timeline', type: 'XLSX', size: '856 KB', createdDate: '2024-01-12', lastModified: '2024-01-15 08:20:00', status: 'Archived' },
      
      // Robert Wilson (ID: 5)
      { id: 5, name: 'Company Policies', type: 'PDF', size: '1.5 MB', createdDate: '2024-01-08', lastModified: '2024-01-14 16:30:00', status: 'Active' }
    ];

    // Filter documents by user ID based on creator
    const userDocuments = allDocuments.filter(doc => {
      switch (id) {
        case 1: return [1, 6].includes(doc.id);
        case 2: return [2, 7].includes(doc.id);
        case 3: return [3, 8].includes(doc.id);
        case 4: return [4].includes(doc.id);
        case 5: return [5].includes(doc.id);
        default: return false;
      }
    });

    return userDocuments;
  };

  const userName = getUserName(userId);
  const rawDocuments = getUserDocuments(userId);

  // Get unique statuses for filter dropdown
  const uniqueStatuses = useMemo(() => {
    const statuses = Array.from(new Set(rawDocuments.map(doc => doc.status)));
    return statuses.sort();
  }, [rawDocuments]);

  // Filter documents
  const filteredDocuments = useMemo(() => {
    let filtered = rawDocuments;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(doc => doc.status === statusFilter);
    }

    return filtered.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
  }, [rawDocuments, searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium';
  };

  const handleViewDocument = (docId: number) => {
    router.push(`/document/${docId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Documents</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Documents created by {userName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          {/* User Info Header with Filters */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{userName}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {filteredDocuments.length} of {rawDocuments.length} documents
                  </p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Statuses</option>
                  {uniqueStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Document Search */}
              <div className="flex items-center space-x-2 flex-1 max-w-md">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents by name or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Clear Filters */}
              {(statusFilter || searchTerm) && (
                <button
                  onClick={() => {
                    setStatusFilter('');
                    setSearchTerm('');
                  }}
                  className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Documents Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Document</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Modified</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Created {new Date(doc.createdDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={getStatusBadge(doc.status)}>{doc.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(doc.lastModified).toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button 
                            onClick={() => handleViewDocument(doc.id)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            title="View document"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      <div>
                        <FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        {searchTerm || statusFilter ? (
                          <div>
                            <p className="text-lg font-medium">No matching documents found</p>
                            <p className="text-sm">Try adjusting your filters or search terms.</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-lg font-medium">No documents found</p>
                            <p className="text-sm">This user hasn&apos;t created any documents yet.</p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}