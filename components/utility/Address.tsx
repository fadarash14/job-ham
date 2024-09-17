import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import { SpaceProps, space, LayoutProps, layout } from "styled-system";
import { convertKnownUrls } from "@/utils/helper";
import { AddressType } from "@/types";

const AddressWrapper = styled.div<LayoutProps | SpaceProps>`
  background: rgba(209, 209, 209, 0.35);
  display: flex;
  font-size: 13px;
  font-weight: 300;
  color: #474546;
  align-items: center;
  border-radius: 9px;
  padding: 3px 9px;
  width: fit-content;
  margin-top: 10px;
  flex-wrap: wrap;
  & > div {
    margin: 0 5px;
    min-width: fit-content;
  }
  ${space}
  ${layout}
`;
const AddressLink = styled.div`
  display: flex;
  color: #474546;
  cursor: pointer;
  paddingright: 5px;
`;
const Div = styled.div``;
const Img = styled.div<SpaceProps>`
  display: flex;
  color: #2d2c2c;
  font-size: 14px;
  position: relative;
  align-items: center;
  &.default {
    cursor: default !important;
  }
  ${space}
`;

export default function Address(props: { address: string }) {
  const [params, setParams] = useState<AddressType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const links = props.address.split("/").filter((x) => x !== "");
    const _params = convertKnownUrls(links);
    const values = _params.map(({ name, path }, idx) => {
      if (idx === 0) {
        return { name, path: "/" };
      }
      return { name, path: `/${path}` };
    });
    setParams(values);
  }, []);

  const navigateHandler = (value: string) => {
    const parts = props.address.split(value);
    const resultString = parts[0] + value;
    router.push(resultString);
  };

  return (
    <AddressWrapper display={["none", "none", "flex", "flex"]}>
      {params.map((item, index) => (
        <AddressLink onClick={() => navigateHandler(item.path)} key={index}>
          <Div>{item.name}</Div>
          {params.length !== index + 1 ? (
            <Img className={"default"} mr={"5px"}>
              <Image
                height={10}
                width={10}
                src={"/icons/address.svg"}
                alt="آدرس"
              />
            </Img>
          ) : null}
        </AddressLink>
      ))}
    </AddressWrapper>
  );
}
