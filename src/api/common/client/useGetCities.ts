import { useState, useCallback } from 'react';
import axios from 'axios';
import toaster from '@/toaster';
import { useTranslations } from 'next-intl';

export const useGetCities = () => {
    const t = useTranslations('errors');
    const [cities, setCities] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCities = useCallback(async (query: string) => {
        if (!query) {
            setCities([]);
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/get_all_cities?page=1`,
                { search: query }
            );
            if (!response.data.data.items || response.data.data.items.length === 0) {
                toaster.error(t('no_cities_found'));
                setCities([]);
                return;
            }
            const cityNames = response.data.data.items.flatMap((item: any) =>
                item.items.map((subItem: any) => subItem.city.name)
            );
            setCities(cityNames);
        } catch (error) {
            toaster.error(t('error_fetching_cities'));
            setCities([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        cities,
        isLoading,
        fetchCities
    };
};
