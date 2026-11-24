import { anton, lilita, patrick } from "@/components/font/font";
import Link from "next/link";

export default function RegisterPage(){
    return (
        <div>
            <div className={patrick.className}>
                <div className="h-screen w-screen bg-amber-200 text-[#714521] flex flex-row max-xl:h-auto max-xl:min-h-dvh max-xl:w-full max-md:flex-col">
                    {/* form */}
                    <div className="basis-6/10 w-ful bg-[#FFF5E7] max-xl:min-w-0 max-xl:min-h-dvh max-md:basis-auto">
                        <div className="p-20 max-xl:p-10 max-sm:px-6">
                            <div className="flex flex-col gap-y-10 max-xl:gap-y-8">
                                <div>
                                    <img src="logo/icon_makanan_coklat.png" className="h-15 w-auto" alt="" />
                                </div>
                                <div>
                                    <div className={lilita.className}>
                                        <h1 className="text-4xl max-sm:text-3xl">JADILAH BAGIAN DARI KAMI!</h1>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-5">
                                    <div className="grid w-full grid-cols-2 gap-x-4 max-sm:grid-cols-1 max-sm:gap-y-5">
                                        {/* Nama */}
                                        <div>
                                            <div className="flex flex-col gap-y-2">
                                                <label htmlFor="email" className={`${anton.className} text-lg`}>
                                                Nama
                                                </label>
                                                <input
                                                id="keperluan"
                                                type="text"
                                                placeholder="Yoel Sungkono"
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
                                        {/* Email */}
                                        <div>
                                            <div className="flex flex-col gap-y-2">
                                                <label htmlFor="email" className={`${anton.className} text-lg`}>
                                                Email
                                                </label>
                                                <input
                                                id="keperluan"
                                                type="text"
                                                placeholder="yoel.sungkono@kamar320.com"
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
                                    <div className="flex flex-col gap-y-2">
                                        <label htmlFor="email" className={`${anton.className} text-lg`}>
                                        Ketik Ulang Password
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
                                        <Link href="/login" className="opacity-80 max-xl:inline-flex max-xl:min-h-11 max-xl:flex-wrap max-xl:items-center max-xl:gap-x-1">
                                            <span className="underline">Sudah punya akun</span> ? masuk saja !
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
                                                        px-6 py-2 sm:px-10 max-xl:min-h-11 max-xl:max-w-full
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
                                                    DAFTAR
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* img */}
                    <div className="basis-4/10 h-screen w-auto max-xl:relative max-xl:h-auto max-xl:min-w-0 max-md:h-48 max-md:basis-auto max-md:shrink-0">
                        <img src="asset/ornamen2.png" className="h-screen w-screen object-cover max-xl:absolute max-xl:inset-0 max-xl:h-full max-xl:w-full" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}