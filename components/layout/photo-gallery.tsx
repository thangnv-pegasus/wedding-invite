"use client";
import { useState } from "react";
import Image from "next/image";
import {
  ColumnsPhotoAlbum,
  type RenderImageContext,
  type RenderImageProps,
} from "react-photo-album";
import "react-photo-album/columns.css";
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

// StaticImageData có sẵn { src, width, height, blurDataURL }
// — đúng format react-photo-album cần, chỉ cần thêm alt
const ALBUM_PHOTOS = [
  photo_2, photo_3, photo_DTA00001, photo_DTA00069, photo_DTA00090,
  photo_DTA00196, photo_DTA00286, photo_DTA00309, photo_DTA00339,
  photo_DTA00376, photo_DTA00394, photo_DTA00420, photo_DTA00487,
  photo_DTA00516, photo_DTA00524, photo_DTA00534, photo_DTA00564,
  photo_DTA00573, photo_DTA00581, photo_DTA00586, photo_DTA00593,
  photo_DTA00605, photo_DTA00632, photo_DTA00661, photo_DTA00687,
  photo_DTA00707, photo_DTA00817, photo_DTA00825, photo_DTA00835,
  photo_DTA00869, photo_DTA09925, photo_DTA09954,
].map((photo, i) => ({ ...photo, alt: `Ảnh cưới ${i + 1}` }));

// Slides cho lightbox
const slides = ALBUM_PHOTOS.map(({ src }) => ({ src }));



// render.image: dùng Next.js Image với fill + blur placeholder
// photo ở đây là StaticImageData (có blurDataURL) nên placeholder="blur" hoạt động đúng
function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        src={photo}
        alt={alt}
        title={title}
        sizes={sizes}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
        className="object-cover transition-transform duration-300"
      />
    </div>
  );
}

export default function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <div className="py-20 px-4">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Hover scale trên ảnh */
        .react-photo-album--button:hover img {
          transform: scale(1.05);
        }
      `}</style>
      <h2 className="leading-24 text-6xl md:text-7xl mb-10 font-family-pinyon-script text-[#92400e] text-center">
        Album ảnh cưới
      </h2>

      <div className="max-w-5xl mx-auto">
        <ColumnsPhotoAlbum
          photos={ALBUM_PHOTOS}
          columns={(w) => (w < 600 ? 2 : 3)}
          spacing={12}
          defaultContainerWidth={896}
          sizes={{
            size: "calc(min(896px, 100vw - 32px) / 3)",
            sizes: [
              { viewport: "(max-width: 600px)", size: "calc((100vw - 32px) / 2)" },
            ],
          }}
          onClick={({ index }) => setLightboxIndex(index)}
          render={{
            // Next.js Image với fill + blur placeholder
            image: renderNextImage,

            // Áp dụng animation fadeInUp cho tất cả ảnh
            button: ({ style, className, onClick, ...rest }, { index }) => {
              const delay = index * 80;
              return (
                <button
                  onClick={onClick}
                  className={`${className ?? ""} overflow-hidden rounded-xl shadow-lg cursor-pointer`.trim()}
                  style={{
                    ...style,
                    animation: `fadeInUp 0.4s ease forwards`,
                    animationDelay: `${delay}ms`,
                    opacity: 0,
                  }}
                  {...rest}
                />
              );
            },
          }}
        />
      </div>

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
