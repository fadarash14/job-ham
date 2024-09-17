import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import Image from "next/image";
import AdsUploadContext from "../AdsUploadContext";
import { Filter } from "../../../types";
import { layout, LayoutProps } from "styled-system";
import clsx from "clsx";

const Feature = styled.div<LayoutProps>`
  position: relative;
  margin: 10px 0px 16px 0;
  display: flex;
  width: fit-content;
  cursor: pointer;
  align-items: center;
  ${layout}
`;

const Span = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin: auto;
  margin-right: 5px;
`;
const Piece = styled.div`
  height: 25px;
`;

export default function BooleanFilter(
  props: PropsWithChildren<{ filters: Filter; val: any }>
) {
  const [isChecked, check] = useState<boolean>(Boolean(props.val));
  const { setSelectedFilter, selectedFilter } = useContext(AdsUploadContext);
  useEffect(() => {
    if (!Boolean(props.val)) {
      setSelectedFilter({ ...selectedFilter, [props.filters.id]: 0 });
    }
  }, []);

  const onClickCheckbox = (filterId: number) => {
    setSelectedFilter({ ...selectedFilter, [filterId]: !isChecked ? 1 : 0 });
    check(!isChecked);
  };
  return (
    <Feature
      display={
        props.filters.filter_id === 0
          ? "flex"
          : Boolean(selectedFilter[parseInt(String(props.filters.filter_id))])
          ? "flex"
          : "none"
      }
      onClick={(e) => onClickCheckbox(parseInt(props.filters.id))}
    >
      <Piece>
        <Image
          height={25}
          width={25}
          src={isChecked ? "/icons/Group 1415.svg" : "/icons/Stroke 2.svg"}
          alt=""
        />
      </Piece>
      <Span>{props.filters.label}</Span>
    </Feature>
  );
}
