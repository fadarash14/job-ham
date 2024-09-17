import React, { Dispatch, useContext, useEffect, useState } from "react";
import styled, { CSSObject, keyframes } from "styled-components";
import Image from "next/image";
import {
  layout,
  LayoutProps,
  space,
  SpaceProps,
  FontWeightProps,
  fontWeight,
  ColorProps,
  color,
  FontSizeProps,
  fontSize,
  BorderProps,
  backgroundColor,
  border,
  FlexboxProps,
  flexbox,
} from "styled-system";
import AdsUploadContext from "../addWizard/AdsUploadContext";
import CvCityAreaModals from "./CvCityAreaModals";
import { useAppDispatch } from "@/store/hook";
import { Location } from "@/types";

type Props = {
  value: Location;
  setLocation: Dispatch<any>;
};

const FlexInput = styled.div<FlexboxProps | SpaceProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  ${flexbox}
  ${space}
`;
const Topic = styled.div<BorderProps>`
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  flex: 1 1 90%;
  height: 40px;
  min-width: 100px;
  ${border}
`;
const Img = styled.div<FlexboxProps | LayoutProps | SpaceProps>`
  align-items: center;
  // position: relative;
  width: fit-content;
  display: flex;
  &.map {
    left: 10px;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 999;
    width: 20px;
    position: absolute;
  }
  ${layout}
  ${flexbox}
    ${space}
`;
const TickPos = styled.div<LayoutProps>`
  display: flex;
  min-width: fit-content;
  ${layout}
`;
const Tick = styled.div<LayoutProps>`
  margin: auto 10px auto 0;
  ${layout}
`;
const Gps = styled.div<BorderProps | SpaceProps>`
  width: 100%;
  padding: 5px;
  align-items: center;
  display: flex;
  height: 80px;
  border-radius: 18px;
  font-size: 12px;
  color: #474546;
  text-align: center;
  cursor: pointer;
  margin-bottom: 8px;
  flex: 1 1;
  ${border}
  ${space}
`;
const Text = styled.div`
  font-size: 11px;
  color: #707070;
  align-items: center;
  margin-bottom: 8px;
  display: flex;
`;
const LocationFinder = styled.div`
  margin-top: 24px;
  display: flex;
  position: relative;
`;
const Piece = styled.div`
  flex: 1 1;
`;
const Flex = styled.div<FlexboxProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 960px) {
    &.mobile {
      flex-direction: column;
      align-items: baseline;
    }
  }
  @media (max-width: 1300px) {
    &.tablet {
      flex-direction: column;
      align-items: baseline;
    }
  }
  ${flexbox}
`;
const Back = styled.div`
  align-items: center;
  display: flex;
  background-image: url("/icons/map.svg");
  background-repeat: no-repeat;
  background-size: cover;
  margin: auto;
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  border-radius: 18px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  // margin-top: 15px;
  width: 40%;
`;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: center;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const Input = styled.div`
  width: 100%;
`;
const InputParent = styled.div<SpaceProps>`
  flex: 1 1 50%;
  padding: 4px;
  ${space}
`;
const Label = styled.label<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: right;
  color: #acacac;
  font-size: 14px;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;

export default function LocationInfo(props: Props) {
  const [show, setShow] = useState(false);
  const [location, setLocaton] = useState<Location | null>(null);
  const dispatch = useAppDispatch();
  const onShow = () => {
    setShow(true);
  };
  const removeHandler = (type: "city" | "area") => {
    if (type === "city") {
      setLocaton({
        ...location,
        city: {
          name: "",
          id: -1,
        },
      });
    }
    if (type === "area") {
      setLocaton({
        ...location,
        area: {
          name: "",
          id: -1,
        },
      });
    }
  };

  const locationHandler = (e: { name: string; id: number }, type: string) => {
    if (type === "city") {
      setLocaton((prevState) => ({ ...prevState, city: e }));
    }
    if (type === "area") {
      setLocaton((prevState) => ({ ...prevState, area: e }));
    }
  };
  useEffect(() => {
    props.setLocation(location);
  }, [location]);

  return (
    <Div>
      <FlexInput>
        {
          <InputParent>
            <Label>شهر</Label>
            <Topic
              border={
                //@ts-ignore
                props.value?.city?.id !== -1 ? "1px solid #00C39C" : ""
              }
            >
              {
                //@ts-ignore
                props.value?.city?.id !== -1 ? (
                  <Box>
                    <Input onClick={onShow}>{props.value?.city?.name}</Input>
                    <Img>
                      <Image
                        width={15}
                        height={15}
                        src={`/icons/grey-remove.svg`}
                        alt="left arrow"
                        onClick={() => removeHandler("city")}
                      />
                    </Img>
                  </Box>
                ) : (
                  <Box onClick={onShow}>
                    <Input>انتخاب کنید</Input>
                    <Img mr={"auto"}>
                      <Image
                        width={10}
                        height={10}
                        src={`/icons/ads-left-arrow.svg`}
                        alt="left arrow"
                      />
                    </Img>
                  </Box>
                )
              }
            </Topic>
          </InputParent>
        }
        {
          <InputParent>
            <Label>محله</Label>
            <Topic
              border={
                //@ts-ignore
                props.value?.area?.id !== -1 ? "1px solid #00C39C" : ""
              }
            >
              {
                //@ts-ignore
                props.value?.area?.id !== -1 ? (
                  <Box>
                    <Input onClick={onShow}>{props.value?.area?.name}</Input>
                    <Img mr={"auto"}>
                      <Image
                        width={15}
                        height={15}
                        src={`/icons/grey-remove.svg`}
                        alt="left arrow"
                        onClick={() => removeHandler("area")}
                      />
                    </Img>
                  </Box>
                ) : (
                  <Box onClick={onShow}>
                    <Input>انتخاب کنید</Input>
                    <Img mr={"auto"}>
                      <Image
                        width={10}
                        height={10}
                        src={`/icons/ads-left-arrow.svg`}
                        alt="left arrow"
                      />
                    </Img>
                  </Box>
                )
              }
            </Topic>
          </InputParent>
        }
        {/* <TickPos width={"24px"}>
          <Tick width={"15px"}>
            {level >= 2 && (
              <Image
                alt="green tick"
                src={"/icons/green tick.svg"}
                height={10}
                width={15}
              />
            )}
          </Tick>
        </TickPos> */}
      </FlexInput>
      {/* <Text>
        <Img height={"15px"} ml={"10px"}>
          <Image
            src={"/icons/Arrow - Left 2.svg"}
            height={8}
            width={8}
            alt=""
          />
        </Img>
        لطــفـا شــهـر و محــله خـود را انتـخــاب کنــید.
      </Text> */}
      <CvCityAreaModals
        setArea={(e: any) => locationHandler(e, "area")}
        setCity={(e: any) => locationHandler(e, "city")}
        show={show}
        value={props.value}
        setshow={setShow}
      />
    </Div>
  );
}
