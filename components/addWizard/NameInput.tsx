import AdsErrorMessage from "./AdsErrorMessage";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { border, BorderProps, space, SpaceProps } from "styled-system";
import AdsUploadContext from "./AdsUploadContext";
import BelowMessage from "./BelowMessage";

const Whole = styled.div`
  margin: 64px 0;
`;
const Piece = styled.div`
  font-size: 12px;
  font-weight: 300;
  margin-right: 5px;
`;

const Title = styled.div<SpaceProps>`
  color: #474546;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  align-item: center;
  &.lined::before {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    margin-bottom: 20px;
    background: #d1d1d1;
  }
  ${space}
`;
const Flex = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const CheckBox = styled.div`
  padding-right: 10px;
  position: relative;
  display: flex;
  width: 24px;
`;
const TickPos = styled.div`
  display: flex;
  margin: auto auto auto 0;
`;
const Tick = styled.div`
  margin: auto auto auto 0;
`;
const Input = styled.input<BorderProps>`
  height: 40px;
  border-radius: 15px;
  border: 1px solid #d1d1d1;
  background: transparent;
  outline: none;
  width: 100%;
  padding-right: 10px;
  flex: 1 1;
  &:hover {
    border: 1px solid #acacac;
  }
  &::-webkit-inner-spin-button {
    display: none;
  }
  &::placeholder {
    color: #acacac;
  }

  ${border}
`;

export default function NameInput(props: {
  continue: boolean;
  message: string;
}) {
  const [approve, setApprove] = useState("");
  const [message, setMessage] = useState("");
  const [isTouched, setTouched] = useState(false);

  const { title, setTitle, level } = useContext(AdsUploadContext);
  const [name, setName] = useState(title);
  const [value, setValue] = useState<any | undefined>(title);

  function WizardName(e: any) {
    const str = e.target.value;
    setValue(e.target.value);
    let remText = str.replace(/ /g, "");
    if (remText.length > 5) {
      setName(e.target.value);
    } else {
      setName("");
    }
  }

  const fill = !title && !value;

  useEffect(() => {
    if (name.length >= 5) {
      setApprove(" ");
      setMessage("");
      setTitle(name);
    } else {
      setMessage(" ");
      setApprove("");
      setTitle("");
    }
  }, [name]);

  return (
    <Whole>
      <Title>
        عنــــوان آگــــهی<Piece>(حداقل 5 کاراکتر)</Piece>
      </Title>
      <Flex>
        <Input
          border={title ? "1px solid #00C39C" : ""}
          maxLength={200}
          defaultValue={name}
          onBlur={() => {
            setTouched(true);
          }}
          onChange={(e: any) => WizardName(e)}
          placeholder={"اجاره آپارتمان در ۲۵۰ متر در مرزدارن"}
        />
        <CheckBox>
          {(props.continue && fill) || (isTouched && fill) ? (
            <AdsErrorMessage message={message} />
          ) : null}
          {message == "" || (title && approve == " ") ? (
            <TickPos>
              <Tick>
                <Image
                  src={"/icons/green tick.svg"}
                  height={10}
                  width={15}
                  alt=""
                />
              </Tick>
            </TickPos>
          ) : null}
        </CheckBox>
      </Flex>
      {(props.continue && fill) || (isTouched && fill) ? (
        <BelowMessage message={"تکمـیل این مـورد اجبـاری می باشـد."} />
      ) : null}
      {props.continue && !title && value ? (
        <BelowMessage message={"حداقل 5 کاراکتر"} />
      ) : null}
    </Whole>
  );
}
