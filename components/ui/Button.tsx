import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'sun';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-white shadow-sm hover:bg-brand-dark hover:shadow-md active:scale-[0.98]',
  secondary:
    'bg-white text-brand shadow-sm hover:bg-surface-soft hover:shadow-md active:scale-[0.98]',
  outline:
    'border-2 border-white/80 bg-transparent text-white hover:bg-white/10',
  ghost: 'bg-transparent text-ink hover:bg-surface-soft',
  sun: 'bg-brand-sun text-ink shadow-sm hover:brightness-95 active:scale-[0.98]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-13 px-8 text-base md:text-lg',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href'> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const variant = props.variant ?? 'primary';
  const size = props.size ?? 'md';
  const classes = cn(base, variants[variant], sizes[size], props.className);

  if ('href' in props && props.href) {
    const { href, external, children, className, variant: _v, size: _s, ...rest } = props;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, className, variant: _v, size: _s, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
