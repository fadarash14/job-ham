import React, { useCallback, useState, useRef, PropsWithChildren } from "react";
import styled from "styled-components";
import {
  color,
  ColorProps,
  display,
  DisplayProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  width,
  WidthProps,
} from "styled-system";

import _ from "lodash";
import Image from "next/image";
import { searchCVSuggest } from "@/requests/resumeFilter";
import Cookies from "js-cookie";
import SuggestSearchItem from "../search/SuggestSearchItem";
import useClickOutside from "@/hooks/useClickOutside";

type FormStyleProps = PositionProps &
  WidthProps &
  LayoutProps & { fullSize: boolean };

const Form = styled.div<FormStyleProps>`
  display: flex;
  flex-grow: ${(props) => (props.fullSize ? "1" : "unset")};
  margin-left: 10px;
  /* width: 100%;
  @media (min-width: 1024px) {
    max-width: 80%;
    min-width: 138px;
  } */
  z-index: 1001;
  ${position}
  ${layout}
    ${width}
`;

// @ts-ignore
const FormControl = styled.div<ColorProps | LayoutProps>(
  {
    display: "flex",
    width: "100%",
    direction: "rtl",
    borderRadius: "12px",
    zIndex: 1010,
    overflow: "hidden",

    // position: "relative",
  },
  color,
  layout
);

const Input = styled.input<HTMLInputElement | ShadowProps | ColorProps>`
  flex: 1 1;
  border: 1px solid white;
  color: black;
  padding-right: 32px;
  font-size: 15px;
  direction: rtl;
  border: none;
  text-align: right;
  outline: none;
  &:focus {
    outline-style: none;
  }
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
  &::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  &::-webkit-search-cancel-button:after {
    content: "";
    display: block;
    cursor: pointer;
    background-image: url("/icons/group_1370.svg");
    background-size: contain;
    width: 15px;
    height: 15px;
  }
  &::placeholder {
    font-family: dana;
    color: #474546;
    padding-bottom: 5px;
  }
  ${color}
  ${shadow}
`;

const Button = styled.div<ColorProps>`
  display: flex;
  align-items: center;
  margin-left: 10px;
  ${color}
`;
const Remove = styled.div<ColorProps>`
  height: 15px;
  margin-left: 8px;
  cursor: pointer;
  ${color}
`;
const Loading = styled.div`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translate(0, -50%);
  height: 20px;
`;

const Drop = styled.div<
  HTMLElement | LayoutProps | DisplayProps | SpaceProps | { mobile: boolean }
>(
  // @ts-ignore
  (props: { mobile: boolean }) => {
    return {
      position: " absolute",
      top: props.mobile ? "100%" : "32px",
      width: props.mobile ? "100%" : "95%",
      paddingTop: props.mobile ? "10px" : "0",
      // marginLeft: "auto",
      // marginRight: "auto",
      transition: "1s height",
      backgroundColor: props.mobile ? "#f5f6fa" : "white",
      float: "center",
      direction: "rtl",
      right: props.mobile ? "0" : "50%",
      transform: props.mobile ? "translate(0,0)" : "translate(50%,0)",
      borderBottomRightRadius: "15px",
      borderBottomLeftRadius: "15px",
      boxShadow: props.mobile
        ? "inset 0 0 20px -20px rgba(0,0,0,0.34), 6px 7px 9px #1323372b "
        : "inset 0 18px 20px -20px rgba(0,0,0,0.34), 6px 7px 9px #1323372b ",
      zIndex: 1001,
      overflowY: "scroll",
      overscrollBehavior: "contain",
      // "@media screen and (max-width: 1024px)": {
      //   width: "62%",
      //   right: "50%",
      // },
      "@media screen and (max-width: 768px)": {
        top: "90px",
        height: "auto",
        paddingBottom: "0px",
      },
    };
  },
  layout,
  space,
  display
);

const List = styled.ul<LayoutProps>`
  margin: 0;
  padding-right: 0;
  ${layout}
`;

const Img = styled.div<SpaceProps>`
  min-width: fit-content;
  display: flex;
  margin: auto;
  ${space}
`;

type SearchProps = {
  bg: string;
  mobile: boolean;
  minWidth?: string | number;
  maxWidth?: string | number;
  fullSize?: boolean;
  onChange: (...event: any[]) => void;
};
type SuggestResponse = {
  name: string;
  family: string;
  jobTitle: string;
  id: number;
  cityName: string;
};
// interface IFormInput {
//   text: string;
//   cityId: number;
//   name: string;
//   family: string;
//   jobTitle: string;
//   sexId: number;
//   militaryServiceId: number;
//   skillId: number[];
//   educationCourseId: number;
//   languageId: number[];
//   degreeId: number;
//   fromBirthDate: string;
//   toBirthDate: string;
// }
const SearchKeywords = (props: PropsWithChildren<SearchProps>) => {
  const [suggestItems, setSuggestItems] = useState<SuggestResponse[]>();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const escape = useRef(null);
  const cube = useRef(null);
  useClickOutside(escape, () => setSuggestItems([]));
  const onChange = props.onChange;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchSuggest = useCallback(
    _.debounce(async (str: string) => {
      if (str.length > 2) {
        const res = await searchCVSuggest(
          { text: str, skip: 0, limit: 10, sort: "Desc" },
          Cookies.get("token") || ""
        );
        setSuggestItems(res.data);
      } else {
        setSuggestItems([]);
      }
    }, 1500),
    []
  );

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const input = e.target.value;
      setValue(input);
      setLoading(true);
      onChange(input);

      if (!submitted) {
        searchSuggest(input);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    },
    [onChange, searchSuggest, submitted]
  );

  return (
    <Form
      position={["static", "relative"]}
      minWidth={props.minWidth}
      maxWidth={props.maxWidth}
      fullSize={props.fullSize ? true : false}
      ref={escape}
    >
      <FormControl bg={props.bg} height={["40px", "38px"]}>
        <Input
          ref={cube}
          bg={props.bg}
          value={value}
          onChange={onChangeHandler}
          type="search"
          placeholder="جستجو رزومه "
        />
        {loading && value !== "" && (
          <Loading>
            <Image
              src={"/icons/loading_j.gif"}
              height={20}
              width={20}
              alt={"loading"}
            />
          </Loading>
        )}
        <Button>
          {value !== "" && (
            <Remove
              onClick={() => {
                setSuggestItems([]);
                setSubmitted(false);
                setValue("");
                onChange(undefined);
                searchSuggest.cancel();
              }}
            >
              <Image
                src={"/icons/remove.svg"}
                height={15}
                width={15}
                alt={"remove-icon"}
              />
            </Remove>
          )}
          <Img>
            <Image
              src={"/icons/grey-search-icon.svg"}
              height={20}
              width={20}
              alt={"grey-search-icon"}
            />
          </Img>
        </Button>
      </FormControl>
      {value.length > 1 &&
        suggestItems &&
        suggestItems.length > 0 &&
        !submitted && (
          <Drop
            //@ts-ignore
            maxHeight={["100vh", "469px"]}
            height={["90vh", "auto"]}
            //@ts-ignore
            mobile={props.mobile}
            className={"scroll-d-none"}
            px={["0", "16px"]}
            pt={suggestItems?.length > 0 ? "8px" : 0}
            pb={["90px", "16px"]}
            display={suggestItems?.length > 0 ? "block" : "none"}
          >
            <List maxHeight={["auto", "469px"]} className="scroll-d-none">
              {suggestItems?.map((item) => (
                <SuggestSearchItem
                  key={item.id}
                  {...item}
                  setSubmitted={setSubmitted}
                />
              ))}
            </List>
          </Drop>
        )}
    </Form>
  );
};

export default SearchKeywords;
