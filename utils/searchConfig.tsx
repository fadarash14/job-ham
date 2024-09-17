const sideBarConfig = {
  category: {
    sign: "در-دسته-بندی-",
    after: "",
  },

  city: {
    sign: "c_",
    after: ["category", "keyword"],
    url: "cityId",
  },
  area: {
    sign: "a_",
    after: "city",
    url: "areaIds",
  },
  hasPicture: {
    sign: "عکسدار",
    url: "hasPicture",
  },
  instant: {
    sign: "فوری",
    url: "isInstant",
  },
  newspaper: {
    sign: "روزنامه",
    url: "isNewspaper",
  },
  graphical: {
    sign: "گرافیکی",
    url: "isPictorial",
  },
  search: {
    sign: "search",
    url: "text",
  },
};
export const search_keys_to_set_get_all_cat = "همه-اگهی-ها";
export const search_not_found = "not_found";
export const search_keys_to_set_get_all_area = "تمام محله ها";
export const search_keys_to_set_get_all_city = "تمام شهر ها";
export const sign_search_array = [
  "hasPicture",
  "instant",
  "newspaper",
  "graphical",
];
export const search_keys_to_set_get = {
  city_area: "city_area",
  category: "category",
  hasPicture: "hasPicture",
  instant: "instant",
  newspaper: "newspaper",
  graphical: "graphical",
  search: "text",
};
export const search_key_0_separator = "_و_";
export const city_area_regex = new RegExp("در-شهر-(.*)-محله-های-(.*)");
export const city_regex = new RegExp("c-(.*)");
export const area_regex = new RegExp("a-(.*)");
export const category_regex = new RegExp("در-دسته-بندی-(.*)");
export default sideBarConfig;
