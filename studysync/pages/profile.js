import Head from "next/head";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/DashNavBar";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f4f4f4;
  font-family: var(--font-poppins), sans-serif;
  padding-top: 60px;
`;

const ProfileContainer = styled.div`
  width: 80%;
  max-width: 600px;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 40px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  background: #f1f5f9;
  cursor: not-allowed;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 12px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(135deg, #2563eb, #1e40af);
    transform: scale(1.05);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(true); // Prevent unnecessary redirects

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/signup"); // Redirect if not authenticated
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserInfo({
            firstName: userData.personalInfo?.firstName || "",
            lastName: userData.personalInfo?.lastName || "",
            email: user.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Ensures page doesn't redirect while checking auth
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, userInfo.email);
      alert("Password reset email has been sent to your inbox.");
    } catch (error) {
      console.error("Error sending reset email: ", error);
      alert("Error sending reset email. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <PageWrapper>
        <NavBar />
        <ProfileContainer>
          <h2>Your Profile</h2>
          <form>
            <Input type="text" value={userInfo.firstName} disabled />
            <Input type="text" value={userInfo.lastName} disabled />
            <Input type="email" value={userInfo.email} disabled />
            <Button type="button" onClick={handleResetPassword}>
              Reset Password
            </Button>
          </form>
        </ProfileContainer>
      </PageWrapper>
    </>
  );
}
