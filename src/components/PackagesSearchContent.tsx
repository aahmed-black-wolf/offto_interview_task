import { useTranslations } from 'next-intl';

export default function PackagesSearchContent() {
  const t = useTranslations('search.packages_content');
  
  return <div>{t('placeholder')}</div>;
}