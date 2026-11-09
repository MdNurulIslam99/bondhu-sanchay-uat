import AuthForm from '@/components/forms/AuthForm';

export const metadata = { title: 'Sign up' };

export default function Signup() {
  return <AuthForm mode="signup" />;
}
