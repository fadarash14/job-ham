import ArrowLeft from "../../public/icons/Stroke 3.svg";
import Back from "../../public/icons/arrow right.svg";
import Right from "../../public/icons/right arow.svg";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";

const parents: {
  [key: string]: any;
} = require("../../dictionaries/parents.json");
const catIDs: {
  [key: string]: any;
} = require("../../dictionaries/withId.json");

import useUrlMaker from "../../hooks/useUrlMaker";
import useUrlValues from "../../hooks/useUrlValues";
import { Category as CategoryType } from "../../types";
import { search_keys_to_set_get } from "../../utils/searchConfig";
import CategoryBuilderSkeleton from "../sidebar/category/CategoryBuilderSkeleton";

const Ul = styled.ul<LayoutProps>`
  list-style-type: none;
  direction: rtl;
  padding: 10px;
  flex-direction: column;
  margin: 0;
  ${layout}
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.div<SpaceProps>`
  ${space}
`;

const Li = styled.li`
  position: relative;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  margin: 10px 0 0px 0;
  &:not(:last-child)::after {
    content: "";
    display: block;
    height: 1px;
    background: #f5f6fa;
    width: 100%;
    margin: 10px 0;
  }

  :hover {
    color: #fcc155;
  }
`;

const Backto = styled.li`
  position: relative;
  cursor: pointer;
  padding: 10px 35px 10px 0;
  display: flex;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 5px;
  &:not(:last-child)::after {
    content: "";
    display: block;
    height: 1px;
    background: #f5f6fa;
    opacity: 9%;
    position: absolute;
    width: 100%;
    bottom: 0;
    right: 0;
  }

  :hover {
    color: #fcc155;
  }
`;

const TopLayerCategories = styled.li`
  position: relative;
  cursor: pointer;
  margin: 10px 0;
  display: flex;
  font-weight: 500;
  font-size: 16px;
  &.has-border {
    border-right: 2px solid #f5f6fa;
    margin-right: 22px;
    padding-right: 20px;
    color: #fcc155;
  }
  :hover {
    color: #fcc155;
  }
`;

const ImgWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
`;

const LastLayerCategory = styled.li`
  position: relative;
  cursor: pointer;
  margin: 0 0 10px 0;
  display: flex;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 500;

  &.has-border {
    border-right: 2px solid #f5f6fa;
    margin-right: 15px;
    padding-right: 20px;
    font-size: 14px;
    color: #fcc155;
  }
  :hover {
    color: #fcc155;
  }
`;

const SubCategory = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  border-right: 2px solid #f5f6fa;
  margin-right: 36px;
  padding-right: 20px;
  max-height: 360px;
  overflow-y: scroll;
  overscroll-behavior: contain;
  &.has-border {
    margin-right: 15px;
  }
`;
const Category = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const Sub = styled.li<any>`
  font-size: 14px;
  margin: 5px;
  cursor: pointer;
  position: relative;
  font-weight: 500;
  display: flex;
  &:hover {
    color: #fcc155;
  }

  &.active {
    color: #fcc155;
    &::before {
      content: "";
      position: absolute;
      right: -27px;
      background: #fcc155;
      height: 6px;
      width: 3px;
      border-radius: 3px;
      top: 50%;
      transform: translate(0, -50%);
      z-index: 22;
    }
  }
`;

const icon11 = {
  position: "absolute",
  left: "7px",
  top: "50%",
  transform: "translate(0,-50%)",
};
const back = {
  position: "absolute",
  right: "0",
  top: "50%",
  transform: "translate(0,-50%)",
};
const back1 = {
  position: "absolute",
  right: "5px",
  top: "50%",
  transform: "translate(0,-50%)",
};

function CategoryBuilder(props: {
  links: CategoryType[];
  active: number;
  current: number;
  bacToPrent: Function;
  onClickLayer: Function;
  onClickParent: Function;
  onClickLastLayer: Function;
}) {
  function ReturnCategory(links: any[], n: number) {
    let node = <></>;

    if (n > 0) {
      node = (
        <Category>
          <TopLayerCategories
            className={n !== links.length - 1 ? "has-border" : ""}
            onClick={() => props.onClickLayer(n)}
          >
            {links[n].name}
          </TopLayerCategories>
          {ReturnCategory(links, n - 1)}
        </Category>
      );
    } else {
      node = (
        <Main>
          <LastLayerCategory
            className={n !== links.length - 1 ? "has-border" : ""}
            onClick={() => props.onClickLayer(n)}
          >
            {/*{[1161,1128,1180,1210,1218,1225,1251,1264,1271,1283].includes(links[n].id) && <ImgWrapper><Image width={'30px'} height={'30px'} src={`/icons/inside dashboard- selected categories/${links[n].id}s.svg`}/></ImgWrapper>}*/}
            {![
              1161, 1128, 1180, 1210, 1218, 1225, 1251, 1264, 1271, 1283,
            ].includes(links[n].id) && <Right style={back1} />}
            {links[n].name}
          </LastLayerCategory>
          <SubCategory
            className={
              n == links.length - 1
                ? "scroll-d-none has-border"
                : "scroll-d-none"
            }
          >
            {links[0].subs.map(
              (s: { name: string; id: number; subs: any[] }, index: number) => (
                <Sub
                  key={index}
                  className={props.active === s.id ? "active" : null}
                  onClick={() => props.onClickLastLayer(s)}
                >
                  {s.name}
                </Sub>
              )
            )}
          </SubCategory>
        </Main>
      );
    }
    return node;
  }

  return (
    <Ul>
      {props.current !== 0 ? (
        <Ul>
          <Backto onClick={() => props.bacToPrent()}>
            <Back style={back} />
            همه دسته بندی ها
          </Backto>
          {props.links.length > 0 &&
            ReturnCategory(props.links, props.links.length - 1)}
        </Ul>
      ) : (
        Object.values(parents).map((cat, i) => {
          return (
            <Li key={i} onClick={() => props.onClickParent(cat)}>
              <Flex>
                {cat.name}
                <Img mr={"auto"}>
                  <Image
                    height={10}
                    width={5}
                    src={"/icons/mobile arrow left.svg"}
                    alt=""
                  />
                </Img>
              </Flex>
            </Li>
          );
        })
      )}
    </Ul>
  );
}

export default CategoryBuilderSkeleton(CategoryBuilder);
