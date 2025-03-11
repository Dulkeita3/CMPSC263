import styled from "styled-components";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
const Nav = styled.nav`
  background-color: #1f2937;
  color: white;
  padding: 16px;
`;

const NavItem = styled.li`
  margin: 0 16px;
  transition: color 0.3s ease-in-out;
  list-style: none;

  &:hover {
    color: #d1d5db;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Button = styled.li`
  margin: 0 16px;
  background-color: #3b82f6;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
  list-style: none;

  &:hover {
    background-color: #2563eb;
  }

  a {
    display: block;
    text-decoration: none;
    color: white;
  }
`;

export default function NavBar() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signup"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error.message);
      return;
    }
  };
  return (
    <Nav>
      <ul
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <NavItem>
          <NavLink href="/landingPage">Available Sessions</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/yourSessions">Make a Session</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/classes">Edit Classes</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/profile">Profile</NavLink>
        </NavItem>
        <Button onClick={handleLogout}>
          <NavLink>Log Out</NavLink>
        </Button>
      </ul>
    </Nav>
  );
}
