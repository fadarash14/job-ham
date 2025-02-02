import Head from "next/head";
import styled from "styled-components";
import dynamic from "next/dynamic";
const TopSearch = dynamic(() => import("@/components/search/TopSearch"));
import CardBox from "@/components/wizard/CardBox";
import TopSwiper from "@/components/swiper/TopSwiper";
import Col from "@/components/utility/Col";
import Row from "@/components/utility/Row";
import { fetchJobAdsData, parseQueryParameters } from "@/requests/homePage";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
const { v4: uuidv4 } = require("uuid");
import cookie from "cookie";
import clsx from "clsx";
import Link from "next/link";
import { fontSize, FontSizeProps } from "styled-system";
import Footer from "@/components/footer/Footer";
import { IAdJob, Option, QueryKeys } from "@/types";
import SearchInput from "@/components/search/SearchInput";
import useUrlMaker from "@/hooks/useUrlMaker";
import ManagerBox from "@/components/wizard/ManagerBox";
import JobSeekerBox from "@/components/wizard/JobSeekerBox";

interface Props {
  posts: any[] | null;
  perPage: number;
  page: number;
  count: number;
  role: number;
}

const AdsSugestionsTitle = styled.div`
  color: #db143d;
  margin: auto 0;
  display: flex;
  justify-content: start;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const MoreAds = styled.div`
  color: black;
  margin: auto 0;
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
`;
const Span = styled.span<FontSizeProps>`
  font-weight: 400;
  ${fontSize}
`;
const AdsSugestions = styled.div`
  margin: 50px auto 0;
  width: 95%;
  @media (min-width: 768px) {
    width: 85%;
  }
`;
const SearchSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  @media (min-width: 575px) {
    display: none;
  }
`;

const Home: React.FC<Props> = (props) => {
  const { posts, role } = props;
  const [urlStates, updateUrl] = useUrlMaker();
  const onChangeHandler = (key: QueryKeys, value: Option) => {
    updateUrl({
      [key]: value?.id,
    });
  };

  const adsSugestionsTitle = "آخرین فرصت های شغلی";
  const moreAdstext = "مشاهده همه آگهی های استخدام ...";

  const renderJobAds = () => {
    return posts!.map((post: IAdJob, index: number) => {
      return (
        <Col
          flexGrow={1}
          flexShrink={1}
          pb={"8px"}
          maxWidth={["100%", "100%", "50%", "33.3%", "25%"]}
          flexBasis={["100%", "100%", "50%", "33.3%", "25%"]}
          key={uuidv4()}
        >
          <Link href={`/job-detail/${post.id}`}>
            <CardBox post={post} />
          </Link>
        </Col>
      );
    });
  };

  return (
    <>
      <Head>
        <title>استخدام</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopSearch bg={"lipstick"} color={"white"} />
      <SearchSection>
        <SearchInput
          values={urlStates.text}
          maxWidth={600}
          minWidth={"250px"}
          fullSize
          bg={"paleGrey"}
          mobile={true}
          onClear={() => onChangeHandler(QueryKeys.Text, null)}
        />
      </SearchSection>
      <TopSwiper />
      {props.posts !== null && (
        <AdsSugestions>
          <AdsSugestionsTitle>
            <Span fontSize={24}>{adsSugestionsTitle}</Span>
          </AdsSugestionsTitle>
          <Row
            pb={["10px", "0"]}
            className={clsx({ home: true })}
            justifyContent={"flex-start"}
          >
            {renderJobAds()}
          </Row>
          <Link href={"/jobs"}>
            <MoreAds>
              <Span fontSize={16}>{moreAdstext}</Span>
            </MoreAds>
          </Link>
        </AdsSugestions>
      )}
      {(role == 0 || role == 1) && <ManagerBox />}
      {(role == 0 || role == 2) && <JobSeekerBox />}
      <Footer />
    </>
  );
};
export default Home;
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const headers = context.req?.headers?.cookie
    ? cookie.parse(context.req?.headers?.cookie)
    : false;
  const role = headers && headers.role ? parseInt(headers.role) : 0;
  const token = headers ? headers?.token : null;
  if (!token || (token && role == 2)) {
    const queryParams = parseQueryParameters(query);
    const { data, page, count, perPage } = await fetchJobAdsData(queryParams);
    return {
      props: {
        posts: data,
        page,
        count,
        perPage,
        role,
      },
    };
  } else {
    return {
      props: {
        posts: null,
        page: 0,
        count: 0,
        perPage: 0,
        role,
      },
    };
  }
};
