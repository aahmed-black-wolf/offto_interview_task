import {useLocale, useTranslations} from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {
  const t = useTranslations('');
  const locale = useLocale();
  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')} />
  );
}