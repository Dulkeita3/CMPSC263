import Navbar from "../components/NavBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <h1>Verifiable Certificates. Decentralized. Secure.</h1>
        <p>Issue and verify credentials with blockchain-backed trust.</p>
      </main>
    </>
  );
}
