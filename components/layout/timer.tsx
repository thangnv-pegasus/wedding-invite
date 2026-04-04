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

const CountDown = ({ small = false }: { small?: boolean }) => {
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

  const boxSize = small ? "w-16 h-16" : "w-20 h-20";
  const numSize = small ? "text-2xl" : "text-3xl";
  const labelSize = small ? "text-xs" : "text-sm";
  const colonSize = small ? "text-xl" : "text-2xl";
  const gapSize = small ? "gap-2" : "gap-3";

  return (
    <div className={`flex justify-center items-center ${gapSize}`}>
      {units.map(({ label, key }, idx) => (
        <div key={key} className={`flex items-center ${gapSize}`}>
          <div className="flex flex-col items-center">
            <div className={`${boxSize} gap-0.5 flex flex-col items-center justify-center rounded-2xl bg-[#f4dbce]`}>
              <span className={`${numSize} font-semibold text-[#a12f0c] tabular-nums leading-none`}>
                {String(timeLeft[key]).padStart(2, "0")}
              </span>
              <span className={`${labelSize} text-[#a12f0c] font-normal`}>
                {label}
              </span>
            </div>
          </div>
          {idx < units.length - 1 && (
            <span className={`${colonSize} font-semibold text-[#a12f0c] select-none`}>
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
    <div className="bg-[rgb(251_247_245)] relative overflow-hidden">
      {/* Flower corners — hiện cả mobile lẫn desktop */}
      <div className="absolute top-0 left-0 w-40 h-40 lg:w-75 lg:h-75">
        <Image src={flowerCorner} alt="flower corner" fill className="object-cover object-center" />
      </div>
      <div className="absolute bottom-0 right-0 w-40 h-40 lg:w-75 lg:h-75">
        <Image src={flowerCornerRight} alt="flower corner right" fill className="object-cover object-center" />
      </div>

      {/* ── Mobile layout ── */}
      <div className="lg:hidden flex flex-col items-center text-center px-6 py-16 gap-8">
        <p className="font-family-prata text-xl text-[#a12f0c]">
          17:00, Thứ 6
        </p>
        {/* Ngày tháng dạng số lớn như thiết kế */}
        <div className="flex items-center justify-center gap-4 font-family-prata text-[#a12f0c]">
          <span className="text-5xl font-medium">20</span>
          <span className="text-3xl text-[#c9a98a]">|</span>
          <span className="text-5xl font-medium">11</span>
          <span className="text-3xl text-[#c9a98a]">|</span>
          <span className="text-5xl font-medium">2024</span>
        </div>
        <p className="font-family-prata text-base text-[#a12f0c] leading-relaxed max-w-[260px]">
          Số 12, phố Tố Hữu, Hà Đông, Hà Nội
        </p>
        {/* Countdown nhỏ hơn cho mobile */}
        <CountDown small />
      </div>

      {/* ── Desktop layout (giữ nguyên) ── */}
      <div className="hidden lg:block h-130">
        <section className="max-w-[1320px] w-full text-4xl mx-auto font-family-prata pt-15 flex flex-col gap-20 justify-center items-center text-[#a12f0c]">
          <p className="">17:00, Thứ 6</p>
          <p className="tracking-[10px]">20 | 11 | 2024</p>
          <p>Số 12, phố Tố Hữu, Hà Đông, Hà Nội</p>
        </section>
        <div className="mt-10">
          <CountDown />
        </div>
      </div>
    </div>
  );
}
