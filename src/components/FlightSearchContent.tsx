import { useTranslations } from 'next-intl';

export default function FlightSearchContent() {
  const t = useTranslations('search.flight_content');
  
  return <div>{t('placeholder')}</div>;
}