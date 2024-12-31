// ############################################ Country

export const COUNTRY_LIST = [
  {
    code: "EG",
    name: "Egypt",
    avatar: "https://flagcdn.com/eg.svg",
  },
  {
    code: "SA",
    name: "Saudi arabia",
    avatar: "https://flagcdn.com/sa.svg",
  },
  {
    code: "KW",
    name: "Kuwait",
    avatar: "https://flagcdn.com/kw.svg",
  },
  {
    code: "SD",
    name: "Sudan",
    avatar: "https://flagcdn.com/sd.svg",
  },
];

export const COUNTRY_AVATAR_CONVERTER = {
  Egypt: "https://flagcdn.com/eg.svg",
  "Saudi arabia": "https://flagcdn.com/sa.svg",
  Kuwait: "https://flagcdn.com/kw.svg",
  Sudan: "https://flagcdn.com/sd.svg",
};

export const COUNTRY_CODE_CONVERTER = {
  Egypt: "EG",
  "Saudi arabia": "SA",
  Kuwait: "KW",
  Sudan: "SD",
};

export type CountryCode = keyof typeof COUNTRY_AVATAR_CONVERTER;

// ############################################ Currency

export const CURRENCY_LIST = ["EGP", "SAR", "KWD", "SDG"];
