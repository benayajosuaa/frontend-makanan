import { anton, lilita, patrick } from "@/components/font/font";
import { GoTrash } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";

export default function BannerPageAdmin() {
  return (
    <div className={patrick.className}>
      <div className="space-y-6 text-[#714521]">
        {/* Header */}
        <div className={lilita.className}>
          <h1 className="text-3xl font-bold text-[#714521]">
            BANNER HOMEPAGE
          </h1>
          <span className={anton.className}>
            <p className="mt-2 text-[#714521]">
              Kostumisasi banner halaman utama
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
                        <button className="bg-[#714521] gap-x-4 flex flex-row justify-center items-center gap-x- text-[#FFF5E7] px-7 py-2 rounded-xl">
                        <span>Tambahkan</span>
                            <span><FaPlus /></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/*  */}
        <div className={lilita.className}>
          <span className={anton.className}>
            <p className="mt-12 text-[#714521]">
              Banner Saat Ini
            </p>
          </span>
        </div>
        {/* Galeri */}
        <div className="grid grid-cols-3 gap-x-4 pb-20">
            {/* Gambar 1 */}
            <div className="border flex flex-col">
                <div className="h-50 flex items-center justify-center">
                    Gambar
                </div>
                <div className="flex flex-row border-t p-2 justify-between">
                    <div>Ganti Gambar</div>
                    <div className="">
                        <div>
                            <button
                            type="button"

                            className="opacity-50 hover:opacity-100 hover:text-[#714521] active:scale-75 transition-all duration-150 cursor-pointer p-1"
                            >
                            <GoTrash />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Gambar 2 */}
            <div className="border flex flex-col">
                <div className="h-50 flex items-center justify-center">
                    Gambar
                </div>
                <div className="flex flex-row border-t p-2 justify-between">
                    <div>Ganti Gambar</div>
                    <div className="">
                        <div>
                            <button
                            type="button"

                            className="opacity-50 hover:opacity-100 hover:text-[#714521] active:scale-75 transition-all duration-150 cursor-pointer p-1"
                            >
                            <GoTrash />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Gambar 3 */}
            <div className="border flex flex-col">
                <div className="h-50 flex items-center justify-center">
                    Gambar
                </div>
                <div className="flex flex-row border-t p-2 justify-between">
                    <div>Ganti Gambar</div>
                    <div className="">
                        <div>
                            <button
                            type="button"

                            className="opacity-50 hover:opacity-100 hover:text-[#714521] active:scale-75 transition-all duration-150 cursor-pointer p-1"
                            >
                            <GoTrash />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        

        

      
      </div>
    </div>
  );
}