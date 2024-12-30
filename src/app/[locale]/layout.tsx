import { ReactNode } from 'react';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getMessages } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';
import { notFound } from 'next/navigation';
import { Providers } from '../providers';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
};

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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}