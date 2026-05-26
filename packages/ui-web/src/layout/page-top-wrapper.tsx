import { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface PageTopWrapperProps extends React.ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export function PageTopWrapper({ children, className, ...props }: PageTopWrapperProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pl-4 pr-2 py-2 sticky top-0 z-10 rounded-t-2xl bg-surface border-b border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
