'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle } from 'lucide-react';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TextField, SelectField, TextAreaField, CheckboxField, Alert } from '@/components/ui/Field';

export default function ContactForm() {
  const [done, setDone] = useState(false);
  return (
    <Card as="form" className="p-6 sm:p-8" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
      <h2 className="text-[25px] md:text-[27px]">Let us talk, and begin the journey.</h2>
      <p className="mb-6 mt-2.5 text-[13px] text-muted">This is a demo form. No information is sent or stored.</p>
      <div className="grid sm:grid-cols-2 sm:gap-5">
        <TextField label="Your name" name="name" required maxLength={80} placeholder="Full name" autoComplete="name" />
        <TextField label="Mobile number" name="phone" required type="tel" pattern="[+0-9 ()\-]{7,20}" placeholder="01XXXXXXXXX" autoComplete="tel" />
      </div>
      <TextField label="Email (optional)" type="email" name="email" placeholder="you@example.com" autoComplete="email" />
      <SelectField label="I am interested in" name="subject">
        <option>Becoming a member</option>
        <option>Learning about investments</option>
        <option>Privacy</option>
        <option>Other questions</option>
      </SelectField>
      <TextAreaField label="Your message" name="message" required rows={4} maxLength={2000} placeholder="Write your question or what interests you…" />
      <CheckboxField required>
        I have read the <Link href="/privacy-policy" className="text-brand underline">Privacy Policy</Link> and understand this is a sample form.
      </CheckboxField>
      <Button type="submit">
        Send message <ArrowUpRight size={18} />
      </Button>
      {done && (
        <Alert tone="success" role="status" className="mt-5 flex items-center gap-2.5">
          <CheckCircle size={21} /> Form validated! Because this is a demo, nothing was sent.
        </Alert>
      )}
    </Card>
  );
}
