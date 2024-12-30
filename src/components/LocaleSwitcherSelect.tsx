'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useTranslations } from 'next-intl';

type Props = {
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
}: Props) {
  const t = useTranslations();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname(); // Get the current pathname
  const params = useParams(); // Get the current route parameters
  const currentLocale = defaultValue;

  function onButtonClick() {
    const nextLocale = currentLocale === 'en' ? 'ar' : 'en';

    // Replace the current locale in the pathname with the next locale
    const updatedPathname = pathname.replace(`/${currentLocale}`, `/${nextLocale}`);

    startTransition(() => {
      router.replace(updatedPathname);
    });
  }

  return (
    <button
      className={`relative max-h-10 border rounded-full px-4 py-2 text-sm text-black hover:bg-slate-300 transition-colors duration-300 ease-in-out ${isPending ? 'transition-opacity [&:disabled]:opacity-30' : ''
        }`}
      onClick={onButtonClick}
      disabled={isPending}
    >
      {currentLocale === 'en' ? t('lang.ar') : t('lang.en')}
    </button>
  );
}
