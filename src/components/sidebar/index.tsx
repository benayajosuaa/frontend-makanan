import { anton, lilita, patrick } from "@/components/font/font";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Link from "next/link";



const link_navbar = [
    {id:"1", routing:"/edit-menu", nama:"Edit Menu"},
    {id:"2", routing:"/faq", nama:"FAQ"},
    {id:"3", routing:"/banner", nama:"banner"},
    {id:"4", routing:"/story", nama:"story"},
    {id:"5", routing:"/rating", nama:"rating"},
    
]


export default function SidebarAdmin(){
    return (
        <div className={lilita.className}>
            <aside className="flex h-screen flex-col justify-between bg-[#714521] p-6 text-[#FFF5E7]">
                {/* Bagian atas */}
                <div className="flex flex-col gap-y-4">
                    <Link href="/dashboard">
                        <h1>DASHBOARD ADMIN</h1>
                    </Link>
                    <div className="h-1 bg-[#FFF5E7]" />

                    <nav className={`${patrick.className} flex flex-col gap-y-3 pt-3`}>
                        {link_navbar.map((item) => (
                            <Link key={item.id} href={item.routing} className="text-xl hover:underline">
                                {item.nama}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Bagian bawah */}
                <div>
                    <button className="text-[#714521] w-full justify-center px-4 py-2 rounded-lg bg-[#FFF5E7]">
                        <Link href="/">
                            <div className="flex flex-row justify-center items-center gap-x-2">
                                <span className="text-sm">Logut</span>
                                <span className="text-lg"><RiLogoutBoxRLine /></span>
                            </div>
                        </Link>
                    </button>
                </div>
            </aside>
        </div>
    )
}