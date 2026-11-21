import { Lilita_One, Patrick_Hand } from "next/font/google";
import { Anton } from "next/font/google";


export const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

export const lilita = Lilita_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lilita",
  display: "swap",
});

export const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-patrick",
  display: "swap",
});
