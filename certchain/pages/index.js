import Navbar from "../components/NavBar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="p-6 max-w-5xl mx-auto">
        {/* Hero Section */}
        <section className="text-center my-16">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Verifiable Certificates. Decentralized. Secure.
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Issue and verify credentials with blockchain-backed trust.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/issue">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition">
                Issue Certificate
              </button>
            </Link>
            <Link href="/verify">
              <button className="bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 px-6 py-2 rounded-lg font-medium transition">
                Verify Certificate
              </button>
            </Link>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="grid md:grid-cols-3 gap-6 text-center my-20">
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-indigo-600 font-semibold text-lg mb-2">
              Immutable Records
            </h3>
            <p className="text-gray-600 text-sm">
              Once a certificate is issued, it is permanently recorded on the
              blockchain. This ensures that records cannot be altered, forged,
              or deleted — preserving authenticity and integrity for life.
            </p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-indigo-600 font-semibold text-lg mb-2">
              Global Verifiability
            </h3>
            <p className="text-gray-600 text-sm">
              Anyone, anywhere in the world can instantly verify a certificate
              without relying on an institution or third party. All records are
              public and accessible 24/7.
            </p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-indigo-600 font-semibold text-lg mb-2">
              Fast & Trustless Verification
            </h3>
            <p className="text-gray-600 text-sm">
              Certificates can be validated in seconds with zero reliance on
              manual checks. The blockchain guarantees the validity, eliminating
              the need to trust — simply verify.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-white text-center p-10 rounded-lg shadow-md">
          <p className="text-xl font-semibold text-gray-800 mb-4">
            Start Issuing Certificates Today!
          </p>
          <Link href="/issue">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition">
              Get Started!
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}
