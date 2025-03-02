import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MainPage() {
  return (
    <>
      <Head>
        <title>StudySync</title>
        <meta name="description" content="Welcome to my website!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>We made it here!</h1>
    </>
  );
}
