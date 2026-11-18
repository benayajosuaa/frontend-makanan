"use client";
import { useRef } from "react";
import { Lilita_One, Patrick_Hand } from "next/font/google";
import { Anton } from "next/font/google";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

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

const buttonClass = `
  cursor-pointer rounded-2xl border border-[#714521]
  bg-[#E8D3BB] px-6 py-3 text-lg text-[#714521]
  transition-colors duration-150
  hover:bg-[#DCC1A3] active:bg-[#CFAC88]
  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#714521]
`;


const reviews = [
  {
    id: 1,
    rating: 5,
    text: "Satenya empuk, bumbu kacangnya berasa, dan porsinya pas. Rasanya seperti masakan rumah yang bikin pengen pesan lagi!",
    name: "Nadia",
    origin: "Warga Sleman",
  },
  {
    id: 2,
    rating: 5,
    text: "Gudegnya manis pas, kreceknya pedas nendang. Cocok buat sarapan sebelum kerja.",
    name: "Bima",
    origin: "Warga Bantul",
  },
  {
    id: 3,
    rating: 4,
    text: "Sambal terasinya juara! Cuma pengen porsi nasinya sedikit lebih banyak.",
    name: "Sari",
    origin: "Warga Kota Jogja",
  },
  {
    id: 4,
    rating: 4.6,
    text: "Ikan gurame nya tidak amis sama sekali dan bumbunya medok pol",
    name: "Dono",
    origin: "Warga Kota Surabaya",
  },
];


export default function SecondHomePage(){
    const sliderRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

        const firstCard = slider.firstElementChild as HTMLElement;
        const distance = firstCard.offsetWidth + 20;

        slider.scrollBy({ left: direction * distance, behavior: "smooth" });
    };

    return(
        <div className="p-15 pt-30 pb-30">
            <div>
                <div className="flex flex-col gap-y-5">
                    {/* Judul */}
                    <div className={lilita.className}>
                        <h1 className="text-3xl text-[#714521] ">
                            APA KATA MEREKA  <br/> TENTANG MAKANAN KAMI
                        </h1>
                    </div>
                    <div className={patrick.className}>
                        <h3 className="text-xl">Cerita dari meja makan mereka, tentang rasa yang bikin ingin kembali.</h3>
                    </div>



                    {/* Card */}
                    <div
                        ref={sliderRef}
                        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden">
                        {reviews.map((review) => (
                            <div
                            key={review.id}
                            className={`
                                ${patrick.className}
                                flex min-h-70 w-80 sm:w-96 shrink-0 snap-start flex-col
                                rounded-3xl border border-[#714521] p-6 text-[#714521]
                            `}
                            >
                            <p className={`${anton.className} text-lg`}>{review.rating} / 5</p>

                            <div className="mt-6 flex-1 text-xl leading-relaxed">
                                “{review.text}”
                            </div>

                            <div className="mt-8">
                                <p className="text-xl">{review.name}</p>
                                <p className="text-base opacity-70">{review.origin}</p>
                            </div>
                            </div>
                        ))}
                    </div>



                    {/* Disini Button */}
                    <div className="flex gap-3">
                    <button
                        type="button"
                        aria-label="Sebelumnya"
                        className={buttonClass}
                        onClick={() => scroll(-1)}
                    >
                        <IoIosArrowBack aria-hidden="true" />
                    </button>

                    <button
                        type="button"
                        aria-label="Berikutnya"
                        className={buttonClass}
                        onClick={() => scroll(1)}
                    >
                        <IoIosArrowForward aria-hidden="true" />
                    </button>
                    </div>
                </div>  
            </div>
        </div>
    )
}