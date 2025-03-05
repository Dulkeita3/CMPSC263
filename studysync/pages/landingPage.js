import Head from "next/head";
import styled from "styled-components";
import { useEffect, useState } from "react";
import NavBar from "../components/DashNavBar"; // Reusing Navbar component
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f4f4f4;
  font-family: var(--font-poppins), sans-serif;
`;

const DashboardContainer = styled.div`
  width: 80%;
  max-width: 900px;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 40px;
`;

const Message = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 14px;
  margin-top: 12px;
  background: ${(props) =>
    props.disabled ? "#d1d5db" : "linear-gradient(135deg, #3b82f6, #2563eb)"};
  color: ${(props) => (props.disabled ? "#6b7280" : "white")};
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: ${(props) =>
      props.disabled ? "#d1d5db" : "linear-gradient(135deg, #2563eb, #1e40af)"};
    transform: ${(props) => (props.disabled ? "none" : "scale(1.05)")};
    box-shadow: ${(props) =>
      props.disabled ? "none" : "0px 4px 15px rgba(0, 0, 0, 0.2)"};
  }
`;

export default function Dashboard() {
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [userId, setUserId] = useState(null);

  const router = useRouter();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/signup"); // Redirect to login if not authenticated
      } else {
        console.log(user.uid);
        setUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <>
      <Head>
        <title>StudySync - Dashboard</title>
      </Head>

      <PageWrapper>
        <NavBar />
        <DashboardContainer>
          {enrolledClasses.length === 0 ? (
            <Message>Please select your classes before beginning.</Message>
          ) : (
            <Message>Here are your available study sessions:</Message>
          )}
          <Button disabled={enrolledClasses.length === 0}>
            Create New Study Session
          </Button>
        </DashboardContainer>
      </PageWrapper>
    </>
  );
}
