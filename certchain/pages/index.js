import Navbar from "../components/NavBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold text-blue-600">Welcome</h1>
        <p>This content is padded nicely!</p>
      </main>
    </>
  );
}
