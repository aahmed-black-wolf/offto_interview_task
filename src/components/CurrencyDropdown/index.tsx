"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { CurrencyDollar } from "@/icons";

export function CurrencyDropdown({ list }: { list: string[] }) {
  const [mounted, setMounted] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(["KWD"])
  ); // Default to "KWD"

  // Initialize selectedKeys after mounting
  useEffect(() => {
    setMounted(true);
    const storedCurrency = localStorage.getItem("currency") || "KWD";
    setSelectedKeys(new Set([storedCurrency]));
  }, []);

  // Update localStorage whenever selectedKeys change
  useEffect(() => {
    if (mounted) {
      const currency = Array.from(selectedKeys)[0];
      localStorage.setItem("currency", currency);
    }
  }, [selectedKeys, mounted]);

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );

  const openHandler = () => {
    // Toggle dropdown state (if needed)
  };

  if (!mounted) return null; // Prevent rendering on the server

  return (
    <Dropdown>
      <div className="px-2 m-2 shadow-md border rounded-full">
        <DropdownTrigger>
          <Button
            className="capitalize"
            variant="bordered"
            onClick={openHandler}
          >
            <CurrencyDollar size={20} />
            {selectedValue}
          </Button>
        </DropdownTrigger>
      </div>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Currency selection"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={(keys) => {
          setSelectedKeys(new Set(keys as Set<string>));
        }}
      >
        {list?.map((item) => (
          <DropdownItem className="py-2 px-4 bg-white" key={item}>
            <div className="flex flex-row gap-3">{item}</div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
