import Image from "next/image";
import { Hero, Newest } from "./components";

export default function Home() {
  return (
    <main>
      <Hero />
      <Newest />
    </main>
  );
}
