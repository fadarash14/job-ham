import React from "react";
import filters from "@/dictionaries/cv-filters.json";
import styled from "styled-components";
import Address from "@/components/utility/Address";
import { useRouter } from "next/router";
import { LayoutProps, SpaceProps } from "styled-system";
import {
  _Genders,
  _MaritalStatus,
  _MilitaryService,
  _SocialMedia,
} from "@/mock/_cv";
import Footer from "@/components/footer/Footer";
import BasicInfo from "@/components/cv/BasicInfo";
import { useAppSelector } from "@/store/hook";
import EducationalInfos from "@/components/cv/EducationalInfo";
import JobsRecords from "@/components/cv/JobsRecords";
import LanguagesInfos from "@/components/cv/LanguagesInfo";
import DegreesInfos from "@/components/cv/DegreesInfo";
import SkillsInfo from "@/components/cv/SkillsInfo";
import ResearchesInfo from "@/components/cv/ResearchesInfo";
import jobsData from "@/dictionaries/jobsRawData.json";
import { GetServerSidePropsContext } from "next";
import cookie from "cookie";

const Box = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const AddressWrapper = styled.div<LayoutProps | SpaceProps>`
  width: 90%;
  margin: 0 auto;
`;
const MainContent = styled.main`
  flex-grow: 1;
`;
const jobs = jobsData.data.jobs
  .filter((obj) => obj.has_child === false)
  .map(({ id, title }) => ({ id, title }));

export default function CvBuilder() {
  const level = useAppSelector((state) => state.cvInfo.level);
  const router = useRouter();
  const {
    sex,
    militaryServices,
    typeOwnerShips,
    typeCooperations,
    languages,
    fieldStudies,
    grades,
    levels,
    skills,
  } = filters;
  const lvl1 = { sex, militaryServices };
  const lvl2 = { typeCooperations, jobs };
  const lvl3 = { levels, fieldStudies, typeOwnerShips, grades };
  const lvl4 = { levels, languages };
  const lvl6 = { levels, skills };

  return (
    <Box>
      <AddressWrapper>
        <Address address={router.pathname} />
      </AddressWrapper>
      <MainContent>
        {level === 1 ? (
          <BasicInfo data={lvl1} />
        ) : level === 2 ? (
          <JobsRecords data={lvl2} />
        ) : level === 3 ? (
          <DegreesInfos data={lvl3} />
        ) : level === 4 ? (
          <LanguagesInfos data={lvl4} />
        ) : level === 5 ? (
          <EducationalInfos />
        ) : level === 6 ? (
          <SkillsInfo data={lvl6} />
        ) : level === 7 ? (
          <ResearchesInfo />
        ) : (
          ""
        )}
      </MainContent>
      <Footer />
    </Box>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const headers = context.req?.headers?.cookie
    ? cookie.parse(context.req?.headers?.cookie)
    : false;
  if (headers) {
    let _token = headers.token;
    const role = parseInt(headers.role);
    if (!_token || role === 1) {
      return {
        redirect: {
          destination: "/404",
          permanent: true,
        },
      };
    }
  }
  return { props: {} };
}
