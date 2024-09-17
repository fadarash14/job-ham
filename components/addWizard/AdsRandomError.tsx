import React, { Dispatch, PropsWithChildren } from "react";
import ModalSkeleton from "../utility/ModalSkeleton";
import Image from "next/image";
import styled from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import MobileModalSkeleton from "../mobile modals/MobileModalSkeleton";

const Register = styled.div<LayoutProps>`
  padding: 30px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${layout}
`;
const Head = styled.div`
  display: flex;
`;

const Title = styled.div`
  font-size: 16px;
  position: relative;
  display: flex;
  font-weight: 600;
  align-items: center;
`;

const Warn = styled.div`
  color: #acacac;
  font-size: 14px;
`;
const Img = styled.div<SpaceProps>`
  cursor: pointer;
  ${space}
`;

const Div = styled.div<LayoutProps>`
  ${layout}
`;

export default function AdsRandomError(
  props: PropsWithChildren<{
    saveReport: boolean;
    saveReportShow: Dispatch<boolean>;
  }>
) {
  const isClosing = () => {
    props.saveReportShow(false);
  };

  return (
    <>
      {/*DESKTOP*/}
      <Div display={["none", "block"]}>
        <ModalSkeleton
          show={props.saveReport}
          setShow={props.saveReportShow}
          flex={"column"}
        >
          <Register>
            <div>
              <Head>
                <Title>
                  <Img ml={"5px"}>
                    <Image
                      src={"/icons/report.svg"}
                      height={30}
                      width={30}
                      alt=""
                    />
                  </Img>
                  مشکلی رخ داده است
                </Title>
                <Img mr={"auto"} onClick={isClosing}>
                  <Image
                    src={"/icons/close-icon-modal.svg"}
                    height={26}
                    width={26}
                    alt=""
                  />
                </Img>
              </Head>
              <div>
                <Warn>
                  مشکلی در ثبت آگهی پیش آمده است. لطفا چند دقیقه دیگر تلاش کنید
                  و در صورت وجود مشکل باپشتیبانی تماس بگیرید.
                </Warn>
              </div>
            </div>
          </Register>
        </ModalSkeleton>
      </Div>
      {/*DESKTOP*/}

      {/*MOBILE*/}
      <MobileModalSkeleton
        show={props.saveReport}
        setshow={props.saveReportShow}
        icon={"/icons/report.svg"}
        title={"مشکلی رخ داده است"}
        mt={"60vh"}
      >
        <Register>
          <Warn>
            مشکلی در ثبت آگهی پیش آمده است. لطفا چند دقیقه دیگر تلاش کنید و در
            صورت وجود مشکل باپشتیبانی تماس بگیرید.
          </Warn>
        </Register>
      </MobileModalSkeleton>
      {/*MOBILE*/}
    </>
  );
}
