import { PropsWithChildren, useRef } from "react";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import {
  search_keys_to_set_get,
  search_keys_to_set_get_all_cat,
  search_keys_to_set_get_all_city,
  sign_search_array,
} from "../utils/searchConfig";
import { SelectedCities } from "../types";
import { getCityAndAreaFromString, safeXss } from "../utils/helper";
let filters_key: {
  [key: string]: {
    label: string;
    type: string;
    options: { name: string; option_id: number; id: number }[];
    unit: string;
  };
} = require("../dictionaries/filters_key.json");
let seo_descriptions: {
  [key: string]: {
    title: string;
    metatitle: string;
    otherTag: string;
    metadescription: string;
  };
} = require("../dictionaries/seo-description.json");
let category_key: {
  [key: string]: {
    title: string;
    metakeyword: string;
    metadescription: string;
  };
} = require("../dictionaries/category.json");
let ostan_key: {
  [key: string]: {
    id: number;
    name: string;
    lat: number;
    lang: number;
    cities: any;
    areas: {
      [k: string]: { id: number; name: string; lat: number; long: number };
    };
  };
} = require("../dictionaries/parent_city.json");

const SeoTitle = (
  props: PropsWithChildren<{
    category_key: {
      [key: string]: {
        title: string;
        metakeyword: string;
        metadescription: string;
      };
    };
    seo_description: {
      [key: string]: {
        title: string;
        metatitle: string;
        otherTag: string;
        metadescription: string;
      };
    };
  }>
) => {
  // const [title, setTitle] = useState('')
  // const [description, setDescription] = useState('')
  // const [keywords, setKeywords] = useState('')
  const router = useRouter();
  const title = useRef("");
  const description = useRef("");
  const keywords = useRef("");
  let _title = "";
  let _description = "";
  let _keywords = "";
  let keys = router.query["key"];
  let current_keys: string[] = keys
    ? Array.isArray(keys)
      ? keys
      : [keys]
    : [];
  const querystrings_static: { [s: string]: string } = {};
  let filter_strings: { [s: string]: string } = {};
  Object.keys(router.query).map((i) => {
    if (
      sign_search_array.includes(i) ||
      i === search_keys_to_set_get["search"]
    ) {
      //@ts-ignore
      querystrings_static[i] = router.query[i];
    } else if (i !== "key") {
      //@ts-ignore
      filter_strings[i] = router.query[i];
    }
  });
  if (current_keys.length > 1) {
    let category = props.category_key[current_keys[0]];
    if (category) {
      _title = category["title"];
      _description = category["metadescription"];
      _keywords = category["metakeyword"];
    }
    let selected_city_area_object: SelectedCities =
      getCityAndAreaFromString(current_keys);
    if (Object.keys(selected_city_area_object).length > 0) {
      Object.keys(selected_city_area_object).map((ostan) => {
        Object.keys(selected_city_area_object[ostan]).map((city) => {
          let _city_tmp =
            city !== search_keys_to_set_get_all_city
              ? " " +
                city +
                " " +
                selected_city_area_object[ostan][city].join(" ")
              : " " +
                ostan_key[ostan]["name"] +
                " " +
                search_keys_to_set_get_all_city;
          _title += _city_tmp;
        });
      });
    }
  } else if (current_keys.length === 1) {
    if (current_keys[0] !== search_keys_to_set_get_all_cat) {
      let category = props.category_key[current_keys[0]];
      if (category) {
        _title = category["title"];
        _description = category["metadescription"];
        _keywords = category["metakeyword"];
      }
    }
  } else {
    _title = "نیازمندی‌های همشهری";
  }
  Object.keys(filter_strings).map((filter) => {
    if (filters_key[filter]) {
      let f = filters_key[filter];
      if (
        f.type === "lineradio" ||
        f.type === "linecheck" ||
        f.type === "radio"
      ) {
        let value = f.options.find(
          (opt) => String(opt.id) == filter_strings[filter]
        );
        if (value) {
          _title += " " + value.name;
        }
      } else if (f.type === "checkbox") {
        _title += " " + filter_strings[filter];
      }
    }
  });
  if (querystrings_static[search_keys_to_set_get["search"]]) {
    _title += " " + querystrings_static[search_keys_to_set_get["search"]];
  }
  // setTitle(_title)
  if (props.seo_description[decodeURI(router?.asPath)]) {
    //if in redirect exists overrride for all
    _title = props.seo_description[decodeURI(router?.asPath)]["metatitle"]
      ? props.seo_description[decodeURI(router?.asPath)]["metatitle"]
      : _title;
    _description = props.seo_description[decodeURI(router?.asPath)][
      "metadescription"
    ]
      ? props.seo_description[decodeURI(router?.asPath)]["metadescription"]
      : _description;
  }
  title.current = safeXss(_title);
  if (_description) {
    description.current = safeXss(_description);
  }
  if (_keywords) {
    keywords.current = safeXss(_keywords);
  }

  return (
    <Head>
      <title>{title.current}</title>
      {description.current && (
        <meta name="description" content={description.current} />
      )}
      {keywords.current && <meta name="keywords" content={keywords.current} />}
      {description.current && (
        <meta name="twitter:card" content={description.current} />
      )}
      {title.current && <meta name="twitter:title" content={title.current} />}
      {description.current && (
        <meta name="twitter:description" content={description.current} />
      )}
      {title.current && <meta property="og:title" content={title.current} />}
      {description.current && (
        <meta property="og:description" content={description.current} />
      )}
      {seo_descriptions[router.asPath]?.["otherTag"]}
    </Head>
  );
};
export default SeoTitle;
