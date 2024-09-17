import React, { Dispatch, useContext, useState } from "react";
import styled from "styled-components";
import MobileModalSkeleton from "@/components/mobile modals/MobileModalSkeleton";
import ModalSkeleton from "@/components/utility/ModalSkeleton";
import Image from "next/image";
import Close from "../../public/icons/close-icon-modal.svg";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import { Filter } from "@/types";

type Props = {
  show: boolean;
  setshow: Dispatch<boolean>;
  setFilter: Dispatch<any>;
};

const Head = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  font-size: 20px;
  margin: 15px 30px 8px 30px;
`;

const Span = styled.span`
  position: relative;
  top: 5px;
  right: 14px;
`;

const Info = styled.div<SpaceProps | LayoutProps>`
  ${space}
  ${layout}
`;
const Piece = styled.div<SpaceProps>`
  background: white;
  height: 100%;
  ${space}
`;
const Whole = styled.div<LayoutProps>`
  ${layout}
`;
const icon = {
  position: "absolute",
  left: "5px",
  top: "50%",
  transform: "translate(0,-50%)",
  cursor: "pointer",
};

export default function SelectModal(props: Props) {
  const makeSelected = (area: string) => {
    // if (area && cities[current_city]["areas"][area]) {
    //   let area_id = cities[current_city]["areas"][area];
    //   if (setArea) {
    //     setArea(area_id);
    //   }
    //   if (setCity) {
    //     setCity({
    //       name: cities[current_city]["name"],
    //       id: cities[current_city]["id"],
    //     });
    //   }
    //   props.setshow(false);
    // } else if (cities[current_city]) {
    //   if (setArea) {
    //     setArea({ id: 0, name: "تمام محله ها" });
    //   }
    //   if (setCity) {
    //     setCity({
    //       name: cities[current_city]["name"],
    //       id: cities[current_city]["id"],
    //     });
    //   }
    //   props.setshow(false);
    // }
  };

  const isClosing = () => {
    props.setshow(false);
  };

  return (
    <>
      {/*MOBILE*/}
      <MobileModalSkeleton
        title={"استان ، شهر و محله"}
        icon={"/icons/black-location.svg"}
        show={props.show}
        setshow={props.setshow}
      >
        <Piece>
          <Info height={"100%"}></Info>
        </Piece>
      </MobileModalSkeleton>
      {/*MOBILE*/}

      {/*DESKTOP*/}
      <Whole display={["none", "block"]}>
        <ModalSkeleton
          show={props.show}
          setShow={props.setshow}
          flex={"column"}
          back={"white"}
          height={"60%"}
        >
          <Head>
            <Image
              src={"/icons/red-city-area.svg"}
              height={35}
              width={35}
              alt=""
            />
            <Span>استان ، شهر و محله</Span>
            <Close onClick={isClosing} style={icon} />
          </Head>
          <Info margin={"10px 30px 0 30px"} height={"350px"}></Info>
        </ModalSkeleton>
      </Whole>
      {/*DESKTOP*/}
    </>
  );
}
