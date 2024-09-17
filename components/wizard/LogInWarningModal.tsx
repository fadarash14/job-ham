import React, { Dispatch, PropsWithChildren } from "react";
import MobileModalSkeleton from "../mobile modals/MobileModalSkeleton";
import { showLoginModal } from "../../store/pageConfig";
import styled from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import { useAppDispatch } from "@/store/hook";
import ModalSkeleton from "../utility/ModalSkeleton";
import Image from "next/image";

const Register = styled.div<LayoutProps>`
  padding: 30px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  ${layout}
`;

const Warn = styled.div`
  color: #acacac;
  font-size: 14px;
  text-align: justify;
`;
const Main = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
`;

const EnterButton = styled.div`
  background: #db143d;
  padding: 7px 45px;
  color: white;
  border-radius: 13px;
  height: 35px;
  cursor: pointer;
  margin-right: auto;
`;

const Div = styled.div<LayoutProps>`
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

const Img = styled.div<SpaceProps>`
  cursor: pointer;
  ${space}
`;

export default function LogInWarningModal(
  props: PropsWithChildren<{
    show: boolean;
    setShow: Dispatch<boolean>;
    saveReport: boolean;
    saveReportShow: Dispatch<boolean>;
    note: boolean;
    setNote: Dispatch<boolean>;
  }>
) {
  const dispatch = useAppDispatch();

  const isClosing = () => {
    props.setShow(false);
  };
  const isClosingNote = () => {
    props.setNote(false);
  };
  const isClosingReport = () => {
    props.saveReportShow(false);
  };

  return (
    <>
      {/*FAV WIZARD*/}
      <MobileModalSkeleton
        show={props.show}
        setshow={props.setShow}
        mt={"60vh"}
        icon={"/icons/red save.svg"}
        title={"نشان کردن"}
      >
        <Register>
          <div>
            <Warn>
              با ورود به حساب کاربری، آگهی‌هایی که نشان می‌کنید در حساب کاربری‌
              شما ذخیره خواهند شد.
            </Warn>
          </div>
          <Main>
            {/*<Img>*/}
            {/*    <Image src={'/icons/red tick.svg'} height={'24px'} width={'24px'}/>*/}
            {/*</Img>*/}
            {/*<H>نمایش نده</H>*/}
            <EnterButton
              onClick={() => {
                isClosing();
                dispatch(showLoginModal(true));
              }}
            >
              ورود
            </EnterButton>
          </Main>
        </Register>
      </MobileModalSkeleton>
      <Div display={["none", "block"]}>
        <ModalSkeleton
          show={props.show}
          setShow={props.setShow}
          flex={"column"}
        >
          <Register>
            <div>
              <Head>
                <Title>
                  <Img ml={"5px"}>
                    <Image
                      alt="save"
                      src={"/icons/red save.svg"}
                      height={35}
                      width={35}
                    />
                  </Img>
                  نشان کردن
                </Title>
                <Img mr={"auto"} onClick={isClosing}>
                  <Image
                    src={"/icons/close-icon-modal.svg"}
                    height={26}
                    width={26}
                    alt="close-modal"
                  />
                </Img>
              </Head>
              <div>
                <Warn>
                  با ورود به حساب کاربری، آگهی‌هایی که نشان می‌کنید در حساب
                  کاربری‌ شما ذخیره خواهند شد.
                </Warn>
              </div>
            </div>
            <Main>
              {/*<Img>*/}
              {/*    <Image src={'/icons/red tick.svg'} height={'24px'} width={'24px'}/>*/}
              {/*</Img>*/}
              {/*<H>نمایش نده</H>*/}
              <EnterButton
                onClick={() => {
                  isClosing();
                  dispatch(showLoginModal(true));
                }}
              >
                ورود
              </EnterButton>
            </Main>
          </Register>
        </ModalSkeleton>
      </Div>
      {/*FAV WIZARD*/}

      {/*REPORT WIZARD*/}
      <MobileModalSkeleton
        show={props.saveReport}
        setshow={props.saveReportShow}
        title={"گزارش مشکل"}
        icon={"/icons/red save.svg"}
        mt={"70vh"}
      >
        <Register>
          <Warn>با ورود به حساب کاربری، مشکل آگهی مورد نظر را ثبت کنید.</Warn>
          <Main>
            {/*<Img>*/}
            {/*    <Image src={'/icons/red tick.svg'} height={'24px'} width={'24px'}/>*/}
            {/*</Img>*/}
            {/*<H>نمایش نده</H>*/}
            <EnterButton
              onClick={() => {
                isClosingReport();
                dispatch(showLoginModal(true));
              }}
            >
              ورود
            </EnterButton>
          </Main>
        </Register>
      </MobileModalSkeleton>
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
                      alt="گزارش"
                    />
                  </Img>
                  گزارش مشکل
                </Title>
                <Img mr={"auto"} onClick={isClosingReport}>
                  <Image
                    src={"/icons/close-icon-modal.svg"}
                    height={26}
                    width={26}
                    alt="close modal"
                  />
                </Img>
              </Head>
              <div>
                <Warn>
                  با ورود به حساب کاربری، مشکل آگهی مورد نظر را ثبت کنید.
                </Warn>
              </div>
            </div>
            <Main>
              {/*<Img>*/}
              {/*    <Image src={'/icons/report.svg'} height={'24px'} width={'24px'}/>*/}
              {/*</Img>*/}
              {/*<H>نمایش نده</H>*/}
              <EnterButton
                onClick={() => {
                  isClosing();
                  dispatch(showLoginModal(true));
                }}
              >
                ورود
              </EnterButton>
            </Main>
          </Register>
        </ModalSkeleton>
      </Div>
      {/*REPORT WIZARD*/}

      {/*NOTE*/}
      <Div display={["none", "block"]}>
        <ModalSkeleton
          show={props.note}
          setShow={props.setNote}
          flex={"column"}
        >
          <Register>
            <div>
              <Head>
                <Title>
                  <Img ml={"5px"}>
                    <Image
                      alt="یادداشت"
                      src={"/icons/letter.svg"}
                      height={30}
                      width={30}
                    />
                  </Img>
                  یادداشت{" "}
                </Title>
                <Img mr={"auto"} onClick={isClosingNote}>
                  <Image
                    src={"/icons/close-icon-modal.svg"}
                    height={26}
                    width={26}
                    alt="close modal"
                  />
                </Img>
              </Head>
              <div>
                <Warn>
                  با ورود به حساب کاربری، یادداشت آگهی ثبت خواهد شد و از طریق
                  همه دستگاه‌هایی در دسترس خواهند بود که به وسیله آن‌ها وارد
                  حساب کاربری خود در همشهری شوید.
                </Warn>
              </div>
            </div>
            <Main>
              {/*<Img>*/}
              {/*    <Image src={'/icons/report.svg'} height={'24px'} width={'24px'}/>*/}
              {/*</Img>*/}
              {/*<H>نمایش نده</H>*/}
              <EnterButton
                onClick={() => {
                  isClosing();
                  dispatch(showLoginModal(true));
                }}
              >
                ورود
              </EnterButton>
            </Main>
          </Register>
        </ModalSkeleton>
      </Div>
      <MobileModalSkeleton
        show={props.note}
        setshow={props.setNote}
        title={" یادداشت"}
        icon={"/icons/letter.svg"}
        mt={"60vh"}
      >
        <Register>
          <div>
            <Warn>
              با ورود به حساب کاربری، یادداشت آگهی ثبت خواهد شد و از طریق همه
              دستگاه‌هایی در دسترس خواهند بود که به وسیله آن‌ها وارد حساب کاربری
              خود در همشهری شوید.
            </Warn>
          </div>
          <Main>
            {/*<Img>*/}
            {/*    <Image src={'/icons/red tick.svg'} height={'24px'} width={'24px'}/>*/}
            {/*</Img>*/}
            {/*<H>نمایش نده</H>*/}
            <EnterButton
              onClick={() => {
                isClosing();
                dispatch(showLoginModal(true));
              }}
            >
              ورود
            </EnterButton>
          </Main>
        </Register>
      </MobileModalSkeleton>
      {/*NOTE*/}
    </>
  );
}
