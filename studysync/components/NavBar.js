import styled from "styled-components";

const Nav = styled.nav`
  background-color: #1f2937;
  color: white;
  padding: 16px;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  return (
    <Nav>
      <ul style={{display: "flex",
  justifyContent: "space-between",
  alignItems: "center"}}>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about">About Us</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/contact">Contact Us</NavLink>
        </NavItem>
        <Button>
          <NavLink href="/signup">Sign In/Get Started</NavLink>
        </Button>
      </ul>
    </Nav>
  );
}
