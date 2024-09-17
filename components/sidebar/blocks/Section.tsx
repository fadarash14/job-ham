import styled from "styled-components";
import React, { ReactNode } from "react";
import Image from "next/image";

const Section = styled.div`
  color: white;
  background-color: rgba(71, 69, 70, 0.66);
  border-radius: 30px;
  padding: 19px;
  margin-top: 5px;
  direction: rtl;
  padding-bottom: 10px;
`;

const Head = styled.div`
  position: relative;
  margin-bottom: 20px;
  display: flex;
  font-size: 14px;
  align-items: center;
  &::before {
    content: "";
    position: absolute;
    right: 0;
    height: 14px;
    display: block;
    width: 3px;
    background: #fcc155;
    top: 50%;
    transform: translate(0, -50%);
    border-radius: 4px;
  }
`;
const Span = styled.div`
  margin: auto;
  margin-right: 10px;
`;
const Img = styled.div`
  margin-right: auto;
  height: 20px;
`;

export default function SideBarSection({
  icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: JSX.Element[] | any;
}) {
  return (
    <Section>
      <Head>
        <Span>{title}</Span>
        <Img>{icon}</Img>
      </Head>
      {children}
    </Section>
  );
}
