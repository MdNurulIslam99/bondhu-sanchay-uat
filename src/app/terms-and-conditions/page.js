import LegalPage from '@/components/legal/LegalPage';
import { termsAndConditions } from '@/data/legal';

export const metadata = { title: 'Terms & Conditions' };

export default function Terms() {
  return <LegalPage doc={termsAndConditions} />;
}
