import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Box from "../../utility/Box";
import {
  color,
  typography,
  TypographyProps,
  ColorProps,
  layout,
  LayoutProps,
  PositionProps,
  FlexboxProps,
  SpaceProps,
  space,
  flexbox,
} from "styled-system";
import styled from "styled-components";
import { CloseSvgWhite, OpenBtn, ArrowStrokeLeft } from "../../utility/Icons";
import { parseNumberToString } from "../../../utils/helper";
import useUrlMaker from "../../../hooks/useUrlMaker";
import FilterDrawer from "./FilterDrawer";
import { UrlTypes } from "../../../types";
import _ from "lodash";
import { position } from "styled-system";
import Image from "next/image";

type NumberRangeFilterProps = {
  id: number;
  keys: string;
  label: string;
  unit: string;
  options: { title: string; id: number; value: number }[];
  description: string;
  filter_id: number;
  placeholder: string;
  themeMode: { bg: string; color: string; close: string; plus: string };
  default_value: { [key: string]: string } | Partial<UrlTypes>;
};

const Label = styled.p<TypographyProps | ColorProps | LayoutProps>`
  margin: 0 0 0 5px;
  width: 30px;
  position: relative;
  bottom: 3px;
  ${layout}
  ${typography}
    ${color}
`;

const LabelFilter = styled.p<TypographyProps | ColorProps | LayoutProps>`
  margin: 0 5px 0 5px;
  ${layout}
  ${typography}
    ${color}
`;
const Input = styled.input<any>`
  flex: 1;
  font-size: 12px;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  outline: none;
  background: transparent;
  margin-bottom: 10px;
  &::-webkit-inner-spin-button {
    display: none;
  }
  &::-webkit-search-cancel-button {
    cursor: pointer;
    display: none;
  }
  &[type="search" i]::-webkit-search-cancel-button {
    color: white;
  }

  ${color}
`;

const Remove = styled.div`
  position: absolute;
  left: 5px;
  cursor: pointer;
`;

const SuggestionWrapper = styled.div<ColorProps | PositionProps>`
  display: none;
  flex-direction: column;
  position: absolute;
  height: 200px;
  overflow: auto;
  width: 100%;
  max-width: 150px;
  color: black;
  background: white;
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 25px;
  z-index: 2;
  margin-right: 10px;
  direction: ltr;
  text-align: right;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  ${color}
  ${position}
`;

const Li = styled.div<ColorProps>`
  color: inherit;
  cursor: default;
  display: block;
  font-size: 1em;
  padding: 8px 12px;
  width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  text-align: center;
  &:hover {
    background-color: #deebff;
  }
  ${color}
`;
const BoxWrapper = styled.div<SpaceProps | LayoutProps | FlexboxProps>`
  position: relative;
  &.focused {
    .suggest {
      display: flex;
    }
  }
  ${space}
  ${flexbox}
    ${layout}
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`;
const Piece = styled.div`
  padding-right: 0;
`;
export default function NumberRange(props: NumberRangeFilterProps) {
  const [values, setValues] = useState<[number, number]>(
    // @ts-ignore
    props.default_value && props.default_value[props.keys]
      ? // @ts-ignore
        props.default_value[props.keys].split("_").map((f) => parseInt(f))
      : [0, 0]
  );
  const [, setUrl] = useUrlMaker();
  const set = (val: string, number: number) => {
    if (val.length < 13) {
      let _v: [number, number] = [...values];
      _v[number] = val.length === 0 ? 0 : parseInt(val);
      setValues(_v);
      if (values?.some((v) => v !== 0)) _setUrl({ [props.keys]: _v.join("_") });
    }
  };
  useEffect(() => {
    setValues(
      // @ts-ignore
      props.default_value && props.default_value[props.keys]
        ? // @ts-ignore
          props.default_value[props.keys].split("_").map((f) => parseInt(f))
        : [0, 0]
    );
  }, [props.default_value]);

  const _setUrl = useCallback(
    _.debounce((e) => setUrl(e), 1000),
    [setUrl]
  );
  const [classAz, setClassAz] = useState("");
  const [classTa, setClassTa] = useState("");

  const refaz = useRef<HTMLDivElement | null>(null);
  const refta = useRef<HTMLDivElement | null>(null);

  const clickListener = useCallback(
    (e: any) => {
      if (refta.current && !(refta.current as any).contains(e.target)) {
        setClassTa(""); // using optional chaining here, change to onClose && onClose(), if required
      }

      if (refaz.current && !(refaz.current as any).contains(e.target)) {
        setClassAz(""); // using optional chaining here, change to onClose && onClose(), if required
      }
    },
    [refta.current, refaz.current]
  );

  useEffect(() => {
    window.addEventListener("click", clickListener);
    window.addEventListener("keyup", clickListener);

    return () => {
      window.removeEventListener("click", clickListener);
      window.removeEventListener("keyup", clickListener);
    };
  }, [clickListener]);

  const condition = values[0] !== 0 || values[1] !== 0;

  return (
    <FilterDrawer
      themeMode={props.themeMode}
      filterId={props.filter_id}
      id={props.id}
      label={props.label}
      closeLabel={
        parseNumberToString(values)
          ? parseNumberToString(values) + " " + props.unit
          : ""
      }
      value={condition}
      clear={() => setValues([0, 0])}
    >
      <Piece>
        <BoxWrapper
          ref={refaz}
          className={classAz}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          mb={"10px"}
          mt={"10px"}
        >
          <Flex>
            <Label color={"butterscotch"}>از</Label>
            <Input
              color={["black", "white"]}
              onFocus={() => setClassAz("focused")}
              value={values[0]}
              maxLength={12}
              placeholder={props.placeholder}
              type={"search"}
              onChange={(e: MouseEvent) =>
                set((e.target as HTMLInputElement).value, 0)
              }
            />
            <Remove onClick={() => setValues([0, values[1]])}>
              <Image
                src={"/icons/white remove.svg"}
                height={15}
                width={15}
                alt=""
              />
            </Remove>
          </Flex>
          {props.options.length > 0 && (
            <SuggestionWrapper className={"suggest"}>
              {props.options.map((opt, i) => (
                <Li
                  onClick={() => {
                    set(String(opt.value), 0);
                    setClassAz("");
                  }}
                  key={i}
                >
                  {opt.title}
                </Li>
              ))}
            </SuggestionWrapper>
          )}
        </BoxWrapper>
        <BoxWrapper
          ref={refta}
          className={classTa}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <Flex>
            <Label color={"butterscotch"}>تــا</Label>
            <Input
              color={["black", "white"]}
              onFocus={() => setClassTa("focused")}
              value={values[1]}
              maxLength={10}
              placeholder={props.placeholder}
              type={"search"}
              onChange={(e: MouseEvent) =>
                set((e.target as HTMLInputElement).value, 1)
              }
            />
            <Remove onClick={() => setValues([values[0], 0])}>
              <Image
                src={"/icons/white remove.svg"}
                height={15}
                width={15}
                alt=""
              />
            </Remove>
          </Flex>
          {props.options.length > 0 && (
            <SuggestionWrapper className={"suggest"}>
              {props.options.map((opt, i) => (
                <Li
                  onClick={() => {
                    set(String(opt.value), 1);
                    setClassTa("");
                  }}
                  key={i}
                >
                  {opt.title}
                </Li>
              ))}
            </SuggestionWrapper>
          )}
        </BoxWrapper>
        <Box display={"flex"} flexDirection={"row"} mt={"5px"} mb={"10px"}>
          <Image
            src={"/icons/Arrow - Left 2.svg"}
            height={10}
            width={7}
            alt=""
          />
          {values.length > 0 ? (
            // @ts-ignore
            <LabelFilter fontSize={12} color={["black", "white"]}>
              {parseNumberToString(values) + " " + props.unit}
            </LabelFilter>
          ) : (
            // @ts-ignore
            <Label color={["black", "white"]}>{props.description}</Label>
          )}
        </Box>
      </Piece>
    </FilterDrawer>
  );
}
