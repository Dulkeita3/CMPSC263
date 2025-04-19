import { useRouter } from "next/router";
import Navbar from "../../components/NavBar";

export default function CertificatePage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
          Certificate Details
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          {/* Certificate Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Certificate of Completion
            </h2>
            <p className="text-sm text-gray-500 mt-1">Certificate ID: <span className="font-mono">{id}</span></p>
          </div>

          {/* Certificate Body */}
          <div className="text-center my-10">
            <p className="text-lg text-gray-700">This certifies that</p>
            <p className="text-2xl font-bold text-indigo-700 my-2">Jane Doe</p>
            <p className="text-lg text-gray-700">has successfully completed the program</p>
            <p className="text-xl font-semibold text-gray-800 mt-2">Blockchain Fundamentals</p>
            <p className="text-sm text-gray-500 mt-4">Issued on: April 14, 2025</p>
          </div>

          {/* Verification Status */}
          <div className="text-center mt-8">
            <p className="text-green-600 font-medium">✅ Verified on Blockchain</p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              Download PDF
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium transition border border-gray-300">
              Share Certificate
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
