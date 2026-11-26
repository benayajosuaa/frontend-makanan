import { anton, lilita, patrick } from "@/components/font/font";
import { GoTrash } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";



export default function StoryPageAdmin() {
  return (
    <div className={patrick.className}>
      <div className="space-y-6 text-[#714521]">
        {/* Header */}
        <div className={lilita.className}>
          <h1 className="text-3xl font-bold text-[#714521]">
            CERITA BISNIS
          </h1>
          <span className={anton.className}>
            <p className="mt-2 text-[#714521]">
              Kostumisasi cerita bisnis mu 
            </p>
          </span>
        </div>
        
        {/* Edit Section */}
        <div>
            <div className="border w-full p-4 rounded-lg">
                <div className="flex flex-col gap-y-5 w-full">
                    <div className="">
                        <div className="h-80 border bg-amber-50">
                        upload gambar disini
                        </div>
                    </div>

                    {/* Gambar */}
                    <div className="w-full flex justify-end">
                        <div className="flex flex-row gap-x-3">
                            <button className="bg-[#714521] gap-x-4 flex flex-row justify-center items-center gap-x- text-[#FFF5E7] px-7 py-2 rounded-xl">
                                <span>Edit Gambar</span>
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

      
        <div className="flex flex-col gap-y-2 pt-10 pb-20">
            <div className={anton.className}>
                <h1 className="text-lg">Tuliskan ceritanya</h1>
            </div>

            <div>
                <textarea
                    className="border-b h-50 w-full resize-none bg-[#FFF5E7] p-2 focus:outline-none"
                    placeholder="Kisah kami berawal dari ..."
                />
            </div>

            <div>
                <button className="bg-[#714521] gap-x-4 flex flex-row justify-center items-center gap-x- text-[#FFF5E7] px-7 py-2 rounded-xl">
                    <span>Edit / Tambah Kisah</span>
                    <span><BsPencilSquare /></span>
                </button>
            </div>
        </div>
      
      </div>
    </div>
  );
}