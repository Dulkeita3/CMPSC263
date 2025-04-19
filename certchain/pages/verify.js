import Navbar from "../components/NavBar";
import { useState } from "react";

export default function Verify() {
  const [certificateId, setCertificateId] = useState("");

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
          Verify a Certificate
        </h1>

        {/* Input Field */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Certificate ID or Hash
          </label>
          <input
            type="text"
            placeholder="e.g., 0x1234abcd..."
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Verify Button */}
          <button
            type="button"
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition w-full"
          >
            Verify Certificate
          </button>
        </div>

        {/* Placeholder Result */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Verification Result (Example)
          </h2>
          <p className="text-gray-700 text-sm mb-1">
            <strong>Name:</strong> Jane Doe
          </p>
          <p className="text-gray-700 text-sm mb-1">
            <strong>Program:</strong> Blockchain Fundamentals
          </p>
          <p className="text-gray-700 text-sm mb-1">
            <strong>Date Issued:</strong> April 14, 2025
          </p>
          <p className="text-green-600 font-medium mt-4">✅ Certificate is valid and verified on-chain.</p>
        </div>
      </main>
    </div>
  );
}
