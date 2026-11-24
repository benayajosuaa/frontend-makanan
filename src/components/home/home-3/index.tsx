"use client";
import { Lilita_One, Patrick_Hand } from "next/font/google";
import { Anton } from "next/font/google";


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



export default function ThirdHomePage(){
    return (
        <div>
            <div>
                <div className="border-b border-t border-[#714521]">
                    <div className="flex flex-row max-md:flex-col ">
                        <div className="basis-4/10 max-xl:min-w-0 max-md:basis-auto">
                            <h1 className="h-140 w-full bg-amber-200 object-cover max-md:h-72">
                                <img className="object-cover h-140 w-full max-md:h-72" src="asset/rumahmakanan.png" alt="" />
                            </h1>
                        </div>
                        <div className="basis-6/10 max-xl:min-w-0 max-md:basis-auto">
                            <div className="p-14 max-xl:p-8 max-sm:p-6">
                                <div className="flex flex-col gap-y-10 max-xl:gap-y-6 h-full justify-between">
                                    <div className={lilita.className}>
                                        <h1 className="text-3xl text-[#714521]">LOKASI KAMI</h1>
                                    </div>
                                    <div className={patrick.className}>
                                        <h1 className="text-6xl text-[#aa7549] max-xl:text-4xl max-sm:text-3xl max-xl:wrap-anywhere">
                                            Jl. Kenanga Asri No. 17, RT 005/RW 003 <br/>
                                            Kel. Cipete Selatan, Kec. Cilandak <br/>
                                            Jakarta Selatan, DKI Jakarta 12410
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}