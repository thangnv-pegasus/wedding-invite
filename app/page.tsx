import AboutStory from "@/components/layout/about-story";
import AvatarCouple from "@/components/layout/avatar-couple";
import Banner from "@/components/layout/banner";
import EventRoadmap from "@/components/layout/event-roadmap";
import Footer from "@/components/layout/footer";
import GiveMoney from "@/components/layout/give-money";
import Header from "@/components/layout/header";
import InvitationButtons from "@/components/layout/invitation-buttons";
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
        <div className="text-center py-20 px-4">
          <p className="font-family-pinyon-script text-5xl text-neutral-600 font-medium mb-5">
            Trân trọng kính mời
          </p>
          <p className="text-base my-4 font-normal text-[#5d5d5d]">
            Một lời chúc của bạn chắc chắn sẽ làm cho đám cưới của chúng mình có
            thêm một niềm hạnh phúc!
          </p>
        </div>
        <Timer />
        <InvitationButtons />
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
