import Image from "next/image";
import bannerBig from "@/assets/images/banner-big.jpg";
import flowerBottomRight from "@/assets/images/flower-bottom-right-corner.png";

export default function AboutStory() {
  return (
    <div className="bg-[#fbf7f5] relative overflow-hidden py-20">
      {/* LOVE STORY vertical text on the left */}
      <p className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[45%] text-6xl md:text-[110px] font-family-prata text-[#f4dbce] rotate-90 tracking-wider select-none whitespace-nowrap">
        LOVE STORY
      </p>

      {/* Main content */}
      <section className="max-w-[1320px] w-full mx-auto flex flex-col items-center px-6">
        {/* Title */}
        <h2 className="font-family-pinyon-script text-6xl md:text-7xl text-[#a12f0c] text-center leading-tight mb-6">
          Chuyện chúng mình
        </h2>

        {/* Description */}
        <p className="text-sm text-center text-[#7a6a60] leading-relaxed max-w-2xl mb-12">
          Chúng tôi đã có những khoảnh khắc quan trọng nhất trong cuộc đời mình
          với yêu thích. Hỏi là chúng người thân yêu. Ngày cưới không thể là sự
          khởi đầu của một hành trình mới và mọi lý do đặp để chúng tôi cùng
          nhau học tự tin nay son những ký niệm hạng nhất đến.
        </p>

        {/* Arch image with flower decoration */}
        <div className="relative inline-block">
          {/* Arch frame with border */}
          <div className="max-w-[520px] w-full h-auto border border-[#a12f0c] rounded-t-full overflow-hidden relative">
            <Image
              src={bannerBig}
              alt="Chuyện chúng mình"
              className="w-full h-auto object-cover object-center"
              style={{ height: "620px" }}
            />
          </div>

          {/* Flower decoration bottom right */}
          <div className="absolute -bottom-8 -right-16 w-56 h-auto pointer-events-none">
            <Image
              src={flowerBottomRight}
              alt="flower decoration"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
