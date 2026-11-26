import { anton, lilita, patrick } from "@/components/font/font";
import { GoTrash } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";

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

export default function RatingPageAdmin() {
  return (
    <div className={patrick.className}>
      <div className="space-y-6 text-[#714521]">
        {/* Header */}
        <div className={lilita.className}>
          <h1 className="text-3xl font-bold text-[#714521]">
            RATING TOKO
          </h1>
          <span className={anton.className}>
            <p className="mt-2 text-[#714521]">
                Atur rating toko
            </p>
          </span>
        </div>
        
        {/* Edit Section */}
        <div>
            <div className="border w-full p-4 rounded-lg">
                <div className="flex flex-col gap-y-5 w-full">
                    <div className="grid grid-cols-3 gap-x-6">
                        <div className="flex flex-col">
                            <div>
                                <h1 className="text-lg">Nama</h1>
                            </div>
                            <div>
                                <textarea
                                    rows={1}
                                    className="border-b w-full resize-none bg-[#FFF5E7] p-2 focus:outline-none"
                                    placeholder="Jayden Wijaya"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                <h1 className="text-lg">Keterangan</h1>
                            </div>
                            <div>
                                <textarea
                                    rows={1}
                                    className="border-b w-full resize-none bg-[#FFF5E7] p-2 focus:outline-none"
                                    placeholder="Warga Jakbar"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                <h1 className="text-lg">Rating</h1>
                            </div>
                            <div>
                                <textarea
                                    rows={1}
                                    className="border-b w-full resize-none bg-[#FFF5E7] p-2 focus:outline-none"
                                    placeholder="4.5"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Gambar */}
                    <div className="w-full flex justify-end">
                        <div className="flex flex-row gap-x-3">
                            <button className="bg-[#714521] gap-x-4 flex flex-row justify-center items-center gap-x- text-[#FFF5E7] px-7 py-2 rounded-xl">
                                <span>Buat Testimoni</span>
                                <span><BsPencilSquare /></span>
                            </button>
                            <button className="bg-[#714521] gap-x-4 flex flex-row justify-center items-center gap-x- text-[#FFF5E7] px-7 py-2 rounded-xl">
                                <span>Hapus</span>
                                <span><GoTrash /></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      
        <div className="pt-10">
            <div className={lilita.className}>
                <h1 className="text-xl">Rating Yang ada</h1>
            </div>
        </div>

        <div className="grid grid-cols-4 gap-y-5 gap-x-5">
            {
                reviews.map((items) => {
                    return (
                        <div key={items.id} className="border">
                            <div className="flex flex-col">
                                <div className="flex flex-col h-50 p-2 overflow-scroll">
                                    <div>
                                        <h1 className=""><span className="font-semibold">nama: </span> {items.name}</h1>
                                    </div>
                                    <div>
                                        <h1 className=""> <span className="font-semibold">rating: </span>{items.rating}</h1>
                                    </div>
                                    <div>
                                        <h1><span className="font-semibold">asal: </span>{items.origin}</h1>
                                    </div>
                                    <div>
                                        <h1><span className="font-semibold">review: </span>{items.text}</h1>
                                    </div>
                                </div>
                                <div className="border-t p-2">
                                    <div className="flex flex-row justify-between">
                                        <div>Edit</div>
                                        <div>Hapus</div>
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
  );
}