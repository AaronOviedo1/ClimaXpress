import { cn } from '@/lib/cn';

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'section' | 'header' | 'footer' | 'main';
};

export function Container({
  as: Tag = 'div',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
