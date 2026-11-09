import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Section>
      <Eyebrow>404</Eyebrow>
      <h1 className="mb-6 text-4xl">This page could not be found.</h1>
      <ButtonLink href="/">Back to home</ButtonLink>
    </Section>
  );
}
