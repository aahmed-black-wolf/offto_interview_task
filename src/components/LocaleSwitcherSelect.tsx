'use client';

import {useParams} from 'next/navigation';
import {useTransition} from 'react';
import { usePathname, useRouter} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

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
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = defaultValue;

  function onButtonClick() {
    const nextLocale = currentLocale === 'en' ? 'ar' : 'en';
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        {pathname, params},
        {locale: nextLocale}
      );
    });
  }

  return (
    <button
      className={`relative max-h-10 border rounded-full px-4 py-2 text-sm text-black hover:bg-slate-300 transition-colors duration-300 ease-in-out ${isPending ? 'transition-opacity [&:disabled]:opacity-30' : ''}`}
      onClick={onButtonClick}
      disabled={isPending}
    >
      {currentLocale === 'en' ? t('lang.ar') : t('lang.en')}
    </button>
  );
}