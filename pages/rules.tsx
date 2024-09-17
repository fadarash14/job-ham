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
import RulesCard from "../components/wizard/Rules";
import { UIEvent, useCallback, useState } from "react";
import _ from "lodash";
import ProfileTopBar from "../components/profile/ProfileTopBar";
import dynamic from "next/dynamic";
import RulesData from "@/mock/rules.json";

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
  background-color: RGB(255, 255, 255);
`;
const Content = styled.div<LayoutProps>`
  flex: 1 1;
  overflow: auto;
  overscroll-behavior: contain;
  &.scroll-d-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  ${layout}
`;
const Flex = styled.div<SpaceProps>`
  display: flex;
  ${space}
`;

const After = styled.div({
  position: "sticky",
  bottom: "-3px",
  width: "100%",
  height: "1px",
  boxShadow: "0 -19px 10px 20px #fdfdfdba",
  visibility: "hidden",
});

const Rules: React.FC<any> = (props) => {
  const [scrollEnd, setScrollEnd] = useState(false);
  function _onScroll(event: UIEvent<HTMLDivElement>) {
    const target = event.target as HTMLDivElement;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  }
  const onScroll = useCallback(_.debounce(_onScroll, 100), []);

  return (
    <>
      <BoxLayout
        bg={"white"}
        minHeight={"100vh"}
        position={"static"}
        display={"flex"}
        flexDirection={"column"}
      >
        <ProfileTopBar
          icon={"/icons/RuleIcon.svg"}
          title={"قـوانیـن و مقـررات"}
        />
        <Main>
          <Container className={"containerPro"}>
            <Flex pt={["10px", "20px"]} pb={["20px", "0"]}>
              <Content
                maxHeight={["auto", "80vh"]}
                className={"scroll-d-none"}
                onScroll={(e) => onScroll(e)}
              >
                <RulesCard {...props} />
                <After />
              </Content>
            </Flex>
          </Container>
        </Main>
        <Footer classNames={"containerPro"} isProfile />
      </BoxLayout>
    </>
  );
};

export default function RulesUsWithHeader(props: IProps) {
  //   let head = props.data.data;
  //   let data = props.data.data.pages[0];

  return (
    <>
      <Head>
        <title>قوانین و مقررات</title>
        {/* <title key="title">{data?.head ?? "قوانین و مقررات"}</title>
        <meta
          property="og:title"
          content={head?.metatitle ?? "قوانین و مقررات"}
        />
        <meta
          name="description"
          content={head?.metadescription ?? "قوانین و مقررات"}
        />
        <meta
          property="og:title"
          content={head?.metatitle ?? "قوانین و مقررات"}
        />
        <meta
          property="og:description"
          content={head.metadescription ?? "قوانین و مقررات"}
        />
        <meta
          name="twitter:title"
          content={head?.metatitle ?? "قوانین و مقررات"}
        /> */}
      </Head>
      <Rules {...RulesData} />
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
  //           url: "terms",
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
