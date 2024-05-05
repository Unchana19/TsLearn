import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`text-3xl font-bold underline ${inter.className}`}>
      <h1>Hello World</h1>
    </main>
  );
}
