import { ReactNode } from 'react';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';
import { notFound } from 'next/navigation';
import { Providers } from '../providers';

type Props = {
  children: ReactNode;
  params: { locale: string }; 
};

interface LocaleMessages extends AbstractIntlMessages {
  metadata: {
    title: string;
    description: string;
  };
}

async function getLocaleMessages(locale: string): Promise<LocaleMessages> {
  try {
    return (await getMessages(locale)) as LocaleMessages;
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const messages = await getLocaleMessages(locale);
  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getLocaleMessages(locale);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={`antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          <Providers>
            {children}
          </Providers>
          <Toaster
            toastOptions={{
              duration: 5000,
              style: {
                direction: locale === 'ar' ? 'rtl' : 'ltr',
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}