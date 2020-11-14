import styled from "styled-components";

export const Container = styled.form`
  width: 100%;
  max-width: 1000px;
  margin: auto;

  > h3 {
    margin: 24px 0;
  }

  > .info {
    display: flex;
    flex-direction: column;
    gap: 12px;

    width: 100%;
    max-width: 500px;
  }
`;

export const Fieldset = styled.fieldset`
  display: flex;
  gap: 12px;

  border: none;

  width: 100%;

  > .MuiTextField-root {
    flex: 1;
  }
`;
