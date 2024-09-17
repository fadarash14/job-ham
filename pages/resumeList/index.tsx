import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { getListCvSendForAds } from "@/requests/profile/cvListAds";
import cookie from "cookie";
import styled from "styled-components";
import Image from "next/image";
import CvBox from "@/components/resumeList/CvBox";
import { AdCvs, CompanyAdCvs } from "@/types";
import Filter from "@/components/resumeList/Filter";
import Select, { StylesConfig, MenuProps, OptionProps } from "react-select";
import { CSSObject } from "@emotion/serialize";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const Body = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  justify-content: start;
  width: 70%;
  margin-top: 60px;
  @media (max-width: 800px) {
    width: 90%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 75%;
  max-width: 600px;
  min-width: 300px;
  white-space: nowrap;
  p {
    margin: 0;
    font-size: 12px;
    margin-bottom: 15px;
  }

  .inputs {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 0 auto;
    margin-bottom: 10px;
    label {
      font-size: 14px;
    }
    @media (min-width: 801px) {
      display: none;
    }
    .input1 {
      width: 60%;
    }
    .input2 {
      width: 35%;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;
const FilterBox = styled.div`
  width: 25%;
  min-width: 150px;
  margin-top: 75px;
  margin-left: 20px;
  @media (max-width: 800px) {
    display: none;
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  h2 {
    font-size: 14px;
    font-weight: 500;
    margin: 0;
    color: #2d2c2c;
  }
  img {
    margin-left: 10px;
  }
`;
type Data = AdCvs & {
  statusInterview: string;
  dateInterview: string;
  timeInterview: string;
  descInterview: string;
};

type Props = {
  count: number;
  data: Data[];
};
const statuses = [
  { status: "ALL", label: "همه" },
  { status: "SEND", label: "بررسی نشده" },
  { status: "SHOW", label: "در انتظار تعیین" },
  { status: "ACCEPT", label: "تایید برای مصاحبه" },
  { status: "CANCEL", label: "لغو شده" },
  { status: "REJECT", label: "رد  شده" },
];
const sex = [
  { status: "1", label: "نامشخص" },
  { status: "2", label: "مرد" },
  { status: "3", label: "زن" },
];

const customStyles: StylesConfig<any, any> = {
  indicatorsContainer: () => ({
    position: "relative",
    left: "0",
    top: "-1px",
    display: "flex",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  container: () => ({
    position: "relative",
  }),
  option: (
    base: CSSObject,
    { options, isSelected, isFocused }: OptionProps<any, any, any>
  ): CSSObject => ({
    ...base,
    background: isSelected ? "rgba(246,164,5,0.7)" : isFocused ? "#e8e8ec" : "",
  }),
  control: () => ({
    height: "36px",

    background: "transparent",
    // @ts-ignore
    border: "1px solid #d1d1d1",
    borderRadius: "12px",
    fontsize: "14px",
    position: "relative",
    //alignItems: "center",
    paddingRight: "10px",
    display: "flex",
    cursor: "pointer",
    zIndex: 3,
    width: "100%",

    backgroundColor: "hsl(0, 0%, 100%)",
    "&:hover": {
      border: "1px solid #acacac",
    },
    "&::focus": {},
    "&:focus-within": {
      boxShadow: "rgb(108 108 108 / 50%) 0px 4px 20px -3px",
    },
  }),
  placeholder: () => ({
    fontSize: "14px",
    color: "#acacac",
    position: "relative",
    bottom: "15px",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0",
    width: "100%",
    overflow: "inherit",
    "& > div": {
      display: "flex",
      zIndex: 3,
    },
  }),
  input: () => ({
    color: "#474546",
    fontSize: "14px",
    position: "absolute",
    top: "0",
    margin: "0px 0",
    //padding:0
  }),
  // singleValue: () => ({
  //   margin: "auto 0",
  //   fontSize: "14px",
  //   overflow: "none",
  //   Width: "max-content",
  //   color: "#474546",
  // }),
  menu: (base: CSSObject): CSSObject => ({
    ...base,
    color: "#474546",
    background: "white",
    fontSize: "12px",
    zIndex: 2,
    margin: "-2px 1px",
    borderBottomLeftRadius: "14px",
    borderBottomRightRadius: "14px",
    boxShadow: "3px 5px 6px 0 rgba(112, 112, 112, 0.24)",
    paddingTop: "10px",
    position: "absolute",
    width: "100%",
    // position: "relative",
    // top: "-10px",
    //top: "100%",
    // width: "96%"
  }),
  menuPortal: (base) => ({ ...base, zIndex: 3 }),
  // multiValueRemove: () => ({ display: "none" }),
  // menuList: () => ({
  //   overflowY: "scroll",
  //   maxHeight: "200px",
  //   marginRight: "0px",
  //   paddingRight: "0px",
  //   width: "auto",
  //   "&::-webkit-scrollbar": {
  //     display: "none !important",
  //   },
  // }),
};
const customStyles2: StylesConfig<any, any> = {
  indicatorsContainer: () => ({
    position: "relative",
    left: "0",
    top: "-1px",
    display: "flex",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  container: () => ({
    position: "relative",
  }),
  option: (
    base: CSSObject,
    { options, isSelected, isFocused }: OptionProps<any, any, any>
  ): CSSObject => ({
    ...base,
    background: isSelected ? "rgba(246,164,5,0.7)" : isFocused ? "#e8e8ec" : "",
  }),
  control: () => ({
    height: "36px",

    background: "transparent",
    // @ts-ignore
    border: "1px solid #d1d1d1",
    borderRadius: "12px",
    fontsize: "14px",
    position: "relative",
    //alignItems: "center",
    paddingRight: "10px",
    display: "flex",
    cursor: "pointer",
    zIndex: 3,
    width: "100%",

    backgroundColor: "hsl(0, 0%, 100%)",
    "&:hover": {
      border: "1px solid #acacac",
    },
    "&::focus": {},
    "&:focus-within": {
      boxShadow: "rgb(108 108 108 / 50%) 0px 4px 20px -3px",
    },
  }),
  placeholder: () => ({
    fontSize: "14px",
    color: "#acacac",
    position: "relative",
    bottom: "15px",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0",
    width: "100%",
    overflow: "inherit",
    "& > div": {
      display: "flex",
      zIndex: 3,
    },
  }),
  input: () => ({
    color: "#474546",
    fontSize: "14px",
    position: "absolute",
    top: "0",
    margin: "0px 0",
    //padding:0
  }),
  // singleValue: () => ({
  //   margin: "auto 0",
  //   fontSize: "14px",
  //   overflow: "none",
  //   Width: "max-content",
  //   color: "#474546",
  // }),
  menu: (base: CSSObject): CSSObject => ({
    ...base,
    color: "#474546",
    background: "white",
    fontSize: "12px",
    zIndex: 2,
    margin: "-2px 1px",
    borderBottomLeftRadius: "14px",
    borderBottomRightRadius: "14px",
    boxShadow: "3px 5px 6px 0 rgba(112, 112, 112, 0.24)",
    paddingTop: "10px",
    position: "absolute",
    width: "100%",
    // position: "relative",
    // top: "-10px",
    //top: "100%",
    // width: "96%"
  }),
  menuPortal: (base) => ({ ...base, zIndex: 3 }),
  // multiValueRemove: () => ({ display: "none" }),
  // menuList: () => ({
  //   overflowY: "scroll",
  //   maxHeight: "200px",
  //   marginRight: "0px",
  //   paddingRight: "0px",
  //   width: "auto",
  //   "&::-webkit-scrollbar": {
  //     display: "none !important",
  //   },
  // }),
};

const ResumeList = ({ data: cvs, count }: Props) => {
  const router = useRouter();
  const filter = router.query.filter;
  const [checked, setChecked] = useState(filter);
  const inputRef = useRef<any>(null);
  const id = router.query.id!;
  console.log(id);
  const token = Cookies.get("token")!;
  console.log(checked);
  console.log(cvs);
  const getCvs = async () => {
    const res = await getListCvSendForAds(
      {
        skip: 0,
        limit: 10,
        sort: "Desc",
        adsId: +id,
      },
      token
    );
    return {
      data: res.data.rows,
      count: res.data.count,
    };
  };

  const { isLoading, data } = useQuery({
    queryKey: ["getListCvSendForAds", id],
    queryFn: () => getCvs(),
    initialData: { data: cvs, count },
    staleTime: 0,
  });
  console.log(data);

  return (
    <>
      <Body>
        <Container>
          <FilterBox>
            <Filter
              data={data.data}
              count={data.count}
              types={statuses}
              title={"وضعیت"}
              checked={checked}
              setChecked={setChecked}
            />
            <Filter
              data={data.data}
              count={data.count}
              types={sex}
              title={"جنسیت"}
              checked={checked}
              setChecked={setChecked}
            />
          </FilterBox>
          <Box>
            <Title>
              <Image src={"icons/line6.svg"} alt="" width={3} height={14} />
              <h2>حسابدار</h2>
            </Title>
            <p>رزومه های ارسال شده را پس از بررسی، تعیین وضعیت نمایید.</p>
            <div className="inputs">
              <div className="input1">
                <label>وضعیت</label>
                <Select
                  ref={inputRef}
                  styles={customStyles}
                  aria-labelledby="aria-label1"
                  inputId="aria-example-input1"
                  name="aria-live-color1"
                  getOptionValue={(option) => option.status}
                  getOptionLabel={(option) => option.label}
                  onChange={(e) => {
                    setChecked(`${e.status}`);
                    console.log(e.status);
                    router.push(
                      {
                        pathname: "/resumeList",
                        query: {
                          id: router.query.id,
                          filter: e.status,
                        },
                      },
                      undefined,
                      { shallow: true }
                    );
                  }}
                  //@ts-ignore
                  options={statuses}
                  // placeholder={
                  //   statuses.filter((status) => status.status === checked)[0]
                  //     .label
                  // }
                  isSearchable={false}
                  defaultValue={checked}
                  placeholder={false}
                />
              </div>
              <div className="input2">
                <label>جنسیت</label>
                <Select
                  ref={inputRef}
                  styles={customStyles2}
                  aria-labelledby="aria-label1"
                  inputId="aria-example-input1"
                  name="aria-live-color1"
                  getOptionValue={(option) => option.status}
                  getOptionLabel={(option) => option.label}
                  onChange={(e) => {
                    setChecked(`${e.status}`);
                    console.log(e.status);
                    router.push(
                      {
                        pathname: "/resumeList",
                        query: {
                          id: router.query.id,
                          filter: e.status,
                        },
                      },
                      undefined,
                      { shallow: true }
                    );
                  }}
                  //@ts-ignore
                  options={sex}
                  isSearchable={false}
                  defaultValue={checked}
                  placeholder={false}
                />
              </div>
            </div>

            {checked === "ALL"
              ? data.data.map((item: any) => (
                  <CvBox
                    key={item.id}
                    status={item.status}
                    name={item.cv.name}
                    family={item.cv.family}
                    date={item.confirmedAt}
                    cv_id={item.cv_id}
                    id={item.id}
                    statusInterview={item.statusInterview}
                    descInterview={item.descInterview}
                    timeInterview={item.timeInterview}
                    dateInterview={item.dateInterview}
                    reasonId={item.reasonForReject}
                  />
                ))
              : data.data
                  ?.filter((item: any) => item.status === checked)
                  .map((item: any) => (
                    <CvBox
                      key={item.id}
                      status={item.status}
                      name={item.cv.name}
                      family={item.cv.family}
                      date={item.confirmedAt}
                      cv_id={item.cv_id}
                      id={item.id}
                      statusInterview={item.statusInterview}
                      descInterview={item.descInterview}
                      timeInterview={item.timeInterview}
                      dateInterview={item.dateInterview}
                      reasonId={item.reasonForReject}
                    />
                  ))}
          </Box>
        </Container>
      </Body>
    </>
  );
};

export default ResumeList;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const defaultProps = {
    props: { data: [], count: 0 },
  };
  const id = context.query.id!;
  let headers = context.req?.headers?.cookie
    ? cookie.parse(context.req?.headers?.cookie)
    : false;
  if (headers) {
    const _token = headers.token;
    const response = await getListCvSendForAds(
      {
        skip: 0,
        limit: 10,
        sort: "Desc",
        adsId: +id,
      },
      _token
    );
    const { rows: data, count } = response.data;
    return {
      props: {
        data,
        count,
      },
    };
  }
  return defaultProps;
}
