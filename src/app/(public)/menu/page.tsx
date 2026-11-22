import { anton, lilita, patrick } from "@/components/font/font";
import Link from "next/link";
import NavigationBar from "@/components/navbar"
import Footer from "@/components/footer";


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


export default function MenuPage(){
    return (
        <div>
            <div className={patrick.className}>
                <div className="bg-[#FFF5E7] text-[#714521]">
                    {/* Navbar */}
                    <div className="z-20 fixed w-full">
                        <NavigationBar/>
                    </div>

                    {/* Page  */}
                    <div className="pt-30 p-15">
                        <div className="flex flex-col gap-y-5">
                            {/* title */}
                            <div className={lilita.className}>
                                <h1 className="text-5xl">MAKANAN KAMI</h1>
                            </div>

                            {/* Keterangan tambahan */}
                            <div>
                                <h1 className="text-2xl">Pilih makanan yang paling cocok dengan seleramu !</h1>
                            </div>



                            {/* List menu */}
                            <div className="pt-10">
                                <div className="grid grid-cols-3 gap-x-10 gap-y-10">
                                    {
                                        menulist.map((item) => {
                                            return (
                                                <div key={item.id}
                                                    className="bg-[#bc9576] rounded-4xl"
                                                >
                                                    {/* gambar */}
                                                    <div>
                                                        <img src={item.image} alt="" className="rounded-t-4xl object-[center_20%] h-100 w-full object-cover"/>
                                                    </div>
                                                    
                                                    {/* Penjelasan */}
                                                    <div className="text-[#FFF5E7] p-8 pt-5 pb-8 gap-y-5 flex flex-col w-auto">
                                                        {/* Nama */}
                                                        <div className="flex flex-row justify-between">
                                                            {/* nama */}
                                                            <div className={anton.className}>
                                                                <span className="text-2xl">{item.nama}</span>
                                                            </div>
                                                            {/* harga */}
                                                            <div className={lilita.className}>
                                                                <span className="text-2xl">{item.harga}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-center items-center mt-1">
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
                                                                TAMBAH KE KERANJANG
                                                            </button>
                                                        </div>


                                                    </div>

                                                    {/* button tambah ke keranjang */}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            {/* Lainnya */}
                            <div className="flex items-center justify-center pt-30">
                                <div className={lilita.className}>
                                    <h1 className="text-4xl">MAU <span className="underline">REQUEST MAKANAN</span> DILUAR MENU YANG ADA ? LANGSUNG SAJA UNTUK</h1>
                                </div>
                            </div>

                            {/* hubungi kami skrng */}
                            <div className="pb-30">
                                <Link href="/hubungin-kami" className={anton.className}>
                                    <div className="flex justify-center items-center mt-1">
                                        <button
                                            type="button"
                                            className="
                                                inline-flex items-center justify-center
                                                cursor-pointer rounded-full
                                                border-2 border-[#714521]
                                                bg-[#FFF5E7] text-[#714521]
                                                px-6 py-2 sm:px-10
                                                text-4xl font-bold tracking-wide
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
                                                HUBUNGI KAMI SEKARANG !
                                        </button> 
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                     <div>
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>
    )
}