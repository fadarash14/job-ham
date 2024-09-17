import Footer from "@/components/footer/Footer";
import SwiperSkeleton from "@/components/swiper/swiperSkeleton";
import Address from "@/components/utility/Address";
import Box from "@/components/utility/Box";
import Container from "@/components/utility/Container";
import _ from "lodash";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { ResponsiveType } from "react-multi-carousel";
import styled, { keyframes } from "styled-components";
import {
  LayoutProps,
  SpaceProps,
  space,
  layout,
  FontSizeProps,
  FontWeightProps,
  ColorProps,
  color,
  fontSize,
  fontWeight,
  PositionProps,
  position,
} from "styled-system";

const BoxLayout = styled((props) => <Box {...props} />)<
  PositionProps | ColorProps
>(position, color);

const AddressWrapper = styled.div<LayoutProps | SpaceProps>`
  width: 90%;
  margin: 0 auto;
`;
const Divider = styled.div`
  flex-grow: 1;
  border-bottom: 1px solid #d1d1d1;
  height: 1rem;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 100%;
`;
const scales = keyframes`
 0% {  transform: scale(1)}
 100% {  transform: scale(1.15)}
`;
const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 10px;
  gap: 10px;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 80%;
  margin: 0 auto;
  @media (max-width: 1000px) {
    width: 90%;
  }
  & .react-multi-carousel-item--active {
    @media (min-width: 1000px) {
      animation-name: ${scales};
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
      animation-iteration-count: 1;
    }
    img {
      cursor: pointer;
    }
    /* transition: all 0.5s ease;
    img:hover {
      cursor: pointer;
      transform: scale(1.1);
      transition: all 0.5s ease;
    }
    img {
      transition: all 0.5s ease;
    } */
  }
  & .react-multi-carousel-track {
    height: 500px;
    display: flex;
    align-items: center;
    @media (max-width: 1000px) {
      align-items: flex-start;
      padding-top: 5px;
    }
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: right;
  // min-width: 20px;
  white-space: nowrap;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Title = styled.div<LayoutProps | SpaceProps>`
  display: flex;
  justify-content: center;
  ${space}
  ${layout}
`;

export default function Templates() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const handleWindowResize = _.throttle(() => {
      if (window.innerWidth <= 760) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }, 200);
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const router = useRouter();
  const modernCvRef = useRef(null);
  const simpleCvRef = useRef(null);
  const combinedCvRef = useRef(null);

  return (
    <BoxLayout
      p={["0"]}
      // bg={"white"}
      height={"100%"}
      position={"static"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Container>
        <AddressWrapper>
          <Address address={router.pathname} />
        </AddressWrapper>
        <Header>
          <Title>
            <Span color={"#474546"} fontSize={14}>
              انتخاب قالب
            </Span>
          </Title>
          <Divider></Divider>
        </Header>
        <Body>
          <SwiperSkeleton
            height={500}
            ssr={true}
            isFinite
            responsive={responsive}
            centerMode={!isMobile}
          >
            {images.map((image) => (
              <ImageWrapper key={image.id}>
                <Image
                  src={image.src}
                  width={350}
                  height={420}
                  alt=""
                  onClick={() => router.push(`Templates/${image.id}`)}
                  quality={100}
                />
              </ImageWrapper>
            ))}
          </SwiperSkeleton>
        </Body>
      </Container>
      <Footer isProfile />
    </BoxLayout>
  );
}
const responsive: ResponsiveType = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};
const images = [
  { id: 1, src: "/images/simpleCv.jpg" },
  { id: 2, src: "/images/modern.jpg" },
  { id: 3, src: "/images/combined.jpg" },
];
