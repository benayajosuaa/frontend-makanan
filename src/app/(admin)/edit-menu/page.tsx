import { anton, lilita, patrick } from "@/components/font/font";
import { GoTrash } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";

const menulist = [
    {id:"1", nama:"Nasi Goreng", image:"menu/makanan/01_nasi_goreng.png", harga:"Rp 16.000", tipe:"makanan"},
    {id:"2", nama:"Sate Ayam", image:"menu/makanan/02_sate_ayam.png", harga:"Rp 16.000", tipe:"makanan"},
    {id:"3", nama:"Rendang", image:"menu/makanan/03_rendang.png", harga:"Rp 16.000", tipe:"makanan"},
    {id:"4", nama:"Gado-Gado", image:"menu/makanan/04_gado_gado.png", harga:"Rp 16.000", tipe:"makanan"},
    {id:"5", nama:"Soto Ayam", image:"menu/makanan/05_soto_ayam.png", harga:"Rp 16.000", tipe:"makanan"},
    {id:"6", nama:"Mie Goreng", image:"menu/makanan/06_mie_goreng.png", harga:"Rp 16.000", tipe:"makanan"},
    {id:"7", nama:"Ayam Bakar", image:"menu/makanan/07_ayam_bakar.png", harga:"Rp 16.000", tipe:"makanan"},
    {id:"8", nama:"Es Teh Solo", image:"menu/minuman/01_es_teh_solo.png", harga:"Rp 16.000", tipe:"minuman"},
    {id:"9", nama:"Es Kopi Susu", image:"menu/minuman/02_es_kopi_susu.png", harga:"Rp 16.000", tipe:"minuman"},
    {id:"10", nama:"Matcha Ube", image:"menu/minuman/03_matcha_ube.png", harga:"Rp 16.000", tipe:"minuman"},
    {id:"11", nama:"Es Cendol", image:"menu/minuman/04_es_cendol.png", harga:"Rp 16.000", tipe:"minuman"},
    {id:"12", nama:"Es Jeruk", image:"menu/minuman/05_es_jeruk.png", harga:"Rp 16.000", tipe:"minuman"},
]


export default function DashboardAdmin() {
  return (
    <div className={patrick.className}>
      <div className="space-y-6 text-[#714521]">
        {/* Header */}
        <div className={lilita.className}>
          <h1 className="text-3xl font-bold text-[#714521]">
            MENU
          </h1>
          <span className={anton.className}>
            <p className="mt-2 text-[#714521]">
              Kostumisasi menu bisnis
            </p>
          </span>
        </div>
        
        {/* Edit Section */}
        <div>
          <div className="border p-4 rounded-lg">
            <div className="flex flex-row gap-x-10">
              <div className="basis-3/10">
                <div className="h-80 border bg-amber-50">
                  upload gambar disini
                </div>
              </div>
              <div className="basis-7/10">
                <div className="flex flex-col gap-y-4">
                  <div className="text-xl font-semibold">
                    <h1>Tambah Menu !</h1>
                  </div>

                  <div className="flex flex-col gap-y-10">
                    <div className="basis-8/10 flex flex-col ">
                      {/* nama makanan */}
                      <div className="">
                        <h1 className="opacity-80">Masukan Nama Menu</h1>
                      </div>
                      <div>
                        <input 
                          type="text" 
                          className="border-b w-full bg-[#FFF5E7] p-2 focus:outline-none"
                          placeholder="Nasigoreng Maklima Biadab"
                        />
                      </div>
                      {/* nama makanan */}
                      <div className="pt-6">
                        <h1 className="opacity-80">Masukan Nama Menu</h1>
                      </div>
                      <div>
                        <input 
                          type="text" 
                          className="border-b w-full bg-[#FFF5E7] p-2 focus:outline-none"
                          placeholder="60.0000"
                        />
                      </div>
                    </div>
                    <div className="basis-2/10">
                      <button className="bg-[#714521] gap-x-4 flex flex-row justify-center items-center gap-x- text-[#FFF5E7] px-7 py-2 rounded-xl">
                        <span>Tambahkan</span>
                        <span><FaPlus /></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fetch Menu */}
        <div className={anton.className}>
          <h1 className="text-lg">Menu kamu saat ini !</h1>
        </div>

        <div>
          <div className="grid grid-cols-4 gap-x-10 gap-y-10">
            {
              menulist.map((items) => {
                return(
                  <div className="flex flex-col border" >
                    <div>
                      <img src={items.image} className="h-60 w-full object-cover" alt="" />
                    </div>
                    <div className="text-lg flex flex-row justify-between items-center p-2 bg-[#FFF5E7] ">
                      <div>
                        <h1 className="hover:underline">Edit Menu</h1>
                      </div>
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
                )
              })
            }
          </div>
        </div>

      
      </div>
    </div>
  );
}