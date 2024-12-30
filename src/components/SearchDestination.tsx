import React, { useState, useEffect } from 'react';
import { Input } from '@nextui-org/input';
import { useGetCities } from '@/api/common/client/useGetCities';
import { useDebounce } from '@/hooks/useDebounce';
import { useTranslations } from 'next-intl';

const SearchDestination = () => {
    const [searchInput, setSearchInput] = useState('');
    const [isSelected, setIsSelected] = useState(false);
    const { cities, isLoading, fetchCities } = useGetCities();
    const debouncedSearchInput = useDebounce(searchInput, 500);
    const t = useTranslations('search.HotelSearchContent');

    useEffect(() => {
        if (!isSelected) {
            fetchCities(debouncedSearchInput);
        }
    }, [debouncedSearchInput, fetchCities, isSelected]);

    const handleCitySelect = (city: string) => {
        setIsSelected(true);
        setSearchInput(city);
        fetchCities('');
    };

    return (
        <div className='w-full md:w-auto relative'>
            <Input
                isRequired
                type="search"
                name="destination"
                value={searchInput}
                onChange={(e) => {
                    setIsSelected(false);
                    setSearchInput(e.target.value);
                }}
                label={t('labels.destination')}
                errorMessage={t('validation.field_required')}
                classNames={{
                    base: "w-full",
                }}
            />
            {cities.length > 0 && (
                <ul className="absolute bg-white shadow-lg mt-1 w-full z-10 rounded-2xl">
                    {cities.slice(0, 8).map((city, index) => (
                        <li
                            key={index}
                            className="text-black cursor-pointer py-1 hover:bg-gray-100 "
                            onClick={() => handleCitySelect(city)}
                        >
                            {city}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchDestination;
