"use client";
import { Lilita_One, Patrick_Hand } from "next/font/google";
import { Anton } from "next/font/google";
import { useState } from "react";


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

const faq_makanan = [
  {
    id: "faq-01",
    question: "Gimana cara pesan makanan di sini?",
    answer:
      "Gampang banget! Pilih menu favoritmu di halaman Menu, masukkan ke keranjang, lalu lanjut ke checkout. Setelah bayar, pesananmu langsung kami proses.",
  },
  {
    id: "faq-02",
    question: "Harus punya akun dulu buat pesan?",
    answer:
      "Kamu bebas lihat-lihat menu dan isi keranjang tanpa akun. Tapi sebelum checkout, kamu perlu masuk atau daftar pakai email dulu, supaya pesananmu tercatat dan bisa dipantau.",
  },
  {
    id: "faq-03",
    question: "Kalau aku login, isi keranjangku hilang nggak?",
    answer:
      "Tenang, nggak hilang kok. Menu yang sudah kamu masukkan ke keranjang tetap tersimpan setelah kamu masuk ke akunmu.",
  },
  {
    id: "faq-04",
    question: "Bisa bayar pakai apa saja?",
    answer:
      "Pembayaran menggunakan QRIS lewat Midtrans. Cukup scan kodenya pakai aplikasi e-wallet atau mobile banking favoritmu, seperti GoPay, OVO, DANA, ShopeePay, atau aplikasi bank.",
  },

];

export default function FourHomePage(){
    const [openId, setOpenId] = useState<string | null>()

    const toggle = (id: string) => {
        setOpenId((prev) => (prev === id ? null : id))
    }



    return (
        <div>
            <div className={patrick.className}>
                <div className="p-20 pt-30 pb-30 max-xl:px-10 max-xl:py-20 max-sm:px-6 max-sm:py-14">
                    <div className="flex flex-col gap-y-10">
                        {/* Title */}
                        <div className={lilita.className}>
                            <h1 className="text-[#714521] text-3xl">YANG SERING DITANYAKAN</h1>
                        </div>


                        {/* FAQ */}
                        <div className="space-y-4">
                            {
                                faq_makanan.map((item) => {
                                    const isOpen = openId === item.id;

                                    return(
                                        <div
                                            key={item.id}
                                            className="overflow-hidden p-3 border-t border-[#5b3a22] "
                                        >
                                            
                                            <button
                                                type="button"
                                                onClick={() => toggle(item.id)}
                                                aria-expanded={isOpen}
                                                aria-controls={`${item.id}-answer`}
                                                className="flex w-full items-center justify-between gap-4 max-xl:min-h-11 text-left font-semibold text-[#5b3a22]"
                                            >
                                                <span className="text-2xl max-sm:text-xl max-xl:wrap-anywhere">
                                                    <span className={anton.className}>
                                                        {item.question}
                                                    </span>
                                                </span>

                                                <span
                                                className={`text-2xl transition-transform duration-300 ${
                                                    isOpen ? "rotate-45" : ""
                                                }`}
                                                >
                                                +
                                                </span>
                                            </button>

                                            {/* animasi buka-tutup pakai grid-rows */}
                                            <div
                                                id={`${item.id}-answer`}
                                                className={`grid transition-all duration-300 ease-in-out ${
                                                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                                }`}
                                            >
                                                <div className="overflow-hidden pt-3">
                                                <p className="text-[#5b3a22]/80 text-3xl max-xl:text-2xl max-sm:text-xl max-xl:wrap-anywhere">{item.answer}</p>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                    </div>
                </div>   
            </div>
        </div>
    )
}