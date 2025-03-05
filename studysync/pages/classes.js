import Head from "next/head";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/DashNavBar";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f4f4f4;
  font-family: var(--font-poppins), sans-serif;
`;

const ClassesContainer = styled.div`
  width: 80%;
  max-width: 600px;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 40px;
`;

const ClassList = styled.div`
  margin: 20px 0;
  text-align: left;
`;

const ClassItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
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

const classOptions = [
  { name: "CMPSC 263", credits: 3 },
  { name: "CMPSC 331", credits: 3 },
  { name: "MATH 230", credits: 4 },
  { name: "MATH 319", credits: 3 },
  { name: "Music 11Z", credits: 2 },
  { name: "AFAM 101", credits: 1 },
];

export default function EditClasses() {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        setUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const addClass = (cls) => {
    const totalCredits = selectedClasses.reduce((acc, c) => acc + c.credits, 0);
    if (totalCredits + cls.credits <= 19) {
      setSelectedClasses([...selectedClasses, cls]);
    }
  };

  const removeClass = (cls) => {
    setSelectedClasses(selectedClasses.filter((c) => c.name !== cls.name));
  };

  const saveClasses = async () => {
    if (!userId) {
      console.error("No user logged in");
      return;
    }

    await setDoc(doc(db, "users", userId), { classes: selectedClasses });
  };

  return (
    <>
      <Head>
        <title>StudySync - Edit Classes</title>
      </Head>
      <NavBar />
      <PageWrapper>
        <ClassesContainer>
          <h2>Edit Your Classes</h2>
          <p>
            Total Credits: {selectedClasses.reduce((acc, cls) => acc + cls.credits, 0)}/19
          </p>
          <Button onClick={saveClasses} disabled={selectedClasses.length === 0}>
            Save Classes
          </Button>
          <ClassList>
            {selectedClasses.map((cls) => (
              <ClassItem key={cls.name}>
                {cls.name} - {cls.credits} credits
                <Button onClick={() => removeClass(cls)}>Remove</Button>
              </ClassItem>
            ))}
          </ClassList>
          <h3>Available Classes</h3>
          {classOptions.map((cls) => (
            <Button
              key={cls.name}
              onClick={() => addClass(cls)}
              disabled={
                selectedClasses.some((c) => c.name === cls.name) ||
                selectedClasses.reduce((acc, c) => acc + c.credits, 0) + cls.credits >
                  19
              }
            >
              Add {cls.name} - {cls.credits} credits
            </Button>
          ))}
        </ClassesContainer>
      </PageWrapper>
    </>
  );
}
