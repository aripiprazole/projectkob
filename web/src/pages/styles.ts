import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  padding: 24px;
`;

export const Services = styled.ul`
  padding: 24px 0;
  gap: 20px;
`;

export const Service = styled.li``;

export const ServiceLink = styled.a`
  font-weight: bold;

  display: flex;
  justify-content: center;
  flex-direction: column;

  border: 1px solid #ddd;
  border-radius: 12px;

  padding: 24px 64px;
  width: fit-content;

  cursor: pointer;

  > svg {
    margin: 12px auto;
  }

  > svg,
  > svg *,
  > h3 {
    color: #333;
  }
`;
