import styled from "styled-components";

export const Container = styled.form`
  width: 100%;
  max-width: 1000px;
  margin: auto;

  > h3 {
    margin: 24px 0;
  }

  > ul {
    display: flex;
    flex-direction: column;
    gap: 12px;

    width: 100%;
    max-width: 500px;
  }

  > ul > li {
    width: 100%;
  }
`;

export const InfoLabel = styled.label``;

export const InfoField = styled.input`
  border-radius: 12px;
  border: 1px solid #a9a9a9;

  padding: 8px;

  :disabled {
    filter: brightness(99%);
  }
`;

export const FieldContainer = styled.li`
  display: flex;
  flex-direction: column;
`;

export const Action = styled.button`
  text-transform: uppercase;
  font-weight: bold;
  padding: 8px;

  border-radius: 8px;
  border: none;

  :hover {
    filter: brightness(90%);
  }
`;
