import AuthForm from '@/components/forms/AuthForm';

export const metadata = { title: 'Log in' };

export default function Login() {
  return <AuthForm mode="login" />;
}
