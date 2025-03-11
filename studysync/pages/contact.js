import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";
import NavBar from "../components/HomeNavBar";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f4f4f4;
  font-family: var(--font-poppins), sans-serif;
  padding-top: 60px;
`;

const ContactContainer = styled.div`
  width: 80%;
  max-width: 600px;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 40px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  resize: vertical;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 12px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(135deg, #2563eb, #1e40af);
    transform: scale(1.05);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;
`;

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFirstName("");
    setLastName("");
    setMessage("");
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000); // Message disappears after 5 seconds
  };

  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <PageWrapper>
        <NavBar />
        <ContactContainer>
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <TextArea
              rows="5"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Button type="submit">Send Message</Button>
          </form>
          {showSuccess && (
            <SuccessMessage>
              We've received your message and will respond soon.
            </SuccessMessage>
          )}
        </ContactContainer>
      </PageWrapper>
    </>
  );
}
