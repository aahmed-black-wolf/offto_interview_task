import { useState, useCallback } from 'react';
import axios from 'axios';
import toaster from '@/toaster';

interface RoomsData {
    rooms: number;
    adults: number;
    children: number;
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
                            NumberOfAdult: roomsData.adults,
                            NumberOfChild: roomsData.children,
                        }
                    ],
                }
            );
            setHotels(response.data);
        } catch (error: any) {
            toaster.error(error?.response?.data?.message || 'Error fetching hotels');
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
