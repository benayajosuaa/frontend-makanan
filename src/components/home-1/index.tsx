import { Lilita_One, Patrick_Hand } from "next/font/google";

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

export default function FirstHomePage() {
  return (
    <div className={patrick.className}>
      {/* Lebar & tinggi mengikuti ukuran layar */}
      <div className="relative h-dvh w-full overflow-hidden">
        {/* Gambar background */}
        <img
          src="/asset/makanan-home.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(113,69,33,0.4),rgba(113,69,33,0.05))]"
        />

        {/* Konten */}
        <div className="absolute bottom-20 left-6 z-10 flex flex-col gap-y-6 text-white sm:bottom-40 sm:left-15">
          {/* Judul */}
          <h1 className={`${lilita.className} text-4xl sm:text-6xl`}>
            MAKANAN TERBAIK <br /> UNTUKMU !
          </h1>

          {/* Penjelasan */}
          <p className="text-xl sm:text-2xl">
            Pastikan bahwa perutmu kosong <br /> sebelum memesan makanan kami
          </p>

          {/* Button */}
          <div>
            <button
              type="button"
              className="
                inline-flex items-center justify-center
                cursor-pointer rounded-full
                border-2 border-[#714521]
                bg-[#FFF5E7] text-[#714521]
                px-10 py-2 sm:px-28
                text-2xl font-bold tracking-wide
                shadow-[3px_4px_0_0_#714521]
                transition-all duration-150
                hover:bg-[#F5E5D0]
                active:translate-x-0.75
                active:translate-y-1
                active:shadow-none
                focus-visible:outline-2
                focus-visible:outline-offset-8
                focus-visible:outline-[#714521]
              "
            >
              PESAN DISINI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}