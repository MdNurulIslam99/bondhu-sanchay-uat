import { cn } from '@/lib/cn';

const tones = ['bg-[#e5eddf] text-[#597449]', 'bg-[#f0e6d5] text-[#967637]', 'bg-[#e1ebe8] text-[#4d7c6c]'];
const sizes = {
  sm: 'size-9 text-sm',
  md: 'size-16 text-xl sm:size-[76px] sm:text-[27px]',
  lg: 'size-24 text-4xl',
};

// Shows a photo when `src` is given, otherwise the initials/letter in `text`.
export default function Avatar({ text, src, tone = 0, size = 'md', className }) {
  return (
    <div className={cn('grid shrink-0 place-items-center overflow-hidden rounded-full font-sans font-semibold', sizes[size], tones[tone % 3], className)} aria-hidden="true">
      {src ? <img src={src} alt="" className="size-full object-cover" /> : text}
    </div>
  );
}
