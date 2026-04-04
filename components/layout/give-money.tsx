import Image from "next/image";
import couplePhoto from "@/assets/photos/DTA00001.jpg";
import flowerLeft from "@/assets/images/flower-bottom-left-corner.png";
import flowerRight from "@/assets/images/flower-bottom-right-corner.png";
import qrHusband from "@/assets/qr/qr-husband.jpg";
import qrWife from "@/assets/qr/qr-wife.jpg";

interface BankCardProps {
  side: "left" | "right" | "center";
  title: string;
  bankName: string;
  accountOwner: string;
  accountNumber: string;
  qrImage: any;
}

function BankCard({
  side,
  title,
  bankName,
  accountOwner,
  accountNumber,
  qrImage,
}: BankCardProps) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${accountNumber}&color=000000&bgcolor=ffffff`;

  const qrImg = (
    <div className="w-[110px] h-[110px] border border-[#c8b8b0] rounded-sm overflow-hidden shrink-0 relative">
      <Image
        src={qrImage}
        alt={`QR ${accountOwner}`}
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  );

  const renderSide = (side: string) => {
    if (side === "left") {
      return "text-left";
    }
    if (side === "right") {
      return "text-right";
    }

    return "text-center";
  };

  const generateFlow = (side: string) => {
    if (side === "left") {
      return "flex-row";
    }
    if (side === "right") {
      return "flex-row-reverse";
    }

    return "justify-center";
  };

  const info = (
    <div
      className={`font-family-prata flex flex-col gap-2 text-base text-[#3d2e28] ${side === "left" ? "text-left" : "text-right"}`}
    >
      <span className="">{bankName}</span>
      <span>{accountOwner}</span>
      <span className="tracking-wide">{accountNumber}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 max-w-[280px] w-full mx-auto font-family-prata text-base">
      {/* Title */}
      <h3
        className={`font-normal text-2xl text-[#a12f0c] leading-tight ${renderSide(
          side,
        )}`}
      >
        {title}
      </h3>

      {/* QR + Info row */}
      <div className={`flex items-center gap-5 ${generateFlow(side)}`}>
        {qrImg}
        {info}
      </div>
    </div>
  );
}

export default function GiveMoney() {
  return (
    <div className="relative overflow-hidden">
      {/* ── Split background ── */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        <div className="h-1/2 bg-[#fbf7f5]" />
        <div className="h-1/2 bg-white" />
      </div>

      {/* ── Flower bottom-left corner ── */}
      <div className="absolute bottom-0 left-0 w-56 h-auto pointer-events-none">
        <Image
          src={flowerLeft}
          alt="flower left"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* ── Flower bottom-right corner ── */}
      <div className="absolute bottom-0 right-0 w-56 h-auto pointer-events-none">
        <Image
          src={flowerRight}
          alt="flower right"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* ── Main 3-column layout ── */}
      <div className="relative max-w-330 mx-auto py-12 flex items-end justify-center gap-8">
        {/* Left — Chú rể */}
        <div className="flex-1 justify-end pb-20 hidden md:flex">
          <BankCard
            side="left"
            title="Mừng cưới đến chú rể"
            bankName="Ngân hàng A"
            accountOwner="Chú rể"
            accountNumber="123456789"
            qrImage={qrHusband}
          />
        </div>

        {/* Center — Arch couple photo */}
        <div className="flex-1 p-10 md:p-0">
          <div className="w-[400px] max-w-full h-auto border-2 border-[#a12f0c] rounded-t-full overflow-hidden shadow-lg">
            <Image
              src={couplePhoto}
              alt="Cặp đôi"
              className="w-full h-auto object-cover object-top"
            />
          </div>
        </div>

        {/* Right — Cô dâu */}
        <div className="flex-1 md:flex hidden justify-start pb-20">
          <BankCard
            side="right"
            title="Mừng cưới đến cô dâu"
            bankName="Ngân hàng B"
            accountOwner="Cô dâu"
            accountNumber="987654321"
            qrImage={qrWife}
          />
        </div>
      </div>
      <div className="md:hidden grid grid-cols-1 gap-10 pb-10 relative z-30 items-center justify-center">
        <BankCard
          side="center"
          title="Mừng cưới đến chú rể"
          bankName="Techcombank"
          accountOwner="Nguyễn Ngọc Anh"
          accountNumber="88888824092003"
          qrImage={qrHusband}
        />
        <BankCard
          side="center"
          title="Mừng cưới đến cô dâu"
          bankName="MB Bank"
          accountOwner="Nguyễn Mai Phương"
          accountNumber="0969054526"
          qrImage={qrWife}
        />
      </div>
    </div>
  );
}
