import type { ToastItem, ToastOptions, ToastVariant } from './types';

let toasts: ToastItem[] = [];
let nextId = 0;

const listeners = new Set<() => void>();

const MAX_TOASTS = 5;
export const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getSnapshot = (): ToastItem[] => toasts;

const notify = () => listeners.forEach(listener => listener());
export const dismiss = (id: number) => {
  toasts = toasts.filter(t => t.id !== id);
  notify();
};

const addToast = (message: string, options?: ToastOptions) => {
  const id = nextId++;
  const variant: ToastVariant = options?.variant ?? 'default';
  const duration = options?.duration ?? 3000;
  const title = options?.title;

  const newToast: ToastItem = { id, title, message, variant, duration };

  const next = [...toasts, newToast];
  toasts = next.length > MAX_TOASTS ? next.slice(next.length - MAX_TOASTS) : next;

  notify();
  setTimeout(() => dismiss(id), duration);
};

export const toast = (message: string, options?: ToastOptions) => addToast(message, options);

toast.success = (message: string, options?: Omit<ToastOptions, 'variant'>) =>
  addToast(message, { ...options, variant: 'success' });

toast.error = (message: string, options?: Omit<ToastOptions, 'variant'>) =>
  addToast(message, { ...options, variant: 'error' });

toast.info = (message: string, options?: Omit<ToastOptions, 'variant'>) =>
  addToast(message, { ...options, variant: 'info' });
