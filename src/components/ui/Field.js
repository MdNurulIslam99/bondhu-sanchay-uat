'use client';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/cn';

const control =
  'mt-2 block w-full rounded-md border border-[#dce3d9] bg-white px-3.5 py-3 text-ink placeholder:text-[#a3ada6]';

function Label({ label, className, children }) {
  return (
    <label className={cn('mb-5 block text-sm', className)}>
      {label}
      {children}
    </label>
  );
}

export function TextField({ label, className, ...input }) {
  return (
    <Label label={label} className={className}>
      <input className={control} {...input} />
    </Label>
  );
}

export function PasswordField({ label, className, ...input }) {
  const [show, setShow] = useState(false);
  return (
    <Label label={label} className={className}>
      <span className="relative block">
        <input className={cn(control, 'pr-12')} type={show ? 'text' : 'password'} {...input} />
        <button
          type="button"
          aria-label={show ? 'Hide password' : 'Show password'}
          onClick={() => setShow(!show)}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-muted"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </span>
    </Label>
  );
}

export function SelectField({ label, className, children, ...select }) {
  return (
    <Label label={label} className={className}>
      <select className={control} {...select}>
        {children}
      </select>
    </Label>
  );
}

export function TextAreaField({ label, className, ...area }) {
  return (
    <Label label={label} className={className}>
      <textarea className={cn(control, 'resize-y')} {...area} />
    </Label>
  );
}

export function CheckboxField({ className, children, ...input }) {
  return (
    <label className={cn('mb-5 flex items-start gap-2.5 text-[13px] text-muted', className)}>
      <input type="checkbox" className="mt-0.5" {...input} />
      <span>{children}</span>
    </label>
  );
}

export function Alert({ tone = 'error', className, children, ...rest }) {
  const tones = {
    error: 'border-[#f1c7c7] bg-[#fdeeee] text-[#a22]',
    success: 'border-transparent bg-[#eaf4e8] text-brand',
  };
  return (
    <div className={cn('rounded-lg border px-3.5 py-3 text-sm', tones[tone], className)} {...rest}>
      {children}
    </div>
  );
}

// Compact inline select for toolbars (not wrapped in a form label block).
export function InlineSelect({ label, className, children, ...select }) {
  return (
    <label className={cn('flex items-center gap-2.5 text-sm', className)}>
      {label}
      <select className="rounded-md border border-[#dce3d9] bg-white px-2.5 py-2" {...select}>
        {children}
      </select>
    </label>
  );
}
