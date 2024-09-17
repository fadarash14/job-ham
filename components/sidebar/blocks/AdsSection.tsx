import styled from "styled-components";
import React, { ReactChildren } from "react";
import Image from "next/image";
import Category from "../../../public/icons/iconly_light_outline_category.svg";
import {
  layout,
  LayoutProps,
  space,
  SpaceProps,
  PositionProps,
  position,
} from "styled-system";
import Footer from "../../footer/Footer";
import { useMediaPredicate } from "react-media-hook";

const Section = styled.div<SpaceProps | LayoutProps>`
  color: black;
  background-color: transparent;
  border-radius: 30px;
  position: relative;
  margin: auto;
  margin-top: 5px;
  direction: rtl;
  ${layout}
  ${space}
`;
const Head = styled.div<SpaceProps>`
  position: relative;
  margin-bottom: 20px;
  padding: 0 10px;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  align-items: center;
  justify-content: space-between;
  ${space}
`;
const Span = styled.div`
  margin: auto;
  color: black;
  display: flex;
  &::before {
    content: "";
    height: 14px;
    display: block;
    width: 3px;
    background: #db143d;
    border-radius: 4px;
    margin-left: 10px;
  }
`;
const Img = styled.div<SpaceProps>`
  cursor: pointer;
  display: flex;
  color: #2d2c2c;
  font-size: 14px;
  position: relative;
  ${space}
`;
const Warn = styled.div`
  font-size: 12px;
  color: #474546;
`;
const TempTitle = styled.div`
  font-size: 12px;
  color: red;
  margin-bottom: 10px;
  padding: 5px;
`;
export default function AdsSideBarSection({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: any;
}) {
  const smallerThan425 = useMediaPredicate("(max-width:426px)");

  return (
    <Section
      mt={["115px", "60px"]}
      padding={["0", "19px"]}
      width={["100%", "60%"]}
    >
      <Head pr={smallerThan425 ? "0" : ""} pl={smallerThan425 ? "0" : ""}>
        <div>
          <Span>{title}</Span>
          <Warn>لطفا برای شروع ثبت آگهی دسته مورد نظر خود را انتخاب کنید.</Warn>
        </div>
        {!smallerThan425 && (
          <Img>
            <Image
              height={20}
              width={20}
              src={"/icons/red category.svg"}
              alt=""
            />
          </Img>
        )}
      </Head>
      {children}
    </Section>
  );
}
