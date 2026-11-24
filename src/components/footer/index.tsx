"use client";
import Link from "next/link";
import { Lilita_One, Patrick_Hand } from "next/font/google";
import { Anton } from "next/font/google";
import { useState } from "react";


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


const kamar320 = [
    {id:"1", name:"kamar320.com", link:"/"},
]

const link_footer = [
    {id:"1", name:"Tentang Kami", link:"/tentang-kami"},
    {id:"2", name:"Menu", link:"/menu"},
    {id:"3", name:"Contact", link:"/hubungin-kami"},
]


export default function Footer(){
    return (
        <div>
            <div className={patrick.className}>
                <div className="bg-[#714521] p-15 pb-10 text-[#FFF5E7] max-xl:p-10 max-sm:px-6">
                    <div className="flex flex-col gap-y-10">
                        <div className="flex flex-row justify-between max-md:flex-col max-md:gap-8">
                            {/* Ini logo */}
                            <div className="flex flex-col">
                                <div>
                                    <img src="logo/icon_makanan_putih.png" className="h-10" alt="" />
                                </div>
                                <div>
                                    <h3 className="text-sm">Jl. Kenanga Asri No. 17, RT 005/RW 003 <br/> Kel. Cipete Selatan, Kec. Cilandak Jakarta Selatan,<br/> DKI Jakarta <br/> 12410</h3>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex flex-row gap-x-8 max-sm:flex-wrap max-sm:gap-y-8">
                                    <div className="flex flex-col gap-y-5">
                                        <div className={anton.className}>
                                            <h1 className="text-xl">TINDAKAN CEPAT</h1>
                                        </div>
                                        <div className="flex flex-col text-lg">
                                            {
                                                link_footer.map((item) => {
                                                    return (
                                                        <div key={item.id}>
                                                            <Link href={item.link} className="max-xl:inline-flex max-xl:min-h-11 max-xl:items-center">
                                                                <span>
                                                                    {item.name}
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="flex flex-col gap-y-5">
                                        <div className={anton.className}>
                                            <h1 className="text-xl">PENYEDIA KAMI</h1>
                                        </div>
                                        <div className="flex flex-col text-lg">
                                            {
                                                kamar320.map((item) => {
                                                    return (
                                                        <div key={item.id}>
                                                            <Link href={item.link} className="max-xl:inline-flex max-xl:min-h-11 max-xl:items-center">
                                                                <span>
                                                                    {item.name}
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-center items-center">
                            <p>
                                ini mrupkn portfolio kmr320 yah, smua dlmnya fiktif & dibntu ilustrsi oleh AI heheh © Makanan 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}