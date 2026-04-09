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
    name: "Lễ Ăn Hỏi",
    time: "08:00",
    day: "20",
    month: "03",
    year: "2026",
    address: "Tổ chức ăn",
    mapUrl: "#",
    calendarUrl: "#",
  },
  {
    icon: eventIcon2,
    name: "Xuất Phát",
    time: "09:15",
    day: "12",
    month: "04",
    year: "2026",
    address: "Dự kiến xuất phát",
    mapUrl:
      "https://maps.google.com/?q=Thôn+Kinh+Nậu,+xã+Bắc+Đông+Quan,+tỉnh+Hưng+Yên",
    calendarUrl: "#",
  },
  {
    icon: eventIcon3,
    name: "Lễ Cưới",
    time: "10:00",
    day: "12",
    month: "04",
    year: "2026",
    address: "Có mặt tại nhà gái & tiến hành lễ cưới",
    mapUrl: "https://maps.app.goo.gl/S9FzX9cnusRMDnVi6",
    calendarUrl: "#",
  },
];

// Icon height + gap below icon before badge
const ICON_AREA_HEIGHT = 132; // px (icon 88px + 24px gap)

function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="w-full flex flex-col items-center">
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
      <div className="relative z-10 bg-[#a12f0c] text-white font-family-prata text-sm font-semibold uppercase tracking-widest md:px-12 md:py-3.5 px-10 py-2 rounded-full shadow-md cursor-default select-none whitespace-nowrap">
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
        {event.mapUrl !== "#" && (
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-[#a12f0c] text-white text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[#8a2509] transition-colors duration-200 shadow-sm"
          >
            Chỉ đường
          </a>
        )}
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
        <h2 className="font-family-pinyon-script text-6xl md:text-7xl text-[#a12f0c] text-center md:mb-14 mb-10 leading-tight">
          Sự kiện
        </h2>

        {/* Timeline wrapper — line runs through badge centers */}
        <div className="relative grid md:grid-cols-3 grid-cols-1 gap-y-10 md:gap-y-0 w-full">
          {/* Continuous horizontal line through badge centers */}
          {/* top = icon area height (88px h + 24px mb) + half badge height (~22px) ≈ 134px */}
          <div
            className="absolute left-0 right-0 h-[2px] bg-[#a12f0c] md:block hidden"
            style={{ top: `${ICON_AREA_HEIGHT}px` }}
          />

          {EVENTS.map((event, idx) => (
            <EventCard key={idx} event={event} />
          ))}
        </div>

        {/* Cập nhật địa điểm rõ ràng */}
        {/* <div className="mt-20 w-full flex flex-col items-center">
          <h3 className="font-family-prata text-2xl text-[#a12f0c] mb-2 text-center">
            Nhà Gái
          </h3>
          <p className="font-family-prata text-lg text-[#5a4a42] mb-8 text-center max-w-md">
            Thôn Kinh Nậu, xã Bắc Đông Quan, tỉnh Hưng Yên
          </p>
          
          <div className="w-full max-w-[800px] h-[400px] rounded-2xl overflow-hidden shadow-lg border-2 border-[#f4dbce]">
            <iframe 
              src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Thôn%20Kinh%20Nậu,%20xã%20Bắc%20Đông%20Quan,%20tỉnh%20Hưng%20Yên+(Nhà%20Gái)&t=&z=14&ie=UTF8&iwloc=B&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="mt-6 flex gap-4">
             <a
              href="https://maps.google.com/?q=Thôn+Kinh+Nậu,+xã+Bắc+Đông+Quan,+tỉnh+Hưng+Yên"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#a12f0c] text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-[#8a2509] transition-all duration-300 shadow-md flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              Mở Google Maps
            </a>
          </div>
        </div> */}
      </section>
    </div>
  );
}
