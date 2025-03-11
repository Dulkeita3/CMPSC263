import Head from "next/head";
import styled from "styled-components";
import NavBar from "../components/HomeNavBar";
import Image from "next/image";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f4f4f4;
  font-family: var(--font-poppins), sans-serif;
  padding-top: 60px;
`;

const AboutContainer = styled.div`
  width: 80%;
  max-width: 900px;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 40px;
`;

const AboutImage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  border-radius: 12px;
  overflow: hidden;
`;

const Section = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const SectionTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 18px;
  color: #374151;
  line-height: 1.6;
  margin-top: 10px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

const ListItem = styled.li`
  font-size: 18px;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
  gap: 8px;

  &::before {
    content: "✔";
    color: #3b82f6;
    font-weight: bold;
  }
`;

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <PageWrapper>
        <NavBar />
        <AboutContainer>
          <h2>About StudySync</h2>
          <AboutImage>
            <Image
              src="/studysync_images/img3.jpg"
              alt="About StudySync"
              width={600}
              height={300}
              layout="responsive"
            />
          </AboutImage>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>

          {/* Mission Section */}
          <Section>
            <SectionTitle>Our Mission</SectionTitle>
            <Text>
              StudySync is dedicated to helping students succeed academically by
              providing a collaborative and interactive learning environment.
              Our goal is to revolutionize studying through seamless technology
              integration.
            </Text>
          </Section>

          {/* Features Section */}
          <Section>
            <SectionTitle>Key Features</SectionTitle>
            <List>
              <ListItem>Effortless study session scheduling</ListItem>
              <ListItem>Real-time collaboration with peers</ListItem>
              <ListItem>Customizable study groups based on enrolled classes</ListItem>
              <ListItem>Secure and user-friendly interface</ListItem>
            </List>
          </Section>

          {/* How It Works Section */}
          <Section>
            <SectionTitle>How It Works</SectionTitle>
            <List>
              <ListItem>Sign up and enroll in your classes</ListItem>
              <ListItem>Connect with classmates taking the same courses</ListItem>
              <ListItem>Create and join study sessions tailored to your schedule</ListItem>
              <ListItem>Enhance your learning experience through collaboration</ListItem>
            </List>
          </Section>

          {/* Contact Section */}
          <Section>
            <SectionTitle>Get in Touch</SectionTitle>
            <Text>
              Have any questions or suggestions? Reach out to us on our{" "}
              <a href="/contact" style={{ color: "#3b82f6", fontWeight: "bold" }}>
                Contact Page
              </a>
              !
            </Text>
          </Section>
        </AboutContainer>
      </PageWrapper>
    </>
  );
}
