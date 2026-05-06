import Image from "next/image";
import Modal from "./components/user-modal";
import Card from "./components/card";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
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
