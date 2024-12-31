import { useTranslations } from "next-intl";

export const MainLabel = () => {
  const t = useTranslations("Booking");

  return (
    <div className="flex flex-col items-center justify-center w-fit my-16">
      <h1>{t("title")}</h1>
      <h2>{t("subtitle")}</h2>
    </div>
  );
};
