// Content types
export type Position = 'CEO' | 'CTO' | 'CFO' | 'Legal Counsel' | 'Manager' | 'Developer' | 'Designer' | 'Product Manager' | 'Project Manager' | 'Marketing Manager' | 'Sales Manager' | 'HR Manager' | 'Other';
export type DocType = 'Sales Agreement' | 'Service Agreement' | 'Lease Agreement' | 'Non-Disclosure Agreement';

// Web3 types
export interface Web3AuthInstance {
  [key: string]: any;
}
