import Image from "next/image";
import wifeAvatar from "@/assets/avatars/wife-avatar.jpg";
import flowerBottomAvatar from "@/assets/images/flower-left-bot-avatar.png";
import flowerBottomRightAvatar from "@/assets/images/flower-right-bot-avatar.png";

export default function AvatarCouple() {
  return (
    <div className="min-h-225 bg-[#fbf7f5] relative">
      <p className="absolute left-0 top-50 -translate-x-2/5 md:text-[110px] text-6xl font-family-prata text-[#f4dbce] rotate-90 tracking-wider select-none">
        GROOM
      </p>
      <p className="absolute right-0 bottom-50 translate-x-2/5 md:text-[110px] text-6xl font-family-prata text-[#f4dbce] rotate-270 tracking-wider select-none">
        BRIDE
      </p>
      <section className="max-w-330 mx-auto py-20">
        <div className="flex justify-center items-center gap-10 px-30 flex-col md:flex-row">
          <div className="flex-1">
            <div className="w-full h-auto relative rounded-t-full">
              <Image
                src={wifeAvatar}
                alt="wife"
                className="w-full h-auto object-cover object-center rounded-t-full"
              />
              <div className="absolute w-55 h-55 bottom-0 left-0 translate-y-1/2 -translate-x-1/2">
                <Image
                  src={flowerBottomAvatar}
                  alt="flower"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="text-center mt-10">
              <p className="text-2xl font-family-prata font-light text-gray-500">
                Chú rể
              </p>
              <p className="font-family-pinyon-script text-7xl mt-5 text-[#a12f0c]  ">
                Ngọc Anh
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="w-full h-auto relative rounded-t-full">
              <Image
                src={wifeAvatar}
                alt="wife"
                className="w-full h-auto object-cover object-center rounded-t-full"
              />
              <div className="absolute w-55 h-55 bottom-0 right-0 translate-y-1/2 translate-x-1/2">
                <Image
                  src={flowerBottomRightAvatar}
                  alt="flower"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="text-center mt-10">
              <p className="text-2xl font-family-prata font-light text-gray-500">
                Cô dâu
              </p>
              <p className="font-family-pinyon-script text-7xl mt-5 text-[#a12f0c]  ">
                Mai Phương
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
