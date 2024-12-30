import SearchWrapper from '@/components/SearchWrapper';
import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';

type Props = {
  params: {locale: string};
};

export default function Home({params: {locale}}: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('');

  return (
     <main className=' text-center bg-primaryBg min-h-screen'>   
      <div className='container pt-12 space-y-5'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primaryText'>{t('Home_page_main_title')}</h1>
        <p className='md:text-xl text-neutral-600'>{t('Home_page_main_subtitle')}</p>
      </div>
      <SearchWrapper />
     </main>
  );
}