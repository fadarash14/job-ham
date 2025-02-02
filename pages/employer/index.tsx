import Head from "next/head";
import styled from "styled-components";
import TopSwiper from "@/components/swiper/TopSwiper";
import Col from "@/components/utility/Col";
import Row from "@/components/utility/Row";
import { loadAdvertises } from "@/requests/homePage";
import { GetStaticProps } from "next";
const { v4: uuidv4 } = require("uuid");
import clsx from "clsx";
import { Feature } from "@/types";
import { _featuresList, _staticsList } from "@/mock/_employers";
import {
  BackgroundColorProps,
  color,
  fontSize,
  FontSizeProps,
  FontWeightProps,
  fontWeight,
  space,
  SpaceProps,
  layout,
  LayoutProps,
  border,
  backgroundColor,
  ColorProps,
  BorderProps,
} from "styled-system";
import Footer from "@/components/footer/Footer";
import FeatureBox from "@/components/wizard/FeatureBox";
import FaresTable from "@/components/employer/FaresTable";
import MessageSwiper from "@/components/swiper/messageSwiper";
import Image from "next/image";
import FareCardsSwiper from "@/components/swiper/FareCardsSwiper";
import Link from "next/link";

interface Props {
  posts: [object];
  perPage: number;
  page: number;
  count: number;
}

const FeaturesTitle = styled.div`
  color: #db143d;
  margin: auto 0;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
  @media (max-width: 425px) {
    > span {
      font-size: 20px;
    }
  }
`;
const FaresTitle = styled.div`
  color: #db143d;
  margin: auto 0;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const RgAdsTitle = styled.div`
  color: black;
  margin: auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
  align-items: center;
  @media (max-width: 425px) {
    > span {
      margin-top: 16px;
      margin-bottom: 0px;
      font-size: 16px;
      text-align: right;
    }
    flex-direction: column-reverse;
    justify-content: space-between;
    align-items: center;
  }
`;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps
>`
  text-align: center;
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const FeaturesSection = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const FaresSection = styled.div``;
const MessagesWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;
const Statistics = styled.div<BackgroundColorProps>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  min-height: 200px;
  ${color}
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
`;
const Number = styled.div`
  text-align: center;
  font-size: 32px;
`;
const Title = styled.div`
  text-align: center;
`;
const RegistrationAds = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 10px;
  @media (max-width: 1024px) {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 auto;
  }
`;
const Img = styled.div`
  position: relative;
  left: 25px;
  top: 35px;
  z-index: 1000;
  display: flex;
  align-items: center;
  margin-left: 10px;
  @media (max-width: 860px) {
    display: none;
  }
`;
const YellowButton = styled.button<LayoutProps | ColorProps | BorderProps>`
  border: 1px solid #f5f6fa3c;
  border-radius: 12px;
  color: black;
  font-size: 14px;
  justify-content: center;
  text-align: center;
  min-width: 180px;
  max-width: 200px;
  height: 37px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 40px;
  border: none;

  ${layout}
  ${color}
  ${border}
  ${backgroundColor}
`;

const Managers: React.FC<Props> = (props) => {
  const faresTitle = "تعرفه انتشار آگهی استخدام در نیازمندی های همشهری";
  const featuresTitleText =
    "چرا کارفرمایان نیازمندی های همشهری را برای استخدام انتخاب میکنند ؟";
  const featureList: JSX.Element[] = [];
  _featuresList?.map((feature: Feature, index: number) => {
    featureList.push(
      <Col
        flexGrow={1}
        flexShrink={1}
        pb={"8px"}
        maxWidth={["100%", "100%", "50%", "33.3%", "25%"]}
        flexBasis={["100%", "100%", "50%", "33.3%", "25%"]}
        key={uuidv4()}
      >
        <FeatureBox feature={feature} />
      </Col>
    );
  });

  return (
    <>
      <Head>
        <title>استخدام</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RegistrationAds>
        <RgAdsTitle>
          <Span fontWeight={400} fontSize={20}>
            با نیازمندی‌ های همشهری حرفه ‌ای ‌ترین نیروها را استخدام کنید
          </Span>
          <Span fontWeight={400} fontSize={19}>
            با سرعت و اطمینان بیشتری فرصت ‌های شغلی شرکت خود را به جویندگان کار
            معرفی کنید
          </Span>
          <Link href={"/wizard"}>
            <YellowButton className="yellowButton" backgroundColor={"mustard"}>
              <Span fontSize={16} fontWeight={500}>
                ثبت آگهی استخدام
              </Span>
            </YellowButton>
          </Link>
        </RgAdsTitle>
        <Img>
          <Image
            src={"/icons/employers.svg"}
            alt="emloypers"
            width={476}
            height={302}
          />
        </Img>
      </RegistrationAds>

      <TopSwiper />
      <FeaturesSection>
        <FeaturesTitle>
          <Span fontWeight={400} fontSize={24}>
            {featuresTitleText}
          </Span>
        </FeaturesTitle>
        <Row
          pb={["80px", "0"]}
          className={clsx({ home: true })}
          justifyContent={"flex-start"}
        >
          {featureList}
        </Row>
      </FeaturesSection>
      <Statistics bg={"lipstick"}>
        {_staticsList.map((item) => (
          <ItemWrapper key={item.id}>
            <Number>{item.total}</Number>
            <Title>{item.title}</Title>
          </ItemWrapper>
        ))}
      </Statistics>
      <FaresSection>
        <FaresTitle>
          <Span fontWeight={400} fontSize={18}>
            {faresTitle}
          </Span>
        </FaresTitle>
        <FaresTable />
        <FareCardsSwiper />
      </FaresSection>
      <MessagesWrapper>
        <MessageSwiper />
      </MessagesWrapper>
      <Footer />
    </>
  );
};
export default Managers;

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await loadAdvertises({
    page: 1,
    filters: [],
  });
  if (posts) {
    return {
      props: {
        posts: posts?.data,
        page: posts?.page,
        count: posts?.count,
        perPage: posts?.perPage,
      },
    };
  } else
    return {
      props: {
        posts: [],
        page: 0,
        count: 0,
        perPage: 0,
      },
      revalidate: 20,
    };
};
