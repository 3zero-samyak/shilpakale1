import { redirect } from 'next/navigation';

export default function CreateAccountPage() {
  redirect('/api/auth/login?returnTo=/account');
}
