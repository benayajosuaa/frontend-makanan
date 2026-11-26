"use client"
import { anton, lilita, patrick } from "@/components/font/font";
import { HiPencilSquare } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";


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

export default function DashboardAdmin() {
  return (
    <div className={patrick.className}>
      <div className="space-y-6 text-[#714521]">
        {/* Header */}
        <div className={lilita.className}>
          <h1 className="text-3xl font-bold text-[#714521]">
            FAQ Toko
          </h1>
          <span className={anton.className}>
            <p className="mt-2 text-[#714521]">
              Kostumisasi pertanyaan-pertanyaan yang mungkin akan ditanyakan
            </p>
          </span>
        </div>
        
        {/* Edit Section */}
        <div>
          <div className="border p-4 rounded-lg">
            <div className="flex flex-row gap-x-10">
              <div className="w-full flex flex-col gap-y-4">
                  <div className="text-xl font-semibold">
                    <h1>Tambah FAQ toko mu !</h1>
                  </div>

                  <div className="flex flex-col gap-y-10 w-full">
                    <div className="w-full flex flex-col ">
                      {/* Pertanyaan */}
                      <div className="">
                        <h1 className="opacity-80">Masukan Pertanyaan</h1>
                      </div>
                      <textarea
                        
                        onInput={(e) => {
                          const target = e.currentTarget;
                          target.style.height = "auto";
                          target.style.height = `${target.scrollHeight}px`;
                        }}
                        className="w-full min-w-0 resize-none overflow-hidden border-b bg-[#FFF5E7] p-2 focus:outline-none"
                        placeholder="Apakah semua menu di restoran ini 100% Halal?"
                      />
                      {/* jawaban */}
                      <div className="pt-4">
                        <h1 className="opacity-80">Masukan Jawaban</h1>
                      </div>
                      <textarea
                        
                        onInput={(e) => {
                          const target = e.currentTarget;
                          target.style.height = "auto";
                          target.style.height = `${target.scrollHeight}px`;
                        }}
                        className="w-full min-w-0 resize-none overflow-hidden border-b bg-[#FFF5E7] p-2 focus:outline-none"
                        placeholder="Ya, seluruh bahan baku, proses pengolahan, hingga peralatan masak kami telah tersertifikasi Halal dan bebas dari kandungan babi maupun alkohol"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button className="bg-[#714521] gap-x-4 flex flex-row justify-center items-center  text-[#FFF5E7] px-7 py-2 rounded-xl">
                        <span>Tambahkan</span>
                        <span><FaPlus /></span>
                      </button>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* Fetch Menu */}
        <div className={anton.className}>
          <h1 className="text-lg">Pertanyaan kamu saat ini !</h1>
        </div>

        <div>
          <div className="flex flex-col gap-x-10 gap-y-2">
            {
              faq_makanan.map((items) => {
                return(
                  <div className="border rounded-2xl">
                    <div className="flex flex-row">
                      {/* FAQ */}
                      <div className="basis-9/10 flex flex-col p-3 " >
                        <div className=" w-full">
                          <h1 className="text-xl">pertanyaan: {items.question}</h1>
                        </div>

                        <div className="my-3 h-[1px] w-full bg-[#714521]" />

                        <div className="">
                          <p>jawaban: {items.answer}</p>
                        </div>
                      </div>
                      {/* ACTION */}
                      <div className="basis-1/10 p-2 gap-y-3 flex flex-col justify-between items-center">
                        <div className="flex w-full flex-row items-center justify-center gap-x-2 border rounded-lg px-10 py-1 text-lg">
                          <span>Edit</span>
                          <span><HiPencilSquare /></span>
                        </div>
                        <div className="flex bg-[#714521] text-[#FFF5E7] w-full flex-row items-center justify-center gap-x-2 border rounded-lg px-10 py-1 text-lg">
                          <span>Hapus</span>
                          <span><FaTrash /></span>
                        </div>
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
  );
}