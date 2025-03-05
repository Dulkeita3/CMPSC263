import styled from "styled-components";
import Image from "next/image";
import NavBar from "../components/HomeNavBar";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto auto auto;
  align-items: start;
  justify-items: center;
  min-height: 100vh;
  padding: 8px;
  padding-bottom: 20px;
  gap: 16px;
  font-family: var(--font-poppins);

  @media (min-width: 640px) {
    padding: 20px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: black;

  span {
    color: #3b82f6;
  }
`;

const FeatureGrid = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 3.5rem;
  padding: 20px;
  flex-wrap: wrap;
`;

const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 200px;
`;

const FeatureText = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-top: 8px;
`;
const ContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 16px;

  @media (min-width: 768px) {
    gap: 48px;
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  flex-direction: row;
`;

const SectionText = styled.h2`
  font-size: 1rem;
  color: #1f2937;
  line-height: 1.6;
  max-width: 500px;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  height: 18rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function Home() {
  return (
    <Container>
      <NavBar />
      <div style={{ textAlign: "center", padding: "20px 20px" }}>
        <HeroTitle>
          Join The Platform that's <span>Revolutionizing Studying</span>
        </HeroTitle>
        <h1 style={{ fontSize: "3rem", fontWeight: "600", color: "black" }}>
          For Penn State Students
        </h1>
      </div>

      <FeatureGrid>
        <FeatureCard>
          <ImageWrapper>
            <Image
              src="/studysync_images/img3.jpg"
              alt="Feature 1"
              width={150}
              height={150}
            />
          </ImageWrapper>
          <FeatureText>Feature 1</FeatureText>
        </FeatureCard>
        <FeatureCard>
          <ImageWrapper>
            <Image
              src="/studysync_images/img4.jpg"
              alt="Feature 2"
              width={150}
              height={150}
            />
          </ImageWrapper>
          <FeatureText>Feature 2</FeatureText>
        </FeatureCard>
        <FeatureCard>
          <ImageWrapper>
            <Image
              src="/studysync_images/img1.jpg"
              alt="Feature 3"
              width={150}
              height={150}
            />
          </ImageWrapper>
          <FeatureText>Feature 3</FeatureText>
        </FeatureCard>
      </FeatureGrid>

      <ContentGrid>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            flexDirection: "row",
          }}
        >
          <ImageWrapper>
            <Image
              src="/studysync_images/img1.jpg"
              alt="Description"
              width={500}
              height={300}
              priority
            />
          </ImageWrapper>
          <SectionText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore.
          </SectionText>
        </div>

        <Section>
          <SectionText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore.
          </SectionText>
          <ImageWrapper>
            <Image
              src="/studysync_images/img2.jpg"
              alt="Description"
              width={500}
              height={300}
              priority
            />
          </ImageWrapper>
        </Section>
      </ContentGrid>
    </Container>
  );
}
