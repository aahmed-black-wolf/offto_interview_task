"use client";

import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";

type Room = {
  adults: { count: number; label: string };
  child: { count: number; label: string };
  infant: { count: number; label: string };
};

type CounterKey = "adults" | "child" | "infant";

interface SelectInputProps {
  title: string;
}

export function SelectInput({ title }: SelectInputProps) {
  const t = useTranslations("select");
  const [rooms, setRooms] = useState<Room[]>([
    {
      adults: { count: 0, label: "adultslabel" },
      child: { count: 0, label: "childlabel" },
      infant: { count: 0, label: "infantlabel" },
    },
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleRoomCountChange = (increment: boolean) => {
    setRooms((prevRooms) => {
      const newCount = increment ? prevRooms.length + 1 : prevRooms.length - 1;

      // Limit room count between 1 and 6
      if (newCount < 1 || newCount > 6) return prevRooms;

      if (increment) {
        // Add a new room
        return [
          ...prevRooms,
          {
            adults: { count: 0, label: "adultslabel" },
            child: { count: 0, label: "childlabel" },
            infant: { count: 0, label: "infantlabel" },
          },
        ];
      } else {
        // Remove the last room
        return prevRooms.slice(0, -1);
      }
    });
  };

  const handleIncrement = (roomIndex: number, counterKey: CounterKey) => {
    setRooms((prevRooms) =>
      prevRooms.map((room, index) =>
        index === roomIndex
          ? {
              ...room,
              [counterKey]: {
                ...room[counterKey],
                count: room[counterKey].count + 1,
              },
            }
          : room
      )
    );
    setIsSelected(true);
  };

  const handleDecrement = (roomIndex: number, counterKey: CounterKey) => {
    setRooms((prevRooms) =>
      prevRooms.map((room, index) =>
        index === roomIndex
          ? {
              ...room,
              [counterKey]: {
                ...room[counterKey],
                count: Math.max(0, room[counterKey].count - 1),
              },
            }
          : room
      )
    );
    setIsSelected(true);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full relative">
      <div
        className="shadow-sm rounded-md p-[6px] cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="text-[12px]">{title}</span>
        <p>{isSelected ? "Selected" : "Select"}</p>
      </div>
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full -left-[50px] w-[300px] mt-2 p-2 bg-white rounded-xl shadow-lg z-10 max-h-[300px] overflow-y-auto no-scrollbar"
        >
          <div className="p-1">
            <div className="px-1 py-2">
              <h2 className="text-small font-bold text-secondary">
                {t("title")}
              </h2>
              <p>{t("subtitle")}</p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div>
                <span className="font-medium">{t("rooms")}</span>
                <p>{t("roomslabel")}</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <button
                  type="button"
                  className="count-inc"
                  onClick={() => handleRoomCountChange(true)}
                >
                  +
                </button>
                <div>{rooms.length}</div>
                <button
                  type="button"
                  className="count-dec"
                  onClick={() => handleRoomCountChange(false)}
                >
                  -
                </button>
              </div>
            </div>
            <hr className="my-2" />
            <div className="count-wrapper">
              {rooms.map((room, index) => (
                <div key={index}>
                  <div className="font-bold mb-2 text-primary">
                    {t("room")} {index + 1}
                  </div>
                  {Object.keys(room).map((counterKey) => {
                    const counterData = room[counterKey as CounterKey];
                    return (
                      <div
                        key={counterKey}
                        className="flex flex-row justify-between items-center mb-2"
                      >
                        <div>
                          <span className="font-medium">{t(counterKey)}</span>
                          <p>{t(counterData.label)}</p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <button
                            type="button"
                            className="count-inc"
                            onClick={() =>
                              handleIncrement(index, counterKey as CounterKey)
                            }
                          >
                            +
                          </button>
                          <div className="mx-1">{counterData.count}</div>
                          <button
                            type="button"
                            className="count-dec"
                            onClick={() =>
                              handleDecrement(index, counterKey as CounterKey)
                            }
                          >
                            -
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <input type="hidden" name="rooms" defaultValue={JSON.stringify(rooms)} />
    </div>
  );
}
