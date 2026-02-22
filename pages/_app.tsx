import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/providers/Auth/AuthProvider';
import { Toaster } from '@/components/common/ui/Toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster />
    </AuthProvider>
  );
}
