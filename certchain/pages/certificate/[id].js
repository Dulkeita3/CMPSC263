import { useRouter } from "next/router";
import Navbar from "../../components/NavBar";
import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import { useAddress } from "@thirdweb-dev/react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../lib/certContract";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

//ONLY WORKS FROM THE PROFILE PAGE!!! From profile you can click "view certificate" and that will take you to this page that
//uses the ID associated with the certificate. With no ID passed through this page will not work
export default function CertificatePage() {
  const router = useRouter();
  const { id } = router.query;
  const address = useAddress();
  const certRef = useRef();
  const [hideButtons, setHideButtons] = useState(false);

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!id || typeof window.ethereum === "undefined") return;

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          provider
        );

        const cert = await contract.getCertificate(id);

        setCertificate({
          id,
          name: cert.name,
          program: cert.program,
          date: cert.dateIssued,
          description: cert.description,
        });
      } catch (err) {
        console.error("Error fetching certificate:", err);
        setCertificate(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  const formatDate = (rawDate) => {
    const [year, month, day] = rawDate.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePDF = async () => {
    const element = certRef.current;
    //hiding the button so they don't show up in the pdf dowload
    setHideButtons(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    const scrubOKLCH = (node) => {
      const style = getComputedStyle(node);
      if (style.color.includes("oklch")) node.style.color = "#000";
      if (style.backgroundColor.includes("oklch"))
        node.style.backgroundColor = "#fff";
      Array.from(node.children).forEach(scrubOKLCH);
    };

    scrubOKLCH(element);

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Certificate-${certificate?.id}.pdf`);
    setHideButtons(false);
  };
  const handleShare = () => {
    //sharing via email, can't automatically attach pdfs and images to email though
    if (!certificate) return;

    const subject = encodeURIComponent("Check out my blockchain certificate!");
    const body = encodeURIComponent(
      `Hey,\n\nI just completed the "${certificate.program}" program and received this verified certificate on the blockchain!\n\nYou can view it here:\n${window.location.href}\n\nBest,\n${certificate.name}`
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
          Certificate Details
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading certificate...</p>
        ) : certificate ? (
          <div
            ref={certRef}
            className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
          >
            {/* Certificate Header */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Certificate of Completion
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Certificate ID:{" "}
                <span className="font-mono">{certificate.id}</span>
              </p>
            </div>

            {/* Certificate Body */}
            <div className="text-center my-10">
              <p className="text-lg text-gray-700">This certifies that</p>
              <p className="text-2xl font-bold text-indigo-700 my-2">
                {certificate.name}
              </p>
              <p className="text-lg text-gray-700">
                has successfully completed the program
              </p>
              <p className="text-xl font-semibold text-gray-800 mt-2">
                {certificate.program}
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Issued on: {formatDate(certificate.date)}
              </p>
            </div>

            {/* Verification Status */}
            <div className="text-center mt-8">
              <p className="text-green-600 font-medium">
                ✅ Verified on Blockchain
              </p>
              {address && (
                <p className="text-xs text-gray-500 mt-1">
                  Viewing as: {address}
                </p>
              )}
            </div>

            {/* Buttons */}
            {!hideButtons && (
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={handlePDF}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Download PDF
                </button>
                <button
                  onClick={handleShare}
                  className="bg-gray-100 hover:bg-gray-200 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium transition border border-gray-300"
                >
                  Share Certificate
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-red-500">Certificate not found.</p>
        )}
      </main>
    </div>
  );
}
