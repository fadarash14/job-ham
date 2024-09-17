import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled, { CSSObject } from "styled-components";
import Image from "next/image";
import {
  SpaceProps,
  space,
  FlexboxProps,
  flexbox,
  ColorProps,
  BorderProps,
  border,
  color,
  LayoutProps,
  layout,
} from "styled-system";
import Container from "../utility/Container";
import Box from "../utility/Box";
import SearchInput from "../search/SearchInput";
import _ from "lodash";
import FullScreenFilter from "../mobile modals/FullScreenFilter";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setShowMobileFilter } from "../../store/mobilePage";
import clsx from "clsx";
import { pills } from "../../requests/Pills";
import { useRouter } from "next/router";
import { baseUrl } from "../../utils/request";
import * as url from "url";
import useUrlMaker from "@/hooks/useUrlMaker";
import { Option, QueryKeys } from "@/types";

const Whole = styled.div<
  | HTMLElement
  | LayoutProps
  | FlexboxProps
  | SpaceProps
  | { stick: boolean; showMobileFilter: boolean }
>(
  // @ts-ignore
  (props: { stick: boolean; showMobileFilter: boolean }): CSSObject => {
    return {
      top: 0,
      right: 0,
      zIndex: 1000,
      background: "#F5F6FA",
      width: "100%",
      // paddingTop: props.stick ? "10px" : 0,
      // transition: "transform 1s",
      // position:
      //   typeof window !== "undefined"
      //     ? window?.scrollY === 0
      //       ? "static"
      //       : "fixed"
      //     : "static",
      // transform:
      //   typeof window !== "undefined" && !props.showMobileFilter
      //     ? props.stick
      //       ? "translateY(0)"
      //       : window?.scrollY !== 0
      //       ? "translateY(-100%)"
      //       : "translateY(0)"
      //     : "null",
      "&::after": {
        content: "''",
        // display: props.stick ? "block" : "none",
        boxShadow: "0px 5px 20px 20px rgba(245,246,250,0.8)",
        height: "10px",
        width: "100%",
      },
    };
  },
  [layout],
  [space],
  [flexbox]
);
console.log(Whole);

const Img = styled.div<SpaceProps>`
  min-width: fit-content;
  display: flex;
  margin: auto;
  ${space}
`;

const Flex = styled.div<FlexboxProps>`
  display: flex;
  align-items: center;
  background: transparent;
  position: relative;
  ${flexbox}
`;

const Div = styled.div<SpaceProps>`
  display: flex;
  width: 100%;
  overflow-x: scroll;
  ${space}
`;

const Pill = styled.a<ColorProps | BorderProps | FlexboxProps>`
  border: 1px solid rgba(71, 69, 70, 0.12);
  border-radius: 12px;
  padding: 3px 10.5px;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: Center;
  min-width: fit-content;
  &:nth-last-child(n) {
    margin-right: 5px;
  }
  ${color}
  ${flexbox}
    ${border}
`;
const TempTitleContainer = styled.div`
  margin-top: 5px;
`;
const TempTitle = styled.p`
  font-size: 12px;
  color: red;
  margin: 0px;
  text-align: center;
`;

const BoxShadow = styled.div<HTMLElement | LayoutProps | { shadow: boolean }>(
  // @ts-ignore
  (props: { shadow: boolean }) => {
    return {
      position: "absolute",
      display: props.shadow ? "none" : "block",
      left: "0px",
      width: "100px",
      height: "100%",
      backgroundImage:
        " linear-gradient(to left, rgba(255, 255, 255, 0.01) 0%, #f5f6f4 84%)",
      zIndex: "1000",
    };
  }
);

const R = styled.a<LayoutProps>`
  margin: auto 8px auto 0;
  height: 17px;
  ${layout}
`;
export default function MobileSideBar(
  props: PropsWithChildren<{ color: string; border: string }>
) {
  const [scrollEnd, setScrollEnd] = useState(false);
  const [y, setY] = useState(typeof window !== "undefined" && window.scrollY);
  const [stick, setStick] = useState(false);
  const [urlStates, updateUrl] = useUrlMaker();
  const onChangeHandler = (key: QueryKeys, value: Option) => {
    updateUrl({
      [key]: value?.id,
    });
  };

  function _onScrollY(e: UIEvent) {
    const target = e.target as HTMLDivElement;
    if (-target.scrollLeft + target.clientWidth === target.scrollWidth) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  }
  const dispatch = useAppDispatch();
  const onScrollY = useCallback(_.debounce(_onScrollY, 100), []);
  //@ts-ignore
  const { showHome, showMobileFilter } = useAppSelector(
    (state: any) => state.mobileConfig
  );
  const onclick = () => {
    dispatch(setShowMobileFilter(!showMobileFilter));
  };

  const [pill, setPill] = useState<
    Partial<{ label: string; url: string; id: number }>[]
  >([]);
  useEffect(() => {
    pills().then((res) => {
      setPill(res);
    });
  }, []);

  const router = useRouter();
  const path = router?.query;

  const handleNavigation = useCallback(
    (e: Event) => {
      const window = e.currentTarget as Window;
      const scrollY: number = window.scrollY;
      if ((y as number) > scrollY && scrollY !== 0) {
        setStick(true);
      } else if ((y as number) < scrollY || scrollY === 0) {
        setStick(false);
      }
      setY(scrollY);
    },
    [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <>
      {
        //@ts-ignore
        <Whole stick={stick} showMobileFilter={showMobileFilter}>
          <Box
            className={"sticky"}
            display={[
              clsx({
                block: showHome,
                none: !showHome,
              }),
              "none",
            ]}
          >
            <Container height={"auto"}>
              <Flex>
                <div>
                  <SearchInput
                    mobile={true}
                    bg={"white"}
                    values={urlStates.text}
                    onClear={() => onChangeHandler(QueryKeys.Text, null)}
                    fullSize
                    // values={["استخدام", "آپارتمان", "خودروسواری"]}
                  />
                </div>
                <Img mr={"10px"} onClick={onclick}>
                  <Image
                    src={"/icons/catergory yellow mobile.svg"}
                    height={40}
                    width={40}
                    alt=""
                  />
                </Img>
              </Flex>
            </Container>
            <Flex>
              <Div
                mt={10}
                px={"5px"}
                id={"scroll"}
                className={"scroll-d-none"}
                onScroll={(e: any) => onScrollY(e)}
              >
                {pill.map((item: any) => (
                  <Pill
                    order={item.url === path?.key?.[0] ? "-1" : ""}
                    bg={item.url === path?.key?.[0] ? "#db143d" : ""}
                    href={`${item.url}`}
                    color={item.url === path?.key?.[0] ? "white" : props.color}
                    key={item.id}
                  >
                    <div>{item.label}</div>
                    <R
                      display={
                        item.url === path?.key?.[0] && path ? "block" : "none"
                      }
                      href={"/"}
                    >
                      <Image
                        src={"/icons/white-remove-solid.svg"}
                        height={12}
                        width={12}
                        alt=""
                      />
                    </R>
                  </Pill>
                ))}
              </Div>
              {
                //@ts-ignore
                <BoxShadow shadow={scrollEnd} />
              }
            </Flex>

            <FullScreenFilter />
          </Box>
        </Whole>
      }
    </>
  );
}
