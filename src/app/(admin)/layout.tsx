import Sidebar from "@/components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row min-h-screen w-full">
      <aside className="sticky top-0 h-screen shrink-0">
        <Sidebar />
      </aside>

      <main className="relative min-w-0 flex-1 overflow-x-hidden p-6">
        {children}
      </main>
    </div>
  );
}