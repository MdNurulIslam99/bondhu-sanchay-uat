'use client';
import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import { Button, ButtonLink } from '@/components/ui/Button';

// Shown when a page crashes at runtime.
export default function Error({ reset }) {
  return (
    <Section>
      <Eyebrow>Something went wrong</Eyebrow>
      <h1 className="mb-6 text-4xl">We hit an unexpected problem.</h1>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <ButtonLink href="/" variant="secondary">Back to home</ButtonLink>
      </div>
    </Section>
  );
}
