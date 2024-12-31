import { ReactNode } from 'react';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getMessages } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';
import { notFound } from 'next/navigation';
import { Providers } from '../providers';
import Footer from '@/components/Footer';

interface LocaleMessages extends AbstractIntlMessages {
  metadata: {
    title: string;
    description: string;
  };
  locale: any;
}

async function getLocaleMessages(params: Promise<{ locale: string }> | { locale: string }): Promise<LocaleMessages> {
  try {
    const resolvedParams = await params;
    return (await getMessages({ locale: resolvedParams.locale })) as LocaleMessages;
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolvedParams = await params;
  const messages = await getLocaleMessages(params);
  const dir = resolvedParams.locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={resolvedParams.locale} dir={dir}>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <body className={`antialiased`}>
        <NextIntlClientProvider locale={resolvedParams.locale} messages={messages}>
          <Header locale={resolvedParams.locale} />
          <Providers>
            {children}
          </Providers>
          <Toaster
            toastOptions={{
              duration: 5000,
              style: {
                direction: resolvedParams.locale === 'ar' ? 'rtl' : 'ltr',
              },
            }}
          />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}