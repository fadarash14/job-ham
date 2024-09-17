import * as React from "react";
import Box from "@/components/utility/Box";
import { GetServerSidePropsContext } from "next";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Col from "@/components/utility/Col";
import { Ads, Company, SentResume, Status } from "@/types";
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
  space,
  SpaceProps,
} from "styled-system";
import Footer from "@/components/footer/Footer";
const SideBar = dynamic(() => import("@/components/profile/SideBar"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import Container from "@/components/utility/Container";
import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";
import cookie from "cookie";
import { useAppDispatch } from "@/store/hook";
import Head from "next/head";
import ProfileTopBar from "@/components/profile/ProfileTopBar";
import { uniqueArrayByProperty } from "@/utils/helper";
import { exitProfile } from "@/store/sign";
import { getCompanyAdsList } from "@/requests/profile/companyListAds";
import AdsList from "@/components/wizard/CompanyAds/AdsList";
import { getListCvSendToCompany } from "@/requests/profile/sentCvList";
import CvList from "@/components/wizard/SentCvList/CvList";
import Pagination from "@/components/utility/Pagination";
import { getCompany } from "@/requests/profile/company";

const profileFilter: Status[] = require("@/dictionaries/profileFilter.json");

interface Props {
  data: Ads[] | SentResume[] | [];
  count: number;
  company: Company | null;
  role: number;
  companyId: string;
}
type ManagerData = {
  count: number;
  data: Ads[] | [];
  company: Company;
  role: number;
};
type JobSeekerData = {
  count: number;
  data: SentResume[] | [];
  role: number;
  company: null;
};
type FetchPageRes = ManagerData | JobSeekerData | undefined;

const BoxLayout = styled((props) => <Box {...props} />)<
  PositionProps | ColorProps
>(position, color);
const Main = styled.main`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  background-color: RGB(255, 255, 255);
  flex: 1 1 100%;
`;
const Content = styled.div<SpaceProps>`
  flex: 1 1;
  overflow: hidden;
  ${space}
`;
const Flex = styled.div<SpaceProps>`
  display: flex;
  flex-flow: row wrap;
  ${space}
`;
const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  flex-flow: row nowrap;
  padding: 0px;
  overflow-x: scroll;
  margin: 0;
`;

const Li = styled.li`
  border: 1px solid #d1d1d1;
  text-align: center;
  padding: 5px 10px;
  border-radius: 15px;
  text-align: center;
  font-size: 12px;
  color: #474546;
  display: flex;
  align-items: center;
  min-width: fit-content;
  cursor: pointer;
  margin: 0 5px;
  &.checked {
    background: #e65f7b;
    color: #ffffff;
    border: none;
  }
  &::first-child {
    margin-right: 0;
  }
`;
const Img = styled.div`
  margin-right: 5px;
  display: none;
  margin: 0 8 0 0;
  display: block;
`;

const ContentTitle = styled.div`
  color: RGB(71, 69, 70);
  font-size: 14px;
  padding-top: 20px;
`;
const DataContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
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

const UserProfile = (props: Props) => {
  const { data: posts, count, company, role, companyId } = props;
  const router = useRouter();
  const Dispatch = useAppDispatch();
  const [filter, setFilter] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  let token = Cookies.get("token")!;

  function filteredData<T>(data: T[]): T[] {
    return uniqueArrayByProperty(data, (i: any) => i.id);
  }

  async function fetchPage(page: number = 0): Promise<FetchPageRes> {
    //By default the limit is 10
    const skip = page * 10;
    if (role === 1) {
      const id = parseInt(companyId);
      const res = await getCompanyAdsList(
        { id, limit: 10, skip, sort: "Desc" },
        { token }
      );
      let d = filteredData(res.data.rows ?? []);
      let _data = Object.values(d).reverse();
      if (res && res.errorCode !== 312) {
        return {
          count: res.data.count,
          data: _data,
          company: res.data.company,
          role,
        };
      } else {
        Dispatch(exitProfile());
        await router.push("/");
      }
    } else {
      const res = await getListCvSendToCompany(
        { limit: 10, skip, sort: "Desc" },
        { token }
      );

      let d = filteredData(res.data.rows ?? []);
      let _data = Object.values(d).reverse();
      if (res && res.errorCode !== 312) {
        return {
          count: res.data.count,
          data: _data,
          role,
          company: null,
        };
      } else {
        Dispatch(exitProfile());
        await router.push("/");
      }
    }
  }

  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: [
      role === 1 ? "getCompanyAdsList" : "getListCvSendToCompany",
      filter,
      page,
      companyId,
    ],
    queryFn: () => fetchPage(page),
    staleTime: 0,
    initialData: { data: posts, count, company, role },
  });

  function handleOnclick(id: number) {
    console.log(id);
    setFilter(id);
  }
  const activePath = router.pathname;

  const renderManagerList = (data: ManagerData) => {
    return <AdsList filter={filter} data={data} />;
  };
  const renderJSSentCvList = (data: JobSeekerData) => {
    return <CvList filter={filter} data={data} />;
  };
  const handlePageChange = (newPage: number) => setPage(newPage);
  return (
    <BoxLayout
      bg={"white"}
      minHeight={"100vh"}
      position={"static"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Head>
        <title>آگـهی هـای مـن</title>
      </Head>
      <ProfileTopBar icon={"/icons/Group 1610.svg"} title={"پنل کاربری"} />
      <Main>
        <Container className={"containerPro"}>
          <Flex pt={["0", "20px"]}>
            <SideBar activePath={activePath} token={token} />
            <Content pt={["10px", "0"]}>
              {count !== 0 && count !== null && (
                <Row>
                  <Col px={"8px"} flexBasis={"100%"} width={"100%"}>
                    <Ul className={"scroll-d-none"}>
                      {profileFilter.map((item: Status, index) => (
                        <Li
                          key={index}
                          onClick={() => handleOnclick(item.id)}
                          className={item.id === filter ? "checked" : ""}
                        >
                          {item.name}
                          <Img>
                            <Image
                              src={"/icons/CheckMark.svg"}
                              width={10}
                              height={8}
                              alt=""
                            />
                          </Img>
                        </Li>
                      ))}
                    </Ul>
                  </Col>
                </Row>
              )}
              {isLoading && "منتظر بمانید..."}
              {data && count === 0 ? (
                <DataContainer>
                  <Image
                    src={"/icons/DefaultMyAds.svg"}
                    height={200}
                    width={200}
                    alt=""
                  />
                  <ContentTitle>
                    {role == 1
                      ? "لیست آگهی های شما خالی است"
                      : "تاکنون هیچ رزومه ای ارسال نشده است"}
                  </ContentTitle>
                </DataContainer>
              ) : (
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
                    {data && role === 1
                      ? renderManagerList(data as ManagerData)
                      : renderJSSentCvList(data as JobSeekerData)}
                  </Row>
                </MainBody>
              )}
              <Pagination
                page={page}
                limit={limit}
                skip={skip}
                totalItems={count}
                onPageChange={handlePageChange}
              />
            </Content>
          </Flex>
        </Container>
      </Main>
      <Footer isProfile />
    </BoxLayout>
  );
};
export default UserProfile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const defaultProps = {
    props: { data: [], count: 0, company: null, role: 0, CompanyId: 0 },
  };
  let agent = context.req.headers["user-agent"];
  let headers = context.req?.headers?.cookie
    ? cookie.parse(context.req?.headers?.cookie)
    : false;
  if (headers) {
    let _token = headers.token;
    const cid = headers.cid as string;
    if (_token) {
      const role = parseInt(headers.role);
      const handleManagerReq = async () => {
        const res = await getCompany(_token);
        if (res.errorCode === 0 && res.data.length > 0) {
          const id = parseInt(cid);
          const response = await getCompanyAdsList(
            { id, skip: 0, limit: 10, sort: "Desc" },
            { agent, token: _token }
          );
          if (!response.errorCode) {
            const { rows: data, count, company } = response.data;
            return {
              props: {
                data,
                count,
                company,
                role,
                companyId: id,
              },
            };
          }
        } else {
          return defaultProps;
        }
      };
      const handleJobSeekerReq = async () => {
        const response = await getListCvSendToCompany(
          { skip: 0, limit: 10, sort: "Desc" },
          { agent, token: _token }
        );
        if (!response.errorCode) {
          const { rows: data, count } = response.data;
          return {
            props: {
              data,
              count,
              role,
              company: null,
            },
          };
        } else {
          return defaultProps;
        }
      };
      // role=1 ===> Manager
      // role=2 ===> Jobseeker
      if (role === 1) {
        return handleManagerReq();
      } else {
        return handleJobSeekerReq();
      }
    }
  }
  return {
    props: { data: [], count: 0, company: null, role: 0, CompanyId: 0 },
  };
}
