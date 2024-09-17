import Image from "next/image";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import {
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import { useAppDispatch } from "@/store/hook";
import { setShowProfile } from "../../store/mobilePage";
import Container from "../utility/Container";
import _ from "lodash";
import { setShowOnHeader } from "../../store/pageConfig";
import Link from "next/link";

const MobileHead = styled.div<FlexboxProps | LayoutProps | SpaceProps>`
  display: flex;
  align-items: center;
  // position:relative;
  flex: 1 1 100%;
  background: white;
  position: sticky;
  top: 0;
  &.head::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    background: #d1d1d1;
    height: 1px;
    width: 100%;
    left: 0;
  }
  ${layout}
  ${flexbox}
    ${space}
`;
const IDiv = styled.div<SpaceProps>`
  height: 25px;
  ${space}
`;

// const Whole=styled.div<LayoutProps>`
//     z-index:100;
//     position:sticky;
//     top:0;
//     ${layout}
// `

const Whole = styled.div<HTMLElement | LayoutProps | { shadow: boolean }>(
  (props) => {
    return {
      zIndex: 100,
      position: "sticky",
      top: 0,
      //@ts-ignore
      boxShadow: props.shadow ? "0px 20px 20px 20px #fdfdfdba" : "none",
      background: "white",
    };
  },
  [layout]
);

export default function ProfileTopBar(
  props: PropsWithChildren<{ title: string; icon?: string }>
) {
  const [shadow, setShadow] = useState(false);
  const dispatch = useAppDispatch();

  const moreToCome = useCallback(
    _.throttle((e: any) => {
      if (window.scrollY !== 0) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", moreToCome);

    return () => {
      window.removeEventListener("scroll", moreToCome);
    };
  }, [moreToCome]);

  return (
    <Whole display={["flex", "none"]} shadow={shadow}>
      <Container className={"containerPro"}>
        <MobileHead
          px={"0px"}
          py={"10px"}
          className={"head"}
          justifyContent={"space-between"}
        >
          <MobileHead>
            {props.icon && (
              <div style={{ marginLeft: "5px", height: "30px" }}>
                <Image src={props.icon} height={30} width={30} alt="" />
              </div>
            )}
            <div>{props.title}</div>
          </MobileHead>

          <div>
            {props.children}
            {/* <IDiv onClick={props.onOpen}>
              <Image
                src={"/icons/red category.svg"}
                height={20}
                width={20}
                alt=""
              />
            </IDiv> */}
          </div>
        </MobileHead>
      </Container>
    </Whole>
  );
}
