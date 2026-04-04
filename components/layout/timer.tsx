"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import flowerCorner from "@/assets/flower-corner.png";
import flowerCornerRight from "@/assets/images/flower-bottom-right-corner.png";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const WEDDING_DATE = new Date("2026-11-20T17:00:00");

const CountDown = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const diff = WEDDING_DATE.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units: { label: string; key: keyof TimeLeft }[] = [
    { label: "Ngày", key: "days" },
    { label: "Giờ", key: "hours" },
    { label: "Phút", key: "minutes" },
    { label: "Giây", key: "seconds" },
  ];

  return (
    <div className="flex justify-center items-center gap-3">
      {units.map(({ label, key }, idx) => (
        <div key={key} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 gap-0.5 flex flex-col items-center justify-center rounded-2xl bg-[#f4dbce]">
              <span className="text-3xl font-semibold text-[#a12f0c] tabular-nums leading-none">
                {String(timeLeft[key]).padStart(2, "0")}
              </span>
              <span className="text-sm text-[#a12f0c] font-normal">
                {label}
              </span>
            </div>
          </div>
          {idx < units.length - 1 && (
            <span className="text-2xl font-semibold text-[#a12f0c] select-none">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default function Timer() {
  return (
    <div className="h-130 bg-[rgb(251_247_245)] relative">
      <div className="absolute top-0 left-0 w-75 h-75">
        <Image
          src={flowerCorner}
          alt="flower corner"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-75 h-75">
        <Image
          src={flowerCornerRight}
          alt="flower corner right"
          fill
          className="object-cover object-center"
        />
      </div>
      <section className="max-w-[1320px] w-full text-4xl mx-auto font-family-prata pt-15 flex flex-col gap-20 justify-center items-center text-[#a12f0c]">
        <p className="">17:00, Thứ 6</p>
        <p className="tracking-[10px]">20 | 11 | 2024</p>
        <p>Số 12, phố Tố Hữu, Hà Đông, Hà Nội</p>
      </section>
      <div className="mt-10">
        <CountDown />
      </div>
    </div>
  );
}
