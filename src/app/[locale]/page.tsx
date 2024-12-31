import { BookingCard } from "@/components/BookingCard";
import { MainLabel } from "@/components/MainLabel";
import { NavBar } from "@/components/NavBar";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <main className="w-full h-full flex flex-col items-center">
        <NavBar />
        <MainLabel />
        <BookingCard />
      </main>
    </NextUIProvider>
  );
}
