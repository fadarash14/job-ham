import React from "react";
import Swiper from "./swiperSkeleton";
import styled from "styled-components";
import Image from "next/image";

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
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  margin: 0 10px;
`;

const ImageTitle = styled.span`
  bottom: 0;
  color: rgba(0, 0, 0, 0.5);
  width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  direction: rtl;
  text-overflow: ellipsis;
  padding: 0 8px;
`;

const ImageContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 170px;
  height: 200px;
`;

export default function TopSwiper() {
  return (
    <Container>
      <Title>
        <span>{title}</span>
      </Title>
      <Swiper height={200} ssr={true} centerMode responsive={responsiveDefault}>
        {swiperArr.map((item, key) => (
          <ItemWrapper key={key}>
            <ImageContainer>
              <Image
                style={{
                  objectFit: "contain",
                  padding: "2px 8px",
                  width: "100%",
                }}
                src={item.url}
                alt={item.title}
                width={170}
                height={170}
              />
              <ImageTitle>{item.title}</ImageTitle>
            </ImageContainer>
          </ItemWrapper>
        ))}
      </Swiper>
    </Container>
  );
}

const swiperArr = [
  {
    url: "/images/companies/digikala.jpg",
    title: "دیجی کالا",
  },
  {
    url: "/images/companies/kosarInsurance.png",
    title: "بیمه کوثر",
  },
  {
    url: "/images/companies/sinaInsurance.png",
    title: "بیمه سینا",
  },
  {
    url: "/images/companies/sarmayeBank.png",
    title: "بانک سرمایه",
  },
  {
    url: "/images/companies/pasargadBank.jpg",
    title: "بانک پاسارگاد",
  },
  {
    url: "/images/companies/parsianBank.png",
    title: "بانک پارسیان",
  },
  {
    url: "/images/companies/municipalityOfTehran.png",
    title: "شهرداری تهران",
  },
  {
    url: "/images/companies/parsianKish.jpg",
    title: "شرکت تجارت الکترونیک پارسیان کیش",
  },
  {
    url: "/images/companies/azadUni.jpg",
    title: "دانشگاه آزاد اسلامی",
  },
];
const title = "مشاغل شرکت های برتر";

const responsiveDefault = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1200, min: 640 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};
