import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import {
  SpaceProps,
  space,
  FlexboxProps,
  flexbox,
  layout,
  LayoutProps,
} from "styled-system";
import Container from "../utility/Container";
import Link from "next/link";
import InitialLogIn from "../log in/InitialLogIn";

const Img = styled.div<SpaceProps>`
  align-self: center;
  display: flex;
  ${space}
`;

const Menu = styled.div<SpaceProps>`
  align-self: center;
  display: flex;
  ${space}
`;

const Flex = styled.div<FlexboxProps | SpaceProps | LayoutProps>`
  ${layout}
  ${flexbox}
    ${space}
`;

const Text = styled.div<SpaceProps>`
  color: #474546;
  font-size: 14px;
  flex: 1 1;
  ${space}
`;
type Props = {
  onOpen: () => void;
};
export default function MobileAppbar({ onOpen }: Props) {
  const [isToggle, setToggle] = useState(false);

  const closeLoginModal = () => {
    setToggle(!isToggle);
  };

  return (
    <Container display={["block", "none"]}>
      <Flex
        className={"sticky"}
        display={"flex"}
        py={"10px"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Link href={"/"}>
          <Flex
            display={"flex"}
            flex={"1 1"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Image
              src={"/icons/heLogo.svg"}
              height={25}
              width={25}
              alt="heLogo"
            />

            <Text mr={"5px"}>نیـازمندی‌های هـمشـهری</Text>
          </Flex>
        </Link>
        <Flex
          display={"flex"}
          flex={"1 1"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Img onClick={() => setToggle(!isToggle)} marginLeft={"10px"}>
            <Image
              src={"/icons/black avatar.svg"}
              width={30}
              height={30}
              className={"icon"}
              alt="پروفایل"
            />
          </Img>
          {isToggle && (
            <InitialLogIn
              isToggle={isToggle}
              closeSmallModal={closeLoginModal}
            />
          )}
          <Menu onClick={onOpen}>
            <Image
              src={"/icons/hamburger.svg"}
              height={30}
              width={30}
              alt="menu"
            />
          </Menu>
        </Flex>
      </Flex>
    </Container>
  );
}
