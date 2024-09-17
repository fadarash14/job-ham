import styled from "styled-components";
import {
  color,
  ColorProps,
  flex,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import { HTMLAttributes } from "react";

let Container = styled.div.attrs<
  LayoutProps | FlexboxProps | ColorProps | SpaceProps | HTMLAttributes<any>
>((props) => {
  return { className: `${props.className} container` };
})<LayoutProps | FlexboxProps | ColorProps | SpaceProps | HTMLAttributes<any>>`
  ${layout}
  ${flexbox}
${flex} 
${space}
${color}
`;

export default Container;
