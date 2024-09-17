import { useCallback, useReducer, useEffect } from "react";
import { useRouter } from "next/router";
import { QueryKeys, QueryParameters } from "@/types";
import { ParsedUrlQuery } from "querystring";
import { useAppDispatch } from "@/store/hook";
import { removeJobDetail } from "@/store/jobInformation";

type IState = {
  [key in QueryKeys]: any;
};

const QueryDefaults: QueryParameters = {
  skip: 0,
  limit: 10,
  sort: "Desc",
  text: "",
  jobId: null,
  cityIds: [],
  organizationPostIds: [],
  typeCooperationIds: [],
  experienceId: null,
  salaryId: null,
  advantageIds: [],
};

const initialState: QueryParameters = {
  [QueryKeys.Skip]: QueryDefaults.skip,
  [QueryKeys.Limit]: QueryDefaults.limit,
  [QueryKeys.Sort]: QueryDefaults.sort,
  [QueryKeys.Text]: QueryDefaults.text,
  [QueryKeys.JobId]: QueryDefaults.jobId,
  [QueryKeys.CityIds]: QueryDefaults.cityIds,
  [QueryKeys.OrganizationPostIds]: QueryDefaults.organizationPostIds,
  [QueryKeys.TypeCooperationIds]: QueryDefaults.typeCooperationIds,
  [QueryKeys.ExperienceId]: QueryDefaults.experienceId,
  [QueryKeys.SalaryId]: QueryDefaults.salaryId,
  [QueryKeys.AdvantageIds]: QueryDefaults.advantageIds,
};

function reducer(state: IState, action: { type: any; payload: any }) {
  switch (action.type) {
    case "updateValues":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

function useUrlMaker(): [
  IState,
  (newValues: { [s: string]: unknown } | ArrayLike<unknown>) => void
] {
  const router = useRouter();
  const reduxDispatch = useAppDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const query = router.query;
    const convertedQueries = convertUrls(query);
    dispatch({ type: "updateValues", payload: convertedQueries });
  }, [router.query]);
  const convertToNumber = (value: string) => {
    const isNum = /^\d+$/.test(value);
    if (isNum) {
      return parseInt(value);
    }
    return value;
  };
  const convertUrls = (query: ParsedUrlQuery) => {
    let queries = { ...query };
    Object.keys(QueryDefaults).map((key) => {
      //@ts-ignore
      if (Array.isArray(QueryDefaults[key]) && query[key]) {
        //@ts-ignore
        const _queries = Array.isArray(query[key])
          ? //@ts-ignore
            queries[key].map((item) => +item)
          : //@ts-ignore
            convertToNumber(query[key]);
        queries[key] = _queries;
      } else if (query[key]) {
        //@ts-ignore
        queries[key] = convertToNumber(query[key]);
      } else {
        //@ts-ignore
        queries[key] = initialState[key];
      }
    });
    return queries;
  };

  const updateUrl = useCallback(
    (newValues: { [s: string]: unknown } | ArrayLike<unknown>) => {
      const { pathname } = router;
      const newQuery = { ...router.query };
      let nullishQueries: {
        [key: string]: any;
      } = {};

      // Check if the new query is different from the current query
      let queryChanged = false;
      // Check if the text Query is removed on the main page
      let removeQueryInMainPage = false;
      for (const [key, value] of Object.entries(newValues)) {
        if (value === null || value === "" || value === undefined) {
          nullishQueries[key] = null;
          if (!pathname.includes("jobs") && key === "text") {
            removeQueryInMainPage = true;
          }
          if (newQuery[key] !== null) {
            queryChanged = true;
          }
          delete newQuery[key];
        } else {
          if (Array.isArray(value)) {
            newQuery[key] = value;
            queryChanged = true;
          } else if (newQuery[key] !== value) {
            queryChanged = true;
            newQuery[key] = value as string;
          }
        }
      }
      if (queryChanged) {
        reduxDispatch(removeJobDetail());
        const finalQueries = { ...newQuery, ...nullishQueries };
        dispatch({ type: "updateValues", payload: finalQueries });
        if (removeQueryInMainPage) {
          router.replace({
            pathname,
            query: newQuery,
          });
        } else if (pathname.includes("jobs")) {
          router.replace({
            pathname,
            query: newQuery,
          });
        } else {
          router.push({
            pathname: "/jobs",
            query: newQuery,
          });
        }
      }
    },
    [router]
  );

  return [state, updateUrl];
}

export default useUrlMaker;
