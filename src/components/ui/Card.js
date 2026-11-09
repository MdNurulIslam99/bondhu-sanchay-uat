import { cn } from '@/lib/cn';

export default function Card({ as: Tag = 'div', hover, className, children, ...rest }) {
  return (
    <Tag
      className={cn(
        'rounded-[22px] border border-line bg-paper transition duration-300',
        hover && 'hover:-translate-y-1 hover:shadow-[0_22px_40px_-22px_#10302a55]',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
