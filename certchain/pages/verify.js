import Navbar from "../components/NavBar";
import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../lib/certContract";

//used to verify certificates via ID numbers
export default function Verify() {
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setError("");
    setResult(null);

    if (!certificateId.trim()) {
      setError("Please enter a certificate ID.");
      return;
    }

    try {
      if (typeof window.ethereum === "undefined") throw new Error("Wallet not connected");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

      const cert = await contract.getCertificate(certificateId);

      setResult({
        name: cert.name,
        program: cert.program,
        date: cert.dateIssued,
      });
    }  catch (err) {
      console.error("Verification error:", err);
    
      if (err?.reason === "Certificate does not exist.") {
        setError("❌ Certificate not found.");
      } else {
        setError("❌ An unexpected error occurred.");
      }
    }
    
  };

  const formatDate = (rawDate) => {
    const [year, month, day] = rawDate.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
            Enter Certificate ID
          </label>
          <input
            type="text"
            placeholder="e.g., 0 or 3"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={handleVerify}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition w-full"
          >
            Verify Certificate
          </button>
        </div>

        {/* Verification Result */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Verification Result 🥁
          </h2>

          {error && (
            <p className="text-red-600 text-sm font-medium">{error}</p>
          )}

          {result && (
            <>
              <p className="text-gray-700 text-sm mb-1">
                <strong>Name:</strong> {result.name}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <strong>Program:</strong> {result.program}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <strong>Date Issued:</strong> {formatDate(result.date)}
              </p>
              <p className="text-green-600 font-medium mt-4">
                ✅ Certificate is valid and verified on-chain.
              </p>
            </>
          )}

          {!result && !error && (
            <p className="text-gray-400 text-sm">No certificate searched yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}
