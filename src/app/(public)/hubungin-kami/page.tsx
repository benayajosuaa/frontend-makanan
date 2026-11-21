import { Lilita_One, Patrick_Hand } from "next/font/google";
import { Anton } from "next/font/google";
import Link from "next/link";

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


export default function HubungiKami(){
    return (
        <div className={patrick.className}>
            <div className="flex flex-row">
                <div className="basis-4/10">
                    <img src="asset/rumahmakanan2.png" className="h-screen object-cover" alt="" />
                </div>
                <div className="basis-6/10">
                    <div className="p-15 h-screen bg-[#FFF5E7] text-[#714521]">
                        <div className="flex flex-col gap-y-10">
                            <div>
                                <Link href="/" className="opacity-50 underline hover:opacity-80">
                                    Balik Ke Beranda Utama
                                </Link>
                            </div>


                            <div className={lilita.className}>
                                <h1 className="text-3xl">HUBUNGIN KITA</h1>
                            </div>

                            
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Nama */}
                                <div className="flex flex-col gap-y-2">
                                    <label htmlFor="nama" className={`${anton.className} text-lg`}>
                                    NAMA
                                    </label>
                                    <input
                                    id="nama"
                                    type="text"
                                    placeholder="cth: Fronli Benaya"
                                    className="
                                        w-full rounded-lg
                                        border-2 border-[#714521]/40
                                        bg-transparent text-[#714521]
                                        px-5 py-3
                                        placeholder:text-[#714521]/50
                                        transition-colors
                                        focus:outline-none
                                        focus:border-[#714521]
                                        focus:ring-2 focus:ring-[#714521]/20
                                    "
                                    />
                                </div>

                                {/* Keperluan */}
                                <div className="flex flex-col gap-y-2">
                                    <label htmlFor="email" className={`${anton.className} text-lg`}>
                                    KEPERLUAN
                                    </label>
                                    <input
                                    id="keperluan"
                                    type="te"
                                    placeholder="Mau pesan makanan partai besar"
                                    className="
                                        w-full rounded-lg
                                        border-2 border-[#714521]/40
                                        bg-transparent text-[#714521]
                                        px-5 py-3
                                        placeholder:text-[#714521]/50
                                        transition-colors
                                        focus:outline-none
                                        focus:border-[#714521]
                                        focus:ring-2 focus:ring-[#714521]/20
                                    "
                                    />
                                </div>
                            </div>
                                                            
                            <div>
                                <div className="flex flex-col gap-y-2">
                                    <label htmlFor="nama" className={`${anton.className} text-lg`}>
                                        PESAN
                                    </label>
                                    <textarea
                                        id="pesan"
                                        name="pesan"
                                        wrap="soft"
                                        placeholder="Ceritakan detail pesananmu di sini..."
                                        className="
                                        h-70 w-full resize-none rounded-lg
                                        border-2 border-[#714521]/40
                                        bg-transparent px-5 py-3 text-left text-[#714521]
                                        placeholder:text-[#714521]/50
                                        transition-colors
                                        focus:border-[#714521] focus:outline-none
                                        focus:ring-2 focus:ring-[#714521]/20
                                        "
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="
                                        inline-flex items-center justify-center
                                        cursor-pointer rounded-full
                                        border-2 border-[#714521]
                                        bg-[#FFF5E7] text-[#714521]
                                        px-6 py-2 sm:px-10
                                        text-sm font-bold tracking-wide
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
            </div>
        </div>
    )
}