"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

import flowerCorner from "@/assets/flower-corner.png";
import flowerCornerRight from "@/assets/images/flower-bottom-right-corner.png";
import { supabaseClient } from "@/lib/supabase/client";
import { EMOJIS, SAMPLE_WISHES } from "@/constants";
type MessageItem = { id: number; user_name: string; content: string };

export default function Messages() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showWishes, setShowWishes] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  // ─── Messages list ──────────────────────────────────────────────────────────
  const [messageList, setMessageList] = useState<MessageItem[]>([]);
  const wishesRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fetchMessages = async () => {
    const { data } = await supabaseClient()
      .from("messages")
      .select("id, user_name, content")
      .order("id", { ascending: false });
    if (data) setMessageList(data as MessageItem[]);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name.trim()) {
      setError("Vui lòng nhập tên của bạn.");
      return;
    }
    if (!message.trim()) {
      setError("Vui lòng nhập lời chúc.");
      return;
    }

    setLoading(true);
    try {
      const { error: sbError } = await supabaseClient()
        .from("messages")
        .insert({ user_name: name.trim(), content: message.trim() });

      if (sbError) throw sbError;

      setSuccess(true);
      setName("");
      setMessage("");
      fetchMessages(); // refresh list
    } catch (err) {
      console.error(err);
      setError("Gửi lời chúc thất bại. Vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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

  return (
    <div className="bg-white relative overflow-hidden py-16">
      {/* Flower top-left */}
      <div className="absolute top-0 left-0 w-52 h-52 pointer-events-none">
        <Image
          src={flowerCorner}
          alt="flower corner"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Flower bottom-right */}
      <div className="absolute bottom-0 right-0 w-52 h-52 pointer-events-none">
        <Image
          src={flowerCornerRight}
          alt="flower corner right"
          fill
          className="object-cover object-center"
        />
      </div>

      <section className="max-w-[680px] w-full mx-auto px-6 flex flex-col items-center">
        {/* Title */}
        <h2 className="font-family-pinyon-script text-6xl md:text-7xl text-[#a12f0c] text-center mb-10 leading-tight">
          Sổ lưu bút
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5"
          id="messages-form"
        >
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
                  onClick={() => {
                    setShowWishes((v) => !v);
                    setShowEmoji(false);
                  }}
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
                          idx < SAMPLE_WISHES.length - 1
                            ? "border-b border-[#ece4e0]"
                            : ""
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
                  onClick={() => {
                    setShowEmoji((v) => !v);
                    setShowWishes(false);
                  }}
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

          {/* Error / Success feedback */}
          {error && (
            <div className="w-full px-4 py-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="w-full px-4 py-3 rounded-md bg-green-50 border border-green-200 text-green-700 text-sm text-center">
              🎉 Lời chúc của bạn đã được gửi thành công!
            </div>
          )}

          {/* Submit button */}
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-16 py-4 bg-[#a12f0c] text-white text-sm font-bold uppercase tracking-[3px] rounded-full hover:bg-[#8a2509] active:scale-95 transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Đang gửi...
                </>
              ) : (
                "Gửi lời chúc"
              )}
            </button>
          </div>
        </form>

        {/* Bottom divider */}
        <div className="w-full mt-14 h-px bg-[#d4c4bc]" />

        {/* ─── Messages list ─────────────────────────────────────────── */}
        <div className="w-full mt-0">
          {/* Diamond icon separator */}
          <div className="flex items-center justify-center py-3">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="18,2 34,18 18,34 2,18"
                fill="none"
                stroke="#a12f0c"
                strokeWidth="1.5"
              />
              <polygon
                points="18,8 30,18 18,28 6,18"
                fill="none"
                stroke="#a12f0c"
                strokeWidth="1"
                opacity="0.5"
              />
              <line
                x1="2"
                y1="18"
                x2="34"
                y2="18"
                stroke="#a12f0c"
                strokeWidth="1"
                opacity="0.4"
              />
              <line
                x1="18"
                y1="2"
                x2="18"
                y2="34"
                stroke="#a12f0c"
                strokeWidth="1"
                opacity="0.4"
              />
            </svg>
          </div>

          {/* Scrollable list */}
          <div
            className="w-full max-h-[270px] lg:max-h-[540px] overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#a12f0c transparent",
              // scrollbar
            }}
          >
            {messageList.length === 0 ? (
              <p className="text-center text-[#9d8d85] text-sm py-8">
                Chưa có lời chúc nào. Hãy là người đầu tiên! 💌
              </p>
            ) : (
              messageList.map((msg, idx) => (
                <div
                  key={msg.id}
                  className={`px-5 py-5 ${
                    idx < messageList.length - 1
                      ? "border-b border-dashed border-[#d4c4bc]"
                      : ""
                  }`}
                >
                  <p className="font-semibold text-[#1a1a1a] text-base mb-2">
                    {msg.user_name}
                  </p>
                  <p className="text-sm text-[#7a6a60] leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
