import ProfileView from '@/components/dashboard/ProfileView';

export const metadata = { title: 'My profile', robots: { index: false } };

export default function ProfilePage() {
  return <ProfileView />;
}
