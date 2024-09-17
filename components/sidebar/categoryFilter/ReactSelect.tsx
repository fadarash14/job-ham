import { UrlTypes } from "../../../types";
import React, { useEffect, useState } from "react";
import Select, {
  ActionMeta,
  IndicatorSeparatorProps,
  OptionProps,
  Options as OptionsType,
  StylesConfig,
} from "react-select";
import { CSSObject } from "@emotion/serialize";
import { MenuProps } from "react-select";
import FilterDrawer from "./FilterDrawer";
import Box from "../../utility/Box";
import useUrlMaker from "../../../hooks/useUrlMaker";
import UseUrlValues from "../../../hooks/useUrlValues";
import { list } from "../../../utils/helper";
import { useRouter } from "next/router";
let filters_opt_map = require("../../../dictionaries/filter_map_opt.json");

type RadioProps = {
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

const customStyles: StylesConfig<Option, any> = {
  indicatorsContainer: () => ({
    position: "absolute",
    left: "-10px",
    top: "-10px",
  }),
  control: () => ({
    height: "30px",
    background: "transparent",
    borderBottom: "1px solid rgba(255,255,255,0.5)",
    fontsize: "14px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "150px",
    marginRight: "5px",
    position: "relative",
    "&:hover": {
      borderBottom: "2px solid #fcc155",
    },
  }),
  placeholder: () => ({
    fontSize: "12px",
    opacity: "0.5",
    lineHeight: "15px",
  }),
  valueContainer: () => ({
    height: "20px",
  }),
  input: () => ({
    fontSize: "14px",
    position: "absolute",
    top: "0",
  }),
  singleValue: () => ({
    position: "absolute",
    top: "0",
    fontSize: "14px",
    overflow: "none",
    minWidth: "119px",
  }),
  menu: (base: CSSObject, props: MenuProps<any, any, any>): CSSObject => ({
    width: "100%",
    maxWidth: "150px",
    color: "black",
    background: "white",
    fontSize: "12px",
    position: "absolute",
    right: 0,
    zIndex: 2,
    marginRight: "5px",
    direction: "ltr",
    textAlign: "right",
    borderBottomLeftRadius: "14px",
    borderBottomRightRadius: "14px",
  }),
  menuList: () => ({
    width: "100%",
    overflowY: "auto",
    maxHeight: "150px",
    "-ms-overflow-style": "none" /* IE and Edge */,
    "scrollbar-width": "none" /* Firefox */,
    marginRight: "3px",
    paddingRight: "3px",
  }),
  option: (
    base: CSSObject,
    { options, isSelected, isFocused }: OptionProps<any, any, any>
  ): CSSObject => ({
    ...base,
    textAlign: "center",
    fontSize: "1em",
    background: isSelected ? "#FBA303" : isFocused ? "#e8e8ec" : "",
  }),
  indicatorSeparator: (
    base: CSSObject,
    props: IndicatorSeparatorProps<any, any, any>
  ): CSSObject => ({
    ...base,
    width: "10px",
  }),
};
type Option = { title: string; id: number; value: number };
type Opt = { label: string; value: number };
function ReactSelect(props: RadioProps) {
  let [opt, setOpt] = useState<Opt[]>([]);
  let [list_opt, setList] = useState({});

  useEffect(() => {
    let parent_val = props.default_value[props.filter_id];
    let parent_arr_val: string[] = [];
    let valid_opt: Option[] = props.options;
    if (parent_val) {
      parent_arr_val = parent_val.split("_");
      let filter_list_json = filters_opt_map[props.filter_id];
      let selected_parent_id: number[] = [];
      parent_arr_val.map((opt) => {
        filter_list_json[opt]
          ? selected_parent_id.push(filter_list_json[opt].id)
          : "";
      });
      if (parent_arr_val) {
        valid_opt = valid_opt.filter((op) =>
          selected_parent_id.includes(op["value"])
        );
      }
    }
    let opt: Opt[] = valid_opt.map((op) => ({ label: op.title, value: op.id }));
    let list_opt = list("label", ["value", "label"], opt);
    setOpt(opt);
    setList(list_opt);
  }, [props.default_value]);

  const [, setSelectedRadio] = useUrlMaker();
  let values = UseUrlValues([props.keys]);

  function setOptionValue(
    selected: Option | OptionsType<Option> | null,
    actionMeta: ActionMeta<Option>
  ) {
    if (selected) {
      //@ts-ignore
      setSelectedRadio({ [props.keys]: selected["label"] });
    } else {
      setSelectedRadio({ [props.keys]: "" });
    }
  }

  const filterOptions = (
    candidate: { label: string; value: string; data: any },
    input: string
  ) => {
    if (input) {
      return candidate.label.includes(input.toLowerCase());
    }
    return true;
  };
  return (
    <FilterDrawer
      themeMode={props.themeMode}
      label={props.label}
      id={props.id}
      closeLabel={
        // @ts-ignore
        values[props.keys] ? list_opt[values[props.keys]]?.["label"] : ""
      }
      filterId={props.filter_id}
      // @ts-ignore
      value={list_opt[values[props.keys]]}
      clear={() => setList({})}
    >
      <Box mt={"10px"}>
        <Select
          styles={customStyles}
          aria-labelledby="aria-label"
          inputId="aria-example-input"
          name="aria-live-color"
          options={opt}
          // @ts-ignore
          defaultValue={list_opt[values[props.keys]]}
          // @ts-ignore
          onClear
          isClearable={true}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              textLight: props.themeMode.color,
              text: props.themeMode.color,
            },
          })}
          onChange={setOptionValue}
          placeholder={props.placeholder}
          filterOption={filterOptions}
        />
      </Box>
    </FilterDrawer>
  );
}

export default ReactSelect;
