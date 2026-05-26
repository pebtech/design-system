import { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface PageTopWrapperProps extends React.ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export function PageTopWrapper({ children, className, ...props }: PageTopWrapperProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pl-4 pr-2 py-2 absolute rounded-t-2xl top-0 right-0 left-0 z-10 bg-surface border-b border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
