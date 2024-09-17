import React, { Dispatch, PropsWithChildren, useState } from "react";
import { useRouter } from "next/router";
import { mutation } from "../../utils/request";
import Toast from "../Toast/Toast";
import ModalSkeleton from "../utility/ModalSkeleton";
import Image from "next/image";
import styled from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import MobileModalSkeleton from "../mobile modals/MobileModalSkeleton";
import clsx from "clsx";

//DESKTOP MODAL
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
const Main = styled.div`
  display: flex;
  align-items: center;
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

const Img = styled.div<SpaceProps>`
  cursor: pointer;
  ${space}
`;

const Flex = styled.div`
  display: flex;
`;
const Piece = styled.div<SpaceProps>`
  ${space}
`;
const Div = styled.div<LayoutProps>`
  ${layout}
`;
//DESKTOP MODAL

const List = styled.ul`
  list-style-type: none;
  padding-right: 0;
`;

const Li = styled.li`
  padding-bottom: 10px;
  cursor: pointer;
  opacity: 50%;
  &:not(:last-child)::after {
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    background: rgba(209, 209, 209, 0.58);
    margin-top: 10px;
  }
  &:hover,
  &.--selected {
    opacity: 1;
  }
`;

//MOBILE MODAL
const ContactInfo = styled.div`
  background: #db143d;
  border-radius: 10px;
  color: white;
  text-align: center;
  margin-left: 10px;
  height: 40px;
  margin-top: auto;
  display: flex;
  & > div {
    margin: auto;
  }
`;
//MOBILE MODAL

export default function ReportModals(
  props: PropsWithChildren<{
    id: number;
    show1: boolean;
    setShow1: Dispatch<boolean>;
    setToast: Dispatch<boolean>;
    reason: { id: number; value: string }[];
  }>
) {
  const [isHovering, setIsHovering] = useState(false);
  const [reasons, setReasons] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedReason, setSelectedReason] = useState<number[]>([]);

  const isClosing = () => {
    props.setShow1(!props.show1);
  };

  const handleMouseOver = () => {
    setIsHovering(!isHovering);
  };
  let router = useRouter();
  let post = props.reason;

  const registerProplems = () => {
    //@ts-ignore
    let id = (router?.query?.id)[0];
    if (reasons.length > 0 && id) {
      setLoading(true);
      //@ts-ignore
      mutation(
        "advsReport",
        { advId: parseInt(id), reasons: reasons },
        { status: true }
      )
        .then((res) => {
          setLoading(false);
          setIsHovering(true);
          props.setShow1(false);
        })
        .catch((e) => {
          setLoading(false);
          props.setShow1(false);
        });
    }
  };

  const registerProblem = () => {
    setLoading(true);
    //@ts-ignore
    let id = (router?.query?.id)[0];
    if (id)
      mutation(
        "advsReport",
        { advId: parseInt(id), reasons: selectedReason },
        { status: true }
      )
        .then((res) => {
          setLoading(false);
          props.setToast(true);
          props.setShow1(false);
        })
        .catch((e) => {
          setLoading(false);
        });
  };

  const select = (i: number) => {
    let _selectedReason = [...selectedReason];
    let index = _selectedReason.indexOf(i);
    if (index > -1) {
      _selectedReason.splice(index, 1);
    } else {
      _selectedReason.push(i);
    }
    setSelectedReason(_selectedReason);
  };

  return (
    <>
      {/*DESKTOP MODAL*/}
      <Div display={["none", "block"]}>
        <Toast
          text={"مشکل شما با موفقیت ثبت شد."}
          isHovering={isHovering}
          setIsHovering={setIsHovering}
        />

        <ModalSkeleton
          setShow={props.setShow1}
          show={props.show1}
          flex={"column"}
        >
          <Register>
            <div>
              <Head>
                <Title>
                  <Img ml={"5px"}>
                    <Image
                      src={"/icons/Report error.svg"}
                      height={35}
                      width={35}
                      alt="report error"
                    />
                  </Img>
                  گزارش مشکل
                </Title>
                <Img mr={"auto"} onClick={() => props.setShow1(false)}>
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
                  با ورود به حساب کاربری،مشکل آگهی مورد نظر را ثبت کنید
                </Warn>
              </div>
            </div>
            <List>
              {post?.map(({ value, id }) => {
                return (
                  <Li
                    key={id}
                    className={reasons.includes(id) ? "active" : ""}
                    onClick={() => setReasons([id])}
                  >
                    <Flex>
                      {value}
                      {reasons.includes(id) && (
                        <Piece mr={"auto"}>
                          <Image
                            height={10}
                            width={20}
                            src={"/icons/red-single-tick.svg"}
                            alt="red-single-tick"
                          />
                        </Piece>
                      )}
                    </Flex>
                  </Li>
                );
              })}
            </List>
            <div>
              <Main>
                {/*<H>حداکثر 3 گزینه را میتوانید انتخاب کنید.</H>*/}
                <EnterButton onClick={registerProplems}>
                  {loading && (
                    <Image
                      src={"/icons/loading_j.gif"}
                      height={20}
                      width={20}
                      alt="gif"
                    />
                  )}
                  ثبت گزارش
                </EnterButton>
              </Main>
            </div>
          </Register>
        </ModalSkeleton>
      </Div>
      {/*DESKTOP MODAL*/}

      {/*MOBILE MODAL*/}
      <MobileModalSkeleton
        show={props.show1}
        setshow={props.setShow1}
        title={"گزارش مشکل"}
        icon={"/icons/red-report.svg"}
      >
        <List>
          {post?.map(({ value, id }) => {
            return (
              <Li
                key={id}
                className={clsx({
                  "--selected": selectedReason.indexOf(id) > -1,
                })}
                onClick={() => select(id)}
              >
                {value}
              </Li>
            );
          })}
        </List>
        <ContactInfo onClick={registerProblem}>
          <div>
            {loading && (
              <Image
                src={"/icons/loading_j.gif"}
                height={20}
                width={20}
                alt="gif"
              />
            )}
            ثبت گزارش
          </div>
        </ContactInfo>
      </MobileModalSkeleton>
      {/*MOBILE MODAL*/}
    </>
  );
}
