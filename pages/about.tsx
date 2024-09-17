import * as React from "react";
import Head from "next/head";
import Box from "../components/utility/Box";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from "styled-system";
import Footer from "../components/footer/Footer";
import Container from "../components/utility/Container";
import AboutCard from "../components/wizard/AboutUs";
import ProfileTopBar from "../components/profile/ProfileTopBar";
import AboutData from "@/mock/about.json";

interface IProps {
  data: any;
}

const BoxLayout = styled((props) => <Box {...props} />)<
  PositionProps | LayoutProps | ColorProps
>(position, layout, color);

const Main = styled.main`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  flex: 1 1 100%;
  background-color: RGB(255, 255, 255);
`;
const Content = styled.div<LayoutProps>`
  flex: 1 1;
  overflow: auto;
  &.scroll-d-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  ${layout}
`;
const Flex = styled.div<SpaceProps>`
  display: flex;
  flex-flow: row wrap;
  ${space}
`;

const About: React.FC<any> = (props) => {
  return (
    <>
      <BoxLayout
        bg={"white"}
        position={"static"}
        display={"flex"}
        minHeight={"100vh"}
        flexDirection={"column"}
      >
        <ProfileTopBar
          icon={"/icons/AboutIcon.svg"}
          title={"دربـاره هـمشــهری"}
        />
        <Main>
          <Container className={"containerPro"}>
            <Flex pt={["10px", "20px"]} pb={["20px", "0"]}>
              {/* <SideBar /> */}
              <Content maxHeight={["auto", "80vh"]} className={"scroll-d-none"}>
                <AboutCard {...props} />
              </Content>
            </Flex>
          </Container>
        </Main>
        <Footer classNames={"containerPro"} isProfile />
      </BoxLayout>
    </>
  );
};

export default function AboutUsWithHeader(props: IProps) {
  return (
    <>
      <Head>
        <title>درباره همشهری</title>
        {/* <title key="title">{data?.head ?? "درباره همشهری"}</title>
        <meta
          property="og:title"
          content={head?.metatitle ?? "درباره همشهری"}
        />
        <meta
          name="description"
          content={head?.metadescription ?? "درباره همشهری"}
        />
        <meta
          property="og:title"
          content={head?.metatitle ?? "درباره همشهری"}
        />
        <meta
          property="og:description"
          content={head.metadescription ?? "درباره همشهری"}
        />
        <meta
          name="twitter:title"
          content={head?.metatitle ?? "درباره همشهری"}
        /> */}
      </Head>
      <About {...AboutData} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //   let agent = context.req.headers["user-agent"];
  //   if (agent) {
  //     // @ts-ignore
  //     const res = await multipleQuery({
  //       agent,
  //       pages: {
  //         condition: {
  //           url: "aboutus",
  //         },
  //         data: {
  //           url: true,
  //           content: true,
  //         },
  //       },
  //       redirecturls: {
  //         condition: {},
  //         data: {
  //           id: true,
  //           source_url: true,
  //           target_url: true,
  //           title: true,
  //           metatitle: true,
  //           metadescription: true,
  //           description: true,
  //         },
  //       },
  //     });

  //     return { props: { data: res } };
  //   }
  return { props: { data: [] } };
};
