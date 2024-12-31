import { IHotelRequestBody } from "./types";

export const getHotels = async (
  body: IHotelRequestBody,
  query?: string
): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get_all_hotels?${query}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("🚀 ~ handleSubmit ~ data:", data);
      return data;
    } else {
      const errorText = await response.text();
      console.error("Failed to fetch hotels:", errorText);
      throw new Error("Failed to fetch hotels data");
    }
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};
