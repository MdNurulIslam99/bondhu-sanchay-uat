import Card from './Card';
import { cn } from '@/lib/cn';

// Titled content box used across dashboard and reports.
export default function Panel({ title, subtitle, action, className, bodyClassName, children }) {
  return (
    <Card className={cn('min-w-0 p-5 shadow-[0_8px_24px_rgba(22,59,49,0.05)] sm:p-7', className)}>
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h3 className="text-xl">{title}</h3>}
            {subtitle && <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </Card>
  );
}
