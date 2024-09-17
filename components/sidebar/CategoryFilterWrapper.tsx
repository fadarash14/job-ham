import { useContext, useEffect, useState } from "react";
import SideBarContext from "./context/SideBarContext";
import { useRouter } from "next/router";
import { Filter } from "../../types";
import NumberRange from "./categoryFilter/NumberRange";
import LineCheck from "./categoryFilter/Linecheck";
import CheckBox from "./categoryFilter/CheckBox";
import ReactSelect from "./categoryFilter/ReactSelect";
import BooleanFilterCategory from "./categoryFilter/BooleanFilterCategory";
import { init } from "../../utils/helper";
import usePrevious from "../../hooks/usePrevious";
const filterByKey: {
  [key: string]: any;
} = require("../../dictionaries/simple-filters.json");

export default function CategoryFilterWrapper(props: { mobile: boolean }) {
  const { currentFilters } = useContext(SideBarContext);
  const [validFilterToShow, setValidFilterToShow] = useState<Filter[]>([]);
  const [values, setValues] = useState({});
  const router = useRouter();
  const lastfilters = usePrevious(currentFilters);
  const mobileTheme = {
    color: "black",
    bg: "rgba(209,209,209,0.3)",
    close: "/icons/side-filter-arrow-mobile-up.svg",
    plus: "/icons/side-filter-arrow-mobile.svg",
  };
  const desktopTheme = {
    color: "white",
    bg: "rgba(255,255,255,0.1)",
    close: "/icons/side-filter-arrow-up.svg",
    plus: "/icons/side-filter-arrow.svg",
  };
  let theme = props.mobile ? mobileTheme : desktopTheme;
  useEffect(() => {
    const router_keys = Object.keys(router.query);
    let valids: Filter[] = [];
    currentFilters?.map((f) => {
      // @ts-ignore
      if (
        router_keys?.includes(filterByKey[f]?.["filter_id"]) ||
        filterByKey[f]?.["filter_id"] === "all"
      ) {
        // show filter id ===all or filter that their filter id is present in url
        // @ts-ignore
        valids.push(filterByKey[f]);
      }
    });
    setValidFilterToShow(valids);
    //because here keys are set after mount we have to call init directly
    if (currentFilters) {
      let new_Values = init(router.query, currentFilters);
      setValues(new_Values);
    }
  }, [currentFilters, router.query]);
  console.log(validFilterToShow);

  let filters = validFilterToShow.map((f: Filter) => {
    switch (f.type) {
      case "checkbox":
        return (
          <CheckBox
            themeMode={theme}
            keys={f.key}
            label={f.label}
            filter_id={f.filter_id}
            description={f.description}
            unit={f.unit}
            options={f.options}
            id={parseInt(f.id)}
            default_value={values}
            placeholder={f.placeholder}
          />
        );
      case "radio":
        return (
          <ReactSelect
            themeMode={theme}
            keys={f.key}
            label={f.label}
            filter_id={f.filter_id}
            description={f.description}
            unit={f.unit}
            options={f.options}
            id={parseInt(f.id)}
            default_value={values}
            placeholder={f.placeholder}
          />
        );
      case "linecheck":
        return (
          <LineCheck
            themeMode={theme}
            keys={f.key}
            label={f.label}
            filter_id={f.filter_id}
            description={f.description}
            unit={f.unit}
            options={f.options}
            id={parseInt(f.id)}
            default_value={values}
          />
        );
      case "boolean":
        return (
          <BooleanFilterCategory
            themeMode={theme}
            keys={f.key}
            label={f.label}
            filter_id={f.filter_id}
            description={f.description}
            unit={f.unit}
            options={f.options}
            id={parseInt(f.id)}
            default_value={values}
          />
        );
      case "lineradio":
        return (
          <LineCheck
            themeMode={theme}
            keys={f.key}
            type={"radio"}
            label={f.label}
            filter_id={f.filter_id}
            description={f.description}
            unit={f.unit}
            options={f.options}
            id={parseInt(f.id)}
            default_value={values}
          />
        );
      case "suggestionnumber":
      case "number":
        return (
          <NumberRange
            options={f.options}
            themeMode={theme}
            keys={f.key}
            label={f.label}
            filter_id={f.filter_id}
            description={f.description}
            unit={f.unit}
            id={parseInt(f.id)}
            default_value={values}
            placeholder={f.placeholder}
          />
        );
    }
  });

  return <div>{filters}</div>;
}
