import { redirect } from 'next/navigation';

export default function LegacyAboutAuthorRedirect() {
  redirect('/about/');
}
