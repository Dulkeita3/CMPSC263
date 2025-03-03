import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const PageWrapper = styled.div`
  display: grid;
  height: 100vh; /* Full viewport height */
  background: #f4f4f4;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 1fr;
`;
const NavBar = styled.nav`
  grid-column: 8 / 13; //row-start col-start row-end col-end
  //margin-right: 40px;
  display: grid;
  grid-template-columns: auto(4, 1fr);
  //display: flex;
  //flex-direction: row;
`;
export default function MainPage() {
  const router = useRouter();
  const [page, setPage] = useState("Home");
  return (
    <>
      <Head>
        <title>StudySync</title>
        <meta name="description" content="Welcome to my website!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        {/*Put everything in between here */}
        <NavBar>
          <ul
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              //marginRight: "40px",
            }}
          >
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Sign In/Get Started</li>
          </ul>
        </NavBar>
        <div
          style={{
            gridRow: "2/7",
            gridColumn: "1/13",
            height: "100%",
            width: "100%",
            alignContent: "center",
          }}
        >
          <h1 style={{ justifySelf: "center", alignContent: "center" }}>
            Join The Platform that's Revolutionizing Studying
          </h1>
          <h1 style={{ justifySelf: "center", alignContent: "center" }}>
            For Penn State Students
          </h1>
        </div>
        <div
          style={{
            gridRow: "7/13",
            gridColumn: "1/13",
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            gap: "30px",
            padding: "0 40px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{ backgroundColor: "red", height: "100%", width: "100%" }}
          ></div>
          <div
            style={{ backgroundColor: "blue", height: "100%", width: "100%" }}
          ></div>
          <div
            style={{ backgroundColor: "black", height: "100%", width: "100%" }}
          ></div>
        </div>
      </PageWrapper>
      {/*Put everything in between here */}
    </>
  );
}
