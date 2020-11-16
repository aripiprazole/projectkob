import styled from "styled-components";

const ShrinkContainer = styled.main`
  max-width: ${(props) => props.theme.breakpoints.width("lg")}px;
  width: 100%;
  flex: 1;
  margin: 0 auto;
`;

export default ShrinkContainer;
