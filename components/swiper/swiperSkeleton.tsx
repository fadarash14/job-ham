import React, { PropsWithChildren } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import Container from "../utility/Container";
import styled from "styled-components";

export default function SwiperSkeleton(
  props: PropsWithChildren<{
    ssr: boolean;
    height: number;
    isFinite: boolean;
    fullWidth?: boolean;
    centerMode?: boolean;
    responsive?: ResponsiveType;
  }>
) {
  const responsiveDefault: ResponsiveType = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
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

  const CustomRightArrow = styled.i`
    position: absolute !important;
    right: 10px;
    z-index: 1;
    border: 1px solid grey;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 6px;
    opacity: 0.8;
    cursor: pointer;
    transform: rotate(-45deg);
    &:hover {
      opacity: 1;
    }
  `;
  const CustomLeftArrow = styled.i`
    position: absolute !important;
    left: 10px;
    z-index: 1;
    border: 1px solid grey;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 6px;
    opacity: 0.8;
    cursor: pointer;
    transform: rotate(135deg);
    &:hover {
      opacity: 1;
    }
  `;
  const carousel = (
    <Carousel
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
      infinite={props.isFinite}
      responsive={props.responsive || responsiveDefault}
      centerMode={props.centerMode}
    >
      {props.children}
    </Carousel>
  );

  return (
    <>
      {props.fullWidth ? (
        carousel
      ) : (
        <Container height={props.height}>{carousel}</Container>
      )}
    </>
  );
}
SwiperSkeleton.defaultProps = {
  isFinite: true,
  fullWidth: false,
  centerMode: false,
  responsive: undefined,
};
