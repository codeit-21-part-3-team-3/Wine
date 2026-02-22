import type { AppProps } from 'next/app';
import { Plus_Jakarta_Sans, Lora, IBM_Plex_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { AuthProvider } from '@/providers/Auth/AuthProvider';
import { Toaster } from '@/components/common/ui/Toast';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${sans.variable} ${serif.variable} ${mono.variable} font-sans`}>
      <AuthProvider>
        <Component {...pageProps} />
        <Toaster />
      </AuthProvider>
    </div>
  );
}
