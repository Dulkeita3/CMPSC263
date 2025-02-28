import Head from "next/head";
import styled from "styled-components";

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
  height: 594px;
  background: #d9d9d9;
  border-radius: 45px;
  display: grid;
  place-items: center; /* Centers the content inside */
  text-align: center;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>StudySync</title>
        <meta name="description" content="Welcome to my website!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
      <main>
      <PoppinsHead>Welcome to StudySync</PoppinsHead>
        <SignInDiv>
          <p style={{ textAlign: "center" }}>
            This is a clean starting point for your project.
          </p>
        </SignInDiv>
      </main>
      </PageWrapper>
    </>
  );
}
