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

let Row = styled("div")<LayoutProps | FlexboxProps | SpaceProps>`
  &.home {
    // margin: 0 -11px;
  }
  &.home-after::after {
    content: "";
    display: block;
    position: fixed;
    height: 60px;
    width: 90%;
    background-image: linear-gradient(
      to top,
      #f5f6fa,
      rgba(245, 246, 250, 0) 90%
    );
    bottom: 0;
    right: 50%;
    transform: translate(50%, 0);
    z-index: 999;
  }
  @media (max-width: 576px) {
    &.home {
      margin: 0;
    }
  }
  &.marks {
    flex-wrap: wrap;
    display: flex;
    padding: 10px;
    & > div {
      flex-basis: 50%;
      max-width: 50%;
    }
  }
  @media (max-width: 960px) {
    &.marks > div {
      margin: 10px 0;
      flex-basis: 100%;
      max-width: 100%;
    }
  }
  @media (max-width: 870px) {
    &.marks {
      padding: 0px;
      & > div {
        max-width: 100%;
        padding: 0;
      }
      & a {
        margin: 0;
      }
    }
  }
  ${layout}
  ${flex}
${flexbox}
${space}
`;
Row.defaultProps = {
  display: "flex",
  flexWrap: "wrap",
};
export default Row;
