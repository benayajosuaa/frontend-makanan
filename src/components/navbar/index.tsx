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
    {id:"2", routing:"/", nama:"Menu"},
    {id:"3", routing:"/hubungin-kami", nama:"Contact"},
]


export default function NavigationBar (){
    return (
        <div className={lilita.className}>
            <div className="text-[#714521] bg-[#FFF5E7]">
                <div className="flex flex-row justify-between border-b items-center">
                    <div className="">
                        <div className=" p-4 ml-4">
                            <div className="flex flex-row gap-x-8">
                                {
                                    link_navbar.map((x) => {
                                        return (
                                            <div key={x.id}>
                                                <Link href={x.routing} className="hover:underline">
                                                    {x.nama}
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="mr-40">
                        <Link href="/">
                            <img src="logo/logo_gabungan_makanan_coklat.png" className="h-6" alt="" />
                        </Link>
                    </div>
                
                    <div className=" p-4 border-l font-semibold text-[#FFF5E7] bg-[#714521]">
                        <Link href="/login" >
                            Masuk / Daftar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}