export type TCountry = {
  id: number;
  name: string;
  flag_image: string;
  code: string;
  iso_code: string;
  native_name: string;
};

export type TCountriesResponse = {
  success: boolean;
  data: Country[];
  message: string;
  status: number;
};
