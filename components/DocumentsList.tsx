'use client';

import { useRouter } from 'next/navigation';
import { Download, Eye, Edit, Trash2, FileText, Calendar, User } from 'lucide-react';
import { useState, useMemo } from 'react';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  creator: string;
  createdDate: string;
  lastModified: string;
  status: string;
}

// Demo data for documents - moved outside component to prevent re-creation on every render
const documents: Document[] = [
  { id: 1, name: 'Q1 Financial Report', type: 'PDF', size: '2.4 MB', creator: 'John Smith', createdDate: '2024-01-15', lastModified: '2024-01-15 10:30:00', status: 'Active' },
  { id: 2, name: 'Marketing Strategy 2024', type: 'DOCX', size: '1.8 MB', creator: 'Sarah Johnson', createdDate: '2024-01-14', lastModified: '2024-01-15 09:15:00', status: 'Active' },
  { id: 3, name: 'Employee Handbook', type: 'PDF', size: '3.2 MB', creator: 'Mike Chen', createdDate: '2024-01-10', lastModified: '2024-01-15 09:45:00', status: 'Active' },
  { id: 4, name: 'Project Timeline', type: 'XLSX', size: '856 KB', creator: 'Emily Davis', createdDate: '2024-01-12', lastModified: '2024-01-15 08:20:00', status: 'Archived' },
  { id: 5, name: 'Company Policies', type: 'PDF', size: '1.5 MB', creator: 'Robert Wilson', createdDate: '2024-01-08', lastModified: '2024-01-14 16:30:00', status: 'Active' },
  { id: 6, name: 'Budget Analysis', type: 'XLSX', size: '2.1 MB', creator: 'John Smith', createdDate: '2024-01-05', lastModified: '2024-01-13 14:45:00', status: 'Active' },
  { id: 7, name: 'Meeting Notes', type: 'DOCX', size: '245 KB', creator: 'Sarah Johnson', createdDate: '2024-01-03', lastModified: '2024-01-12 11:20:00', status: 'Archived' },
  { id: 8, name: 'Technical Specifications', type: 'PDF', size: '4.7 MB', creator: 'Mike Chen', createdDate: '2023-12-28', lastModified: '2024-01-11 15:10:00', status: 'Active' }
];

export default function DocumentsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Filter documents based on search term
  const filteredDocuments = useMemo(() => {
    if (!searchTerm) return documents;
    
    return documents.filter(doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, documents]);

  const getStatusBadge = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium';
  };


  const handleView = (docId: number) => {
    router.push(`/document/${docId}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Documents Management</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage and monitor document access</p>
          </div>
          <div className="w-80">
            <input
              type="text"
              placeholder="Search documents by name, creator, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Document</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Creator</th>
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
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-white">{doc.creator}</span>
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
                        onClick={() => handleView(doc.id)}
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
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  {searchTerm ? (
                    <div>
                      <p className="text-lg font-medium">No documents found</p>
                      <p className="text-sm">No documents match your search criteria &quot;{searchTerm}&quot;</p>
                    </div>
                  ) : (
                    <p>No documents available</p>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}