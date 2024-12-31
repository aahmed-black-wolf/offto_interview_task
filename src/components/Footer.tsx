import React from 'react';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
    const t = useTranslations('footer');
    return (
        <footer className='w-full container text-center'>
            <p className='p-3 text-lg'> {t('content.company_anme')}</p>
        </footer>
    );
};

export default Footer;
