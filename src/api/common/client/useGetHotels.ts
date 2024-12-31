import { useState, useCallback } from 'react';
import axios from 'axios';
import toaster from '@/toaster';
import { useTranslations } from 'next-intl';

interface RoomsData {
    rooms: number;
    adults: number;
    children: number;
    ageOfChildrens: number;
    infants: number;
}

interface HotelSearchParams {
    destination: string;
    checkIn: string;
    checkOut: string;
    roomsData: RoomsData;
}

interface HotelResponse {
    data: {
        items: Array<{
            HotelCode: number;
            CurrencyCode: string;
            HotelDetails: {
                HotelName: string;
                ThumbImage: string;
                HotelRating: string;
                Address: string;
                Rating?: {
                    guest?: {
                        overall: string;
                    };
                };
            };
            NetShowingPrice: number;
            discount?: number;
            Meal: string;
        }>;
    };
}

export const useGetHotels = () => {
    const [hotels, setHotels] = useState<HotelResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations('search.HotelSearchContent');

    const searchHotels = useCallback(async ({ destination, checkIn, checkOut, roomsData }: HotelSearchParams) => {
        setIsLoading(true);
        try {
            const response = await axios.post<HotelResponse>(
                `${process.env.NEXT_PUBLIC_API_URL}/get_all_hotels?page=1`,
                {
                    DestinationCity: destination,
                    CheckInDate: checkIn,
                    CheckOutDate: checkOut,
                    Room: [
                        {
                            AgeOfChild: [roomsData.ageOfChildrens],
                            NumberOfChild: roomsData.children,
                            NumberOfAdult: roomsData.adults,
                        }
                    ],
                }
            );

            if (response.data.data.items.length === 0) {
                toaster.error(t('errors.no_hotels_found'));
                setHotels(null);
                return;
            }
            setHotels(response.data);
            toaster.success(t('success.hotels_found'));

        } catch (error: any) {
            toaster.error(t('errors.no_hotels_found'));
            setHotels(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        hotels,
        isLoading,
        searchHotels
    };
};
