import Image from "next/image";
import Modal from "./components/ai-modal";
import Card from "./components/card";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <div className="flex min-h-full flex-col">
        <div>
          <Card />
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}
