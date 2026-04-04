"use client";
import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Import all photos statically
import photo_2 from "@/assets/photos/2.jpg";
import photo_3 from "@/assets/photos/3.jpg";
import photo_DTA00001 from "@/assets/photos/DTA00001.jpg";
import photo_DTA00069 from "@/assets/photos/DTA00069.jpg";
import photo_DTA00090 from "@/assets/photos/DTA00090.jpg";
import photo_DTA00196 from "@/assets/photos/DTA00196.jpg";
import photo_DTA00286 from "@/assets/photos/DTA00286.jpg";
import photo_DTA00309 from "@/assets/photos/DTA00309.jpg";
import photo_DTA00339 from "@/assets/photos/DTA00339.jpg";
import photo_DTA00376 from "@/assets/photos/DTA00376.jpg";
import photo_DTA00394 from "@/assets/photos/DTA00394.jpg";
import photo_DTA00420 from "@/assets/photos/DTA00420.jpg";
import photo_DTA00487 from "@/assets/photos/DTA00487.jpg";
import photo_DTA00516 from "@/assets/photos/DTA00516.jpg";
import photo_DTA00524 from "@/assets/photos/DTA00524.jpg";
import photo_DTA00534 from "@/assets/photos/DTA00534.jpg";
import photo_DTA00564 from "@/assets/photos/DTA00564.jpg";
import photo_DTA00573 from "@/assets/photos/DTA00573.jpg";
import photo_DTA00581 from "@/assets/photos/DTA00581.jpg";
import photo_DTA00586 from "@/assets/photos/DTA00586.jpg";
import photo_DTA00593 from "@/assets/photos/DTA00593.jpg";
import photo_DTA00605 from "@/assets/photos/DTA00605.jpg";
import photo_DTA00632 from "@/assets/photos/DTA00632.jpg";
import photo_DTA00661 from "@/assets/photos/DTA00661.jpg";
import photo_DTA00687 from "@/assets/photos/DTA00687.jpg";
import photo_DTA00707 from "@/assets/photos/DTA00707.jpg";
import photo_DTA00817 from "@/assets/photos/DTA00817.jpg";
import photo_DTA00825 from "@/assets/photos/DTA00825.jpg";
import photo_DTA00835 from "@/assets/photos/DTA00835.jpg";
import photo_DTA00869 from "@/assets/photos/DTA00869.jpg";
import photo_DTA09925 from "@/assets/photos/DTA09925.jpg";
import photo_DTA09954 from "@/assets/photos/DTA09954.jpg";

const ALL_PHOTOS = [
  photo_2,
  photo_3,
  photo_DTA00001,
  photo_DTA00069,
  photo_DTA00090,
  photo_DTA00196,
  photo_DTA00286,
  photo_DTA00309,
  photo_DTA00339,
  photo_DTA00376,
  photo_DTA00394,
  photo_DTA00420,
  photo_DTA00487,
  photo_DTA00516,
  photo_DTA00524,
  photo_DTA00534,
  photo_DTA00564,
  photo_DTA00573,
  photo_DTA00581,
  photo_DTA00586,
  photo_DTA00593,
  photo_DTA00605,
  photo_DTA00632,
  photo_DTA00661,
  photo_DTA00687,
  photo_DTA00707,
  photo_DTA00817,
  photo_DTA00825,
  photo_DTA00835,
  photo_DTA00869,
  photo_DTA09925,
  photo_DTA09954,
];

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 3;

export default function PhotoGallery() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [animateFrom, setAnimateFrom] = useState(INITIAL_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const visiblePhotos = ALL_PHOTOS.slice(0, visibleCount);
  const hasMore = visibleCount < ALL_PHOTOS.length;
  // Preload next batch
  const preloadPhotos = ALL_PHOTOS.slice(
    visibleCount,
    visibleCount + LOAD_MORE_COUNT,
  );

  const slides = ALL_PHOTOS.map((photo) => ({
    src: typeof photo === "string" ? photo : photo.src,
  }));

  const handleLoadMore = () => {
    setAnimateFrom(visibleCount);
    setVisibleCount((prev) =>
      Math.min(prev + LOAD_MORE_COUNT, ALL_PHOTOS.length),
    );
  };

  return (
    <div className="py-20 px-4">
      <h2 className="leading-24 text-6xl md:text-7xl mb-10 font-family-pinyon-script text-[#92400e] text-center">
        Album ảnh cưới
      </h2>
      {/* Keyframe for fade-in animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {/* Columns */}
      <div className="max-w-5xl mx-auto md:columns-3 columns-2 gap-3">
        {visiblePhotos.map((src, idx) => {
          const isNew = idx >= animateFrom;
          const delay = isNew ? (idx - animateFrom) * 80 : 0;
          return (
            <div
              key={idx}
              className="break-inside-avoid mb-3 overflow-hidden rounded-xl cursor-pointer group shadow-lg relative"
              style={
                isNew
                  ? {
                      animation: `fadeInUp 0.4s ease forwards`,
                      animationDelay: `${delay}ms`,
                      opacity: 0,
                    }
                  : undefined
              }
              onClick={() => setLightboxIndex(idx)}
            >
              <Image
                src={src}
                alt={`Ảnh cưới ${idx + 1}`}
                loading={idx < INITIAL_COUNT ? "eager" : "lazy"}
                className="w-full h-auto block transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          );
        })}
      </div>

      {/* Preload next batch */}
      {preloadPhotos.map((src, idx) => (
        <Image
          key={`preload-${idx}`}
          src={src}
          alt=""
          aria-hidden
          className="hidden"
        />
      ))}

      {/* Load more button */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="px-10 py-4 cursor-pointer rounded-full border border-[#a12f0c] text-[#a12f0c] text-sm font-semibold uppercase tracking-widest hover:bg-[#a12f0c] hover:text-white transition-colors duration-200"
          >
            Xem thêm
          </button>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
      />
    </div>
  );
}
