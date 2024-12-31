import { TCountriesResponse, TCountry } from "@/api/@types/common/countries";
import { clientFetch } from "@/store/fetch/client";

const normalizeUser = (response: TCountriesResponse): TCountry[] => {
  return response.data as TCountry[];
};

const getAllCountries = async () => {
  try {
    const response = await clientFetch.get('countries');
    const json = (await response?.json()) as TCountriesResponse;
    return normalizeUser(json);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const useAllCountries = () => {
  return useQuery({
    queryKey: [OFFTO_GET_PAYMENT_METHODS],
    queryFn: getAllCountries,
    staleTime: 5000,
    enabled: true,
  });
};
