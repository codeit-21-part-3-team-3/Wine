import { cn } from '@/utils/cn';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useRef,
  useEffect,
  useLayoutEffect,
} from 'react';
import { createPortal } from 'react-dom';

interface DropdownContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  menuRef: React.RefObject<HTMLUListElement | null>;
}

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('Dropdown 하위 컴포넌트는 Dropdown 내부에서 사용하세요.');
  return context;
};

// 부모 컴포넌트
export const Dropdown = ({ children, className }: { children: ReactNode; className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!triggerRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        close();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, close]);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close, triggerRef, menuRef }}>
      <div className={cn('relative inline-block text-left', className)}>{children}</div>
    </DropdownContext.Provider>
  );
};

// 트리거
const Trigger = ({ children, className }: { children: ReactNode; className?: string }) => {
  const { toggle, triggerRef } = useDropdown();

  return (
    <div
      ref={triggerRef as React.RefObject<HTMLDivElement>}
      onClick={toggle}
      className={cn('cursor-pointer inline-flex', className)}
    >
      {children}
    </div>
  );
};
Trigger.displayName = 'Dropdown.Trigger';

//  메뉴
const Menu = ({ children, className }: { children: ReactNode; className?: string }) => {
  const { isOpen, triggerRef, menuRef } = useDropdown();
  const positionRef = useRef({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current || !menuRef.current) return;

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      const menuWidth = menuRef.current?.offsetWidth ?? 130;

      if (rect) {
        const rightAlignedLeft = rect.right - menuWidth;
        positionRef.current = {
          top: rect.bottom + 6,
          left: rightAlignedLeft,
        };

        if (menuRef.current) {
          menuRef.current.style.top = `${positionRef.current.top}px`;
          menuRef.current.style.left = `${positionRef.current.left}px`;
          menuRef.current.style.visibility = 'visible';
        }
      }
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, triggerRef, menuRef]);

  if (!isOpen || typeof window === 'undefined') return null;

  return createPortal(
    <ul
      ref={menuRef}
      role="menu"
      style={{ position: 'fixed', visibility: 'hidden' }}
      className={cn(
        'z-50 min-w-32 overflow-hidden rounded border border-border bg-popover text-popover-foreground shadow-md p-1',
        'animate-in fade-in zoom-in duration-200',
        className
      )}
    >
      {children}
    </ul>,
    document.body
  );
};
Menu.displayName = 'Dropdown.Menu';

// 아이템
const Item = ({
  children,
  onClick,
  className,
  isActive,
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  isActive?: boolean;
}) => {
  const { close } = useDropdown();
  return (
    <li
      onClick={() => {
        onClick();
        close();
      }}
      className={cn(
        'cursor-pointer rounded px-4 py-2.5 text-base text-foreground',
        'hover:bg-muted transition-colors text-center',
        isActive && 'bg-muted',
        className
      )}
    >
      {children}
    </li>
  );
};
Item.displayName = 'Dropdown.Item';

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;
