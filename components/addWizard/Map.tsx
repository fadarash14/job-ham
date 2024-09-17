import React, { Dispatch, PropsWithChildren, useState } from "react";
import styled from "styled-components";
import ModalSkeleton from "../utility/ModalSkeleton";
import dynamic from "next/dynamic";
import Image from "next/image";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";

// @ts-ignore
const MapWithNoSSR = dynamic(() => import("../wizard/DraggableMap"), {
  ssr: false,
});

const Close = styled.div`
  position: absolute;
  left: 60px;
  top: 20px;
  cursor: pointer;
  z-index: 1111;
`;
const Flex = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
`;
const CheckBox = styled.div`
    display:flex
    align-items:center;
    color:white;
    align-items:center;
`;
const Confirm = styled.div`
  background: #db143d;
  text-align: center;
  color: white;
  padding: 12px 80px;
  border-radius: 20px;
  cursor: pointer;
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
export default function MapFinder(
  props: PropsWithChildren<{
    show: boolean;
    setShow: Dispatch<boolean>;
    location: Location;
  }>
) {
  const [toggle, setToggle] = useState(false);
  function entry() {
    props.setShow(false);
  }
  return (
    <Whole display={["none", "block"]}>
      <ModalSkeleton
        overflow={true}
        back={"transparent"}
        show={props.show}
        flex={"column"}
        setShow={props.setShow}
      >
        <div style={{ height: "400px" }}>
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
              <Image height={30} width={30} src={"/icons/remove.svg"} alt="" />
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
            <Confirm onClick={entry}>ثبت موقیعت</Confirm>
          </Flex>
        </div>
      </ModalSkeleton>
    </Whole>
  );
}
