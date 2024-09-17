import React, { Dispatch, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
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
  BorderProps,
  border,
  flexDirection,
  FlexDirectionProps,
} from "styled-system";
import { ResultCV } from "@/types";

import { rejectReasons } from "@/requests/profile/rejectReasons";
import RejectReasonBox from "./RejectReasonBox";
import AcceptInterviewBox from "./AcceptInterviewBox";
import CvDetail from "./CvDetail";
import { setAcceptInterview, setReject } from "@/requests/profile/cvListAds";
import Cookies from "js-cookie";
import Toast from "../Toast/Toast";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/store/hook";
import { updateSentCvToCompany } from "@/requests/cv";
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(45 44 44 / 71%);
  z-index: 10300;
`;
const ModalContent = styled.div`
  background: #e8e8ec;
  width: 80%;
  height: 90%;
  border-radius: 15px;
  z-index: 10300;
  padding: 15px 40px;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
const Close = styled.div`
  text-align: left;
  cursor: pointer;
`;
const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const RightSide = styled.div`
  width: 75%;
  height: 90%;
  display: flex;
  flex-direction: column;
  .name {
    font-size: 24px;
    color: #474546;
  }
  .sub {
    font-size: 18px;
    color: #acacac;
  }
  @media (max-width: 1000px) {
    width: 65%;
  }
`;
const Circle = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid #d1d1d1;
  border-radius: 100%;
  background-color: transparent;
  position: relative;
  margin-left: 10px;
  img {
    border-radius: 100%;
  }
`;
const Header = styled.div`
  margin-top: 20px;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
`;
const Sub = styled.div`
  width: 100%;
`;
const BodyContent = styled.div`
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Row = styled.div<SpaceProps | LayoutProps | FlexDirectionProps>`
  display: flex;
  margin: 10px 0px;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  width: 100%;
  @media (max-width: 870px) {
    flex-wrap: wrap;
  }
  ${space}
  ${layout}
  ${flexDirection}
  img {
    margin-left: 4px;
  }
  .skills {
    display: flex;
    align-items: center;
    img {
      margin-left: 0px;
    }
  }
`;
const InputParent = styled.div<SpaceProps | LayoutProps | FlexDirectionProps>`
  display: flex;
  flex-direction: row;
  padding: 4px;
  margin: 4px 10px;
  flex-grow: 1;
  flex-wrap: wrap;
  align-items: center;
  ${space}
  ${layout}
  ${flexDirection}
`;

const Label = styled.label<
  { showIcon?: boolean } & FontSizeProps &
    FontWeightProps &
    SpaceProps &
    LayoutProps &
    ColorProps
>`
  &::before {
    content: ${({ showIcon }) =>
      showIcon ? `url('/icons/flash.svg')` : "none"};
    margin-left: 3px;
    display: inline-block;
    vertical-align: middle;
  }
  text-align: right;
  color: #acacac;
  font-size: 14px;
  white-space: nowrap;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: right;
  // min-width: 20px;
  white-space: nowrap;
  margin-right: 6px;
  font-size: 14px;
  font-weight: 300;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Divider = styled.div`
  border-bottom: 1px solid #d1d1d1;
  width: 100%;
`;
const Explain = styled.textarea<BorderProps>`
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  background: transparent;
  min-height: 100px;
  width: 100%;
  flex: 1 1 90%;
  padding: 10px;
  outline: none;
  resize: none;
  -webkit-user-select: text; /* Chrome, Opera, Safari */
  -moz-user-select: text; /* Firefox 2+ */
  -ms-user-select: text; /* IE 10+ */
  user-select: text; /* Standard syntax */
  &:hover {
    border: 1px solid #acacac;
  }
  &::-webkit-inner-spin-button {
    display: none;
  }
  &::placeholder {
    color: #acacac;
  }
  @media only screen and (max-width: 768px) {
    min-width: 100%;
  }

  @media only screen and (max-width: 576px) {
    min-width: 100%;
  }

  ${border}
`;
const Title = styled.div`
  font-size: 13px;
  color: #474546;
  margin-top: 30px;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;
const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  margin-top: 40px;
  padding: 0px 10px;
  gap: 10px;
  .title {
    width: 100%;
    color: #dc264d;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      cursor: pointer;
    }
  }
  .button {
    height: 35px;
    width: 100%;
    border: none;
    background-color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
  }
  .accept {
    height: 35px;
    width: 100%;
    border: none;
    background-color: #5bf97a;
    border-radius: 8px;
  }
  .reject {
    height: 35px;
    width: 100%;
    border: none;
    background-color: #dc264d;
    border-radius: 8px;
    color: #ffffff;
  }
  @media (max-width: 1000px) {
    width: 35%;
  }
`;
const AcceptWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
`;
const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  .edit {
    color: #ffb52d;
  }
  .delete {
    color: #db143d;
  }
`;
type Props = {
  closeModal: () => void;
  cv: ResultCV;
  id: number;
  status: string;
};
const CvModal = ({ closeModal, cv, id, status }: Props) => {
  const [showBox, setShowBox] = useState({ show: false, type: "" });
  const [reasons, setReasons] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const queryClient = useQueryClient();
  const token = Cookies.get("token")!;

  const rejectHandler = async () => {
    setShowBox({ show: true, type: "reject" });
    const res = await rejectReasons();
    setReasons(res);
  };
  const submitRejectHandler = async (reasonId: number) => {
    const res = await setReject(id, reasonId, token);
    console.log(res);
    if (res.status === true) {
      setToast({
        show: true,
        message: "رزومه با موفقیت رد شد",
        type: "success",
      });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["getListCvSendForAds"] });
        closeModal();
      }, 2000);
    }
  };
  console.log(cv);
  const submitHandler = async (
    date: string,
    time: string,
    desc: string,
    interview: string
  ) => {
    const res = await setAcceptInterview(
      id,
      interview,
      date,
      time,
      desc,
      token
    );
    console.log(res);

    if (res.status === true) {
      setToast({
        show: true,
        message: "رزومه با موفقیت تایید شد",
        type: "success",
      });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["getListCvSendForAds"] });
        closeModal();
      }, 2000);
    }
  };
  const editInterview = (type: string) => {
    setShowBox({ show: true, type });
  };
  const deleteInterview = async () => {
    const input = { id: +id!, status: "CANCEL", token };
    const res = await updateSentCvToCompany(input);
    console.log(res);
    if (res.status === true) {
      setToast({
        show: true,
        message: "وقت مصاحبه با موفقیت حذف شد.",
        type: "success",
      });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["getListCvSendForAds"] });
        closeModal();
      }, 2000);
    }

    setShowBox({ show: false, type: "" });
  };
  return (
    <Modal>
      <ModalContent>
        <Header>
          <Close>
            <Image
              onClick={closeModal}
              alt="remove"
              height={20}
              width={20}
              src={"/icons/close-icon-modal.svg"}
            />
          </Close>
        </Header>
        <Body>
          <RightSide>
            <CvDetail cv={cv} />
          </RightSide>
          <LeftSide>
            <div className="title">
              وضعیت درخواست
              {showBox.show && (
                <Image
                  onClick={() => setShowBox({ show: false, type: "" })}
                  src={"/icons/Icon feather-arrow-left.svg"}
                  width={15}
                  height={15}
                  alt=""
                />
              )}
            </div>
            {status === "ACCEPT" && !showBox.show ? (
              <AcceptWrapper>
                <button className="accept">رزومه تایید شد</button>
                <ActionButtons>
                  <Image
                    src={"/icons/Icon awesome-edit.svg"}
                    width={13}
                    height={13}
                    alt=""
                  />
                  <span
                    className="edit"
                    onClick={() => editInterview("accept")}
                  >
                    ویرایش
                  </span>
                </ActionButtons>
                <ActionButtons>
                  <Image
                    src={"/icons/Icon material-delete-sweep.svg"}
                    width={13}
                    height={13}
                    alt=""
                  />
                  <span className="delete" onClick={deleteInterview}>
                    حذف وقت مصاحبه
                  </span>
                </ActionButtons>
              </AcceptWrapper>
            ) : status === "REJECT" && !showBox.show ? (
              <AcceptWrapper>
                <button className="reject"> رزومه رد شد</button>
                <ActionButtons>
                  <Image
                    src={"/icons/Icon awesome-edit.svg"}
                    width={13}
                    height={13}
                    alt=""
                  />
                  <span className="edit" onClick={rejectHandler}>
                    ویرایش
                  </span>
                </ActionButtons>
                {/* <ActionButtons>
                  <Image
                    src={"/icons/Icon material-delete-sweep.svg"}
                    width={13}
                    height={13}
                    alt=""
                  />
                  <span className="delete">بازنگری</span>
                </ActionButtons> */}
              </AcceptWrapper>
            ) : status === "CANCEL" ? (
              <button className="reject">رزومه لغو شده است</button>
            ) : (
              <>
                {" "}
                {!showBox.show && (
                  <>
                    {" "}
                    <button
                      className="button"
                      onClick={() => setShowBox({ show: true, type: "accept" })}
                    >
                      تایید رزومه و مصاحبه
                    </button>
                    <button className="button" onClick={rejectHandler}>
                      رد رزومه
                    </button>
                  </>
                )}
                {showBox.show && showBox.type === "reject" ? (
                  <RejectReasonBox
                    submitRejectHandler={submitRejectHandler}
                    reasons={reasons}
                  />
                ) : null}
                {showBox.show && showBox.type === "accept" ? (
                  <AcceptInterviewBox submitHandler={submitHandler} />
                ) : null}
              </>
            )}
          </LeftSide>
        </Body>
        {toast.show && (
          <Toast
            setIsHovering={(e) =>
              setToast((prev) => ({ ...prev, show: false }))
            }
            isHovering={toast.show}
            type={toast.type}
            text={toast.message}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

export default CvModal;
