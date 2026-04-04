import AboutStory from "@/components/layout/about-story";
import AvatarCouple from "@/components/layout/avatar-couple";
import Banner from "@/components/layout/banner";
import EventRoadmap from "@/components/layout/event-roadmap";
import Footer from "@/components/layout/footer";
import GiveMoney from "@/components/layout/give-money";
import Header from "@/components/layout/header";
import JourneyMoment from "@/components/layout/journey-moment";
import Messages from "@/components/layout/messages";
import PhotoGallery from "@/components/layout/photo-gallery";
import Timer from "@/components/layout/timer";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="pt-16">
        <Banner />
        <div className="text-center py-20">
          <p className="font-family-pinyon-script text-5xl text-slate-600 font-medium mb-5">
            Trân trọng kính mời
          </p>
          <p className="text-base my-4 font-normal text-[#5d5d5d]">
            Một lời chúc của bạn chắc chắn sẽ làm cho đám cưới của chúng mình có
            thêm một niềm hạnh phúc!
          </p>
        </div>
        <Timer />
        <div className="py-20">
          <p className="text-center text-base mb-5 font-light text-[#5d5d5d]">
            Sự hiện diện của bạn là niềm vinh dự của chúng tôi!
          </p>
          <div className="flex justify-center items-center gap-6 pt-5 text-lg">
            <button className="px-12 py-5 rounded-full bg-[#a12f0c] cursor-pointer text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#a03318] transition-colors duration-200 shadow-md">
              Gửi lời chúc
            </button>
            <button className="px-12 py-5 rounded-full bg-[#f4dbce] cursor-pointer text-[#a12f0c] text-sm font-semibold uppercase tracking-widest hover:bg-[#eecabb] transition-colors duration-200 shadow-sm">
              Xác nhận tham dự
            </button>
          </div>
        </div>
        <AvatarCouple />
        <PhotoGallery />
        <AboutStory />
        <JourneyMoment />
        <EventRoadmap />
        <div className="h-20"></div>
        <Messages />
        <GiveMoney />
        <Footer />
      </main>
    </div>
  );
}
