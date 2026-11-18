import NavigationBar from "@/components/navbar"
import FirstHomePage from "@/components/home/home-1";
import ThirdHomePage from "@/components/home/home-3";
import FourHomePage from "@/components/home/home-4";
import { Lilita_One, Patrick_Hand } from "next/font/google";
import SecondHomePage from "@/components/home/home-2";

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

export default function HomePage(){
    return (
        <div className="bg-[#f9ead4]">
            <div className="">
                <div className="z-20 fixed w-full">
                    <NavigationBar/>
                </div>


                {/* Home */}
                <div className="">
                    <FirstHomePage/>
                </div>


                {/* Testimoni */}
                <div>
                    <SecondHomePage/>
                </div>


                {/* Location */}
                <div>
                    <ThirdHomePage/>
                </div>

                {/* FAQ */}
                <div>
                    <FourHomePage/>   
                </div>
            </div>
        </div>
    )
}