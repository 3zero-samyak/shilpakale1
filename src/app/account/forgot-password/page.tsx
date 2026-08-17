import { redirect } from 'next/navigation';

export default function ForgotPasswordPage() {
  redirect('/api/auth/login?returnTo=/account');
}
