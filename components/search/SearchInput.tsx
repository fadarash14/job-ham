import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  PropsWithChildren,
} from "react";
import styled from "styled-components";
import {
  color,
  ColorProps,
  display,
  DisplayProps,
  layout,
  LayoutProps,
  maxHeight,
  MaxHeightProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  width,
  WidthProps,
} from "styled-system";
import SearchItem from "./SearchItem";
import _ from "lodash";
import { query } from "../../utils/request";
import { SearchSuggestItem } from "../../types";
import Image from "next/image";
import useUrlMaker from "../../hooks/useUrlMaker";

type FormStyleProps = PositionProps &
  WidthProps &
  LayoutProps & { fullSize: boolean };

const Form = styled.form<FormStyleProps>`
  display: flex;
  flex-grow: ${(props) => (props.fullSize ? "1" : "unset")};
  width: 100%;
  margin-left: 10px;
  @media (max-width: 1024px) {
    max-width: 80%;
    min-width: 138px;
  }
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
    // zIndex: 1010,
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
        : "inset 0 20px 20px -20px rgba(0,0,0,0.34), 6px 7px 9px #1323372b ",
      zIndex: 1001,
      overflowY: "scroll",
      overscrollBehavior: "contain",
      "@media screen and (max-width: 768px)": {
        top: "38px",
        height: "auto",
        paddingBottom: "0px",
      },
      "@media screen and (max-width: 575px)": {
        top: "107px",
      },
    };
  },
  maxHeight,
  layout,
  space,
  display
);

const List = styled.ul<LayoutProps>`
  margin: 0;
  padding-right: 0;
  ${layout}
`;
const CatNav = styled.div<ColorProps>`
  ${color}
`;

const CubeBox = styled.div<LayoutProps>`
  position: relative;
  background: transparent;
  right: 90px;
  top: 0;
  z-index: 2;
  text-align: right !important;
  direction: rtl;
  animation: spincube ease-in-out 4 4s;
  -webkit-animation: spincube ease-in-out infinite 4s;
  -moz-animation: spincube ease-in-out infinite 4s;
  -ms-animation: spincube ease-in-out infinite 4s;
  transform-style: preserve-3d;
  transform-origin: 25px 50% 0;
  user-select: text !important;
  cursor: text;
  & div {
    position: absolute;
    width: auto;
    color: ${(props) => props.theme.colors.lipstick};
    height: 90%;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    text-decoration: none;
    text-shadow: none;
    -webkit-font-smoothing: subpixel-antialiased;
  }
  & .face-1 {
    -webkit-transform: translateZ(30px);
    -moz-transform: translateZ(30px);
    -ms-transform: translateZ(30px);
    transform: translateZ(30px);
    -webkit-backface-visibility: hidden;
  }

  & .face-2 {
    -webkit-transform: rotateX(120deg) translateZ(30px);
    -moz-transform: rotateX(120deg) translateZ(30px);
    -ms-transform: rotateX(120deg) translateZ(30px);
    transform: rotateX(120deg) translateZ(30px);
    -webkit-backface-visibility: hidden;
  }
  & .face-3 {
    -webkit-transform: rotateX(240deg) translateZ(30px);
    -moz-transform: rotateX(240deg) translateZ(30px);
    -ms-transform: rotateX(240deg) translateZ(30px);
    transform: rotateX(240deg) translateZ(30px);
    -webkit-backface-visibility: hidden;
  }

  ${layout}
`;
const Img = styled.div<SpaceProps>`
  min-width: fit-content;
  display: flex;
  margin: auto;
  ${space}
`;

// @ts-ignore
const After = styled.div<HTMLElement | { shadow: boolean }>((props) => {
  return {
    position: "sticky",
    display: "none",
    bottom: "-3px",
    width: "100%",
    height: "1px",
    boxShadow: props.shadow ? "0 -19px 10px 20px #fdfdfdba" : "none",
  };
});

type SearchProps = {
  values?: string;
  onSubmit?: boolean;
  bg: string;
  mobile: boolean;
  minWidth?: string | number;
  maxWidth?: string | number;
  fullSize?: boolean;
  onClear: () => void;
};
const SearchInput = (props: PropsWithChildren<SearchProps>) => {
  const [urlState, updateUrl] = useUrlMaker();
  const [suggestItems, setSuggestItems] = useState<SearchSuggestItem[]>([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const escape = useRef(null);
  const cube = useRef(null);
  useEffect(() => {
    setValue(urlState.text || "");
  }, [urlState.text]);
  const searchSuggest = (str: string) => {
    query(
      "searchSuggest",
      { text: str, skip: 0, limit: 10, sort: "Desc" },
      { data: true }
    ).then((res) => {
      const data: SearchSuggestItem[] = res.data;
      setSuggestItems(data);
    });
  };

  const lookingForSearchSuggest = useCallback(
    _.debounce(searchSuggest, 1000),
    []
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.target.value;
    setValue(input);
    setLoading(true);
    if (input.length === 0) {
      setSuggestItems([]);
    }
    if (!submitted) {
      if (input.length > 2) {
        lookingForSearchSuggest(input);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    updateUrl({ text: value });
  };

  return (
    <Form
      position={["static", "relative"]}
      minWidth={props.minWidth}
      maxWidth={props.maxWidth}
      fullSize={props.fullSize ? true : false}
      ref={escape}
      onSubmit={submitHandler}
    >
      <FormControl bg={props.bg} height={["40px", "38px"]}>
        <Input
          ref={cube}
          bg={props.bg}
          value={value}
          onChange={onChangeHandler}
          type="search"
          placeholder="جستجو"
        />
        {loading && (
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
                props.onClear();
                setSuggestItems([]);
                setSubmitted(false);
                setValue("");
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
      {suggestItems?.length > 0 && !submitted && (
        <Drop
          //@ts-ignore
          maxHeight={["100vh", "469px"]}
          height={["90vh", "auto"]}
          mobile={props.mobile}
          className={"scroll-d-none"}
          px={["0", "16px"]}
          pt={suggestItems.length > 0 ? "8px" : 0}
          pb={["90px", "16px"]}
          display={suggestItems.length > 0 ? "block" : "none"}
        >
          <List maxHeight={["auto", "469px"]} className="scroll-d-none">
            {suggestItems.map((item, index) => (
              <SearchItem
                mobile={props.mobile}
                onClick={() => {
                  updateUrl({ text: item.jobTitle });
                  setSuggestItems([]);
                }}
                pinned={value === ""}
                item={item}
                key={index}
              />
            ))}
            {/* <After shadow={scrollEnd} /> */}
          </List>
        </Drop>
      )}
    </Form>
  );
};

export default SearchInput;
