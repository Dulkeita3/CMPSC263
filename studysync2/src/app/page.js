import Image from "next/image";
import NavBar from "./components/Navbar";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar />

      <div className="bg-gray-800 text-white text-center p-12">
        <h1 className="text-3xl font-bold leading-normal mb-2">
          Join The Platform that's Revolutionizing Studying
        </h1>
        <h2 className="text-2xl font-semibold">
          For Penn State Students
        </h2>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
  {/* First Section */}
  <div className="space-y-4">
    <Image
      src="/studysync_images/img1.jpg"
      alt="Description"
      width={500}
      height={300}
      priority
      className="w-full h-72 object-cover rounded-xl shadow-lg"
    />
    <h2 className="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
    </h2>
  </div>

  {/* Second Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
    <h2 className="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
    </h2>
    <Image
      src="/studysync_images/img2.jpg"
      alt="Description"
      width={500}
      height={300}
      priority
      className="w-full h-72 object-cover rounded-xl shadow-lg"
    />
  </div>
</div>




    </div>
  );
}
