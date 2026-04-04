import Image from "next/image";
import flowerCorner from "@/assets/flower-corner.png";
import bannerBig from "@/assets/images/banner-big.jpg";
import bannerSmall from "@/assets/images/banner-small.jpg";
import flower from "@/assets/flower.png";

export default function Banner() {
  return (
    <div className="min-h-200 bg-[rgb(251_247_245)] relative py-20">
      <div className="absolute top-0 left-0 w-75 h-75">
        <Image
          src={flowerCorner}
          alt="flower corner"
          fill
          className="object-cover object-center"
          fetchPriority="high"
          priority
        />
      </div>
      <section className="w-330 mx-auto pt-15 flex gap-x-20">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col text-center pt-31">
            <h2 className="uppercase text-center text-2xl font-medium text-gray-500 font-family-prata">
              Chúng tôi cưới
            </h2>
            <div className="text-[#A12F0C] text-[60px] font-medium font-family-pinyon-script pt-10 pb-15">
              <div>Ngọc Anh</div>
              <span>&</span>
              <div>Mai Phương</div>
            </div>
          </div>
          <div className="text-[#F4DBCE] text-[80px] font-medium">
            22 | 11 | 2024
          </div>
        </div>
        <div>
          <BannerImage />
        </div>
      </section>
    </div>
  );
}

const BannerImage = () => {
  return (
    <div className="min-w-150">
      <div className="relative">
        <div className="w-[495px] h-auto border border-solid border-[#A12F0C] rounded-t-full">
          <Image
            src={bannerBig}
            alt="banner big"
            className="w-full h-auto object-cover object-center rounded-t-full"
            fetchPriority="high"
            priority
          />
        </div>
        <div className="absolute bottom-0 -right-1/5 w-75 h-auto border-2 border-solid border-[#A12F0C] rounded-t-full">
          <Image
            src={bannerSmall}
            alt="banner small"
            className="w-full h-auto object-cover object-center rounded-t-full"
          />
          <div className="absolute top-full right-0 w-64 h-auto -translate-y-1/3 translate-x-1/2">
            <Image
              src={flower}
              alt="flower"
              className="w-full h-auto object-cover object-center"
              fetchPriority="high"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};
