"use client";

import TextInput from "../TextInput";
import { TabNav } from "../TabNav";
import { SelectInput } from "../SelectInput";
import DatePickers from "../DatePickers";
import { FormEvent, useState } from "react";
import { getHotels } from "@/api/getHotels";
import { useTranslations } from "next-intl";
import { Spinner } from "@/icons";

export const BookingCard = () => {
  const t = useTranslations("Booking");
  const [hotelList, setHotelList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true); // show loading
    setSearched(true); // mark as searched

    const formData = new FormData(e.target as HTMLFormElement);

    const destinAtion = formData.get("destinstion")?.toString() || "";
    const checkIn = formData.get("check-in")?.toString() || "";
    const checkOut = formData.get("check-out")?.toString() || "";
    const rooms = formData.get("rooms")?.toString() || "";

    const countryOfNationality =
      localStorage?.getItem("CountryOfNationality") || "KW";
    const countryofResidence =
      localStorage?.getItem("CountryofResidence") || "KW";
    const currency = localStorage?.getItem("currency") || "KWD";

    // re-structure the rooms
    const restructuredRooms = JSON.parse(rooms)?.map((room) => ({
      NumberOfAdult: room.adults.count,
      NumberOfChild: room.child.count,
    }));

    try {
      const res = await getHotels({
        DestinationCity: destinAtion,
        CheckInDate: checkIn,
        CheckOutDate: checkOut,
        CountryofResidence: countryofResidence,
        CountryOfNationality: countryOfNationality,
        Room: restructuredRooms,
        currencyCode: currency,
        locale: "en",
      });

      if (res?.status === 200 && res?.date?.items) {
        setHotelList([...res?.date?.items]);
      } else {
        setHotelList([]);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setHotelList([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-[1000px] h-fit bg-blue bg-white shadow-md rounded-lg py-12 px-8">
      <TabNav />
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-row gap-4 justify-between">
          <TextInput title={t("destination")} />
          <DatePickers />
          <SelectInput title={t("passengers&rooms")} />
        </div>
        <hr className="my-3" />
        <div className="w-full h-full flex flex-col items-center">
          <button
            type="submit"
            className="btn btn-primary !px-40 !rounded-lg shadow-md my-3"
          >
            {t("search")}
          </button>

          <div className="w-full h-full flex flex-col justify-center items-center mt-2">
            {!searched ? null : loading ? (
              <Spinner size={20} color="" />
            ) : hotelList.length === 0 ? (
              <h2>{t("notFound")}</h2>
            ) : (
              <div>List here...</div> // i've tried to use the API many times with diffrent payloads,
              // but it doesn't show me any list in the response, hence
              // i coudn't figure out how does the card of hotels look like to create them
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
