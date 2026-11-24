import { Lilita_One, Patrick_Hand } from "next/font/google";
import Link from "next/link";


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

const link_navbar = [
    {id:"1", routing:"/tentang-kami", nama:"Tentang Kami"},
    {id:"2", routing:"/menu", nama:"Menu"},
    {id:"3", routing:"/hubungin-kami", nama:"Contact"},
]


export default function NavigationBar (){
    return (
        <div className={lilita.className}>
            <div className="text-[#714521] bg-[#FFF5E7]">
                <div className="flex flex-row justify-between border-b items-center max-xl:gap-4 max-md:grid max-md:grid-cols-[minmax(0,1fr)_auto] max-md:gap-0">
                    <div className="max-md:col-span-2 max-md:row-start-2">
                        <div className=" p-4 ml-4 max-xl:ml-0 max-md:px-4 max-md:py-0">
                            <div className="flex flex-row gap-x-8 max-md:justify-center max-md:gap-x-6">
                                {
                                    link_navbar.map((x) => {
                                        return (
                                            <div key={x.id}>
                                                <Link href={x.routing} className="hover:underline max-xl:inline-flex max-xl:min-h-11 max-xl:items-center">
                                                    {x.nama}
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="mr-40 max-xl:mr-0 max-xl:shrink-0 max-md:col-start-1 max-md:row-start-1 max-md:p-3">
                        <Link href="/" className="max-xl:inline-flex max-xl:min-h-11 max-xl:items-center">
                            <img src="logo/logo_gabungan_makanan_coklat.png" className="h-6" alt="" />
                        </Link>
                    </div>
                
                    <div className=" p-4 border-l max-xl:shrink-0 max-md:col-start-2 max-md:row-start-1 max-md:p-3 font-semibold text-[#FFF5E7] bg-[#714521]">
                        <Link href="/login" className="max-xl:inline-flex max-xl:min-h-11 max-xl:items-center" >
                            Masuk / Daftar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}