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

  const ContinueClick = () => {
    if (email.length != 15) {
      setError("Please enter email in proper abc1234@gmail.com");
    } else {
      setError("");
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
      {state === "Initial" && (
        <>
          <PageWrapper>
            <main>
              <PoppinsHead>Welcome to StudySync</PoppinsHead>
              <SignInDiv>
                <p>First, enter your Penn State email</p>
                <Inputs
                  placeholder="abc1234@psu.edu"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <button onClick={ContinueClick}>Continue</button>
                <h1>OR</h1>
                <button>Log In</button>
              </SignInDiv>
            </main>
          </PageWrapper>
        </>
      )}
    </> //end
  );
}
