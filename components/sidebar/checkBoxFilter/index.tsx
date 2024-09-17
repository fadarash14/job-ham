import Image from "next/image";
import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import useUrlMaker from "../../../hooks/useUrlMaker";
import useUrlValues from "../../../hooks/useUrlValues";
const Feature = styled.div`
  position: relative;
  display: flex;
  margin: 15px 5px 5px 0;
  cursor: pointer;
`;

const Span = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin: auto;
  margin-right: 0;
  padding-right: 5px;
`;

export default function CheckBoxFilter(
  props: PropsWithChildren<{ title: string; nameInUrl: string }>
): JSX.Element {
  const [isChecked, check] = useState<boolean>(false);

  const values = useUrlValues([props.nameInUrl]);
  useEffect(() => {
    // @ts-ignore
    check(values[props.nameInUrl]);
  }, [values]);

  const onClickCheckbox = function () {
    setSelectedCheckbox({ [props.nameInUrl]: !isChecked });
    check((c) => !c);
  };

  const [, setSelectedCheckbox] = useUrlMaker();

  return (
    <Feature onClick={onClickCheckbox}>
      <Span>{props.title}</Span>
      {isChecked ? (
        <Image src={"/icons/Group 1415.svg"} width={24} height={24} alt="" />
      ) : (
        <Image src={"/icons/Stroke 2.svg"} width={24} height={24} alt="" />
      )}
    </Feature>
  );
}
