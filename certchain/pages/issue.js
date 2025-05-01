import Navbar from "../components/NavBar";
import { useAddress } from "@thirdweb-dev/react"; // only for wallet sign in
import { useState, useEffect } from "react";
import { getEthersContract } from "../lib/ethersContract"; // this and the one below will handle the contract
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../lib/certContract";

export default function Issue() {
  //changed owner stuff to below so I want have to put my walletID directly in the code
  const [ownerAddress, setOwnerAddress] = useState(null);
  const address = useAddress();
  useEffect(() => {
    const fetchOwner = async () => {
      if (typeof window.ethereum === "undefined") return;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      const owner = await contract.owner();
      setOwnerAddress(owner.toLowerCase());
    };

    fetchOwner();
  }, []);
  const isAuthorized = address?.toLowerCase() === ownerAddress;

  const [form, setForm] = useState({
    wallet: "",
    name: "",
    program: "",
    date: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //all fields need to filled before someone is allowed to submit
  const allFieldsFilled =
    form.wallet && form.name && form.program && form.date && form.description;

  const canSubmit = isAuthorized && allFieldsFilled;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = getEthersContract(signer);

      const tx = await contract.issueCerts(
        form.wallet,
        form.name,
        form.program,
        form.date,
        form.description
      );

      await tx.wait(); // waiting for the transaction

      alert("✅ Certificate successfully issued!");

      setForm({
        wallet: "",
        name: "",
        program: "",
        date: "",
        description: "",
      });
    } catch (err) {
      console.error("❌ Issue failed:", err);
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  //Because I'm using Sepolia I had to use this hardswitch because my transactions will try to use Testbnb otherwise
  useEffect(() => {
    const switchToSepolia = async () => {
      if (typeof window.ethereum === "undefined") return;

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }], //sepolia
        });
      } catch (switchError) {
        // If the chain is not added to MetaMask, prompt to add it
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0xaa36a7",
                  chainName: "Sepolia Testnet",
                  rpcUrls: ["https://rpc.sepolia.org"],
                  nativeCurrency: {
                    name: "SepoliaETH",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://sepolia.etherscan.io"],
                },
              ],
            });
          } catch (addError) {
            console.error("Failed to add Sepolia:", addError);
          }
        } else {
          console.error("Failed to switch to Sepolia:", switchError);
        }
      }
    };

    switchToSepolia();
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="p-6 max-w-3xl mx-auto bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
          Issue a New Certificate
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
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
              type="submit"
              disabled={!canSubmit || isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? "Issuing..." : "Issue Certificate"}
            </button>
          </div>
        </form>

        {!isAuthorized && (
          <p className="text-center text-red-600 mt-4">
            Connect as Master Wallet to enable and submit the form.
          </p>
        )}

        {errorMsg && (
          <p className="text-center text-red-500 mt-2">Error: {errorMsg}</p>
        )}
      </main>
    </div>
  );
}
