import { anton, lilita, patrick } from "@/components/font/font";
import Link from "next/link";

export default function LoginPage(){
    return (
        <div>
            <div className={patrick.className}>
                <div className="h-screen w-screen bg-amber-200 text-[#714521] flex flex-row">
                    {/* img */}
                    <div className="basis-4/10 h-screen w-auto">
                        <img src="asset/ornamen.png" className="h-screen w-screen object-cover" alt="" />
                    </div>

                    {/* form */}
                    <div className="basis-6/10 bg-[#FFF5E7]">
                        <div className="p-20">
                            <div className="flex flex-col gap-y-10">
                                <div>
                                    <img src="logo/icon_makanan_coklat.png" className="h-15 w-auto" alt="" />
                                </div>
                                <div>
                                    <div className={lilita.className}>
                                        <h1 className="text-4xl">MASUK YUK!</h1>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-5">
                                    <div className="flex flex-col gap-y-2">
                                        <label htmlFor="email" className={`${anton.className} text-lg`}>
                                        Username atau Email
                                        </label>
                                        <input
                                        id="keperluan"
                                        type="text"
                                        placeholder="benaya@makanan.kamar320.com"
                                        className="
                                            w-full rounded-lg
                                            border-2 border-[#714521]/40
                                            bg-transparent text-[#714521]
                                            px-5 py-3
                                            placeholder:text-[#714521]/50
                                            transition-colors
                                            focus:outline-none
                                            focus:border-[#714521]
                                            focus:ring-2 focus:ring-[#714521]/20
                                        "
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-2">
                                        <label htmlFor="email" className={`${anton.className} text-lg`}>
                                        Password
                                        </label>
                                        <input
                                        id="keperluan"
                                        type="password"
                                        placeholder="Kucing1ndomar3t!"
                                        className="
                                            w-full rounded-lg
                                            border-2 border-[#714521]/40
                                            bg-transparent text-[#714521]
                                            px-5 py-3
                                            placeholder:text-[#714521]/50
                                            transition-colors
                                            focus:outline-none
                                            focus:border-[#714521]
                                            focus:ring-2 focus:ring-[#714521]/20
                                        "
                                        />
                                    </div>
                                </div>
                                
                                {/* Button Masuk / Login */}
                                <div>
                                    {/* Link */}
                                    <div>
                                        <Link href="/register" className="opacity-80">
                                            <span className="underline">Belum punya akun</span> ? daftar dulu yuk !
                                        </Link>
                                    </div>
                                    {/* Button */}
                                    <div>
                                        <div className="flex justify-end">
                                            <Link href="/">
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
                                                    MASUK
                                                </button>
                                            </Link>
                                        </div>
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