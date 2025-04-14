import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-bold text-blue-900">
                CertChain
              </span>
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              href="/index"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="/issue"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Issue
            </Link>
            <Link
              href="/verify"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Verify
            </Link>
            <Link
              href="/profile"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Profile
            </Link>
          </div>

          {/* Wallet Button */}
          <div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
