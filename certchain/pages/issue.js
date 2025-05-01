import Navbar from "../components/NavBar";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { useState } from "react";
import { CONTRACT_ADDRESS } from "../lib/certContract";


export default function Issue() {
  const address = useAddress();
  const authorizedAddress =
    "0xb85292FB86f1736dFf66838038Df0fB6498baEd8".toLowerCase();
  const isAuthorized = address && address.toLowerCase() === authorizedAddress;

  const [form, setForm] = useState({
    wallet: "",
    name: "",
    program: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const allFieldsFilled =
    form.wallet && form.name && form.program && form.date && form.description;

  const canSubmit = isAuthorized && allFieldsFilled;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="p-6 max-w-3xl mx-auto bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
          Issue a New Certificate
        </h1>

        <form className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wallet Address
            </label>
            <input
              type="text"
              name="wallet"
              value={form.wallet}
              onChange={handleChange}
              placeholder="0x1234abcd..."
              disabled={!isAuthorized}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              disabled={!isAuthorized}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program or Course
            </label>
            <input
              type="text"
              name="program"
              value={form.program}
              onChange={handleChange}
              placeholder="Blockchain Fundamentals"
              disabled={!isAuthorized}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Issuance
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              disabled={!isAuthorized}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Certificate Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Certificate awarded for successfully completing the course..."
              disabled={!isAuthorized}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            />
          </div>

          <div className="pt-4">
            <button
              type="button"
              disabled={!canSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
            >
              Issue Certificate
            </button>
          </div>
        </form>

        {!isAuthorized && (
          <p className="text-center text-red-600 mt-4">
            Connect as Master Wallet to enable and submit the form.
          </p>
        )}
      </main>
    </div>
  );
}
