import Head from "next/head";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import NavBar from "../components/NavBar";

const PoppinsHead = styled.h1`
  font-family: var(--font-poppins), sans-serif;
  text-align: center;
  font-weight: 700; /* Bold */
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #3b82f6,
    #2563eb
  ); /* Gradient background */
  font-family: var(--font-poppins), sans-serif;
`;

const SignInDiv = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  width: 420px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const Inputs = styled.input.attrs((props) => ({
  maxLength: props.maxLength || 15, //using the maxLength property so there aren't long inputs being accepeted
}))`
  width: 100%;
  padding: 14px;
  margin: 10px 0;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.3s ease-in-out;

  &:focus {
    border: 2px solid #3b82f6; /* Highlight effect */
    outline: none;
  }
`;
const Button = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 12px;
  background: ${(props) =>
    props.backgroundColor ||
    "linear-gradient(135deg, #3b82f6, #2563eb)"}; //linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }
`;
const ErrorMessage = styled.p`
  color: ${(props) => props.color || "red"};
  font-size: 18px;
  font-weight: bold;
`;
export default function Home() {
  const router = useRouter();
  const [state, setState] = useState("Initial");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const psuEmailRegex = /^[a-z]{3}[0-9]{4}@psu\.edu$/;
  // password has to start with a capital letter, contain a number, special character, and be 6 or more characters
  const goodPasswordRegex = /^[A-Z].{5,}(?=.*\d)(?=.*[@$!%*?&])/;

  //keeps track of the input being passed through out main input box, if it's empty it doesn't display any error messages
  const inputResponse = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Clear error if input is empty
    if (value.trim() === "") {
      setError("");
    }
  };

  //when enter is clicked for the input or the Continue button is clicked, this checks to make sure we have a non-blank psu email.
  // If we do then we continue with the sign up process
  const continueSignUp = () => {
    // making sure we don't have a blank email trying to be passed through
    if (email.trim === "") {
      setError("Email can not be blank!");
    }
    //testing the email to see if it's in psu format, if it is then we negate it to skip the if statement, if it isn't then we setError equal to the text
    else if (!psuEmailRegex.test(email)) {
      setError("Your email is not in abc1234@psu.com format");
    } else {
      setError("");
      setState("SignUp");
    }
  };
  // if we hit enter in the input box it takes us to the continueSignUp event handler
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      continueSignUp();
    }
  };
  const handleBack = () => {
    setNumber("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setError("");
    setEmail("");
    setState("Initial");
  };
  const handlePhoneNumber = (e) => {
    let inputValue = e.target.value.replace(/\D/g, ""); //only allows numbers to be inputted
    // if we're between 4 and 6 characters we'll add a - between the first 3 digits and the fourth
    if (inputValue.length > 3 && inputValue.length <= 6) {
      inputValue = inputValue.slice(0, 3) + "-" + inputValue.slice(3);
    }
    //put a hypen between the 6th and 7th digit
    else if (inputValue.length > 6) {
      inputValue =
        inputValue.slice(0, 3) +
        "-" +
        inputValue.slice(3, 6) +
        "-" +
        inputValue.slice(6);
    }
    setNumber(inputValue);
  };

  const handleSignUp = async () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      number.length < 12
    ) {
      setError("Please Properly fill out the fields above");
      return;
    } else if (!goodPasswordRegex.test(password)) {
      setError("Please set a proper password using the guidelines below");
      return;
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          firstName,
          lastName,
          email: user.email,
          phone: number,
          createdAt: new Date(),
        });

        console.log("User signed up:", user);
        setError("");
        router.push("/landingPage");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setError("This email is already in use. Please log in instead.");
        } else {
          console.error("Error signing up:", error.message);
          setError(error.message);
        }
      }
    }
  };

  const handleLogIn = async () => {
    setError("");
    setSuccessMessage("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // Authenticate User
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in:", user);

      //Redirect after successful login
      router.push("/landingPage");
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError(
        "Invalid Information, please check your email and password and try again"
      );
    }
  };

  const handlePasswordReset = async (email) => {
    if (!email.trim()) {
      setError("Please enter your email to reset your password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("A password reset email has been sent to your inbox.");
      setError("");
    } catch (error) {
      console.error("Error sending reset email:", error.message);
      setError(error.message);
    }
  };
  return (
    //start
    <>
      <Head>
        <title>StudySync</title>
        <meta name="description" content="Welcome to my website!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*The initial state is the state we load into, from here we can eithe go to signing the user up or logging in with prior credentials*/}
      {state === "Initial" && (
        <>
          <PageWrapper>
            <NavBar />
            <main>
              <SignInDiv>
                <PoppinsHead style={{ fontSize: "30px" }}>
                  Welcome to StudySync
                </PoppinsHead>
                <p>First, enter your Penn State email</p>
                <Inputs
                  placeholder="abc1234@psu.edu"
                  value={email}
                  onChange={inputResponse}
                  onKeyDown={handleEnter}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button onClick={continueSignUp}>Continue</Button>
                <h1>OR</h1>
                <Button
                  onClick={() => {
                    setState("LogIn");
                    setEmail("");
                  }}
                >
                  Log In
                </Button>
              </SignInDiv>
            </main>
          </PageWrapper>
        </>
      )}
      {state === "SignUp" && (
        <>
          <>
            <PageWrapper>
              <NavBar />
              <main>
                <SignInDiv>
                  <PoppinsHead style={{ fontSize: "30px" }}>
                    Finish Signing up StudySync
                  </PoppinsHead>
                  <p>
                    Enter the basic information below to revolutionize your
                    studying!
                  </p>
                  <Inputs
                    //first name
                    maxLength={10}
                    placeholder="first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    //onChange={inputResponse}
                    //onKeyDown={handleEnter}
                  />
                  <Inputs
                    //last name
                    maxLength={10}
                    placeholder="last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    //onChange={inputResponse}
                    //onKeyDown={handleEnter}
                  />
                  <Inputs
                    //phone number
                    maxLength={12}
                    placeholder="000-000-0000"
                    value={number}
                    onChange={handlePhoneNumber}
                    //onChange={inputResponse}
                    //onKeyDown={handleEnter}
                  />
                  <Inputs
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    //onKeyDown={handleEnter}
                  />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                  <p>
                    Passowrd should start with a capital letter, contain at
                    least 1 number, 1 special character, and be at least 6
                    characters
                  </p>
                  {/*should be able to reuse this for different states */}
                  <Button onClick={handleSignUp}>Sign Up</Button>
                  <Button backgroundColor="gray" onClick={handleBack}>
                    Back
                  </Button>
                  <h1>OR</h1>
                  <Button
                    onClick={() => {
                      setError("");
                      setEmail("");
                      setPassword("");
                      setState("LogIn");
                    }}
                  >
                    Log In
                  </Button>
                </SignInDiv>
              </main>
            </PageWrapper>
          </>
        </>
      )}
      {state === "LogIn" && (
        <>
          <PageWrapper>
            <NavBar />
            <main>
              <SignInDiv>
                <PoppinsHead style={{ fontSize: "30px" }}>
                  Welcome to StudySync
                </PoppinsHead>
                <p>Enter your Penn State email and StudySync password below</p>
                <Inputs
                  placeholder="abc123@psu.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  //onKeyDown={handleEnter}
                />
                <Inputs
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  //onKeyDown={handleEnter}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {successMessage && (
                  <ErrorMessage color="green">{successMessage}</ErrorMessage>
                )}
                <Button onClick={handleLogIn}>Log In</Button>
                <Button backgroundColor="gray" onClick={handleBack}>
                  Back
                </Button>

                <p style={{ fontWeight: "bold" }}>Forgot your password?</p>
                <Button
                  backgroundColor="#07004D"
                  onClick={() => handlePasswordReset(email)}
                >
                  Reset Password
                </Button>
              </SignInDiv>
            </main>
          </PageWrapper>
        </>
      )}
    </> //end
  );
}
