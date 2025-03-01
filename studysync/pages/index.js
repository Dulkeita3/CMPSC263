import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";

const PoppinsHead = styled.h1`
  font-family: var(--font-poppins), sans-serif;
  text-align: center;
  font-weight: 700; /* Bold */
`;

const PageWrapper = styled.div`
  display: grid;
  place-items: center; /* Centers the content */
  height: 100vh; /* Full viewport height */
  background: #f4f4f4;
`;

const SignInDiv = styled.div`
  width: 584px;
  height: 500px;
  background: #d9d9d9;
  border-radius: 45px;
  //display: grid;
  //place-items: center; /* Centers the content inside */
  text-align: center;
`;

const Inputs = styled.input`
  height: 44px;
  padding: 11px 12px 13px;
  font-size: 18px;
  line-height: 1.3333;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;
export default function Home() {
  const [state, setState] = useState("Initial");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const psuEmailRegex = /^[a-z]{3}[0-9]{4}@psu\.edu$/;

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
            <main>
              <PoppinsHead>Welcome to StudySync</PoppinsHead>
              <SignInDiv>
                <p>First, enter your Penn State email</p>
                <Inputs
                  placeholder="abc1234@psu.edu"
                  onChange={inputResponse}
                  onKeyDown={handleEnter}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <button onClick={continueSignUp}>Continue</button>
                <h1>OR</h1>
                <button>Log In</button>
              </SignInDiv>
            </main>
          </PageWrapper>
        </>
      )}
      {state === "SignUp" && (
        <>
          <>
            <PageWrapper>
              <main>
                <PoppinsHead>Finish Signing up StudySync</PoppinsHead>
                <SignInDiv>
                  <p>
                    Enter the basic information below to revolutionize your
                    studying!
                  </p>
                  <Inputs
                    placeholder="abc1234@psu.edu"
                    onChange={inputResponse}
                    onKeyDown={handleEnter}
                  />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                  <button onClick={continueSignUp}>Continue</button>
                  <h1>OR</h1>
                  <button>Log In</button>
                </SignInDiv>
              </main>
            </PageWrapper>
          </>
        </>
      )}
    </> //end
  );
}
