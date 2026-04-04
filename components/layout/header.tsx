import { Heart } from "lucide-react";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";

export default function Header() {
  return (
    <header className="shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] h-16 fixed top-0 left-0 right-0 z-20 flex items-center bg-white">
      <section className="max-w-[1320px] w-full mx-auto relative flex justify-center items-center">
        <div className="absolute left-0 h-12.5 w-55">
          <Image
            src={logo}
            alt="logo"
            className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover object-center"
            fill
            fetchPriority="high"
            preload
          />
        </div>
        <NameLogo />
      </section>
    </header>
  );
}

const NameLogo = () => {
  return (
    <div className="flex items-center text-primary fill-primary gap-x-1 font-medium text-2xl select-none">
      A <Heart /> P
    </div>
  );
};
