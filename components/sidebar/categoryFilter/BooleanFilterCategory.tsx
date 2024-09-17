import { UrlTypes } from "../../../types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useUrlMaker from "../../../hooks/useUrlMaker";

type Props = {
  id: number;
  label: string;
  keys: string;
  unit: string;
  options: { title: string; id: number; value: number }[];
  filter_id: number;
  description: string;
  themeMode: { bg: string; color: string };
  default_value: { [key: string]: string } | Partial<UrlTypes>;
};

const Span = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin: auto;
  margin-right: 10px;
  margin-right: 0;
`;

const Feature = styled.div`
  position: relative;
  display: flex;
  margin: 15px 0px;
  cursor: pointer;
  padding-right: 10px;
`;

export default function BooleanFilterCategory(props: Props) {
  const [isChecked, check] = useState<boolean>(false);
  const [, setCheckbox] = useUrlMaker();
  function checkFilTtr() {
    setCheckbox({ [props.keys]: !isChecked });
    check(!isChecked);
  }
  useEffect(() => {
    if (props.default_value && props.default_value[props.keys]) {
      check(true);
    } else {
      check(false);
    }
  }, []);
  return (
    <Feature onClick={checkFilTtr}>
      <Span>{props.label}</Span>
      {isChecked ? (
        <Image src={"/icons/Group 1415.svg"} width={24} height={24} alt="" />
      ) : (
        <Image src={"/icons/Stroke 2.svg"} width={24} height={24} alt="" />
      )}
    </Feature>
  );
}
