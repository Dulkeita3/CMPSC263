import Navbar from "../components/NavBar";
import Link from "next/link";

export default function Profile() {
  // Mock wallet address and certificate data
  const mockWallet = "0x1234...abcd";
  const mockCertificates = [
    {
      id: "demo-1",
      name: "Blockchain Fundamentals",
      recipient: "John Doe",
      date: "April 1, 2025",
    },
    {
      id: "demo-2",
      name: "AI for Engineers",
      recipient: "John Doe",
      date: "March 15, 2025",
    },
    {
      id: "demo-3",
      name: "Web3 Ethics & Law",
      recipient: "John Doe",
      date: "February 27, 2025",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4 text-center">
          My Certificates
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Showing certificates linked to wallet address:{" "}
          <span className="font-mono text-indigo-600">{mockWallet}</span>
        </p>

        {/* Certificate Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockCertificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {cert.name}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  Issued to: <span className="text-indigo-700">{cert.recipient}</span>
                </p>
                <p className="text-sm text-gray-500">Date: {cert.date}</p>
              </div>
              <div className="mt-4">
                <Link href={`/certificate/${cert.id}`}>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 px-4 rounded-lg text-sm font-medium transition">
                    View Certificate
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
