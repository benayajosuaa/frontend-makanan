const statistik = [
  { judul: "Total Pesanan", nilai: "120" },
  { judul: "Pendapatan", nilai: "Rp 3.500.000" },
  { judul: "Total Menu", nilai: "24" },
];

export default function DashboardAdmin() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#714521]">
          Dashboard Makanan
        </h1>
        <p className="mt-2 text-gray-600">
          Selamat datang! Berikut ringkasan restoran kamu.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {statistik.map((item) => (
          <div
            key={item.judul}
            className="rounded-xl border border-[#714521]/20 bg-[#FFF5E7] p-6"
          >
            <p className="text-sm text-gray-600">{item.judul}</p>
            <p className="mt-2 text-2xl font-bold text-[#714521]">
              {item.nilai}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}