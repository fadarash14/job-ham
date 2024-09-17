import { useAppSelector, useAppDispatch } from "@/store/hook";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import company, { setSelectedCompany } from "@/store/company";
import Cookies from "js-cookie";
const show = keyframes`
  from {
  
    opacity: 0;
  }
  to {
  
    opacity: 1;
  }
`;
const Box = styled.div`
  min-height: 90vh;
`;

const Roles = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  max-width: 812px;
  justify-content: space-between;
  margin: 50px auto 10px auto;

  @media (max-width: 576px) {
    margin: 50px auto 10px auto;
  }
  & .row {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 10px;
    @media (max-width: 576px) {
      justify-content: space-evenly;
    }
  }
  & .hintDiv {
    margin-top: 15px;
    @media (max-width: 576px) {
      width: 90%;
      margin: 15px auto;
      justify-content: space-evenly;
    }
  }
`;
const RoleBox = styled.div<{ isClicked: boolean }>`
  display: flex;
  width: 100%;
  max-width: 235px;
  height: 100%;
  min-height: 105px;
  align-items: center;
  border-radius: 4px;
  position: relative;
  justify-content: center;
  font-size: 16px;
  .tick {
    position: absolute;
    right: 12px;
    top: 8px;
  }
  .company-image {
    margin: 0 auto;

    animation: ${({ isClicked }) => (isClicked ? show : null)} 0.5s ease-in-out;
    animation-iteration-count: 1;
  }
  span {
    margin: 0 auto;
    animation: ${({ isClicked }) => (isClicked ? show : null)} 0.3s ease-in-out;
  }
  background: ${({ isClicked }) => (isClicked ? "#FFFFFF" : "#7E8395")};
  cursor: "pointer";
  color: ${({ isClicked }) => (isClicked ? "#7E8395" : "#FFFFFF")};
  @media (max-width: 576px) {
    max-width: 165px;
    max-height: 72px;
  }
`;
const Button = styled.button<{ disabled: boolean }>`
  width: 170px;
  height: 45px;
  border: none;
  border-radius: 8px;

  color: #ffffff;
  background-color: ${({ disabled }) => (disabled ? "#d1d1d1" : "#dc264d;")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 40px;
`;

const VerifyCompany = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const companyInfo = useAppSelector((state) => state.companyInfo.data);
  const dispatch = useAppDispatch();
  const router = useRouter();
  console.log(companyInfo);
  const selectHandler = () => {
    const selectedCompany = companyInfo.filter(
      (company) => +company.id === selected
    )[0];
    Cookies.set("cid", String(selected), { expires: 1, path: "/" });
    dispatch(setSelectedCompany(selectedCompany));
    router.push("/user");
  };
  return (
    <Box>
      <Roles>
        <div className="row">
          {companyInfo.map((company) => (
            <RoleBox
              key={+company.id}
              onClick={() => setSelected(+company.id)}
              isClicked={selected === +company.id ? true : false}
            >
              {selected === +company.id ? (
                <>
                  <Image
                    className="tick"
                    src={"/icons/successTick.svg"}
                    alt="tick"
                    width={20}
                    height={20}
                  />{" "}
                  <span> {company.nameCompany}</span>
                  {company.logoId && (
                    <Image
                      className="company-image"
                      src={company.logoId}
                      alt=""
                      width={60}
                      height={60}
                    />
                  )}
                </>
              ) : (
                company.nameCompany
              )}
            </RoleBox>
          ))}
        </div>
        <ButtonWrapper>
          <Button onClick={() => selectHandler()} disabled={!selected}>
            ورود به پنل شرکت
          </Button>
        </ButtonWrapper>
      </Roles>
    </Box>
  );
};

export default VerifyCompany;
