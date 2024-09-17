import { setReject } from "@/requests/profile/cvListAds";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useAppSelector } from "@/store/hook";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 10px;
  gap: 10px;
  background-color: #ffffff;
  height: 320px;
  border-radius: 8px;
  white-space: wrap;
  position: relative;
  // overflow-y: scroll;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 400;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 250px;
  overflow-y: scroll;
  .reason {
    font-size: 12px;
    font-weight: 300;
    display: inline-flex;
    align-items: center;

    p {
      margin: 0;
    }
    input[type="radio"] {
      transform: scale(0.9);
      margin: 0 0 0 3px;
      accent-color: #db143d;
      cursor: pointer;
    }
  }
`;
const Button = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  background-color: ${({ isActive }) => (isActive ? "#DC264D" : "#d1d1d1")};
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
`;
const Footer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  text-align: center;
`;
type Reasons = {
  id: number;
  type: number;
  value: string;
};
type Props = {
  reasons: Reasons[];
  submitRejectHandler: (reasonId: number) => void;
};
const RejectReasonBox = ({ reasons, submitRejectHandler }: Props) => {
  const [reasonId, setReasonId] = useState<number>(0);
  const statuses = useAppSelector((state) => state.cvForAd.statuses);
  // const submitHandler = async () => {
  //   console.log(reasonId,id);

  //   const token = Cookies.get("token")!;
  //   const res = await setReject(id,reasonId,token);
  //    console.log(res);
  // };
  useEffect(() => {
    if (statuses.reasonId) {
      setReasonId(statuses.reasonId);
    }
  }, []);
  return (
    <Container>
      <Title>مهم ترین علت رد شدن این رزومه:</Title>
      <Body>
        {reasons.map((reason) => (
          <div className="reason" key={reason.id}>
            <input
              value={reason.id}
              checked={reason.id === reasonId}
              onChange={() => setReasonId(reason.id)}
              type="radio"
            />
            <p>{reason.value}</p>
          </div>
        ))}
      </Body>
      <Footer>
        <Button
          disabled={reasonId === 0 ? true : false}
          isActive={!(reasonId === 0) ? true : false}
          onClick={() => submitRejectHandler(reasonId)}
        >
          ثبت
        </Button>
      </Footer>
    </Container>
  );
};

export default RejectReasonBox;
