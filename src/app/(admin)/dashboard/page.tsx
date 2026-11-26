import { anton, lilita, patrick } from "@/components/font/font";


export default function DashboardAdmin() {
  return (
    <div className={patrick.className}>
      <div className="space-y-6">
        <div className={lilita.className}>
          <h1 className="text-3xl font-bold text-[#714521]">
            HAI!
          </h1>
          <span className={anton.className}>
            <p className="mt-2 text-gray-600">
              Selamat datang di dashboard utama
            </p>
          </span>
        </div>

      
      </div>
    </div>
  );
}