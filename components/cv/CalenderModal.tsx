import { Dispatch } from "react";
import styled, { keyframes } from "styled-components";
import {
  layout,
  LayoutProps,
  space,
  SpaceProps,
  FontWeightProps,
  fontWeight,
  ColorProps,
  color,
  FontSizeProps,
  fontSize,
} from "styled-system";
import Image from "next/image";
import { useDetectClickOutside } from "react-detect-click-outside";

const Modal = styled.div<LayoutProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(45 44 44 / 71%);
`;

const ModalContent = styled.div`
  background: #e8e8ec;
  width: 500px;
  // height: 200px;
  border-radius: 15px;
  z-index: 10300;
  padding: 15px;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  z-index: 1000;
  overflow-x: auto;
  max-height: 500px;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const SmallDiv = styled.div`
  border: 1px solid #d1d1d1;
  background-color: white;
  border-radius: 4px;
  padding: 1px 0px;
  margin: 5px;
  justify-content: center;
  align-self: center;
  text-align: center;
  min-width: 76px;
  max-width: 124px;
  cursor: pointer;
`;
const Img = styled.div<SpaceProps>`
  align-self: center;
  display: flex;
  position: relative;
  right: 20%;
  cursor: pointer;
  ${space}
`;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: center;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Title = styled.div<LayoutProps | SpaceProps>`
  display: flex;
  justify-content: center;
  padding: 15px;
  ${space}
  ${layout}
`;
export default function CalenderModal(props: {
  closeModal: Dispatch<any>;
  type: string;
  setYear?: any;
  setDay?: any;
  setMonth?: any;
}) {
  const ref = useDetectClickOutside({ onTriggered: props.closeModal });
  let moment = require("moment-jalaali");
  let m = moment();

  const dateHandler = (input: string | number, type: string) => {
    switch (type) {
      case "Year":
        props.setYear(input as number);
        props.closeModal(true);
        break;
      case "Month":
        props.setMonth(input as string);
        props.closeModal(true);
        break;
      case "Day":
        props.setDay(input as number);
        props.closeModal(true);
        break;
      default:
        break;
    }
  };

  const generateYearOptions = () => {
    const arr = [];
    const startYear = 1313;
    const endYear = m.jYear();

    for (let i = endYear; i >= startYear; i--) {
      arr.push(
        <SmallDiv onClick={() => dateHandler(i, props.type)} key={i}>
          {i}
        </SmallDiv>
      );
    }

    return arr;
  };

  const generateMonthOptions = () => {
    const arr = [];
    const months = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];
    for (let i = 0; i < months.length; i++) {
      arr.push(
        <SmallDiv onClick={() => dateHandler(months[i], props.type)}>
          {months[i]}
        </SmallDiv>
      );
    }
    return arr;
  };

  const generateDayOptions = () => {
    const arr = [];

    const startDay = 1;
    const endDay = 31;

    for (let i = endDay; i >= startDay; i--) {
      arr.push(
        <SmallDiv onClick={() => dateHandler(i, props.type)}>{i}</SmallDiv>
      );
    }

    return arr;
  };
  const dynamicTitle = () => {
    switch (props.type) {
      case "Day":
        return "روز";
      case "Month":
        return "ماه";
      case "Year":
        return "سال";
      default:
        break;
    }
  };

  return (
    <Modal>
      <ModalContent>
        {/* <Div> */}
        <Title>
          <Span>{`${dynamicTitle()} خود را انتخاب کنید`}</Span>
          <Img onClick={props.closeModal}>
            <Image
              alt="remove"
              height={20}
              width={20}
              src={"/icons/close-icon-modal.svg"}
            />
          </Img>
        </Title>
        <Flex>
          {props.type === "Year"
            ? generateYearOptions()
            : props.type === "Month"
            ? generateMonthOptions()
            : props.type === "Day"
            ? generateDayOptions()
            : ""}
        </Flex>

        {/* </Div> */}
      </ModalContent>
    </Modal>
  );
}
