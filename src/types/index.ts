
export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  pickupTime?: string;
  totalAmount: number;
  source: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  location?: string;
  picked?: boolean;
}

export interface Picklist {
  id: string;
  name: string;
  orders: Order[];
  assignedTo?: User;
  status: PicklistStatus;
  progress: number;
  createdAt: string;
  itemsPicked: number;
  totalItems: number;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  storeId: string;
}

export type OrderStatus = 'new' | 'assigned' | 'picking' | 'ready' | 'completed';
export type PicklistStatus = 'open' | 'in_progress' | 'completed';
export type UserRole = 'associate' | 'manager';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'picklist' | 'system';
  read: boolean;
  createdAt: string;
}
