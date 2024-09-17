import React, { Dispatch, PropsWithChildren } from "react";
import MobileModalSkeleton from "../mobile modals/MobileModalSkeleton";
import Image from "next/image";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import ModalSkeleton from "../utility/ModalSkeleton";

const MapWithNoSSR = dynamic(() => import("@/components/wizard/DraggableMap"), {
  ssr: false,
});

const Close = styled.div`
  position: absolute;
  left: 60px;
  top: 30px;
  cursor: pointer;
  z-index: 999;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  justify-content: space-between;
`;
const CheckBox = styled.div`
    display:flex
    align-items:center;
    align-items:center;
    width:100%;
`;
const Confirm = styled.div<LayoutProps | SpaceProps>`
  background: #db143d;
  text-align: center;
  color: white;
  padding: 12px 80px;
  border-radius: 20px;
  cursor: pointer;
  ${layout}
  ${space}
`;
const Img = styled.div<SpaceProps>`
  cursor: pointer;
  &.loc {
    height: 25px;
  }
  ${space}
`;

const Area = styled.div`
  backdrop-filter: blur(4px);
  background: rgba(71, 69, 70, 0.7);
  padding: 8px 18px 8px 104px;
  border-radius: 18px;
  top: 20px;
  right: 20px;
  color: white;
  position: absolute;
  z-index: 1111;
  display: flex;
  align-items: center;
`;

const Relative = styled.div`
  position: relative;
`;
const Whole = styled.div<LayoutProps>`
  ${layout}
`;
const Piece = styled.div`
  height: 100%;
`;
const Piece2 = styled.div`
  height: 400px;
`;

export default function AdsMapModals(
  props: PropsWithChildren<{
    show: boolean;
    setShow: Dispatch<boolean>;
    location: Location;
  }>
) {
  function entry() {
    props.setShow(false);
  }

  return (
    <>
      {/*MOBILE*/}
      <MobileModalSkeleton
        show={props.show}
        setshow={props.setShow}
        icon={"/icons/Iconly-Curved-Location.svg"}
        title={"محدوده آگهی"}
      >
        <Piece>
          <Relative>
            <Area>
              <Img className={"loc"} ml={"5px"}>
                <Image
                  src={"/icons/Iconly-Curved-Location.svg"}
                  height={20}
                  width={20}
                  alt=""
                />
              </Img>
              <div>
                {
                  //@ts-ignore
                  props?.location?.name
                }
              </div>
            </Area>
          </Relative>
          {
            //@ts-ignore
            <MapWithNoSSR {...props?.location} />
          }
        </Piece>
        <Flex>
          {/*<CheckBox>*/}
          {/*    <Img onClick={()=>setToggle(!toggle)} ml={'10px'}>*/}
          {/*        {!toggle ? <Image height={'30px'} width={'30px'} src={'/icons/select.svg'}/>:<Image height={'30px'} width={'30px'} src={'/icons/selected.svg'}/>}*/}
          {/*    </Img>*/}
          {/*    نمایش به صورت محدوده*/}
          {/*</CheckBox>*/}
          <Confirm onClick={() => props.setShow(false)}>ثبت موقیعت</Confirm>
        </Flex>
      </MobileModalSkeleton>
      {/*MOBILE*/}

      {/*DESKTOP*/}
      <Whole display={["none", "block"]}>
        <ModalSkeleton
          overflow={true}
          back={"transparent"}
          show={props.show}
          flex={"column"}
          setShow={props.setShow}
        >
          <Piece2>
            <Relative>
              <Area>
                <Img className={"loc"} ml={"5px"}>
                  <Image
                    src={"/icons/Iconly-Curved-Location.svg"}
                    height={20}
                    width={20}
                    alt=""
                  />
                </Img>
                <div>
                  {
                    //@ts-ignore
                    props?.location?.name
                  }
                </div>
              </Area>
              <Close onClick={() => props.setShow(false)}>
                <Image
                  height={30}
                  width={30}
                  src={"/icons/remove.svg"}
                  alt=""
                />
              </Close>
            </Relative>

            {
              //@ts-ignore
              <MapWithNoSSR {...props.location} />
            }
            <Flex>
              {/*<CheckBox>*/}
              {/*    <Img onClick={()=>setToggle(!toggle)} ml={'10px'}>*/}
              {/*        {!toggle ? <Image height={'30px'} width={'30px'} src={'/icons/select.svg'}/>:<Image height={'30px'} width={'30px'} src={'/icons/selected.svg'}/>}*/}
              {/*    </Img>*/}
              {/*    نمایش به صورت محدوده*/}
              {/*</CheckBox>*/}
              <Confirm mr={"auto"} width={"fit-content"} onClick={entry}>
                ثبت موقیعت
              </Confirm>
            </Flex>
          </Piece2>
        </ModalSkeleton>
      </Whole>
      {/*DESKTOP*/}
    </>
  );
}
