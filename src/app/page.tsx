"use client";

import Image from "next/image";
import barcelona from "../../public/barcelona.jpg";
import paris from "../../public/paris.jpg";
import bruxelas from "../../public/bruxelas.jpeg";
import { useEffect, useState } from "react";

const images = [barcelona, paris, bruxelas];
type TimeUntilTrip = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeUntilTrip, setTimeUntilTrip] = useState<TimeUntilTrip>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  useEffect(() => {
    const updateTimeUntilTrip = () => {
      const now = new Date();
      const tripDate = new Date(2025, 1, 27, 18, 15); // Months are 0-indexed in JavaScript
      const differenceInTime = tripDate.getTime() - now.getTime();

      const days = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (differenceInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (differenceInTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((differenceInTime % (1000 * 60)) / 1000);

      setTimeUntilTrip({ days, hours, minutes, seconds });
    };

    updateTimeUntilTrip();
    const intervalId = setInterval(updateTimeUntilTrip, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main>
      <div className="absolute inset-0 flex items-center justify-center z-10 gap-4">
        <div className="bg-blue-500 rounded-lg shadow-lg p-16 text-center text-white transform hover:scale-105 transition-transform duration-200">
          <h2 className="text-4xl">{timeUntilTrip.days}</h2>
          <p className="text-2xl">Dias</p>
        </div>
        <div className="bg-blue-500 rounded-lg shadow-lg p-16 text-center text-white transform hover:scale-105 transition-transform duration-200">
          <h2 className="text-4xl">{timeUntilTrip.hours}</h2>
          <p className="text-2xl">Horas</p>
        </div>
        <div className="bg-blue-500 rounded-lg shadow-lg p-16 text-center text-white transform hover:scale-105 transition-transform duration-200">
          <h2 className="text-4xl">{timeUntilTrip.minutes}</h2>
          <p className="text-2xl">Minutos</p>
        </div>
        <div className="bg-blue-500 rounded-lg shadow-lg p-16 text-center text-white transform hover:scale-105 transition-transform duration-200">
          <h2 className="text-4xl">{timeUntilTrip.seconds}</h2>
          <p className="text-2xl">Segundos</p>
        </div>
      </div>
      {images.map((image, index) => (
        <div
          key={image.blurDataURL}
          className={`absolute transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          } w-full h-screen`}
        >
          <h1 className="text-4xl text-center p-4">
            Contador para a melhor viagem de todas
          </h1>
          <Image
            className="h-screen w-full"
            src={image}
            alt="image description"
          />
        </div>
      ))}
    </main>
  );
}
