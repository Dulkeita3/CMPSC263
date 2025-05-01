import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // hamburger menu for smaller screens
import { useAddress, useConnect, useDisconnect, metamaskWallet } from "@thirdweb-dev/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const connect = useConnect();
  const disconnect = useDisconnect();
  const address = useAddress();

  const connectWithMetamask = () => {
    connect(metamaskWallet());
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-700">
              CertChain
            </Link>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-indigo-900 hover:text-indigo-600 font-medium">Home</Link>
            <Link href="/issue" className="text-indigo-900 hover:text-indigo-600 font-medium">Issue</Link>
            <Link href="/verify" className="text-indigo-900 hover:text-indigo-600 font-medium">Verify</Link>
            <Link href="/certificate/${cert.id}" className="text-indigo-900 hover:text-indigo-600 font-medium">Certificate</Link>
            <Link href="/profile" className="text-indigo-900 hover:text-indigo-600 font-medium">Profile</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {address ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
                <button
                  onClick={disconnect}
                  className="text-xs text-red-600 hover:underline"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWithMetamask}
                className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Connect Wallet
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-indigo-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 py-2 space-y-2 flex flex-col">
            <Link href="/" className="text-indigo-900 font-medium">Home</Link>
            <Link href="/issue" className="text-indigo-900 font-medium">Issue</Link>
            <Link href="/verify" className="text-indigo-900 font-medium">Verify</Link>
            <Link href="/certificate/${cert.id}" className="text-indigo-900 font-medium">Certificate</Link>
            <Link href="/profile" className="text-indigo-900 font-medium">Profile</Link>
            {address ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
                <button
                  onClick={disconnect}
                  className="text-xs text-red-600 hover:underline"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWithMetamask}
                className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
