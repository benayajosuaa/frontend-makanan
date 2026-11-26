
import Sidebar from "@/components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row min-h-screen">
      <div>
        <Sidebar />
      </div>

      <div className="min-w-0 flex-1 p-6">
        {children}
      </div>
    </div>
  );
}