import * as React from "react";
import Box from "@/components/utility/Box";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Company } from "@/types";
import Row from "@/components/utility/Row";
import styled from "styled-components";
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
} from "styled-system";
import Footer from "@/components/footer/Footer";
import dynamic from "next/dynamic";
import Container from "@/components/utility/Container";
import { useState } from "react";
import Head from "next/head";
import Pagination from "@/components/utility/Pagination-new";
import { getCompanyList } from "@/requests/profile/company";
import CompanyList from "@/components/company/CompanyList";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import SelectInput from "@/components/search/SelectInput";
import MobileFilters from "@/components/company/MobileFilters";
import Col from "@/components/utility/Col";
import { PlaceHolderTable } from "@/components/company/PlaceHolderTable";
const SideBarFilter = dynamic(
  () => import("@/components/company/SideBarFilter")
);
// const PlaceHolderCard = dynamic(
//   () => import("@/components/company/PlaceHolderTable")
// );

interface Props {
  data: Company[] | [];
  count: number;
}
interface IQuery {
  skip: number;
  limit: number;
  sort: "Desc" | "Asc";
  nameCompany: string;
  industryId: number;
  cityId: number;
}

type FetchPageRes = Props | undefined;

const BoxLayout = styled((props) => <Box {...props} />)<
  PositionProps | ColorProps
>(position, color);
const Main = styled.main`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  background-color: rgb(245, 246, 250);
  flex: 1 1 100%;
`;
const Content = styled.div<SpaceProps>`
  flex: 1 1;
  overflow: hidden;
  min-height: 400px;
  ${space}
`;
const Flex = styled.div<SpaceProps>`
  display: flex;
  flex-flow: row wrap;
  ${space}
`;
const Submit = styled.button<SpaceProps>`
  display: flex;
  ${space}
`;

const MobileHead = styled.div<FlexboxProps | LayoutProps | SpaceProps>`
  display: flex;
  align-items: center;
  position: relative;

  ::after {
    content: "";
    display: block;
    position: absolute;
    bottom: -10px;
    background: #d1d1d1;
    height: 1px;
    width: 100%;
  }
  ${layout}
  ${flexbox}
    ${space}
`;

const MainBody = styled.div<
  | HTMLElement
  | LayoutProps
  | SpaceProps
  | { shadowB: boolean; shadowT: boolean }
>(
  (props) => {
    return {
      overflowY: "auto",
      overscrollBehavior: "contain",
      scrollBehavior: "smooth",
    };
  },
  [layout],
  [space]
);

const Input = styled.input<HTMLInputElement | ShadowProps | ColorProps>`
  width: 100%;
  height: 100%;
  border: 1px solid white;
  color: black;
  padding-right: 32px;
  font-size: 15px;
  direction: rtl;
  border: none;
  text-align: right;
  outline: none;
  border-radius: 12px;
  &:focus {
    outline-style: none;
  }
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
  &::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  &::placeholder {
    font-family: dana;
    color: #474546;
    padding-bottom: 5px;
  }
  ${color}
  ${shadow}
`;
const SearchField = styled.div<ColorProps | LayoutProps>(
  {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  color,
  layout
);
const InputContainer = styled.div`
  flex: 2 1;
  max-width: 500px;
  height: 27px;
  position: relative;
  @media (min-width: 768px) {
    height: 100%;
  }
`;
const RemoveIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  /* border:1px solid blue; */
  cursor: pointer;
  max-height: 17px;
`;
const Button = styled.button`
  display: flex;
  flex: 1 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: 150px;
  background-color: #db143d;
  color: #fff;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  text-align: center;
  margin: 0 10px;
  @media (max-width: 768px) {
    background-color: transparent !important;
    max-width: 30px;
    & > span {
      display: none;
    }
    & > img {
      display: block !important;
    }
  }
  & > img {
    display: none;
  }
  &:disabled {
    background: #ccc;
    cursor: default;
  }
`;
const Loading = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  width: 100%;
`;
const LIMIT = 10;
const Companies = (props: Props) => {
  const { data: companies, count } = props;
  const router = useRouter();
  const query = router.query;
  const page = query.page ? parseInt(query.page as string) : 1;
  const pageIndex = page - 1;
  const [text, setText] = useState("");
  async function fetchPage(): Promise<FetchPageRes> {
    const skip = pageIndex * LIMIT;
    const args: IQuery = {
      skip,
      limit: LIMIT,
      sort: "Desc",
      nameCompany: query.nameCompany
        ? (query.nameCompany as string)
        : text !== ""
        ? text
        : "",
      cityId: query.cityId ? parseInt(query.cityId as string) : 0,
      industryId: query.industryId ? parseInt(query.industryId as string) : 0,
    };
    const res = await getCompanyList(args);
    if (res && res.errorCode == 0) {
      return {
        count: res.data.count,
        data: res.data.rows,
      };
    } else {
      return {
        count: 0,
        data: [],
      };
    }
  }

  const { status, data, isLoading, isFetching } = useQuery({
    queryKey: ["getCompanyList", query],
    queryFn: fetchPage,
    staleTime: 0,
    initialData: { data: companies, count },
    refetchOnWindowFocus: false, // prevent to fetch data before user click on submit
  });
  const renderCompanyList = (data: Company[], pageIndex: any) => {
    return <CompanyList data={data} page={pageIndex} limit={LIMIT} />;
  };
  const handleQuery = () => {
    query.page = "1";
    if (text !== query.nameCompany && text !== "") {
      query.nameCompany = text;
      router.push(router, undefined, { shallow: true });
    } else if (text === "") {
      delete query.nameCompany;
    }
  };
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setText(searchText);
  };
  const handleClearInput = () => {
    setText("");
    const { nameCompany, ...restQuery } = router.query;
    if (!nameCompany) return;
    router.push(
      {
        pathname: "/companies",
        query: restQuery,
      },
      undefined,
      { shallow: true }
    );
  };
  const setPageHandler = (page: number) => {
    query.page = page.toString();
    router.push(
      {
        pathname: "/companies",
        query: query,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <BoxLayout
      bg={"white"}
      minHeight={"100vh"}
      position={"static"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Head>
        <title>شرکت های برتر</title>
      </Head>
      <Main>
        <Container className={"containerPro"}>
          <Flex pt={["0", "20px"]}>
            <SideBarFilter />
            <Content pt={["10px", "0"]}>
              <SearchField height={["40px", "38px"]}>
                <InputContainer>
                  <Input
                    bg={"white"}
                    value={text}
                    onChange={handleSearchInputChange}
                    type="search"
                    placeholder="جستجو"
                  />

                  {(query.nameCompany || text.length > 0) && (
                    <RemoveIcon onClick={handleClearInput}>
                      <Image
                        src={"/icons/remove.svg"}
                        height={15}
                        width={15}
                        alt={"remove-icon"}
                      />
                    </RemoveIcon>
                  )}
                </InputContainer>
                <Button disabled={!text} onClick={handleQuery}>
                  <span>جستجو</span>
                  <Image
                    src={"/icons/grey-search-icon.svg"}
                    height={20}
                    width={20}
                    alt=""
                  />
                </Button>
              </SearchField>
              <MobileFilters />
              {isLoading && "منتظر بمانید..."}
              {isFetching ? (
                <Loading>
                  <PlaceHolderTable />
                </Loading>
              ) : status === "success" ? (
                <>
                  <MainBody
                    mt={"10px"}
                    maxHeight={["auto", "70vh"]}
                    className={"scroll-d-none"}
                    id={"scrollableDiv"}
                  >
                    <Row
                      justifyContent={"space-between"}
                      flexDirection={"column"}
                    >
                      {renderCompanyList(data!.data, pageIndex)}
                    </Row>
                  </MainBody>
                </>
              ) : (
                <></>
              )}
              {data !== undefined && data?.count >= 10 && (
                <Pagination
                  page={page}
                  limit={LIMIT}
                  totalItems={count}
                  onPageChange={setPageHandler}
                />
              )}
            </Content>
          </Flex>
        </Container>
      </Main>
      <Footer isProfile />
    </BoxLayout>
  );
};
export default Companies;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const args: IQuery = {
    skip: 0,
    limit: LIMIT,
    sort: "Desc",
    nameCompany: "",
    cityId: 0,
    industryId: 0,
  };
  const defaultProps = {
    props: { data: [], count: 0, company: null },
  };
  const CompaniesReq = async () => {
    const response = await getCompanyList(args);
    if (!response.errorCode) {
      const { rows: data, count } = response.data;
      return {
        props: {
          data,
          count,
        },
      };
    } else {
      return defaultProps;
    }
  };
  return CompaniesReq();
  // return { props: { data: [], count: 0, company: null } };
}
