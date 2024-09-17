import React from "react";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import Container from "@/components/utility/Container";
import ScrollCheck from "@/components/addWizard/ScrollCheck";
import ContentWrapper from "@/components/addWizard/ContentWrapper";
import AdsUploadContextProvider from "@/components/addWizard/AdsUploadProvider";
import Footer from "@/components/footer/Footer";
import Head from "next/head";

const Main = styled.div<SpaceProps>`
  background: #f5f6fa;
  flex: 1 1 100% !important;
  ${space}
`;
const Wizard = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 100%;
`;
const Whole = styled.div`
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
`;

export default function HomeAddAds() {
  return (
    <Whole>
      <Head>
        <title>نیازمندی‌های همشهری</title>
      </Head>
      <Main>
        <AdsUploadContextProvider>
          <Container height={"100%"}>
            <Wizard>
              <ContentWrapper />
              <ScrollCheck />
            </Wizard>
          </Container>
        </AdsUploadContextProvider>
      </Main>
      <Footer isWizard />
    </Whole>
  );
}
