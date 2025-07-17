'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, User, FileText } from 'lucide-react';

interface DocumentDetails {
  id: number;
  name: string;
  type: string;
  size: string;
  creator: string;
  createdDate: string;
  lastModified: string;
  status: string;
  description: string;
  content: string;
}

export default function DocumentDetails() {
  const params = useParams();
  const router = useRouter();
  const documentId = parseInt(params.id as string);

  // Demo data for document details
  const getDocumentDetails = (id: number): DocumentDetails | null => {
    const documents: DocumentDetails[] = [
      { 
        id: 1, 
        name: 'Q1 Financial Report', 
        type: 'PDF', 
        size: '2.4 MB', 
        creator: 'John Smith', 
        createdDate: '2024-01-15', 
        lastModified: '2024-01-15 10:30:00', 
        status: 'Active',
        description: 'Quarterly financial report covering revenue, expenses, and profit analysis for Q1 2024.',
        content: 'This document contains detailed financial analysis including revenue breakdown, expense categories, profit margins, and comparative analysis with previous quarters.'
      },
      { 
        id: 2, 
        name: 'Marketing Strategy 2024', 
        type: 'DOCX', 
        size: '1.8 MB', 
        creator: 'Sarah Johnson', 
        createdDate: '2024-01-14', 
        lastModified: '2024-01-15 09:15:00', 
        status: 'Active',
        description: 'Comprehensive marketing strategy document outlining goals, tactics, and budget allocation for 2024.',
        content: 'Strategic marketing plan including target audience analysis, campaign strategies, digital marketing initiatives, and budget distribution across various channels.'
      },
      { 
        id: 3, 
        name: 'Employee Handbook', 
        type: 'PDF', 
        size: '3.2 MB', 
        creator: 'Mike Chen', 
        createdDate: '2024-01-10', 
        lastModified: '2024-01-15 09:45:00', 
        status: 'Active',
        description: 'Complete employee handbook covering company policies, procedures, and guidelines.',
        content: 'Comprehensive guide covering company policies, code of conduct, benefits information, leave policies, and workplace guidelines for all employees.'
      },
      { 
        id: 4, 
        name: 'Project Timeline', 
        type: 'XLSX', 
        size: '856 KB', 
        creator: 'Emily Davis', 
        createdDate: '2024-01-12', 
        lastModified: '2024-01-15 08:20:00', 
        status: 'Archived',
        description: 'Project timeline spreadsheet with milestones, deadlines, and resource allocation.',
        content: 'Detailed project timeline including task dependencies, milestone dates, resource assignments, and progress tracking for the current project phase.'
      },
      { 
        id: 5, 
        name: 'Company Policies', 
        type: 'PDF', 
        size: '1.5 MB', 
        creator: 'Robert Wilson', 
        createdDate: '2024-01-08', 
        lastModified: '2024-01-14 16:30:00', 
        status: 'Active',
        description: 'Official company policies and procedures document.',
        content: 'Official documentation of company policies including HR policies, IT security guidelines, workplace safety procedures, and compliance requirements.'
      },
      { 
        id: 6, 
        name: 'Budget Analysis', 
        type: 'XLSX', 
        size: '2.1 MB', 
        creator: 'John Smith', 
        createdDate: '2024-01-05', 
        lastModified: '2024-01-13 14:45:00', 
        status: 'Active',
        description: 'Detailed budget analysis with variance reports and forecasting.',
        content: 'Comprehensive budget analysis including actual vs planned spending, variance analysis, cost center breakdowns, and financial forecasting for upcoming quarters.'
      },
      { 
        id: 7, 
        name: 'Meeting Notes', 
        type: 'DOCX', 
        size: '245 KB', 
        creator: 'Sarah Johnson', 
        createdDate: '2024-01-03', 
        lastModified: '2024-01-12 11:20:00', 
        status: 'Archived',
        description: 'Meeting notes from quarterly review sessions.',
        content: 'Detailed notes from quarterly review meetings including action items, decisions made, participant feedback, and follow-up tasks assigned to team members.'
      },
      { 
        id: 8, 
        name: 'Technical Specifications', 
        type: 'PDF', 
        size: '4.7 MB', 
        creator: 'Mike Chen', 
        createdDate: '2023-12-28', 
        lastModified: '2024-01-11 15:10:00', 
        status: 'Active',
        description: 'Technical specifications and system requirements documentation.',
        content: 'Detailed technical documentation including system architecture, API specifications, database schema, security requirements, and implementation guidelines.'
      }
    ];

    return documents.find(doc => doc.id === id) || null;
  };

  const document = getDocumentDetails(documentId);

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Document Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The requested document could not be found.</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium';
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Document Details</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">View document information and content</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          {/* Document Header */}
          <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{document.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{document.description}</p>
                <div className="flex items-center space-x-4">
                  <span className={getStatusBadge(document.status)}>{document.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Document Metadata */}
          <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Document Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Creator</label>
                  <p className="text-gray-900 dark:text-white">{document.creator}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Created Date</label>
                  <p className="text-gray-900 dark:text-white">{new Date(document.createdDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Modified</label>
                  <p className="text-gray-900 dark:text-white">{new Date(document.lastModified).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Document Content */}
          <div className="px-6 py-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Content Preview</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {document.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}