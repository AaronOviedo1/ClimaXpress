import { cn } from '@/lib/cn';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mx-auto max-w-2xl',
        align === 'center' && 'text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="text-3xl font-bold text-ink sm:text-4xl md:text-5xl">
        {title}
      </Tag>
      {description ? (
        <p className="mt-4 text-base text-ink-muted md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
