import LegalPage from '@/components/legal/LegalPage';
import { refundPolicy } from '@/data/legal';

export const metadata = { title: 'Refund Policy' };

export default function RefundPolicy() {
  return <LegalPage doc={refundPolicy} />;
}
