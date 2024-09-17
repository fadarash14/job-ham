import React, { useState } from "react";
import { useRouter } from "next/router";
import CvDetail from "@/components/resumeList/CvDetail";
import { useQuery } from "@tanstack/react-query";
import { getCvById, updateSentCvToCompany } from "@/requests/cv";
import Cookies from "js-cookie";
import Image from "next/image";
import styled from "styled-components";
import {
  BackgroundColorProps,
  backgroundColor,
  ColorProps,
  color,
} from "styled-system";
import CvStatusModal from "@/components/resumeList/CvStatusModal";
import { rejectReasons } from "@/requests/profile/rejectReasons";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "@/components/Toast/Toast";
const Container = styled.div`
  display: flex;
  width: 95%;
  margin: 0 auto;
  flex-direction: column;
  // gap: 20px;
`;
const ImageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
  img {
    cursor: pointer;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  gap: 10px;
`;
const Button = styled.button<ColorProps | BackgroundColorProps>`
  border: none;
  height: 30px;
  width: auto;
  padding: 5px 20px;
  border-radius: 8px;
  // margin-left: 20px;
  cursor: pointer;
  min-width: fit-content;
  display: flex;
  text-align: center;
  ${color}
  ${backgroundColor}
`;
const ButtonStatus = styled.div<BackgroundColorProps | ColorProps>`
  height: 35px;
  width: auto;
  max-width: 200px;
  border: none;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  ${color}
  ${backgroundColor}
`;
const AcceptWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px;
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
const ResumeDetail = () => {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const router = useRouter();
  console.log(router.query);
  const queryClient = useQueryClient();
  const id = router.query.id;
  const statusCv = router.query.status as string;
  const ID = router.query.ID as string;
  console.log(ID);

  console.log(statusCv);

  let token = Cookies.get("token")!;
  const [showModal, setShowModal] = useState({ type: "", show: false });
  const { data, status } = useQuery({
    queryKey: ["cvDetailResume", +id!],
    queryFn: () => getCvById(+id!, token),
  });
  const input = { id: +ID!, status: "SHOW", token };
  const { status: cvStatus } = useQuery({
    queryKey: ["cvStatus", +ID!],
    queryFn: () => updateSentCvToCompany(input),
    enabled: statusCv === "SEND",
    staleTime: 0,
  });
  const { data: reasons, status: reasonStatus } = useQuery({
    queryKey: ["reasons"],
    queryFn: () => rejectReasons(),
  });
  console.log(cvStatus);

  if (cvStatus === "success") {
    queryClient.invalidateQueries({ queryKey: ["getListCvSendForAds"] });
  }
  const deleteInterview = async () => {
    const input = { id: +ID!, status: "CANCEL", token };
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
        router.back();
      }, 2000);
    }
  };
  return (
    <Container>
      {status === "pending" && (
        <ImageWrapper>
          <Image src={"/icons/loading_j.gif"} height={100} width={100} alt="" />
        </ImageWrapper>
      )}
      {status === "success" && (
        <>
          <Header>
            <ButtonDiv>
              {statusCv === "ACCEPT" ? (
                <ButtonStatus backgroundColor={"#5bf97a"}>
                  رزومه تایید شد
                </ButtonStatus>
              ) : statusCv === "REJECT" ? (
                <ButtonStatus backgroundColor={"#dc264d"} color={"#ffffff"}>
                  رزومه رد شد
                </ButtonStatus>
              ) : statusCv === "CANCEL" ? (
                <ButtonStatus backgroundColor={"#dc264d"} color={"#ffffff"}>
                  رزومه لغو شده است
                </ButtonStatus>
              ) : (
                <>
                  {" "}
                  <Button
                    onClick={() => setShowModal({ type: "accept", show: true })}
                    backgroundColor={"#ffffff"}
                  >
                    تایید رزومه و مصاحبه
                  </Button>
                  <Button
                    onClick={() => setShowModal({ type: "reject", show: true })}
                    backgroundColor={"#E24363"}
                    color={"#ffffff"}
                  >
                    رد رزومه
                  </Button>
                </>
              )}
            </ButtonDiv>
            <Image
              onClick={() => router.back()}
              alt="remove"
              height={15}
              width={15}
              src={"/icons/Icon feather-arrow-left.svg"}
            />
          </Header>
          {statusCv === "ACCEPT" ? (
            <AcceptWrapper>
              <ActionButtons>
                <Image
                  src={"/icons/Icon awesome-edit.svg"}
                  width={13}
                  height={13}
                  alt=""
                />
                <span
                  className="edit"
                  onClick={() =>
                    setShowModal({
                      type: "accept",
                      show: true,
                    })
                  }
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
          ) : statusCv === "REJECT" ? (
            <AcceptWrapper>
              <ActionButtons>
                <Image
                  src={"/icons/Icon awesome-edit.svg"}
                  width={13}
                  height={13}
                  alt=""
                />
                <span
                  className="edit"
                  onClick={() =>
                    setShowModal({
                      type:  "reject",
                      show: true,
                    })
                  }
                >
                  ویرایش
                </span>
              </ActionButtons>
            </AcceptWrapper>
          ) : null}

          <CvDetail cv={data.data} />
        </>
      )}
      {showModal.show && (
        <CvStatusModal
          showModal={showModal}
          setShowModal={setShowModal}
          reasons={
            showModal.type === "reject" && reasonStatus === "success"
              ? reasons
              : null
          }
          id={+ID}
          status={statusCv}
        />
      )}
      {toast.show && (
        <Toast
          setIsHovering={(e) => setToast((prev) => ({ ...prev, show: false }))}
          isHovering={toast.show}
          type={toast.type}
          text={toast.message}
        />
      )}
    </Container>
  );
};

export default ResumeDetail;
