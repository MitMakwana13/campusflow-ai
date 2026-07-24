export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type Status = 'active' | 'inactive' | 'pending' | 'archived';

export interface ActionItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Navigation' | 'Action' | 'Filter';
  shortcut?: string;
  onSelect: () => void;
}
