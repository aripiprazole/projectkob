import styled from "styled-components";

const ShrinkContainer = styled.main`
  max-width: ${(props) => props.theme.breakpoints.width("lg")}px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export default ShrinkContainer;
