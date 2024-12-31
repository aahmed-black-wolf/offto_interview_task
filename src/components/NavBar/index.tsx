import { COUNTRY_LIST, CURRENCY_LIST } from "@/enum.constants";
import { CountryDropdown } from "../CountryDropdown";
import Image from "next/image";
import { useTranslations } from "next-intl";

import LanguageSwitcher from "../LangSwitcher";
import { CurrencyDropdown } from "../CurrencyDropdown";
import { Ilist } from "../CountryDropdown/types";

export const NavBar = () => {
  const t = useTranslations("NavBar");

  return (
    <div className="flex flex-row items-center justify-evenly w-full p-1 bg-white">
      <Image src="./offto-logo.svg" width={150} height={120} alt="OFFTO LOGO" />
      <div className="flex flex-row items-center justify-around w-fit">
        <CountryDropdown list={COUNTRY_LIST} />
        <LanguageSwitcher />
        <CurrencyDropdown list={CURRENCY_LIST} />
        <button className="btn btn-secondary shadow-md w-fit">
          {t("Login")}
        </button>
      </div>
    </div>
  );
};
