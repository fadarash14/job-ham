import React from "react";
import Swiper from "./swiperSkeleton";
import styled from "styled-components";
import { _messageList } from "@/mock/_employers";
import MessageBox from "../wizard/MessageBox";
import { ResponsiveType } from "react-multi-carousel";

const Title = styled.div`
  color: #db143d;
  margin: auto 0;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
  & span {
    font-size: 24px;
    font-weight: 400;
  }
  @media (max-width: 425px) {
    > span {
      font-size: 20px;
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  justify-content: center;
  @media (max-width: 1024px) {
    width: 100%;
    margin: 0 auto;
  }
`;
const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  margin-right: 10px;
`;
export default function MessageSwiper() {
  const title = "سازمان ها درباره نیازمندی ها چه می گویند ؟";
  return (
    <>
      <Container>
        <Title>
          <span>{title}</span>
        </Title>
      </Container>
      <Swiper height={400} ssr={true} responsive={responsive}>
        {_messageList.map((item, key) => (
          <ItemWrapper key={key}>
            <MessageBox item={item} width={290} height={350} />
            {/* <Image src={item.url} alt={item.title} width={160} height={207} /> */}
          </ItemWrapper>
        ))}
      </Swiper>
    </>
  );
}

const responsive: ResponsiveType = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};
