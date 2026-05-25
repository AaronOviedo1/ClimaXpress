import { cn } from '@/lib/cn';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export function Card({ className, hover = true, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-surface-border bg-surface shadow-card',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover',
        className,
      )}
      {...rest}
    />
  );
}
