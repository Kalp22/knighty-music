import Image from "next/image";
import Topbar from "@/components/topbar/topbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Topbar />
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-5xl">Knighty Klaus</h1>
        <p className="text-2xl">Welcome to my website</p>
      </div>
    </main>
  );
}
