import React, { Dispatch, useState } from "react";
import styled from "styled-components";
import DilogueSkeleton from "../../utility/DilogueSkeleton";
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import Image from "next/image";
import CvDialogueOperations from "./CvDialogueOperations";
import { OperationTypes, ResumeStatuses } from "@/types";
import { useRouter } from "next/router";
import { updateSentCvToCompany } from "@/requests/cv";
import Toast from "@/components/Toast/Toast";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  type: ResumeStatuses;
  setShow: Dispatch<boolean>;
  show: boolean;
  date: string;
  id: string;
};

const Dialogue = styled.div`
  display: flex;
  width: 100%;
  max-width: 320px;
  height: 100%;
  max-height: 190px;
  border-radius: 20px;
  background: rgb(255, 255, 255, 0.4);
  border: 1px solid #d1d1d1;
`;

const Content = styled.div<ColorProps>`
  font-size: 16px;
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 20px;
  background: white;
  border: 1px solid #d1d1d1;
  height: 190px;
  ${color}
`;
const Span = styled.div<ColorProps | SpaceProps | LayoutProps>`
  color: black;
  ${color}
  ${space}
  ${layout}
`;
const Title = styled.div`
  color: black;
  // margin: 10px 0;
  font-weight: 400;
  font-size: 14px;
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: center;
`;
const DateLabel = styled.label`
  color: #acacac;
  font-size: 12px;
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const Flex = styled.div<FlexboxProps | LayoutProps | SpaceProps>`
  display: flex;
  align-items: center;
  ${flexbox}
  ${space}
  ${layout}
`;

const CloseImg = styled.div`
  margin-right: auto;
  cursor: pointer;
  z-index: 2;
`;
const Img = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  margin-left: 10px;
`;

export default function CvDialogue({ type, setShow, show, date, id }: Props) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });
  const router = useRouter();
  const token = Cookies.get("token")!;
  const queryClient = useQueryClient();
  // const { mutate: deleteMutation } = useMutation({
  //   mutationFn: updateSentCvToCompany,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["getListCvSendToCompany"] });
  //     setToast({ show: true, message: "رزومه شما با موفقیت حذف شد" });
  //   },
  // });

  const handleOnClick = (type: OperationTypes) => {
    switch (type) {
      case "edit":
        router.push("user/my-resume");
        break;
      case "similar":
        // ****IMPORTANT****
        // Use the related jobs for this later!
        router.push("/jobs");
        break;
      // case "delete":
      //   deleteMutation({
      //     id: parseInt(id),
      //     status: ResumeStatuses.CANCEL,
      //     token: token,
      //   });
      //   break;
      default:
        break;
    }
  };

  return (
    <DilogueSkeleton flex={"column"} show={show} setShow={setShow}>
      <Content>
        <Flex justifyContent={"space-between"}>
          <Img>
            <Image
              src={"/icons/modal-arrow-up.svg"}
              alt=""
              height={18}
              width={18}
            />
          </Img>
          <Title>جزئیات درخواست</Title>
          <CloseImg onClick={() => setShow(false)}>
            <Image
              src={"/icons/close-icon-modal.svg"}
              alt=""
              height={18}
              width={18}
            />
          </CloseImg>
        </Flex>
        <Flex>
          {date !== "نامشخص" ? (
            <DateLabel>{`آگهی شما ${date} ارسال شد.`}</DateLabel>
          ) : (
            <DateLabel>{`آگهی شما ارسال شد.`}</DateLabel>
          )}
        </Flex>
        <Flex
          mt={"10px"}
          justifyContent={"center"}
          flexDirection={"column"}
        ></Flex>
        <CvDialogueOperations action={type} onClickOp={handleOnClick} />
      </Content>
      {toast.show && (
        <Toast
          setIsHovering={(e) => setToast((prev) => ({ ...prev, show: e }))}
          isHovering={toast.show}
          type={"success"}
          text={toast.message}
          confirm={false}
        />
      )}
    </DilogueSkeleton>
  );
}
