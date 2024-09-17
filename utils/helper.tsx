import {
  AddressType,
  Category,
  City,
  CustomDate,
  PartlyDate,
  SearchItemType,
  SelectedCities,
  UrlTypes,
} from "../types";
import searchConfig, {
  search_keys_to_set_get,
  search_keys_to_set_get_all_cat,
  search_keys_to_set_get_all_city,
  search_not_found,
  sign_search_array,
} from "./searchConfig";
import filters from "@/dictionaries/cv-filters.json";
import { _MaritalStatus } from "@/mock/_cv";
import city from "@/dictionaries/cityId.json";
const cities: { [key: string]: City } = require("../dictionaries/city.json");
const filterByKey: {
  [key: string]: any;
} = require("../dictionaries/filters_key.json");
const option_by_key: {
  [key: string]: { id: number };
} = require("../dictionaries/filter_map_opt.json");
import { ParsedUrlQuery } from "querystring";
const category: {
  [k: string]: Category;
} = require("../dictionaries/category.json");
const cityList: {
  [key: string]: {
    id: number;
    name: string;
    ostan: string;
    lat: number;
    lang: number;
    areas: {
      [k: string]: { id: number; name: string; lat: number; long: number };
    };
  };
} = require("../dictionaries/city.json");
import { knownUrls } from "@/mock/_urls";
import { isEqual } from "lodash";

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

export async function resizeBase64Img(
  imageSrc: string,
  pixelCrop = { width: 768, height: 768, x: 0, y: 0 },
  rotation = 0
) {
  // console.log('inside crop',imageSrc,pixelCrop,rotation)
  const image: HTMLImageElement = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const maxSize = Math.max(image.width, image.height);
  const safeArea = maxSize;

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = image.width;
  canvas.height = image.height;

  // draw rotated image and store data.
  ctx?.drawImage(image, 0, 0, 768, 768);

  return canvas.toDataURL("image/jpeg");
}

export async function ResizeImage(
  imageSrc: string,
  width: number = 768,
  height: number = 768
) {
  const img: HTMLImageElement = await createImage(imageSrc);

  // Make sure the width and height preserve the original aspect ratio and adjust if needed
  if (img.height > img.width) {
    width = Math.floor(height * (img.width / img.height));
  } else {
    height = Math.floor(width * (img.height / img.width));
  }

  let resizingCanvas: HTMLCanvasElement = document.createElement("canvas");
  let resizingCanvasContext = resizingCanvas.getContext("2d");

  // Start with original image size
  resizingCanvas.width = img.width;
  resizingCanvas.height = img.height;

  // Draw the original image on the (temp) resizing canvas
  resizingCanvasContext?.drawImage(
    img,
    0,
    0,
    resizingCanvas.width,
    resizingCanvas.height
  );

  let curImageDimensions = {
    width: Math.floor(img.width),
    height: Math.floor(img.height),
  };

  let halfImageDimensions = {
    width: 0,
    height: 0,
  };

  // Quickly reduce the dize by 50% each time in few iterations until the size is less then
  // 2x time the target size - the motivation for it, is to reduce the aliasing that would have been
  // created with direct reduction of very big image to small image
  while (curImageDimensions.width * 0.5 > width) {
    // Reduce the resizing canvas by half and refresh the image
    halfImageDimensions.width = Math.floor(curImageDimensions.width * 0.5);
    halfImageDimensions.height = Math.floor(curImageDimensions.height * 0.5);

    resizingCanvasContext?.drawImage(
      resizingCanvas,
      0,
      0,
      curImageDimensions.width,
      curImageDimensions.height,
      0,
      0,
      halfImageDimensions.width,
      halfImageDimensions.height
    );

    curImageDimensions.width = halfImageDimensions.width;
    curImageDimensions.height = halfImageDimensions.height;
  }

  // Now do final resize for the resizingCanvas to meet the dimension requirments
  // directly to the output canvas, that will output the final image
  let outputCanvas: HTMLCanvasElement = document.createElement("canvas");
  let outputCanvasContext = outputCanvas.getContext("2d");

  outputCanvas.width = width;
  outputCanvas.height = height;

  outputCanvasContext?.drawImage(
    resizingCanvas,
    0,
    0,
    curImageDimensions.width,
    curImageDimensions.height,
    0,
    0,
    width,
    height
  );

  // output the canvas pixels as an image. params: format, quality
  return outputCanvas.toDataURL("image/jpeg");

  // TODO: Call method to do something with the resize image
}

export function wordCount(text: any) {
  let totalCount = 0;
  let words = text.replace(/[\n\s]/gm, " ").split(" ");
  words.forEach(function (words: any) {
    if (words.length > 0) {
      totalCount++;
    }
  });
  return totalCount;
}

export function list(
  key: string,
  val: string | string[],
  array: any[] | ReadonlyArray<any>
) {
  if (typeof array === "undefined") {
    return {};
  }
  let ls = {};
  if (Array.isArray(val)) {
    //@ts-ignore
    array.forEach((el, index) => {
      let v = {};

      val.map((i) => {
        v = { ...v, [i]: el[i] };
      });
      ls = { ...ls, [el[key]]: v };
    });
  } else {
    array.forEach((el, index) => {
      ls = { ...ls, [el[key].replace(/(\r\n|\n|\r)/gm, "")]: el[val] };
    });
  }
  return ls;
}

export const segmentByChunk = (array: any[], chunk: number) => {
  let i,
    j,
    temporary = [];
  for (i = 0, j = array.length; i < j; i += chunk) {
    temporary.push(array.slice(i, i + chunk));
  }
  return temporary;
};

export const uniqueArrayByProperty = (
  array: Array<any>,
  callback: Function
) => {
  return array?.reduce((prev, item) => {
    const v = callback(item);
    if (v && !prev[v]) prev[v] = item;
    return prev;
  }, {});
};

export const uniqueStringArray = (array: Array<string>) => {
  function onlyUnique(value: string, index: number, self: Array<string>) {
    return self.indexOf(value) === index;
  }
  let unique = array.filter(onlyUnique);

  return unique;
};
export const removeOnDuplicate = (array: Array<string | number>) => {
  function onlyUnique(value: string, index: number, self: Array<string>) {
    let numOfTrue = 0;
    for (let i = 0; i < self.length; i++) {
      if (self[i] === value) {
        //increment if true
        numOfTrue++;
      }
    }
    return numOfTrue === 1;
  }
  // @ts-ignore
  let unique = array.filter(onlyUnique);
  return unique;
};
export function getStringBetween(x: string, start: string, end: string) {
  const regex = new RegExp(`${start}(.*?)${end}`);

  if (regex.test(x)) {
    return regex.exec(x)![1];
  } else return undefined;
}

export function makeSelectedCityAndAreaString(
  selectedObject: SelectedCities
): string[] {
  let selectedCityAndArea: string[] = [];
  let cities_obj: { [key: string]: Array<string> } = Object.values(
    selectedObject
  ).reduce((tmp, cities_of_ostan) => ({ ...tmp, ...cities_of_ostan }), {});
  Object.keys(selectedObject)
    .sort()
    .map((ostan) => {
      cities_obj = selectedObject[ostan];
      Object.keys(cities_obj)
        .sort()
        .map((city: string, key: number) => {
          if (cities_obj[city].length > 0) {
            let area = cities_obj[city]
              .map((area) => {
                return area.replaceAll(/[\s-]/gi, "");
              })
              .join("-");
            selectedCityAndArea = [...selectedCityAndArea, city, area];
          } else {
            selectedCityAndArea = [
              ...selectedCityAndArea,
              ostan,
              city.replaceAll(/[\s-]/gi, ""),
            ];
          }
        });
    });
  return selectedCityAndArea;
}

export function getCityAndAreaFromString(strArray: string[]): SelectedCities {
  let selected_city_area: SelectedCities = {};
  if (strArray.length > 1) {
    let [, ...city_area] = strArray;
    if (city_area.length % 2 === 0)
      for (let i = 0; i < city_area.length; i = i + 2) {
        let ostan_current = cityList[city_area[i]]["ostan"];
        if (ostan_current) {
          if (!selected_city_area[ostan_current]) {
            // create object if not exist
            selected_city_area[ostan_current] = {};
          }
          selected_city_area[ostan_current][city_area[i]] = city_area[i + 1]
            .split("-")
            .map((area) => {
              return cityList[city_area[i]]["areas"][area]?.["name"] ?? area;
            });
        } else {
          //this is ostan
          selected_city_area[city_area[i]] = {
            [search_keys_to_set_get_all_city]: [],
          };
        }
      }
  }

  return selected_city_area;
}

export function makeSelectedCategoryUrlString(category: Category) {
  return category["slug"];
}
export function getSelectedCategoryFromUrl(str: string): Category {
  let cat;
  if (!!category[str]) {
    cat = category[str];
  } else {
  }
  // @ts-ignore
  return cat;
}

export const init = (url_key: ParsedUrlQuery, keys: string[]) => {
  let default_val: Partial<UrlTypes> = {};
  let keys_query = url_key["key"];

  let current_keys: string[] = keys_query
    ? Array.isArray(keys_query)
      ? keys_query
      : [keys_query]
    : [];
  const queryStrings_static: { [s: string]: string } = {};
  const filter_strings: { [s: string]: string } = {};

  Object.keys(url_key).map((i, num) => {
    if (
      sign_search_array.includes(i) ||
      i === search_keys_to_set_get["search"]
    ) {
      //@ts-ignore
      queryStrings_static[i] = url_key[i];
    } else if (i !== "key") {
      //@ts-ignore
      filter_strings[i] = url_key[i];
    }
  });
  keys?.map((key, index) => {
    switch (key) {
      case search_keys_to_set_get["city_area"]:
        if (current_keys.length > 1) {
          let selected_city_area_object: SelectedCities =
            getCityAndAreaFromString(current_keys);

          if (Object.keys(selected_city_area_object).length > 0) {
            // @ts-ignore
            default_val[search_keys_to_set_get["city_area"]] =
              selected_city_area_object;
          }
        }
        break;
      case search_keys_to_set_get["category"]:
        if (current_keys.length > 0) {
          let selectedCategory: Category = getSelectedCategoryFromUrl(
            current_keys[0]
          );

          if (selectedCategory && Object.keys(selectedCategory).length > 0) {
            // @ts-ignore
            default_val[search_keys_to_set_get["category"]] = selectedCategory;
          } else if (current_keys[0] !== search_keys_to_set_get_all_cat) {
            default_val[search_not_found] = true;
          }
        }
        break;
      case search_keys_to_set_get["hasPicture"]:
      case search_keys_to_set_get["newspaper"]:
      case search_keys_to_set_get["graphical"]:
      case search_keys_to_set_get["instant"]:
        if (!!queryStrings_static[key]) {
          // @ts-ignore
          default_val[key] = true;
        }
        break;
      case search_keys_to_set_get["search"]:
        if (!!queryStrings_static[key])
          default_val[key] = queryStrings_static[key];
        break;
      default:
        if (!!filterByKey[key]) {
          default_val[key] = filter_strings[key];
        } else {
          default_val[search_not_found] = true;
        }
    }
  });
  // console.log(default_val,'init result')
  return default_val;
};

export const preparingSearchFromInit = (obj: Partial<UrlTypes>) => {
  let search: { [k: string]: any } = {};
  Object.keys(obj).map((key) => {
    switch (key) {
      case search_keys_to_set_get["category"]:
        // @ts-ignore
        search["categoryId"] = obj[key]["id"];
        break;
      case search_keys_to_set_get["city_area"]:
        // @ts-ignore
        search["cityIds"] = [];
        // @ts-ignore
        search["areaIds"] = [];
        // @ts-ignore
        Object.keys(obj["city_area"]).map((ostan) => {
          // @ts-ignore
          if (cities[ostan]) {
            // @ts-ignore
            Object.keys(obj["city_area"][ostan]).map((city) => {
              if (city !== search_keys_to_set_get_all_city) {
                search["cityIds"].push(cities[city]["id"]);
                // @ts-ignore
                obj["city_area"][ostan][city].map((area) => {
                  let _area_key = area.replace(/[\s-]/gi, "");

                  // @ts-ignore
                  cities[city]["areas"]?.[_area_key]
                    ? // @ts-ignore
                      search["areaIds"].push(
                        // @ts-ignore
                        cities[city]["areas"]?.[_area_key]["id"]
                      )
                    : console.log("search[search_not_found]=true");
                });
              } else {
                search["cityIds"].push(cities[ostan]["id"]);
              }
            });
          }
        });
        break;
      case search_keys_to_set_get["hasPicture"]:
      case search_keys_to_set_get["instant"]:
      case search_keys_to_set_get["graphical"]:
      case search_keys_to_set_get["newspaper"]:
        // @ts-ignore
        search[searchConfig[key]["url"]] = true;

        break;
      case search_keys_to_set_get["search"]:
        // @ts-ignore
        search[searchConfig["search"]["url"]] = obj[key];
        break;
    }
  });

  return search;
};

export const makeSelectedFilterReadyForRequest = (url: ParsedUrlQuery) => {
  if (Object.keys(url).length > 0) {
    let statics = [
      "key",
      ...sign_search_array,
      search_keys_to_set_get["search"],
    ];
    let keys_to_regard = Object.keys(url).reduce((obj: ParsedUrlQuery, key) => {
      if (!statics.includes(key) && filterByKey[key]) {
        obj[key] = url[key];
      }
      return obj;
    }, {});
    let filters: {
      id: number;
      value?: number | boolean;
      values?: number[];
      toValue?: number;
      optionId?: number;
    }[] = [];
    Object.keys(keys_to_regard).map((k) => {
      let _filter = filterByKey[k];
      let value = keys_to_regard[k];
      if (value) {
        switch (_filter["type"]) {
          case "checkbox":
            if (typeof value === "string") {
              let val = value?.split("_");
              filters.push({
                id: _filter["id"],
                values: val.map((m) => parseInt(m)),
              });
            }

            break;
          case "radio":
            if (typeof value === "string") {
              filters.push({ id: _filter["id"], value: parseInt(value) });
            }
            break;
          case "boolean":
            filters.push({ id: _filter["id"], value: 1 });
            break;
          case "lineradio":
            if (typeof value === "string") {
              filters.push({ id: _filter["id"], value: parseInt(value) });
            }

            break;
          case "number":
          case "suggestionnumber":
            if (typeof value === "string") {
              let number = value.split("_");
              filters = [
                ...filters,
                {
                  id: _filter["id"],
                  value: parseInt(number[0]),
                  toValue: parseInt(number[1]),
                },
              ];
            }

            break;
        }
      }
    });
    return filters;
  }
  return [];
};

export const numSeparator = (number: string) => {
  let grp_match = number.match(/\d{1,3}(?=(\d{3})*$)/g);
  if (grp_match) {
    return grp_match.join(",");
  }
  return number;
};
export const numParser = (val: number) => {
  let number: { [key: number]: string } = {
    3: "",
    6: "هزار",
    9: "میلیون",
    12: "میلیارد",
  };
  if (val === 0) {
    return "";
  }
  let v: string = String(val);
  let strLen: number = String(val).length;
  let str = "";

  Object.keys(number).some((num) => {
    if (strLen <= parseInt(num)) {
      if (v) {
        let nm_sprt = numSeparator(v);
        str = nm_sprt + number[parseInt(num)];
      }
    }
    return strLen <= parseInt(num);
  });
  return str;
};

export const parseNumberToString = (values: [number, number]) => {
  let number: { [key: number]: string } = {
    3: "",
    6: "هزار",
    9: "میلیون",
    12: "میلیارد",
  };
  let pre = ["از", "تا"];
  let str: string[] = [];
  values.map((val, index) => {
    if (val === 0) {
      return "";
    }
    let v: string = String(val);
    let strLen: number = String(val).length;
    Object.keys(number).some((num) => {
      if (strLen <= parseInt(num)) {
        if (v) {
          let nm_sprt = numSeparator(v);
          str[index] = pre[index] + " " + nm_sprt + number[parseInt(num)];
        }
      }
      return strLen <= parseInt(num);
    });
  });
  return str.join(" ");
};

export const safeXss = (obj: any) => {
  let tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };
  if (typeof obj === "object") {
    Object.keys(obj).map((key) => {
      if (typeof obj[key] === "string") {
        // console.log(obj[key])
        //@ts-ignore
        obj[key] = obj[key].replace(/[&<>]/g, function (tag) {
          // @ts-ignore
          return tagsToReplace[tag] || tag;
        });
      }
    });
  } else if (typeof obj === "string") {
    obj = obj.replace(/[&<>]/g, function (tag) {
      // @ts-ignore
      return tagsToReplace[tag] || tag;
    });
  }
  return obj;
};

//convert persian digits to english
export default function convertDigitToEnglish(input: string) {
  // console.log(input,'to persian');
  input = input
    // @ts-ignore
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
    // @ts-ignore
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  // console.log(input,'to english');
  return input;
}
export const convertKnownUrls = (urls: string[]) => {
  const newurls: AddressType[] = [
    {
      name: "صفحه اصلی",
      path: "/",
    },
  ];
  urls.map((item) => {
    const url = knownUrls.find((x) => x.path === item);
    if (url) {
      newurls.push(url);
    } else {
      newurls.push({ name: item, path: item });
    }
  });
  return newurls;
};
export const convertMonth: {
  [key: string]: string;
} = {
  فروردین: "01",
  اردیبهشت: "02",
  خرداد: "03",
  تیر: "04",
  مرداد: "05",
  شهریور: "06",
  مهر: "07",
  آبان: "08",
  آذر: "09",
  دی: "10",
  بهمن: "11",
  اسفند: "12",
};

export const convertNumberToMonth: { [key: string]: string } = {
  "01": "فروردین",
  "02": "اردیبهشت",
  "03": "خرداد",
  "04": "تیر",
  "05": "مرداد",
  "06": "شهریور",
  "07": "مهر",
  "08": "آبان",
  "09": "آذر",
  "10": "دی",
  "11": "بهمن",
  "12": "اسفند",
};

export function convertToJalaliString(dateObject: PartlyDate | CustomDate) {
  if (dateObject.Month !== "") {
    const formattedString = `${dateObject.Year}${
      convertMonth[dateObject.Month]
    }${dateObject.Day ? dateObject.Day : "00"}`;
    return formattedString;
  }
}

export const jalaliDateValidation = (
  value: CustomDate,
  date: string | number
) => {
  //It means that the value is Day type
  if (typeof date === "number") {
    const month: number = parseInt(convertMonth[value.Month]);
    if (month === 12 && date >= 29) {
      return 29;
    } else if (month > 6 && date >= 30) {
      return 30;
    } else {
      return date;
    }
  }
  //It means that the value is Month type
  if (typeof date === "string") {
    const month: number = parseInt(convertMonth[date]);
    if (month === 12 && value.Day >= 29) {
      return 29;
    } else if (month > 6 && value.Day >= 30) {
      return 30;
    } else {
      return value.Day;
    }
  }
};
interface Data {
  filters: {
    [key: string]: any;
    options: { id: number; title: string }[];
  }[];
}

interface InputObject {
  [key: string]: number;
}

interface OutputObject {
  [key: string]: string | number;
}

const findTitleById = (data: Data, key: string, id: number): string => {
  const filter = data.filters.find((filter) => filter.key === key);
  if (filter) {
    const option = filter.options.find((option) => option.id === id);
    return option ? option.title : "Unknown";
  }

  return "Unknown";
};

export const convertIdsToTitles = (
  data: Data,
  inputObject: InputObject
): OutputObject => {
  const outputObject: OutputObject = { ...inputObject };

  for (const key in inputObject) {
    if (inputObject.hasOwnProperty(key)) {
      const value = inputObject[key];

      if (typeof value === "number") {
        const id = value;
        const title = findTitleById(data, key, id);
        if (title !== "Unknown") {
          outputObject[key] = title;
        }
      } else if (typeof value === "string") {
        outputObject[key] = value;
      }
    }
  }

  return outputObject;
};

export const getSexById = (id: number|null) => {
  return filters.sex.find((x) => x.id === id);
};
export const getMilitaryStatusById = (id: number|null) => {
  return filters.militaryServices.find((x) => x.id === id);
};
export const getCityNameById = (id: number|null) => {
  //@ts-ignore
  return city[id?.toString()]?.name;
};
export const getCooperationNameById = (id: number|null) => {
  return filters.typeCooperations.find((x) => x.id === id)?.title;
};
export const getfieldStudyName = (id: number|null) => {
  return filters.fieldStudies.find((x) => x.id === id)?.title;
};
export const getTypeOwnershipName = (id: number|null) => {
  return filters.typeOwnerShips.find((x) => x.id === id)?.title;
};
export const getEducationGradeName = (id: number|null) => {
  return filters.grades.find((x) => x.id === id)?.title;
};
export const getLanguageName = (id: number|null) => {
  return filters.languages.find((x) => x.id === id)?.title;
};
export const getLevelById = (id: any) => {
  return filters.levels.find((x) => x.id === id)?.title;
};

export const convertStringtoDate = (date: string) => {
  const Day = date.substr(6, 2);
  const Month = date.substr(4, 2);
  const Year = date.substr(0, 4);
  return `${Year}/${Month}/${Day}`;
};
export const getMarriedStatusByBoolean = (isMarried: boolean) => {
  return isMarried ? _MaritalStatus[1].title : _MaritalStatus[0].title;
};

export const getAreaNameById = (cityId: number, areaId: number) => {
  let area = "";
  if (cityId && cityId !== -1) {
    //@ts-ignore
    if (Object.keys(city[cityId]?.areas)?.length === 0) {
      area = "تمام محله ها";
    } else {
      //@ts-ignore
      area = city[cityId?.toString()]?.areas[areaId?.toString()]?.name;
    }
  }
  return area;
};

export const changeDateToText = (
  startDate: { Day?: number; Year: number; Month: string } | string,
  endDate: { Day?: number; Year: number; Month: string } | string,
  still?: boolean,
  type?: string
) => {
  let text = "";
  if (still) {
    type === "job" ? (text = "مشغول به کار هست") : (text = "در حال تحصیل");
  } else {
    if (typeof startDate === "string" && typeof endDate === "string") {
      const startMonth = convertNumberToMonth[startDate.substr(4, 2)];
      const startYear = startDate.substr(0, 4);
      const endMonth = convertNumberToMonth[endDate.substr(4, 2)];
      const endYear = endDate.substr(0, 4);
      text = `از ${startMonth} ${startYear} تا ${endMonth} ${endYear}`;
    } else if (typeof startDate === "object" && typeof endDate === "object") {
      const startMonth = startDate.Month;
      const startYear = startDate.Year;
      const endMonth = endDate.Month;
      const endYear = endDate.Year;
      text = `از ${startMonth} ${startYear} تا ${endMonth} ${endYear}`;
    }
  }
  return text;
};
export const convertCv = (data: any) => {
  let {
    projects,
    skills,
    educationCourses,
    languages,
    degrees,
    jobExperiences,
    ...baseInfo
  } = data;

  const convertOptionTypeValues = (items: any[], filters: any) => {
    items.forEach((item: any) => {
      Object.keys(item).forEach((key) => {
        if (typeof item[key] === "number" && key !== "id") {
          if (filters[key]) {
            item[key] = filters[key].find((x: any) => x.id === item[key]);
          } else if (key !== "areaId" && key !== "cityId") {
            item[key] = filters.levels.find((x: any) => x.id === item[key]);
          }
        }
      });
    });
  };
  const processProperty = (propertyName: string, items: any[], cities: any) => {
    const isDateProperty = (
      propertyName: string,
      value?: string | object
    ): boolean => {
      if (value) {
        return (
          propertyName.toLowerCase().includes("date") &&
          typeof value === "string"
        );
      }
      return propertyName.toLowerCase().includes("date");
    };

    const isValidDate = (dateObject: any): boolean => {
      return dateObject !== "undefined";
    };

    items.forEach((item: any) => {
      Object.keys(item).forEach((key) => {
        if (isDateProperty(key, item[key])) {
          if (isValidDate(item[key])) {
            const Day = parseInt(item[key].substr(6, 2));
            const Month = convertNumberToMonth[item[key].substr(4, 2)];
            const Year = parseInt(item[key].substr(0, 4));
            item[key] = { Day, Month, Year };
          } else {
            item[key] = { Day: 0, Month: "", Year: 0 };
          }
        } else if (key === "cityId" || key === "areaId") {
          const cityId = item.cityId.toString();
          const areaId = item.areaId.toString();

          const cityIndex = Object.keys(cities).find((x) => x === cityId);

          if (cityIndex !== undefined) {
            const cityInfo = cities[cityIndex];
            const areaInfo = cityInfo.areas[areaId];

            const area = {
              name: areaInfo ? areaInfo.name : "",
              id: areaInfo ? areaInfo.id : -1,
            };

            item.location = {
              area,
              city: {
                name: cityInfo.name,
                id: cityInfo.id,
              },
            };
          } else {
            item.location = {
              area: { name: "", id: -1 },
              city: { name: "", id: -1 },
            };
          }
        }
      });
    });
    convertOptionTypeValues(items, filters);
  };

  processProperty("jobExperiences", jobExperiences, city);
  processProperty("educationCourses", educationCourses, city);
  processProperty("languages", languages, city);
  processProperty("degrees", degrees, city);
  // convertOptionTypeValues(skills, filters);
  if (baseInfo.pictureId === null) {
    baseInfo.pictureId = "";
  }
  baseInfo.mobile = "0" + baseInfo.mobile;
  baseInfo.sexId = filters.sex.find((x) => x.id === baseInfo.sexId);
  baseInfo.militaryServiceId = filters.militaryServices.find(
    (x) => x.id === baseInfo.militaryServiceId
  );
  baseInfo.isMarried = baseInfo.isMarried
    ? _MaritalStatus[1]
    : _MaritalStatus[0];
  const cityIndex = Object.keys(city).find(
    (x) => x === baseInfo.cityId.toString()
  )!;
  let area = {};
  //@ts-ignore
  if (Object.keys(city[cityIndex].areas).length === 0) {
    area = { name: "تمام محله ها", id: 0 };
  } else {
    area = {
      //@ts-ignore
      name: city[cityIndex].areas[baseInfo.areaId.toString()].name,
      id: baseInfo.areaId,
    };
  }
  baseInfo.location = {
    area: area,
    //@ts-ignore
    city: { name: city[cityIndex].name, id: city[cityIndex].id },
  };
  const Day = parseInt(baseInfo.birthDate.substr(6, 2));
  const Month = convertNumberToMonth[baseInfo.birthDate.substr(4, 2)];
  const Year = parseInt(baseInfo.birthDate.substr(0, 4));
  //@ts-ignore
  baseInfo.birthDate = { Day, Month, Year };
  let completeness: { percentage: number; missed: string[] } = {
    percentage: 0,
    missed: [],
  };
  const matching = (init: any, data: any, key: string) => {
    let totalProps = 7;
    if (isEqual(init, data) || data.length === 0) {
      completeness.missed.push(key);
      const matchingPercentage = (
        100 -
        (completeness.missed.length / totalProps) * 100
      )
        .toString()
        .slice(0, 3);
        completeness.percentage = +matchingPercentage;
    }
    if (completeness.missed.length === 0) {
      completeness.percentage = 100;
    }
    return completeness;
  };
  matching(
    [
      {
        areaId: -1,
        cityId: -1,
        id: 0,
        title: "",
        companyName: "",
        location: { area: { name: "", id: -1 }, city: { name: "", id: -1 } },
        typeCooperations: null,
        startDate: { Day: 0, Month: "", Year: 0 },
        endDate: { Day: 0, Month: "", Year: 0 },
        stillWorking: false,
        achievements: "",
      },
    ],
    jobExperiences,
    "jobExperiences"
  );
  matching(
    [
      {
        areaId: -1,
        cityId: -1,
        fieldStudies: null,
        typeOwnerShips: null,
        institutionName: "",
        location: { area: { name: "", id: -1 }, city: { name: "", id: -1 } },
        educationGrade: null,
        specialization: "",
        gpa: "",
        startDate: { Day: 0, Month: "", Year: 0 },
        endDate: { Day: 0, Month: "", Year: 0 },
        stillLearning: false,
      },
    ],
    degrees,
    "degrees"
  );
  matching(
    [
      {
        id:0,
        title: "",
        reading: null,
        hearing: null,
        writing: null,
        speaking: null,
        totalLevel: null,
        explain: "",
      },
    ],
    languages,
    "languages"
  );
  matching(
    [
      {
        courseName: "",
        instituteName: "",
        startDate: { Day: 0, Month: "", Year: 0 },
        endDate: { Day: 0, Month: "", Year: 0 },
        courseLink: "",
        hasLicence: false,
      },
    ],
    educationCourses,
    "educationCourses"
  );
  matching(
    [
      {
        id: 0,
        title: "",
        skillLevel: null,
      },
    ],
    skills,
    "skills"
  );
  matching(
    [{ title: "", applicantReference: "", link: "" }],
    projects,
    "projects"
  );
  const newData = {
    projects,
    skills,
    educationCourses,
    languages,
    degrees,
    jobExperiences,
    baseInfo,
    completeness,
  };

  console.log(completeness);

  return newData;
};
