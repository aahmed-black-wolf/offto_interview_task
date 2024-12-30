import LocaleSwitcher from './LocaleSwitcher';
import Link from 'next/link';
import Image from 'next/image';

type HeaderProps = {
  locale: string;
};

export default function Header({ locale }: HeaderProps) {

  const logoSrc = locale === 'ar' ? '/images/logo-ar.svg' : '/images/logo-en.svg';

  return (
    <header className="bg-white p-3">
      <nav className="container flex justify-between p-2 text-black">
        <Link href="/">
          <Image src={logoSrc} alt="Logo" width={150} height={250} />
        </Link>
        <LocaleSwitcher />
      </nav>
    </header>
  );
}