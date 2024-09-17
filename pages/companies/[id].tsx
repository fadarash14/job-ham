import * as React from "react";
import Box from "@/components/utility/Box";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  color,
  ColorProps,
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
import { getCompanyAdsList } from "@/requests/profile/companyListAds";
import { useAppSelector } from "@/store/hook";

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

export default function SingleCompany() {
  const router = useRouter();
  const id = router.query.id! as string;
  const myCompanies = useAppSelector((state) => state.companyInfo.data);
  const headerEditMode = myCompanies.find((x) => x.id === id);
  const getCompanyInfo = async () => {
    const response = await getSingleCompany(parseInt(id));
    return response.data;
  };
  const getCompanyAds = async () => {
    const response = await getCompanyAdsList({
      id: parseInt(id),
      skip: 0,
      limit: 24,
      sort: "Desc",
    });
    const { rows, count } = response.data;
    return { rows, count };
  };

  const { data, status } = useQuery({
    queryKey: ["getSingleCompany", id],
    queryFn: getCompanyInfo,
  });
  const { data: ads, status: adsStatuses } = useQuery({
    queryKey: ["getCompanyAds", id],
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
          ) : status === "success" && adsStatuses === "success" ? (
            <>
              <Header editMode={headerEditMode !== undefined} data={data} />
              <Flex pt={["0", "16px"]}>
                <MainContent ads={ads} data={data} />
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
