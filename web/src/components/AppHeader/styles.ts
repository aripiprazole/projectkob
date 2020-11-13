import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  max-width: 1000px;
  margin: auto;

  > h1 {
    display: flex;
    align-items: center;
  }

  > h1 > span {
    margin-left: 8px;
  }

  > ul {
    display: flex;
    gap: 12px;
  }
`;

export const Action = styled.button`
  padding: 12px;

  cursor: pointer;

  border: 1px solid transparent;
  border-radius: 12px;

  transition: filter 150ms ease-in;
  transition: border 150ms ease-in;

  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    text-transform: uppercase;
    font-weight: bold;

    margin: 0 8px;
  }

  :disabled {
    filter: brightness(90%);
    cursor: not-allowed;
    border: 1px solid #a9a9a9;
  }

  :hover {
    filter: brightness(90%);
    border: 1px solid #a9a9a9;
  }
`;

export const LogsAction = styled(Action)`
  background: #ddd;
  border: 1px solid #a9a9a9;
`;
