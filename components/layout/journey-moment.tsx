import Image from "next/image";
import photo1 from "@/assets/photos/DTA00069.jpg";
import photo2 from "@/assets/photos/DTA00196.jpg";
import photo3 from "@/assets/photos/DTA00339.jpg";
import flowerLeft from "@/assets/images/flower-left-bot-avatar.png";

interface MilestoneCardProps {
  photo: string | { src: string; width: number; height: number };
  title: string;
  description: string;
  day: string;
  month: string;
  year: string;
  flowerSide?: "left" | "right";
}

function MilestoneCard({
  photo,
  title,
  description,
  day,
  month,
  year,
}: MilestoneCardProps) {
  return (
    <div className="flex flex-col items-center bg-white rounded-b-2xl rounded-t-full overflow-visible w-full shadow-md">
      {/* Arch photo with flower */}
      <div className="relative w-full">
        {/* Arch image */}
        <div className="w-full h-100 rounded-t-full overflow-hidden relative">
          <Image
            src={photo}
            alt={title}
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Flower overlay at bottom of arch */}
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 -rotate-15 translate-y-1/2 w-36 h-auto pointer-events-none z-10`}
        >
          <Image
            src={flowerLeft}
            alt="flower decoration"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Card body */}
      <div className="py-8 px-4 flex flex-col items-center text-center gap-4 bg-[#fbf7f5]">
        {/* Title */}
        <h3 className="font-family-pinyon-script text-4xl text-[#a12f0c] leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-base text-neutral-800 leading-relaxed font-family-pinyon-script">
          {description}
        </p>

        {/* Date */}
        <div className="mt-4 flex items-center gap-3 text-[#f4dbce] text-2xl font-family-prata font-medium tracking-wider">
          <span>{day}</span>
          <span className="text-[#e8c9b8]">|</span>
          <span>{month}</span>
          <span className="text-[#e8c9b8]">|</span>
          <span>{year}</span>
        </div>
      </div>
    </div>
  );
}

const MILESTONES = [
  {
    photo: photo2,
    title: "Lần đầu gặp nhau",
    description:
      "Lần đầu gặp nhau Lần đầu gặp là kiểu... cũng chẳng có gì đặc biệt lắm, chỉ là hai người xa lạ nói chuyện vài câu. Thế mà không hiểu sao lại nhớ nhau lâu hơn bình thường một chút.",
    day: "18",
    month: "09",
    year: "2023",
    flowerSide: "left" as const,
  },
  {
    photo: photo1,
    title: "Chuyến đi đầu tiên",
    description:
      "Chuyến đi đầu tiên Chuyến đi đầu tiên cùng nhau, mọi thứ đều mới nhưng lại thấy rất thoải mái. Không cần cố gắng gì nhiều, chỉ cần đi cùng nhau là đủ vui rồi.",
    day: "18",
    month: "09",
    year: "2024",
    flowerSide: "right" as const,
  },
  {
    photo: photo3,
    title: "Hẹn ước trọn đời",
    description:
      "Hẹn ước trọn đời Đi với nhau một đoạn đủ dài để hiểu: Ở cạnh nhau là điều mình muốn, không phải vì lý do gì lớn lao, chỉ là đơn giản... hợp nhau và không muốn mất nhau.",
    day: "18",
    month: "09",
    year: "2025",
    flowerSide: "left" as const,
  },
];

export default function JourneyMoment() {
  return (
    <div className="bg-white py-20 px-4">
      {/* Title */}
      <h2 className="font-family-pinyon-script text-6xl md:text-7xl text-[#a12f0c] text-center mb-16 leading-tight">
        Cột mốc
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-330 mx-auto md:p-0">
        {MILESTONES.map((milestone, idx) => (
          <MilestoneCard key={idx} {...milestone} />
        ))}
      </div>
    </div>
  );
}
