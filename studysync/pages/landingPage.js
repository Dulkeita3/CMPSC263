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
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  FieldValue,
  deleteField,
} from "firebase/firestore";

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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Message = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 20px;
`;

const Select = styled.select`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  background: white;
`;

const StudySessionCard = styled.div`
  background: #ffffff;
  padding: 20px;
  margin: 10px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const Button = styled.button`
  width: 100%;
  max-width: 200px;
  padding: 10px;
  margin: 5px;
  background: ${(props) => (props.disabled ? "#d1d5db" : "#3b82f6")};
  color: ${(props) => (props.disabled ? "#6b7280" : "white")};
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: ${(props) => (props.disabled ? "#d1d5db" : "#2563eb")};
  }
`;

export default function Dashboard() {
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [userId, setUserId] = useState(null);
  const [studySessions, setStudySessions] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const router = useRouter();

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
  useEffect(() => {
    const syncUserStudySessions = async () => {
      if (!userId) return;

      try {
        //  Fetch all study sessions
        const studySessionsSnapshot = await getDocs(
          collection(db, "studySessions")
        );
        const existingSessionIds = new Set(
          studySessionsSnapshot.docs.map((doc) => doc.id)
        );

        //  Fetch the user's study sessions
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userStudySessions = userData.studySessions || {};

          let updates = {};
          let hasOrphanedSessions = false;

          Object.keys(userStudySessions).forEach((sessionId) => {
            if (!existingSessionIds.has(sessionId)) {
              updates[`studySessions.${sessionId}`] = deleteField();

              hasOrphanedSessions = true;
            }
          });

          //  If the session doesn't exist in the main studySession collection , remove them from the user's collection
          if (hasOrphanedSessions) {
            await updateDoc(userRef, updates);
            console.log("Removed deleted study sessions from user.");
          }
        }
      } catch (error) {
        console.error("Error syncing user study sessions:", error);
      }
    };

    if (userId) {
      syncUserStudySessions();
    }
  }, [userId]); // Runs every time userId changes (on login)

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const userClasses = userDoc.data().classes || [];
          setEnrolledClasses(userClasses);

          const querySnapshot = await getDocs(collection(db, "studySessions"));
          const sessions = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const filteredSessions = sessions.filter((session) =>
            userClasses.some((cls) => cls.name === session.class)
          );

          setStudySessions(filteredSessions);
        }
      } catch (error) {
        console.error("Error fetching study sessions:", error);
      }
    };

    fetchData();
  }, [userId]);

  const joinStudySession = async (sessionId) => {
    try {
      const sessionRef = doc(db, "studySessions", sessionId);
      await updateDoc(sessionRef, {
        attendees: arrayUnion(userId),
      });

      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        [`studySessions.${sessionId}`]: { joined: true },
      });

      setStudySessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === sessionId
            ? { ...session, attendees: [...session.attendees, userId] }
            : session
        )
      );
    } catch (error) {
      console.error("Error joining session:", error);
    }
  };

  const leaveOrDeleteStudySession = async (sessionId, createdBy) => {
    try {
      if (userId === createdBy) {
        // DELETE session if the user is the creator
        await deleteDoc(doc(db, "studySessions", sessionId));

        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          [`studySessions.${sessionId}`]: deleteField(),
        });

        setStudySessions((prevSessions) =>
          prevSessions.filter((session) => session.id !== sessionId)
        );

        alert("Study session deleted.");
      } else {
        // LEAVE session if the user is not the creator
        const sessionRef = doc(db, "studySessions", sessionId);
        await updateDoc(sessionRef, {
          attendees: arrayRemove(userId),
        });

        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          [`studySessions.${sessionId}`]: null,
        });

        setStudySessions((prevSessions) =>
          prevSessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  attendees: session.attendees.filter((id) => id !== userId),
                }
              : session
          )
        );

        alert("You have left the session.");
      }
    } catch (error) {
      console.error("Error leaving/deleting session:", error);
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
              <Message>Here are all available study sessions!:</Message>
              <Select onChange={(e) => setSelectedClass(e.target.value)}>
                <option value="">Select a class</option>
                {enrolledClasses.map((cls) => (
                  <option key={cls.name} value={cls.name}>
                    {cls.name}
                  </option>
                ))}
              </Select>

              {studySessions
                .filter((session) =>
                  selectedClass ? session.class === selectedClass : true
                )
                .map((session) => (
                  <StudySessionCard key={session.id}>
                    <p>
                      <strong>Class:</strong> {session.class}
                    </p>
                    <p>
                      <strong>Location:</strong> {session.location}
                    </p>
                    <p>
                      <strong>Time:</strong> {session.time}
                    </p>

                    <Button
                      disabled={session.attendees?.includes(userId)}
                      onClick={() => joinStudySession(session.id)}
                    >
                      {session.attendees?.includes(userId) ? "Joined" : "Join"}
                    </Button>

                    <Button
                      onClick={() =>
                        leaveOrDeleteStudySession(session.id, session.createdBy)
                      }
                    >
                      {session.createdBy === userId ? "Delete" : "Leave"}
                    </Button>
                  </StudySessionCard>
                ))}
            </>
          )}
        </DashboardContainer>
      </PageWrapper>
    </>
  );
}
