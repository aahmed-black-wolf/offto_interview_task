import { ReactNode } from 'react';
import {useLocale} from 'next-intl';

import './styles.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';

type Props = {
  children: ReactNode;
};
export default function RootLayout({ children }: Props) {
  const locale = useLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body>
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

      </body>
    </html>
  );
}