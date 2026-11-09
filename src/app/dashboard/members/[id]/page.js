import MemberDetail from '@/components/dashboard/MemberDetail';
import { members } from '@/data/members';

export const metadata = { title: 'Member details', robots: { index: false } };

export function generateStaticParams() {
  return members.map(({ id }) => ({ id }));
}

export default async function Page({ params }) {
  const { id } = await params;
  return <MemberDetail memberId={id} />;
}
