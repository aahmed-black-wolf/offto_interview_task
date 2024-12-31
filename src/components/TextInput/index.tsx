"use client";

import { getCities } from "@/api/getCities";
import { MagnifyingGlass, Spinner } from "@/icons";
import { Input, DropdownItem, DropdownMenu, Dropdown } from "@nextui-org/react";

import { useState } from "react";

export default function TextInput({ title }: { title: string }) {
  const [value, setValue] = useState<string>("");
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); // Dropdown visibility

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value); // Update input value
  };

  // Fetch cities on button click
  const fetchCities = async () => {
    if (value.trim().length > 1) {
      setLoading(true); // Set loading state

      const res = await getCities(value);

      setCities(res || []); // Set the fetched cities
      setDropdownOpen(true);
      setLoading(false);
    } else {
      setCities([]); // Clear cities if the input is too short
      setDropdownOpen(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-center">
        <Input
          name="destination"
          value={value}
          type="search"
          label={title}
          onChange={handleChange}
          placeholder="Where to..."
          className="rounded-none!"
        />
        <button
          className="w-fit"
          type="button"
          onClick={fetchCities}
          disabled={loading}
        >
          {loading ? (
            <Spinner color="#333" size={22} />
          ) : (
            <MagnifyingGlass color="#333" size={22} />
          )}{" "}
        </button>
      </div>

      {dropdownOpen && cities.length > 0 && (
        // @ts-expect-error
        <Dropdown>
          <DropdownMenu
            key="dropdown-menu"
            disallowEmptySelection
            selectionMode="single"
            variant="flat"
            onSelectionChange={(keys) => {
              const selectedCity = cities[
                Array.from(keys)[0] as number
              ] as string;
              setValue(selectedCity); // Set the input value
              setCities([]); // Clear cities
              setDropdownOpen(false); // Close dropdown
            }}
          >
            {cities?.map((city, index) => (
              <DropdownItem key={index}>{city}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
}
