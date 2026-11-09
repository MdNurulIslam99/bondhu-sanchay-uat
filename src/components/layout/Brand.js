import Link from 'next/link';
import { Sprout } from 'lucide-react';

export default function Brand() {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-2 whitespace-nowrap font-serif text-[17px] font-bold leading-tight min-[400px]:gap-2.5 min-[400px]:text-[20px] sm:text-[25px]">
      <span className="grid h-9 w-[34px] shrink-0 place-items-center min-[400px]:h-10 min-[400px]:w-[38px] rounded-[13px_4px_13px_4px] bg-brand text-white sm:h-[46px] sm:w-11">
        <Sprout size={27} />
      </span>
      <span>
        Bondhu Sanchay
        <small className="mt-1.5 block font-sans text-[7px] font-semibold tracking-[1.5px] min-[400px]:text-[8px] min-[400px]:tracking-[1.8px] sm:text-[9px] sm:tracking-[2.4px]">SAVE · INVEST · GROW</small>
      </span>
    </Link>
  );
}
