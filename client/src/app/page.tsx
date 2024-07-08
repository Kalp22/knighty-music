import Image from "next/image";
import Topbar from "@/components/topbar/topbar";
import HomeRes from "@/components/homeRes/homeRes";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Topbar />
      <HomeRes />
    </main>
  );
}
