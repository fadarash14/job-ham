import { UrlTypes } from "../../../types";
import styled, { CSSObject } from "styled-components";
import React, {
  ChangeEvent,
  UIEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Box from "../../utility/Box";
import Image from "next/image";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system";
import Zoom from "../../../public/icons/zoom-magnifire.svg";
import _ from "lodash";
import clsx from "clsx";
import { Blackremove } from "../../utility/Icons";
import useUrlMaker from "../../../hooks/useUrlMaker";
import SideBarContext from "../context/SideBarContext";
import { useRouter } from "next/router";
import { CSSTransition } from "react-transition-group";
let filters_opt_map = require("../../../dictionaries/filter_map_opt.json");

type CheckBoxFilter = {
  id: number;
  keys: string;
  label: string;
  placeholder: string;
  unit: string;
  options: { title: string; id: number; value: number }[];
  filter_id: number;
  description: string;
  themeMode: { bg: string; color: string; close: string; plus: string };
  default_value: { [key: string]: string } | Partial<UrlTypes>;
};

type Option = { title: string; id: number; value: number };

const Label = styled.p<TypographyProps | ColorProps | LayoutProps>`
  margin: 0 0 0 5px;
  ${layout}
  ${typography}
    ${color}
`;
const Wrapper = styled((props) => <Box {...props} />)<ColorProps>`
  margin: 5px -19px;
  position: relative;
  ${color}
`;
const BoxChildren = styled((props) => <Box {...props} />)`
  position: relative;
  z-index: 9999;
  padding-right: 10px;
`;

const SearchBox = styled.input<ColorProps>`
  background: ${(props) => props.theme.colors.purplish_brown};
  width: 100%;
  border-color: transparent;
  border-radius: 7px;
  flex: 1 1 90%;
  outline: none;
  padding-right: 5px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 20px;
  ${color}
`;

const iconZoom = {
  background: "#474546",
  cursor: "pointer",
  position: "absolute",
  left: "10px",
  top: "33%",
  transform: "translateY(-10%)",
  height: "15px",
};
const InputGroup = styled((props) => <Box {...props} />)<PositionProps>`
  ${position}
`;
const Span = styled.div<SpaceProps>`
  font-size: 12px;
  font-weight: 500;
  margin: auto;
  margin-right: 10px;
  flex: 0 1 max-content;
  ${space}
`;

const icon = {
  cursor: "pointer",
  flex: "1 1 20px",
};

const CheckBoxWrapper = styled((props) => <Box {...props} />)<
  PositionProps | BorderProps
>`
  padding: 0 0 10px 0px;
  cursor: pointer;
  &:not(:first-child) {
    padding-top: 10px;
  }
  ${position}
  ${border}
`;
const BoxMenuList = styled((props) => <Box {...props} />)`
  overflow: auto;
`;
const After = styled.div<HTMLElement | { shadow: boolean } | ColorProps>(
  // @ts-ignore
  (props: { shadow: boolean }) => {
    return {
      position: "absolute",
      width: " 100%",
      bottom: "0px",
      left: "0",
      right: "0",
      height: props.shadow ? "50px" : "0px",
    };
  },
  color
);

const iconrRemove = {
  cursor: "pointer",
  marginRight: "5px",
  marginTop: "-2px",
};

const BadgeSelected = styled.div<ColorProps>`
  background: #2d2c2c;
  border-radius: 12px;
  padding: 4px 9px 1.5px 9px;
  margin: 3px 0 0px 3px;
  display: flex;
  flex: 0 1 max-content;
  font-size: 12px;
  position: relative;
  vertical-align: center;
  ${color}
`;
const Cursor = styled.div`
  cursor: pointer;
  height: 24px;
  display: flex;
  align-items: Center;
`;
const Remove = styled.div<LayoutProps>`
  font-size: 12px;
  color: #fcc155;
  margin-left: 8px;
  ${layout}
`;
const BoxHeader = styled((props) => <Box {...props} />)`
  align-items: center;
  cursor: pointer;
  position: relative;
  padding-right: 10px;
`;
const Dot = styled.div`
  position: absolute;
  right: -5px;
`;

export default function CheckBox(props: CheckBoxFilter) {
  let parent_val = props.default_value[props.filter_id];
  let parent_arr_val: string[] = [];
  let valid_opt: Option[] = props.options;
  if (parent_val) {
    parent_arr_val = parent_val.split("_");
    let filter_list_json = filters_opt_map[props.filter_id];
    parent_arr_val = parent_arr_val.map((opt) => {
      return filter_list_json[opt]?.id;
    });
    if (parent_arr_val) {
      valid_opt = valid_opt.filter((op) =>
        parent_arr_val.includes(String(op["value"]))
      );
    }
  }

  const [selected, setSelected] = useState<{ [key: number]: Option }>({});
  const [strSearch, setSearch] = useState<string>("");
  const [scrollEnd, setScrollEnd] = useState(false);
  const [, setValues] = useUrlMaker();
  const router = useRouter();
  const menuListRef = useRef<HTMLDivElement>(null);

  const { openFilter, setOpenFilter } = useContext(SideBarContext);

  function select(id: number, opt: Option) {
    let _selected = { ...selected };
    if (_selected[id]) {
      delete _selected[id];
    } else {
      _selected[id] = opt;
    }
    setSelected(_selected);
    let array_to_set_in_url = Object.values(_selected);

    if (array_to_set_in_url.length > 0)
      setValues({
        [props.keys]: Object.values(_selected)
          .map((r) => r.title)
          .sort((a, b) => a.localeCompare(b))
          .join("_"),
      });
    else setValues({ [props.keys]: "" });
  }

  function search(e: ChangeEvent) {
    let str = (e.target as HTMLInputElement).value;
    setSearch(str);
  }

  function _onScroll() {
    const target = menuListRef.current as HTMLDivElement;
    if (!target) {
      return;
    }
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  }
  const onScroll = useCallback(_.debounce(_onScroll, 100), [menuListRef]);

  useEffect(() => {
    onScroll();
  }, [strSearch]);

  useEffect(() => {
    if (props.default_value && props.default_value[props.keys]) {
      // @ts-ignore
      let val_str: string = props?.default_value?.[props.keys];
      let arr = val_str.split("_");
      let _selected: { [key: number]: Option } = {};
      if (arr.length > 0) {
        arr.map((num: string) => {
          let opt = props.options.find((op: Option) => op.title === num);
          if (opt) _selected[opt.id] = opt;
        });
        setSelected(_selected);
      }
    }
  }, []);

  useEffect(() => {}, [router.query]);

  // @ts-ignore
  return (
    <Wrapper
      display={"flex"}
      flexDirection={"column"}
      px={"19px"}
      py={"10px"}
      bg={
        Object.entries(selected).length !== 0
          ? "rgba(252,193,85,0.14)"
          : props.themeMode.bg
      }
    >
      <BoxHeader
        onClick={() =>
          setOpenFilter
            ? props.id !== openFilter
              ? setOpenFilter(props.id)
              : setOpenFilter(-1)
            : ""
        }
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {Object.entries(selected).length !== 0 ? (
          <Dot>
            <Image src={"/icons/gigili.svg"} height={8} width={8} alt="" />
          </Dot>
        ) : null}
        <Label fontSize={12} color={props.themeMode.color}>
          {props.label}
        </Label>
        {openFilter === props.id ? (
          <Cursor>
            <Remove
              onClick={() => setSelected({})}
              display={Object.entries(selected).length !== 0 ? "block" : "none"}
            >
              حذف
            </Remove>
            <Image
              height={24}
              width={24}
              src={props.themeMode.close}
              alt={"btn"}
            />
          </Cursor>
        ) : (
          <Cursor>
            <Image
              height={24}
              width={24}
              src={props.themeMode.plus}
              alt={"btn"}
            />
          </Cursor>
        )}
      </BoxHeader>
      {/*<Box display={'flex'} flexWrap={'wrap'} mt={clsx({'7px':props.id!==openFilter && Object.values(selected).length>0})}  maxHeight={'100px'} overflow={'auto'} >*/}
      {/*    {Object.values(selected).map((s,i)=>(*/}
      {/*        <BadgeSelected color={'white'} key={i}>*/}
      {/*            {s.name}*/}
      {/*            <Blackremove onClick={()=>select(s.id,s)} style={iconrRemove}/>*/}
      {/*        </BadgeSelected>*/}
      {/*    ))}*/}
      {/*</Box>*/}
      <CSSTransition
        in={openFilter === props.id}
        timeout={300}
        classNames="drawer"
        unmountOnExit
      >
        <BoxChildren>
          <InputGroup
            display={"flex"}
            alignItems={"center"}
            position={"relative"}
            pt={"10px"}
          >
            <SearchBox color={props.themeMode.color} onChange={search} />
            <Zoom style={iconZoom} />
          </InputGroup>

          <BoxMenuList
            ref={menuListRef}
            className={"scroll-d-none"}
            maxHeight={"300px"}
            onScroll={onScroll}
          >
            {valid_opt
              .filter((f) => (strSearch ? f.title.includes(strSearch) : true))
              .map((opt, index, array) => {
                return (
                  <CheckBoxWrapper
                    key={index}
                    borderBottom={clsx({
                      "1px solid #d1d1d170": index !== array.length - 1,
                    })}
                    position={"relative"}
                    display={"flex"}
                    onClick={() => select(opt.id, opt)}
                  >
                    <Span mr={"0px"}>{opt.title}</Span>
                    {selected[opt.id] ? (
                      <Image
                        src={"/icons/Group 1415.svg"}
                        width={24}
                        height={24}
                        alt=""
                      />
                    ) : (
                      <Image
                        src={"/icons/Stroke 2.svg"}
                        width={24}
                        height={24}
                        alt=""
                      />
                    )}
                  </CheckBoxWrapper>
                );
              })}
          </BoxMenuList>
        </BoxChildren>
      </CSSTransition>
      {
        //@ts-ignore
        props.id === openFilter && <After shadow={!scrollEnd} />
      }
    </Wrapper>
  );
}
