export type ToastVariant = 'default' | 'success' | 'error' | 'info';

export interface ToastItem {
  id: number;
  title?: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

export interface ToastOptions {
  title?: string;
  variant?: ToastVariant;
  duration?: number;
}
