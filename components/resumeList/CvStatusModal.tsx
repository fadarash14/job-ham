import React, { Dispatch, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import AcceptInterviewBox from "./AcceptInterviewBox";
import RejectReasonBox from "./RejectReasonBox";
import { setAcceptInterview, setReject } from "@/requests/profile/cvListAds";
import Cookies from "js-cookie";
import Toast from "../Toast/Toast";
import { useRouter } from "next/router";
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
  background: #ffffff;
  width: 80%;
  height: auto;
  border-radius: 15px;
  z-index: 10300;
  padding: 10px 20px;
`;
const Header = styled.div`
  margin-top: 20px;
`;
const Close = styled.div`
  text-align: left;
  cursor: pointer;
`;
const Body = styled.div`
  width: 100%;
  min-height: 190px;
  display: flex;
`;
type Reasons = {
  id: number;
  type: number;
  value: string;
};
type Props = {
  showModal: { show: boolean; type: string };
  setShowModal: Dispatch<{ show: boolean; type: string }>;
  reasons: Reasons[] | null;
  id: number;
  status: string;
};
const CvStatusModal = ({
  showModal,
  setShowModal,
  reasons,
  id,
  status,
}: Props) => {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const token = Cookies.get("token")!;
  const router = useRouter();
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
        router.back();
      }, 2000);
    }
  };

  const submitHandler = async (date: string, time: string, desc: string,interview:string) => {
    const res = await setAcceptInterview(id, interview, date, time, desc, token);
    console.log(res);

    if (res.status === true) {
      setToast({
        show: true,
        message: "رزومه با موفقیت تایید شد",
        type: "success",
      });
      setTimeout(() => {
        router.back();
      }, 2000);
    }
  };
  
  return (
    <Modal>
      <ModalContent>
        {" "}
        <Header>
          <Close>
            <Image
              onClick={() => setShowModal({ type: "", show: false })}
              alt="remove"
              height={20}
              width={20}
              src={"/icons/close-icon-modal.svg"}
            />
          </Close>
        </Header>
        <Body>
          {showModal.type === "accept" ? (
            <AcceptInterviewBox submitHandler={submitHandler} />
          ) : (
            <RejectReasonBox
              reasons={reasons!}
              submitRejectHandler={submitRejectHandler}
            />
          )}
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

export default CvStatusModal;
