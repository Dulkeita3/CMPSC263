// components/NavBar.js
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  // Function to check if a link is active
  const isActive = (path) => router.pathname === path;

  return (
    <nav>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, auto)",
          justifyContent: "space-between",
          listStyleType: "none",
          //width: "100%",
        }}
      >
        <li>Home</li>
        <li>About Us</li>
        <li>Contact Us</li>
        <li>Sign In/Get Started</li>
      </ul>
    </nav>
  );
}
