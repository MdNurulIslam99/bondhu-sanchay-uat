import MemberDirectory from '@/components/dashboard/MemberDirectory';

export const metadata = { title: 'All members', robots: { index: false } };

export default function Page() {
  return <MemberDirectory />;
}
