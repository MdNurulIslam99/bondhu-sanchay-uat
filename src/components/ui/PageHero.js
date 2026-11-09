import Container from './Container';
import Eyebrow from './Eyebrow';

export default function PageHero({ eyebrow, title, children }) {
  return (
    <section className="border-b border-line bg-cream py-10 md:py-[65px]">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-[35px] leading-[1.35] md:text-[44px]">{title}</h1>
        {children && <p className="mt-4 max-w-[700px] text-[15px] leading-[1.9] text-muted sm:text-[17px]">{children}</p>}
      </Container>
    </section>
  );
}
