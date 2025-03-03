// components/PageWrapper.js
import styled from "styled-components";

const PageWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  background: ${({ background }) => background || "#f4f4f4"};
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: auto;
  padding: ${({ padding }) => padding || "0 40px"};
  gap: 16px;
`;

export default PageWrapper;
