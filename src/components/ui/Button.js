import Link from 'next/link';
import { cn } from '@/lib/cn';

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full border font-medium transition duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60';
const variants = {
  primary: 'border-brand bg-brand text-white shadow-[0_8px_0_-4px_#0b3d2f33] hover:bg-brand-dark hover:shadow-[0_12px_20px_-6px_#0b3d2f55]',
  secondary: 'border-[#d6ddd3] bg-transparent text-ink hover:bg-[#edf1e6]',
  cream: 'border-[#f1e6c8] bg-[#f1e6c8] text-[#234d3b] hover:bg-[#e8d6a9]',
  light: 'border-white bg-white text-brand hover:bg-cream',
};
const sizes = {
  md: 'min-h-12 px-6 py-3.5 text-[15px]',
  sm: 'min-h-10 px-4 py-2 text-sm',
};

export const buttonClasses = ({ variant = 'primary', size = 'md', full, className } = {}) =>
  cn(base, variants[variant], sizes[size], full && 'w-full', className);

export function Button({ variant, size, full, className, type = 'button', ...rest }) {
  return <button type={type} className={buttonClasses({ variant, size, full, className })} {...rest} />;
}

export function ButtonLink({ variant, size, full, className, ...rest }) {
  return <Link className={buttonClasses({ variant, size, full, className })} {...rest} />;
}

export function TextLink({ className, ...rest }) {
  return <Link className={cn('inline-flex items-center gap-2.5 text-sm font-medium text-brand hover:underline', className)} {...rest} />;
}
