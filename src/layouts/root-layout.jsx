import UnderlineTabsNav from "@/components/underline-tabs-nav";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col bg-background">
      <UnderlineTabsNav />
      <main className="mt-4 flex-1 container">
        <Outlet />
      </main>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}
