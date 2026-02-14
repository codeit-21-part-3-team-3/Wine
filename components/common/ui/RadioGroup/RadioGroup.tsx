import { createContext, useContext, useId } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';

import { cn } from '@/utils/cn';

interface RadioGroupContextValue {
  value: string;
  onValueChange: Dispatch<SetStateAction<string>>;
  name: string;
}

interface RadioGroupProps {
  value: string;
  onValueChange: Dispatch<SetStateAction<string>>;
  children: ReactNode;
  className?: string;
  name?: string;
}

interface RadioGroupItemProps {
  value: string;
  id?: string;
  children: ReactNode;
  className?: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

const useRadioGroup = () => {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error('RadioGroup 내부에서만 사용');
  }
  return ctx;
};

function RadioGroup({ value, onValueChange, children, className, name }: RadioGroupProps) {
  const generatedName = useId();
  const groupName = name ?? generatedName;
  return (
    <div className={cn('flex gap-2', className)} role="radiogroup">
      <RadioGroupContext.Provider value={{ value, onValueChange, name: groupName }}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
}

function RadioGroupItem({ value, id, children, className }: RadioGroupItemProps) {
  const { value: currentValue, onValueChange, name } = useRadioGroup();
  const isSelected = currentValue === value;
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={cn('flex items-center gap-3 cursor-pointer group select-none', className)}
    >
      <input
        type="radio"
        id={inputId}
        name={name}
        value={value}
        className="sr-only"
        checked={isSelected}
        onChange={() => onValueChange(value)}
      />

      <div
        className={cn(
          'relative w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center',
          'group-hover:border-primary/70',
          isSelected ? 'border-primary bg-transparent' : 'border-gray-300 bg-white'
        )}
      >
        <div
          className={cn(
            'w-2 h-2 rounded bg-primary transition-transform duration-200',
            isSelected ? 'scale-100' : 'scale-0'
          )}
        />
      </div>

      {children && (
        <span className="text-sm font-medium leading-none text-gray-700">{children}</span>
      )}
    </label>
  );
}

export { RadioGroup, RadioGroupItem };
