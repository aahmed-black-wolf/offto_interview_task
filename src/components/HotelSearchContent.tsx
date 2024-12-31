import { DatePicker } from "@nextui-org/date-picker";
import RoomsModal from "./RoomsModal";
import SearchDestination from "./SearchDestination";
import { useState } from "react";
import toaster from "@/toaster";
import { useGetHotels } from "@/api/common/client/useGetHotels";
import { Button } from "@nextui-org/react";
import { useTranslations } from 'next-intl';
import Image from "next/image";

export default function HotelSearchContent() {
  const initialData = {
    rooms: 0,
    adults: 0,
    children: 0,
    ageOfChildrens: 0,
    infants: 0,
  };

  const [roomsData, setRoomsData] = useState(initialData);
  const [showResults, setShowResults] = useState(false);
  const { searchHotels, isLoading, hotels } = useGetHotels();
  const t = useTranslations('search.HotelSearchContent');

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);

    if (roomsData.rooms < 1 || roomsData.adults < 1) {
      return toaster.error(t('errors.rooms_adults_required'));
    }

    if (roomsData.children >= 1 && roomsData.ageOfChildrens == 0) {
      return toaster.error(t('errors.ages_of_childrens_required'));
    }

    if (!formValues.destination || !formValues.checkIn || !formValues.checkOut) {
      return toaster.error(t('errors.required_fields'));
    }

    const checkInDate = new Date(formValues.checkIn as string);
    const checkOutDate = new Date(formValues.checkOut as string);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);
    checkInDate.setHours(0, 0, 0, 0);
    checkOutDate.setHours(0, 0, 0, 0);

    if (checkInDate < currentDate || checkOutDate < currentDate) {
      return toaster.error(t('errors.dates_past'));
    }

    if (checkOutDate <= checkInDate) {
      return toaster.error(t('errors.checkout_before_checkin'));
    }

    await searchHotels({
      destination: formValues.destination as string,
      checkIn: formValues.checkIn as string,
      checkOut: formValues.checkOut as string,
      roomsData
    });
    setShowResults(true);
  };


  if (showResults && hotels?.data?.items) {
    return (
      <section className="grid gap-6 p-4 md:p-6">
        {hotels.data.items.map((hotel, index) => (
          <div key={index} className="p-4 md:p-6 border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3 lg:w-1/4">
                <Image
                  src={hotel.HotelDetails.ThumbImage}
                  alt={hotel.HotelDetails.HotelName}
                  width={300}
                  height={200}
                  className="w-full h-[200px] object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{hotel.HotelDetails.HotelName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>⭐ {hotel.HotelDetails.HotelRating}</span>
                      {hotel.HotelDetails.Rating?.guest?.overall && (
                        <span>• Guest Rating: {hotel.HotelDetails.Rating.guest.overall}/5</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#00B3BA]">
                      {hotel.CurrencyCode} {hotel.NetShowingPrice.toFixed(2)}
                    </p>
                    {hotel.discount && (
                      <p className="text-sm text-green-600">
                        {hotel.discount}% OFF
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{hotel.HotelDetails.Address}</p>
                <p className="text-sm">{hotel.Meal}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <form onSubmit={handleFormSubmission} className="flex gap-6 md:gap-10 flex-col justify-between items-center min-h-[300px] w-full max-w-7xl mx-auto p-4">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-4 w-full">
        <SearchDestination />
        <DatePicker
          isRequired
          name="checkIn"
          className="w-full"
          label={t('labels.check_in')}
          errorMessage={t('validation.field_required')}
        />
        <DatePicker
          isRequired
          name="checkOut"
          className="w-full"
          label={t('labels.check_out')}
          errorMessage={t('validation.field_required')}
        />
        <RoomsModal data={roomsData} setData={setRoomsData} initialData={initialData} />
      </section>
      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full md:w-auto min-w-[200px] bg-[#00B3BA] transition-all duration-200 hover:bg-[#198b8f] border rounded-xl text-white p-1 grid items-center text-lg font-medium"
      >
        {t('labels.search')}
      </Button>
    </form>
  );
}