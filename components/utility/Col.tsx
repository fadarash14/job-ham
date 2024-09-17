import styled from "styled-components";
import {
  flex,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";

const Col = styled("div")<SpaceProps | LayoutProps | FlexboxProps>`
  padding: 0 5px;
  @media (max-width: 576px) {
    padding: 5px 0;
  }
  ${layout}
  ${flex}
${flexbox}
${space}
`;
Col.defaultProps = {
  flexBasis: ["33.3%", "25%"],
};
export default Col;
