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
                    <div className="flex flex-row ">
                        <div className="basis-4/10">
                            <h1 className="h-140 w-full bg-amber-200 object-cover">
                                <img className="object-cover h-140 w-full" src="asset/rumahmakanan.png" alt="" />
                            </h1>
                        </div>
                        <div className="basis-6/10">
                            <div className="p-14">
                                <div className="flex flex-col gap-y-10 h-full justify-between">
                                    <div className={lilita.className}>
                                        <h1 className="text-3xl text-[#714521]">LOKASI KAMI</h1>
                                    </div>
                                    <div className={patrick.className}>
                                        <h1 className="text-6xl text-[#aa7549]">
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