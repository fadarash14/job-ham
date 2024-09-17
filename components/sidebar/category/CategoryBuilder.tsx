import ArrowLeft from "../../../public/icons/Stroke 3.svg";
import Back from "../../../public/icons/backto.svg";
import Right from "../../../public/icons/right arow.svg";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SideBarSection from "../blocks/Section";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
const parents: {
  [key: string]: any;
} = require("../../../dictionaries/parents.json");
const catIDs: {
  [key: string]: any;
} = require("../../../dictionaries/withId.json");
import Image from "next/image";
import useUrlMaker from "../../../hooks/useUrlMaker";
import useUrlValues from "../../../hooks/useUrlValues";
import { Category as CategoryType, UrlTypes } from "../../../types";
import { search_keys_to_set_get } from "../../../utils/searchConfig";
import SideBarContext from "../context/SideBarContext";
import { CSSTransition } from "react-transition-group";
import CategoryBuilderSkeleton from "./CategoryBuilderSkeleton";
import router, { useRouter } from "next/router";
import Link from "next/link";
const filtersDictionary: {
  [key: string]: any;
} = require("../../../dictionaries/filters.json");

const Ul = styled.ul<LayoutProps>`
  list-style-type: none;
  direction: rtl;
  padding-right: 0;
  flex-direction: column;
  margin: 0;
  ${layout}
`;

const Li = styled.li`
  position: relative;
  cursor: pointer;
  padding: 10px 42px 10px 0;
  display: flex;
  font-size: 14px;
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
  padding: 10px 35px 10px 0;
  margin-bottom: 5px;
  display: flex;
  font-weight: 500;
  font-size: 14px;
  &.has-border {
    border-right: 1px solid white;
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
  padding: 10px 35px 10px 0;
  margin-bottom: 5px;
  display: flex;
  font-size: 0.95em;
  font-stretch: normal;
  font-style: normal;
  font-weight: 500;
  align-items: center;
  &.has-border {
    border-right: 1px solid white;
    margin-right: 15px;
    padding-right: 20px;
    font-size: 14px;
    color: #fcc155;
  }
  color: #fcc155;
`;

const SubCategory = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid white;
  margin-right: 36px;
  padding-right: 14px;

  &.has-border {
    margin-right: 15px;
  }
`;
const Category = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
`;

const Sub = styled.li<any>`
  font-size: 0.9em;
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
      right: -21px;
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
const Img = styled.div<SpaceProps>`
  ${space}
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
  const router = useRouter();

  function ReturnCategory(links: any[], n: number) {
    let node = <></>;
    if (links.length === 0) {
      return node;
    }

    if (n > 0) {
      node = (
        <Category>
          <TopLayerCategories
            className={n !== links.length - 1 ? "has-border" : ""}
            onClick={() => props.onClickLayer(n)}
          >
            {[
              1161, 1128, 1180, 1210, 1218, 1225, 1251, 1264, 1271, 1283,
            ].includes(links[n].id) && (
              <ImgWrapper onClick={() => props.onClickLastLayer(links[n])}>
                <Image
                  width={30}
                  height={30}
                  src={`/icons/inside dashboard- selected categories/${links[n].id}s.svg`}
                  alt=""
                />
              </ImgWrapper>
            )}
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
            onClick={() => {
              () => props.onClickLayer(n);
            }}
          >
            {[
              1161, 1128, 1180, 1210, 1218, 1225, 1251, 1264, 1271, 1283,
            ].includes(links[n].id) && (
              <ImgWrapper>
                <Image
                  width={30}
                  height={30}
                  alt=""
                  src={`/icons/inside dashboard- selected categories/${links[n].id}s.svg`}
                />
              </ImgWrapper>
            )}
            {/*<Right style={back1}/>*/}
            <Img
              ml={"5px"}
              onClick={() =>
                links[n + 1]
                  ? props.onClickLastLayer(links[n + 1])
                  : props.bacToPrent()
              }
            >
              <Image
                src={"/icons/right arow.svg"}
                height={10}
                width={8}
                alt=""
              />
            </Img>
            <div onClick={() => props.onClickLastLayer(links[n])}>
              {links[n].name}
            </div>
          </LastLayerCategory>
          <SubCategory className={n == links.length - 1 ? "has-border" : ""}>
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
    <SideBarSection
      title={"دسـتــه بـنــدی ها"}
      icon={
        <Image
          src={"/icons/categories_icon.svg"}
          width={20}
          height={20}
          alt=""
        />
      }
    >
      <Ul>
        {props.current !== 0 ? (
          <Ul>
            <Backto
              onClick={() => {
                props.bacToPrent();
              }}
            >
              <Back style={back} />
              هــمـه دســتـه بـنــدی ها
            </Backto>
            <CSSTransition
              in={props.links.length > 0}
              timeout={300}
              classNames="drawer"
              unmountOnExit
            >
              {ReturnCategory(props.links, props.links.length - 1)}
            </CSSTransition>
          </Ul>
        ) : (
          Object.values(parents).map((cat, i) => {
            return (
              <Li
                key={i}
                onClick={() => {
                  props.onClickParent(cat);
                }}
              >
                <ImgWrapper>
                  <Image
                    width={30}
                    height={30}
                    src={`/icons/categories/${cat.id}.svg`}
                    alt=""
                  />
                </ImgWrapper>
                {cat.name}
                <ArrowLeft style={icon11} />
              </Li>
            );
          })
        )}
      </Ul>
    </SideBarSection>
  );
}
const CategoryBuilderd = CategoryBuilderSkeleton(CategoryBuilder);
export default CategoryBuilderd;
