import axios from "axios";
import { jsonToGraphQLQuery } from "json-to-graphql-query";
import parser, { IResult } from "ua-parser-js";
import { number, string } from "prop-types";
//@ts-ignore
import Cookies from "js-cookie";
export const baseUrl = "https://rahnama.com/";
export const imageUrl = "https://rahnama.com/uploads/";
// export const apiUrl = 'http://5.160.13.112:8089/rahnamagql';
export const apiUrl = "https://deltajob.rahnama.com/jobgql";
// export const apiUrl = "https://delta.rahnama.com/rahnamagql";

let jwt = require("jsonwebtoken");

const userAgent = {} as IResult;

type PageDataResponse = {
  [key in string | number]: {
    condition: any;
    data: DataStructure;
  };
} & {
  agent: string;
};
type DataStructure = {
  [key in string | number]: any | boolean;
} & {
  data?: any;
  __args?: any;
};

type QueryGraph = {
  [key in string | number]: DataStructure;
};

export type RequestOptions = { agent?: any; token?: string; map_code?: string };

// }
/**
 * @param {object} pageDataResponse resource to query
 */

export const multipleQuery = async (pageDataResponse: PageDataResponse) => {
  if (typeof pageDataResponse !== "object") {
    return;
  }
  let result = "",
    headers: any;
  Object.keys(pageDataResponse).map((page) => {
    let ua = {} as IResult;
    if (page === "agent") {
      ua = parser(pageDataResponse.agent);
      headers = {
        ...headers,
        __os: typeof ua.os.name !== "undefined" ? ua.os.name : "set",
        __os_v: typeof ua.os.version !== "undefined" ? ua.os.version : "set",
        __agent:
          typeof ua.browser.name !== "undefined" ? ua.browser.name : "set",
        __agent_v:
          typeof ua.browser.version !== "undefined"
            ? ua.browser.version
            : "set",
        map_code: "999-99901-2601",
      };
    } else if (page === "token") {
      headers["authorization_key"] = pageDataResponse.token;
    } else {
      let query = {} as QueryGraph;
      query[page] = {} as DataStructure;
      //
      query[page] = {};
      for (let i in pageDataResponse[page]["data"]) {
        query[page][i] = pageDataResponse[page]["data"][i];
      }
      //
      if (Object.keys(pageDataResponse[page]["condition"]).length > 0) {
        query[page]["__args"] = pageDataResponse[page]["condition"];
      }
      const graphql = jsonToGraphQLQuery(query, { pretty: true });

      result = result + `\n${graphql}`;
    }
  });

  let res = axiosBase.post("", { query: `{${result}}` }, { headers });
  const { data } = await res;
  return data;
};

const axiosBase = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  validateStatus: function () {
    return true;
  },
});

const checkToken = () => {};

// axiosBase.interceptors.request.use(async (config) => {
//     const originalRequest = response.data;
//
//
// }, null, {runWhen:checkToken})

export const get = async (path: string) => {
  try {
    const res = await axiosBase.get(path);
    const { data } = await res;
    return data;
  } catch (error) {
    //  ;
  }
};

/**
 * [queryBuilder description]
 * @param  {string} page resource or entity that u query to it
 * @param  {object} data an object that describe condition and filters
 * @param  {object} res an object that describe output and filed you want
 * @param  {object} option use for headers
 * @return {string}      [graphql query]
 */
const queryBuilder = (
  page: string,
  data: object | null,
  res: object | null,
  option?: RequestOptions
) => {
  let ua = {} as IResult;
  if (option && "agent" in option) {
    ua = parser(option.agent);
  } else {
    if (Object.keys(userAgent).length === 0) {
      ua = parser();
    } else {
      ua = userAgent;
    }
  }

  const headers: any = {
    __os: ua.os.name ?? "set",
    __os_v: typeof ua.os.version !== "undefined" ? ua.os.version : "set",
    __agent: ua.browser.name ?? "set",
    __agent_v: ua.browser.version ?? "set",
    map_code: "999-99901-2601",
  };
  if (option && "token" in option) {
    headers["authorization_key"] = option.token;
  }

  let type = "999-99901-2601";
  //@ts-ignore
  if (typeof window !== "undefined" && window.rahnama) {
    //@ts-ignore
    if (window?.rahnama?.getDownloadType) {
      // @ts-ignore
      type = window?.rahnama?.getDownloadType();
    }
    if (type) {
      headers["map_code"] = type;
    }
  }
  if (option && "map_code" in option) {
    //@ts-ignore
    headers["map_code"] = option?.map_code;
  }

  const query = {} as QueryGraph;
  query[page] = {} as DataStructure;
  if (data != null) {
    query[page].__args = data;
  }
  if (res !== null) {
    if (Array.isArray(res)) {
      for (let i of res) {
        query[page][i] = true;
      }
    } else {
      for (let i in res) {
        // @ts-ignore
        query[page][i] = res[i];
      }
    }
  }

  const graphql = jsonToGraphQLQuery(query, { pretty: true });
  // console.log(graphql,'querryyyyyyyyyyyyyyyyy');
  return { graphql, headers };
};

/**
 * @param {string} page resource to query
 * @param {object} data condition data body to send
 * @param {object}  res  response fields
 * @param {object} option? use for headers
 * @returns {Promise<*>}
 */
export const query = async (
  page: string,
  data: object | null,
  res: object | null = null,
  option?: RequestOptions
): Promise<any> => {
  const { graphql, headers } = queryBuilder(page, data, res, option);
  if (headers.authorization_key) {
    // await checkResponseForToken(page, headers, {query: `{${graphql}}`}, option);
  }
  try {
    const res = axiosBase.post("", { query: `{${graphql}}` }, { headers });
    const { data } = await res;
    return data?.data?.[page];
  } catch (error) {
    throw error;
  }
};
/**
 * @param {string} page resource to query
 * @param {object} data request data body to send
 * @param {array}  res  response fields
 * @param {object} option use for headers
 * @returns {Promise<*>}
 */
export const mutation = async (
  page: string,
  data: object | null,
  res: object | null = null,
  option?: RequestOptions
) => {
  const { graphql, headers } = queryBuilder(page, data, res, option);

  if (headers.authorization_key && page !== "refreshToken") {
    // await checkResponseForToken(page, headers, {query: `{${graphql}}`}, option);
  }
  try {
    const res = axiosBase.post(
      "",
      { query: `mutation{${graphql}}` },
      { headers }
    );
    const { data } = await res;

    if (data.data[page]) return data.data[page];
    if (data.errors) {
      return data;
    }
  } catch (error) {
    throw error;
  }
};

// async function checkResponseForToken(page: any, headers: any, req: any, option?: RequestOptions) {
//     const date = new Date();
//     let token_decoded:{exp:number}=jwt.decode(headers.authorization_key);
//     if (token_decoded && token_decoded.exp > date.getTime()) {
//
//         const RefreshToken = async function () {
//             return await mutation('refreshToken', null, {
//                 errorCode: true,
//                 errorMessage: true,
//                 id: true,
//                 name: true,
//                 lastname: true,
//                 mobile: true,
//                 token: true
//             }, option)
//         }
//
//         axiosBase.interceptors.response.use(async (response) => {
//             const originalRequest = response.data;
//
//             if (originalRequest?.data?.[page]?.errorCode === 312) {
//                 const refreshToken = await RefreshToken()
//
//                 if (refreshToken){
//                     store.dispatch(updateToken({token: refreshToken.token}))
//                     response.config.headers['authorization_key'] = refreshToken
//
//                     const header = response.config.headers
//
//
//                     return await axiosBase.post('', req, header)
//                 }
//
//             }
//             return response
//
//         })
//     }else{
//         // store.dispatch(showOnHeader(true))
//     }
//
//
//
// }
