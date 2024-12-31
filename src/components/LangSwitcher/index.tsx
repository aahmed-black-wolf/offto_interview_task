"use client";

import { Avatar, Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LanguageSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to switch language
  const switchLanguage = () => {
    if (mounted) {
      // Extract the current language (first part of the pathname)
      const currentLocale = pathname.split("/")[1];

      console.log(currentLocale);

      // Toggle between 'en' and 'ar'
      const newLocale = currentLocale === "en" ? "ar" : "en";

      localStorage.setItem("lang", newLocale);

      // Replace the current locale with the new one
      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);

      window.location.href = newPath; // Change the browser's location to the new path
    }
  };

  if (!mounted) return;

  return (
    <div className="px-2 m-2 shadow-md border rounded-full">
      <Button
        className="capitalize"
        variant="bordered"
        onClick={switchLanguage} // Corrected to onClick to trigger the function
      >
        <Avatar
          alt={"language"}
          className="w-7 h-7"
          src={"https://offto.com.kw/landing_page/assets/lang.svg"}
        />
        {localStorage && localStorage.getItem("lang") === "en"
          ? `عربي`
          : `English`}
      </Button>
    </div>
  );
};

export default LanguageSwitcher;

// https://offto.com.kw/landing_page/assets/lang.svg
