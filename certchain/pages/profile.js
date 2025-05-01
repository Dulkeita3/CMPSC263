import Navbar from "../components/NavBar";
import Link from "next/link";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../lib/certContract";

export default function Profile() {
  const address = useAddress();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  //used to turn 01/01/2000 into January 1, 2000
  function formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  //used for getting the certs attached to a person's wallet
  useEffect(() => {
    const fetchCerts = async () => {
      if (!address || typeof window.ethereum === "undefined") {
        setCertificates([]);
        setLoading(false);
        return;
      }

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          provider
        );

        const certIds = await contract.getCertificatesOf(address);

        const certData = await Promise.all(
          certIds.map((id) => contract.getCertificate(id))
        );

        const formatted = certData.map((cert, index) => ({
          id: certIds[index].toString(),
          name: cert.name,
          recipient: address,
          program: cert.program,
          date: cert.dateIssued,
        }));

        setCertificates(formatted);
      } catch (err) {
        console.error("Error fetching certs:", err);
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCerts();
  }, [address]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4 text-center">
          My Certificates
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Showing certificates linked to wallet address:{" "}
          <span className="font-mono text-indigo-600">
            {address || "Not connected"}
          </span>
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading certificates...</p>
        ) : certificates.length === 0 ? (
          <p className="text-center text-gray-600">
            You have not received any certificates yet, get to work!
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {cert.program}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    Issued to:{" "}
                    <span className="text-indigo-700">{cert.name}</span>
                  </p>
                  <p className="text-sm text-gray-500">Date: {formatDate(cert.date)}</p>
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
        )}
      </main>
    </div>
  );
}
