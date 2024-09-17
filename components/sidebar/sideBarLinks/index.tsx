import React, { ReactElement, ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import styled from "styled-components";
import Image from "next/image";
const Span = styled.div`
  font-size: 12px;
  font-weight: 500;

  margin-right: 10px;
`;
const LinkTo = styled("a")`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0;
  color: white;
  padding: 0 15px;
  cursor: pointer;
  img {
    object-fit: contain;
  }
`;

export default function SideBarLinks({
  Icon,
  title,
  link,
}: {
  Icon: string;
  title: string;
  link: string;
}) {
  return (
    <Link href={link} passHref>
      <LinkTo>
        <Span>{title}</Span>
        <Image src={Icon} width={15} height={15} alt="" />
      </LinkTo>
    </Link>
  );
}
