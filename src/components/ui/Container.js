import { cn } from '@/lib/cn';

export default function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag
      className={cn('mx-auto w-[calc(100%-32px)] max-w-[1180px] sm:w-[calc(100%-48px)] lg:w-[calc(100%-80px)] min-[1500px]:max-w-[1260px]', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
