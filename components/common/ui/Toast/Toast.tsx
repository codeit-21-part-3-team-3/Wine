import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { subscribe, getSnapshot, dismiss } from './toastStore';
import { cn } from '@/utils/cn';

import type { ToastItem } from './types';

function ToastItemComponent({ id, title, message, variant }: ToastItem) {
  return (
    <div
      role="alert"
      className={cn(
        'relative w-full min-w-[280px] max-w-sm rounded px-4 py-3 shadow-lg',
        'bg-zinc-900 text-white',
        variant === 'error' && 'border border-red-500',
        variant === 'success' && 'border border-green-500',
        variant === 'info' && 'border border-blue-500',
        variant === 'default' && 'border border-zinc-700'
      )}
    >
      {title && <p className="text-sm font-semibold mb-0.5">{title}</p>}
      <p className={cn('text-sm', title ? 'text-zinc-400' : 'text-white')}>{message}</p>

      <button
        onClick={() => dismiss(id)}
        aria-label="닫기"
        className="absolute right-3 top-2.5 text-zinc-500 hover:text-white transition-colors text-xs"
      >
        ✕
      </button>
    </div>
  );
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>(getSnapshot);

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setToasts(getSnapshot());
    });
    return unsubscribe;
  }, []);

  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 items-end">
      {toasts.map(toast => (
        <ToastItemComponent key={toast.id} {...toast} />
      ))}
    </div>,
    document.body
  );
}
