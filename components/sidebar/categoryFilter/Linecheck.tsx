import React, { useEffect, useState } from "react";

import styled from "styled-components";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import FilterDrawer from "./FilterDrawer";
import useUrlMaker from "../../../hooks/useUrlMaker";
import clsx from "clsx";
import { UrlTypes } from "../../../types";
import theme from "../../../utils/theme";

type LineCheckFilterProps = {
  type: string;
  keys: string;
  id: number;
  label: string;
  unit: string;
  options: { title: string; id: number; value: number }[];
  filter_id: number;
  description: string;
  themeMode: { bg: string; color: string; close: string; plus: string };
  default_value: { [key: string]: string } | Partial<UrlTypes>;
};

const Pill = styled.div<ColorProps | BorderProps>`
  border: 1px solid;
  padding: 6px 10px;
  border-radius: 7px;
  font-size: 12px;
  text-align: center;
  margin: 5px;
  line-height: 1;
  background: transparent;
  cursor: pointer;
  vertical-align: middle;
  &:hover {
    border-color: #fcc155;
  }

  &.active {
    background: ${(props) => props.theme.colors.maize};
    color: ${(props) => props.theme.colors.purplish_brown_11};
  }
  ${color}
  ${border}
`;
const Heading = styled.div<
  LayoutProps | SpaceProps | ColorProps | FlexboxProps | BorderProps
>`
  display: flex;
  flex-flow: row wrap;
  ${color}
  ${space}
    ${layout}
    ${border}
    ${flexbox}
`;

function LineCheck(props: LineCheckFilterProps) {
  const [, setFilter] = useUrlMaker();
  const [selected, setSelected] = useState<number[]>([]);
  useEffect(() => {
    if (props.default_value[props.keys]) {
      // @ts-ignore
      const arr_selected = props.default_value[props.keys]
        .split("_")
        .map((r) => parseInt(r));
      // @ts-ignore
      setSelected([...arr_selected]);
    } else {
      setSelected([]);
    }
  }, [props.default_value]);

  const setSelectedOptions = (id: number) => {
    let _id: string = String(id);
    let _selected: string[] = [];
    if (props.type === "checkbox") {
      if (selected.length) {
        _selected = [...selected.map((r) => String(r))];
        if (_selected.indexOf(_id) > -1) {
          _selected.splice(_selected.indexOf(_id), 1);
        } else {
          _selected.push(_id);
        }
      } else {
        _selected.push(_id);
      }
    } else {
      if (selected.indexOf(id) > -1) {
        _selected = [];
      } else {
        _selected = [_id];
      }
    }

    setSelected(_selected.map((s) => parseInt(s)));
    setFilter({ [String(props.keys)]: _selected.sort().join("_") });
  };

  return (
    <FilterDrawer
      themeMode={props.themeMode}
      label={props.label}
      id={props.id}
      closeLabel={props.options
        .filter((p) => selected.indexOf(p.id) > -1)
        .map((p) => p.title)
        .join(" و ")}
      filterId={props.filter_id}
      value={selected.length}
      clear={() => setSelected([])}
    >
      <Heading
        borderRadius={clsx({ "8px": props.type !== "checkbox" })}
        margin={clsx({ "0 -7px": props.type !== "checkbox" })}
        bg={clsx({ purplish_brown_11: props.type !== "checkbox" })}
        justifyContent={clsx({ "space-between": props.type !== "checkbox" })}
        mt={clsx({ "10px": props.type !== "checkbox" })}
      >
        {props.options.map((op, i) => (
          <Pill
            key={i}
            border={clsx({ none: props.type !== "checkbox" })}
            borderColor={props.themeMode.color}
            color={props.themeMode.color}
            className={clsx({ active: selected.indexOf(op.id) > -1 })}
            onClick={() => setSelectedOptions(op.id)}
            tabIndex={op.id}
          >
            {op.title}
          </Pill>
        ))}
      </Heading>
    </FilterDrawer>
  );
}

LineCheck.defaultProps = {
  type: "checkbox",
};

export default LineCheck;
