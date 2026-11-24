"use client";
import { Lilita_One, Patrick_Hand } from "next/font/google";
import { Anton } from "next/font/google";


const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

const lilita = Lilita_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lilita",
  display: "swap",
});

const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-patrick",
  display: "swap",
});


export default function FifthHomePage() {
  return (
    <section className={lilita.className}>
      <div className="relative h-80 overflow-hidden sm:h-96">
        {/* Layer 1: gambar */}
        <img
          src="/asset/makanan-home5.png"
          alt="Aneka makanan"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Layer 2: overlay flat */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#714521]/50"
        />

        {/* Layer 3: konten */}
        <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-10">
          <h2 className="text-3xl tracking-wide text-white sm:text-4xl">
            LIHAT MAKANAN-MU
          </h2>

          <button
            type="button"
            className="
              self-end inline-flex items-center justify-center
              cursor-pointer rounded-full
              border-2 border-[#714521]
              bg-[#FFF5E7] text-[#714521]
              px-10 py-2 sm:px-28 max-xl:max-w-full max-sm:px-8 max-sm:text-xl max-sm:min-h-11
              text-2xl tracking-wide
              shadow-[3px_4px_0_0_#714521]
              transition-all duration-150
              hover:bg-[#F5E5D0]
              active:translate-x-0.75 active:translate-y-1 active:shadow-none
              focus-visible:outline-2 focus-visible:outline-offset-8
              focus-visible:outline-[#714521]
            "
          >
            PESAN DISINI
          </button>
        </div>
      </div>
    </section>
  )
}