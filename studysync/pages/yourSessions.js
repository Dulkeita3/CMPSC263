import Head from "next/head";
import styled from "styled-components";
import { useEffect, useState } from "react";
import NavBar from "../components/DashNavBar";
import { useRouter } from "next/router";
import { auth, db } from "../lib/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

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

const StudySessionForm = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: 80%;
  max-width: 500px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;

export default function Dashboard() {
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");

  const router = useRouter();

  //Fetch user info and enrolled classes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/signup");
      } else {
        setUserId(user.uid);
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setEnrolledClasses(userDoc.data().classes || []);
          }
        } catch (error) {
          console.error("Error fetching enrolled classes:", error);
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Create a new study session
  const createStudySession = async () => {
    if (!selectedClass || !location || !time) {
      alert("Please fill out all fields.");
      return;
    }

    const sessionId = uuidv4();
    const newSession = {
      class: selectedClass,
      location,
      time,
      createdBy: userId,
      attendees: [userId],
    };

    try {
      //  Add study session to `studySessions` collection
      await setDoc(doc(db, "studySessions", sessionId), newSession);

      //  Merge study session into `users` collection
      await updateDoc(doc(db, "users", userId), {
        [`studySessions.${sessionId}`]: {
          attendance: 1,
          class: selectedClass,
          createdBy: userId,
          location,
          time,
        },
      });

      alert("Study session created successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Error creating study session:", error);
    }
  };

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
            <>
              <Message>Mkae a study session!:</Message>
              <Button
                disabled={enrolledClasses.length === 0}
                onClick={() => setShowForm(true)}
              >
                Create New Study Session
              </Button>
            </>
          )}

          {/* ✅ Study Session Form */}
          <StudySessionForm visible={showForm}>
            <h3>Create Study Session</h3>
            <Select onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="">Select Class</option>
              {enrolledClasses.map((cls) => (
                <option key={cls.name} value={cls.name}>
                  {cls.name}
                </option>
              ))}
            </Select>
            <Input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Time (e.g., 3:30 PM)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <Button onClick={createStudySession}>Save Session</Button>
          </StudySessionForm>
        </DashboardContainer>
      </PageWrapper>
    </>
  );
}
