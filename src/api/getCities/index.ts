import { ICities } from "./types";

export const getCities = async (search: string): Promise<string[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get_all_cities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search }),
      }
    );

    if (response.ok) {
      const data: ICities = await response.json();

      const cities: string[] = [];

      data.data.items.forEach((countryItem) => {
        if (countryItem.items) {
          // Loop through nested items for cities
          countryItem.items.forEach((cityItem) => {
            const cityName = cityItem?.city?.name;
            if (cityName) {
              cities.push(cityName);
            }
          });
        }
      });

      return cities;
    } else {
      console.error("Failed to fetch cities");
      return [];
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};
