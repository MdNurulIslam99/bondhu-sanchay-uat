import LegalPage from '@/components/legal/LegalPage';
import { privacyPolicy } from '@/data/legal';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPolicy() {
  return <LegalPage doc={privacyPolicy} />;
}
