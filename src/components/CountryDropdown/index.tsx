"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@nextui-org/react";
import {
  COUNTRY_AVATAR_CONVERTER,
  COUNTRY_CODE_CONVERTER,
  CountryCode,
} from "@/enum.constants";
import { Ilist } from "./types";

export function CountryDropdown({ list }: { list: Ilist[] }) {
  const [mounted, setMounted] = useState(false);
  const [isopen, setIsOpen] = useState(false);

  // Initialize state with default value or from localStorage after mounting
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(["Kuwait"])
  );

  useEffect(() => {
    setMounted(true);
    const storedCountry =
      localStorage.getItem("CountryofResidence") || "Kuwait";

    const countryName =
      Object.keys(COUNTRY_CODE_CONVERTER).find(
        (key) =>
          COUNTRY_CODE_CONVERTER[key as keyof typeof COUNTRY_CODE_CONVERTER] ===
          storedCountry
      ) || "Kuwait";

    setSelectedKeys(new Set([countryName]));
  }, []);

  useEffect(() => {
    if (mounted) {
      const countryCode =
        COUNTRY_CODE_CONVERTER[
          Array.from(selectedKeys)[0] as keyof typeof COUNTRY_CODE_CONVERTER
        ];

      localStorage.setItem("CountryofResidence", countryCode);
      localStorage.setItem("CountryOfNationality", countryCode);
    }
  }, [selectedKeys, mounted]);

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );

  const openHandler = () => {
    setIsOpen(!isopen);
  };

  if (!mounted) return null;

  return (
    <Dropdown>
      <div className="px-2 m-2 shadow-md border rounded-full">
        <DropdownTrigger>
          <Button
            className="capitalize"
            variant="bordered"
            onClick={openHandler}
          >
            <Avatar
              src={COUNTRY_AVATAR_CONVERTER[selectedValue as CountryCode]}
              className="w-7 h-7"
            />
            {selectedValue}
          </Button>
        </DropdownTrigger>
      </div>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Single selection example"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={(keys) => {
          setSelectedKeys(new Set(keys as Set<string>));
        }}
      >
        {list?.map((item) => (
          <DropdownItem className="py-2 px-4 bg-white" key={item.name}>
            <div className="flex flex-row gap-3">
              {item.avatar && (
                <Avatar alt={item.name} className="w-7 h-7" src={item.avatar} />
              )}
              {item.name}
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
