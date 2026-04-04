import Image from "next/image";
import flowerCorner from "@/assets/flower-corner.png";
import flowerCornerRight from "@/assets/images/flower-bottom-right-corner.png";
import eventIcon1 from "@/assets/icons/eventIcon1.png";
import eventIcon2 from "@/assets/icons/eventIcon2.png";
import eventIcon3 from "@/assets/icons/eventIcon3.png";

interface EventItem {
  icon: string | { src: string; width: number; height: number };
  name: string;
  time: string;
  day: string;
  month: string;
  year: string;
  address: string;
  mapUrl: string;
  calendarUrl: string;
}

const EVENTS: EventItem[] = [
  {
    icon: eventIcon1,
    name: "Ăn Hỏi",
    time: "10:00 AM",
    day: "20",
    month: "7",
    year: "2024",
    address: "45 Nguyễn Khoái, Hai Bà Trưng, Hà Nội",
    mapUrl: "https://maps.google.com/?q=45+Nguyễn+Khoái,+Hai+Bà+Trưng,+Hà+Nội",
    calendarUrl: "#",
  },
  {
    icon: eventIcon2,
    name: "Đón Dâu",
    time: "10:00 AM",
    day: "20",
    month: "7",
    year: "2024",
    address: "45 Nguyễn Khoái, Hai Bà Trưng, Hà Nội",
    mapUrl: "https://maps.google.com/?q=45+Nguyễn+Khoái,+Hai+Bà+Trưng,+Hà+Nội",
    calendarUrl: "#",
  },
  {
    icon: eventIcon3,
    name: "Tiệc Cưới",
    time: "10:00 AM",
    day: "20",
    month: "7",
    year: "2024",
    address: "45 Nguyễn Khoái, Hai Bà Trưng, Hà Nội",
    mapUrl: "https://maps.google.com/?q=45+Nguyễn+Khoái,+Hai+Bà+Trưng,+Hà+Nội",
    calendarUrl: "#",
  },
];

// Icon height + gap below icon before badge
const ICON_AREA_HEIGHT = 132; // px (icon 88px + 24px gap)

function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="flex-1 flex flex-col items-center">
      {/* Icon */}
      <div className="w-22 h-22 mb-6 flex items-end justify-center relative">
        <Image
          src={event.icon}
          alt={event.name}
          fill
          className="object-contain drop-shadow-sm"
        />
      </div>

      {/* Name badge — sits ON the line (rendered above via z-10) */}
      <div className="relative z-10 bg-[#a12f0c] text-white font-family-prata text-sm font-semibold uppercase tracking-widest px-12 py-3.5 rounded-full shadow-md cursor-default select-none whitespace-nowrap">
        {event.name}
      </div>

      {/* Date & time */}
      <div className="mt-6 flex items-center gap-2 font-family-prata text-[#5a4a42] text-[15px] tracking-wide">
        <span className="text-[#5a4a42]">{event.time}</span>
        <span className="text-[#c9a98a] mx-1">—</span>
        <span>{event.day}</span>
        <span className="text-[#c9a98a] mx-0.5">|</span>
        <span>{event.month}</span>
        <span className="text-[#c9a98a] mx-0.5">|</span>
        <span>{event.year}</span>
      </div>

      {/* Address */}
      <p className="text-sm text-[#a12f0c] text-center mt-1.5 max-w-[240px] leading-snug">
        {event.address}
      </p>

      {/* Action buttons */}
      <div className="flex items-center gap-3 mt-4">
        <a
          href={event.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 bg-[#a12f0c] text-white text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[#8a2509] transition-colors duration-200 shadow-sm"
        >
          Chỉ đường
        </a>
        <a
          href={event.calendarUrl}
          className="px-5 py-2 border border-[#d4a090] text-[#a12f0c] bg-[#fbf7f5] text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[#f4dbce] transition-colors duration-200"
        >
          Thêm vào lịch
        </a>
      </div>
    </div>
  );
}

export default function EventRoadmap() {
  return (
    <div className="bg-[#fbf7f5] relative overflow-hidden py-16">
      {/* Flower top-left */}
      <div className="absolute top-0 left-0 w-52 h-52 pointer-events-none">
        <Image
          src={flowerCorner}
          alt="flower corner"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Flower bottom-right */}
      <div className="absolute bottom-0 right-0 w-52 h-52 pointer-events-none">
        <Image
          src={flowerCornerRight}
          alt="flower corner right"
          fill
          className="object-cover object-center"
        />
      </div>

      <section className="max-w-[1100px] w-full mx-auto px-6 flex flex-col items-center">
        {/* Title */}
        <h2 className="font-family-pinyon-script text-7xl text-[#a12f0c] text-center mb-14 leading-tight">
          Sự kiện
        </h2>

        {/* Timeline wrapper — line runs through badge centers */}
        <div className="relative flex w-full">
          {/* Continuous horizontal line through badge centers */}
          {/* top = icon area height (88px h + 24px mb) + half badge height (~22px) ≈ 134px */}
          <div
            className="absolute left-0 right-0 h-[2px] bg-[#a12f0c]"
            style={{ top: `${ICON_AREA_HEIGHT}px` }}
          />

          {EVENTS.map((event, idx) => (
            <EventCard key={idx} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
