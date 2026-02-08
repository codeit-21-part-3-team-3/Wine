import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/providers/Auth/AuthProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
