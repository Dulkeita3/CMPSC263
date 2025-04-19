import Navbar from "../components/NavBar";

export default function Issue() {
  return (
    <>
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="p-6 max-w-3xl mx-auto bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
          Issue a New Certificate
        </h1>

        {/* Wallet Connect Button */}
        <div className="flex justify-end mb-6">
          <button className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            Connect Wallet
          </button>
        </div>

        {/* Certificate Form */}
        <form className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wallet Address
            </label>
            <input
              type="text"
              placeholder="0x1234abcd..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              placeholder="Jane Doe"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program or Course
            </label>
            <input
              type="text"
              placeholder="Blockchain Fundamentals"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Issuance
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Certificate Description
            </label>
            <textarea
              rows={4}
              placeholder="Certificate awarded for successfully completing the course..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="button"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Issue Certificate
            </button>
          </div>
        </form>
      </main>
      </div>
    </>
  );
}
