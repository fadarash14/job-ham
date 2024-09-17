import * as React from "react";
import Box from "@/components/utility/Box";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
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
import Container from "@/components/utility/Container";
import Head from "next/head";
import Header from "@/components/company/Header";
import MainContent from "@/components/company/MainContent";
import Image from "next/image";
import { getSingleCompany } from "@/requests/profile/company";
import Cookies from "js-cookie";
import { getCompanyAdsList } from "@/requests/profile/companyListAds";

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

const Flex = styled.div<SpaceProps>`
  display: flex;
  flex-flow: row wrap;
  ${space}
`;

const Loading = styled.div`
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

export default function CompanyProfile() {
  const router = useRouter();
  const token = Cookies.get("token")!;
  const cid = Cookies.get("cid")!;
  const getCompanyAds = async () => {
    const response = await getCompanyAdsList({
      id: parseInt(cid),
      skip: 0,
      limit: 24,
      sort: "Desc",
    });
    const { rows, count } = response.data;
    return { rows, count };
  };
  const { data, status } = useQuery({
    queryKey: ["getMyCompany", cid],
    queryFn: () => getSingleCompany(parseInt(cid)),
  });
  const { data: ads, status: adsStatuses } = useQuery({
    queryKey: ["getCompanyAds", cid],
    queryFn: getCompanyAds,
  });

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
          {status === "pending" ? (
            <Loading>
              <Image
                src={"/icons/loading_j.gif"}
                alt="loading"
                width={100}
                height={100}
              />
            </Loading>
          ) : status === "success" ? (
            <>
              <Header data={data.data} editMode={true} />
              <Flex>
                <MainContent data={data.data} ads={ads} editMode={true} />
              </Flex>
            </>
          ) : (
            <></>
          )}
        </Container>
      </Main>
      <Footer isProfile />
    </BoxLayout>
  );
}
