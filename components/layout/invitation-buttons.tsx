"use client";

export default function InvitationButtons() {
  const scrollToMessages = () => {
    const el = document.getElementById("messages-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="py-10 lg:py-20 px-4">
      <p className="text-center text-sm lg:text-base mb-5 font-light text-[#5d5d5d]">
        Sự hiện diện của bạn là niềm vinh dự của chúng tôi!
      </p>
      <div className="flex items-center justify-center gap-3 pt-5">
        {/* Mobile: buttons nhỏ hơn nhưng vẫn ngang nhau như thiết kế */}
        <button
          onClick={scrollToMessages}
          className="flex-1 max-w-[180px] lg:flex-none lg:max-w-none lg:px-12 py-4 lg:py-5 rounded-full bg-[#a12f0c] cursor-pointer text-white text-xs lg:text-sm font-bold uppercase tracking-widest hover:bg-[#8a2509] active:scale-95 transition-all duration-200 shadow-md"
        >
          Gửi lời chúc
        </button>
        <button
          className="flex-1 max-w-[180px] lg:flex-none lg:max-w-none lg:px-12 py-4 lg:py-5 rounded-full bg-[#f4dbce] cursor-pointer text-[#a12f0c] text-xs lg:text-sm font-bold uppercase tracking-widest hover:bg-[#eecabb] active:scale-95 transition-all duration-200 shadow-sm"
        >
          Xác nhận tham dự
        </button>
      </div>
    </div>
  );
}
