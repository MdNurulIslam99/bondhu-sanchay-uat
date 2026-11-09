import Container from './Container';
import { cn } from '@/lib/cn';

// Vertical-rhythm wrapper. `bare` skips the inner container (full-bleed backgrounds).
export default function Section({ className, innerClassName, bare, children, ...rest }) {
  return (
    <section className={cn('py-12 md:py-[75px]', className)} {...rest}>
      {bare ? children : <Container className={innerClassName}>{children}</Container>}
    </section>
  );
}
