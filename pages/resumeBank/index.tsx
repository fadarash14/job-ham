import React from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { AdCvs } from "@/types";
import { GetServerSidePropsContext } from "next";
import cookie from "cookie";
const ResumeFilters = dynamic(
  () => import("@/components/resumeBank/ResumeFilters"),
  {
    ssr: false,
  }
);
const Body = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  /* width: 100%; */
  /* margin-top: 60px; */
  width: 100%;
  @media (min-width: 1024px) {
    max-width: 75%;
    min-width: 350px;
  }
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 550px;
  p {
    margin: 0;
    font-size: 12px;
    margin-bottom: 15px;
  }
`;
const FilterBox = styled.div`
  min-width: 205px;

  margin-top: 75px;
  margin-left: 20px;
`;
const FilterStatus = styled.div`
  height: 230px;
  width: 100%;
  background-color: transparent;
  border: 1px solid #d6d6d6;
  position: relative;
  .title {
    position: absolute;
    top: -10px;
    right: 20px;
    background-color: #f5f6fa;
    width: 70px;
    text-align: center;
    font-size: 12px;
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
const Row = styled.div`
  display: flex;
`;
type Props = {
  count: number;
  data: AdCvs[];
};

const ResumeBank = ({ data, count }: Props) => {
  return (
    <>
      <Container className="container">
        <ResumeFilters />
      </Container>
    </>
  );
};

export default ResumeBank;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const headers = context.req?.headers?.cookie
    ? cookie.parse(context.req?.headers?.cookie)
    : false;
  if (headers) {
    let _token = headers.token;
    const role = parseInt(headers.role);
    if (!_token || role === 2) {
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
