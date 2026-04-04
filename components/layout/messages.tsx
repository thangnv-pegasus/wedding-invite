"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import flowerCorner from "@/assets/flower-corner.png";
import flowerCornerRight from "@/assets/images/flower-bottom-right-corner.png";

// ─── Sample wishes ────────────────────────────────────────────────────────────
const SAMPLE_WISHES = [
  "Chúc mừng hạnh phúc! Chúc hai bạn trăm năm hạnh phúc!",
  "Chúc mừng ngày trọng đại tới hai bạn. Hạnh phúc bền lâu và trọn vẹn nhé!",
  "Chúc mừng hạnh phúc hai bạn. Chúc hai bạn bên nhau đầu bạc răng long, sớm có thiên thần nhỏ nhé!",
  "Chúc đôi uyên ương mãi mãi yêu thương, gia đình hạnh phúc và viên mãn!",
  "Xin gửi đến cô dâu và chú rể những lời chúc tốt đẹp nhất. Chúc hai bạn hạnh phúc dài lâu!",
];

// ─── Emojis ────────────────────────────────────────────────────────────────────
const EMOJIS = [
  "❤️","💕","💖","💗","💓","💞","💝","💘","😍","🥰",
  "😘","😻","🌹","💐","🌸","🌺","✨","🎊","🎉","🎁",
  "🥂","🍾","💒","👰","🤵","💍","🫶","🙏","😊","🥹",
];

export default function Messages() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [showWishes, setShowWishes] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const wishesRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wishesRef.current && !wishesRef.current.contains(e.target as Node))
        setShowWishes(false);
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node))
        setShowEmoji(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const insertWish = (wish: string) => {
    setMessage(wish);
    setShowWishes(false);
    textareaRef.current?.focus();
  };

  const insertEmoji = (emoji: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart ?? message.length;
    const end = ta.selectionEnd ?? message.length;
    const next = message.slice(0, start) + emoji + message.slice(end);
    setMessage(next);
    // Restore cursor after emoji
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(start + emoji.length, start + emoji.length);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, message });
  };

  return (
    <div className="bg-white relative overflow-hidden py-16">
      {/* Flower top-left */}
      <div className="absolute top-0 left-0 w-52 h-52 pointer-events-none">
        <Image src={flowerCorner} alt="flower corner" fill className="object-cover object-center" />
      </div>

      {/* Flower bottom-right */}
      <div className="absolute bottom-0 right-0 w-52 h-52 pointer-events-none">
        <Image src={flowerCornerRight} alt="flower corner right" fill className="object-cover object-center" />
      </div>

      <section className="max-w-[680px] w-full mx-auto px-6 flex flex-col items-center">
        {/* Title */}
        <h2 className="font-family-pinyon-script text-7xl text-[#a12f0c] text-center mb-10 leading-tight">
          Sổ lưu bút
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {/* Name input */}
          <div className="w-full border border-[#c8b8b0] rounded-sm">
            <input
              type="text"
              maxLength={160}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên của bạn (tối đa 160 ký tự) *"
              className="w-full px-5 py-4 text-sm text-[#5a4a42] placeholder-[#9d8d85] bg-white outline-none"
            />
          </div>

          {/* Textarea + icon toolbar */}
          <div className="w-full border border-[#c8b8b0] rounded-sm relative">
            <textarea
              ref={textareaRef}
              maxLength={3000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập lời chúc của bạn (tối đa 3000 ký tự) *"
              rows={6}
              className="w-full px-5 py-4 text-sm text-[#5a4a42] placeholder-[#9d8d85] bg-white outline-none resize-none pb-10"
            />

            {/* Icon buttons */}
            <div className="absolute bottom-3 right-4 flex items-center gap-3">
              {/* Lightbulb — sample wishes */}
              <div className="relative" ref={wishesRef}>
                <button
                  type="button"
                  onClick={() => { setShowWishes(v => !v); setShowEmoji(false); }}
                  className="text-[#9d8d85] hover:text-[#a12f0c] transition-colors duration-150 text-lg leading-none cursor-pointer"
                  title="Lời chúc mẫu"
                >
                  💡
                </button>

                {showWishes && (
                  <div className="absolute bottom-full right-0 mb-2 w-[420px] bg-white border border-[#d4c4bc] rounded shadow-lg z-50 overflow-hidden">
                    {SAMPLE_WISHES.map((wish, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => insertWish(wish)}
                        className={`w-full text-left px-5 py-4 text-sm text-[#3d2e28] hover:bg-[#fbf7f5] transition-colors duration-100 cursor-pointer ${
                          idx < SAMPLE_WISHES.length - 1 ? "border-b border-[#ece4e0]" : ""
                        }`}
                      >
                        {wish}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Smiley — emoji picker */}
              <div className="relative" ref={emojiRef}>
                <button
                  type="button"
                  onClick={() => { setShowEmoji(v => !v); setShowWishes(false); }}
                  className="text-[#9d8d85] hover:text-[#a12f0c] transition-colors duration-150 text-lg leading-none cursor-pointer"
                  title="Chọn emoji"
                >
                  🙂
                </button>

                {showEmoji && (
                  <div className="absolute bottom-full right-0 mb-2 w-[260px] bg-white border border-[#d4c4bc] rounded shadow-lg z-50 p-3 grid grid-cols-10 gap-1">
                    {EMOJIS.map((emoji, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => insertEmoji(emoji)}
                        className="text-xl w-7 h-7 flex items-center justify-center rounded hover:bg-[#f4dbce] transition-colors duration-100 cursor-pointer"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              className="px-16 py-4 bg-[#a12f0c] text-white text-sm font-bold uppercase tracking-[3px] rounded-full hover:bg-[#8a2509] active:scale-95 transition-all duration-200 shadow-sm cursor-pointer"
            >
              Gửi lời chúc
            </button>
          </div>
        </form>

        {/* Bottom divider */}
        <div className="w-full mt-14 h-px bg-[#d4c4bc]" />
      </section>
    </div>
  );
}
