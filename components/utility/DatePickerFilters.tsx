// DatePicker.js
import React from "react";
import Image from "next/image";
import JDatePicker from "./DatePicker";
import DetectOutSideClick from "@/components/utility/DetectOutSideClick";
import styled from "styled-components";
import { FlexDirectionProps } from "styled-system";
import { DayValue } from "react-modern-datepicker-javaheri";
import moment from "jalali-moment";

export interface IDateRageFilterAdmin {
  fromDate: string;
  toDate: string;
}

export type CalenderTypesFilterAdmin =
  | "datePicker"
  | "fromDate"
  | "toDate"
  | "";

export interface ICalendarFilterAdmin {
  show: boolean;
  type: CalenderTypesFilterAdmin;
}

interface DatePickerProps {
  showCal: ICalendarFilterAdmin;
  setShowCal: React.Dispatch<React.SetStateAction<ICalendarFilterAdmin>>;
  setDay?: React.Dispatch<
    React.SetStateAction<{
      index: number;
      date: string;
    }>
  >;
  setDates?: React.Dispatch<React.SetStateAction<IDateRageFilterAdmin>>;
  type: CalenderTypesFilterAdmin;
}
/**
 *
 * @property {ICalendarFilterAdmin} showCal - State for showing the calendar.
 * @property {React.Dispatch<React.SetStateAction<ICalendarFilterAdmin>>} setShowCal - Function to set the state of the calendar.
 * @property {React.Dispatch<React.SetStateAction<{index: number; date: string;}>>} [setDay] - Optional function to set the state of a single day. This is used when working with just one day.
 * @property {React.Dispatch<React.SetStateAction<IDateRageFilterAdmin>>} [setDates] - Optional function to set the state of a date range. This is used when working with a range of dates.
 * @property {CalenderTypesFilterAdmin} type - Type of calendar filter.
 *
 * The setDay and setDates properties are made optional to provide flexibility in components that need either a single day or a range of dates.
 */
const DatePickerFilters = ({
  showCal,
  setShowCal,
  type,
  setDates,
  setDay,
}: DatePickerProps) => {
  const handleSelectDate = (
    selectedDate: DayValue,
    type: CalenderTypesFilterAdmin
  ) => {
    if (!selectedDate) return;
    const { year, month, day } = selectedDate;
    const date = `${year}/${month}/${day}`;
    const selectedMoment = moment(date, "jYYYY/jM/jD");
    const currentMoment = moment().startOf("day");
    const index = selectedMoment.diff(currentMoment, "days");
    if (type === "fromDate" || type === "toDate") {
      setDates?.((prev) => ({ ...prev, [type]: date }));
    } else {
      setDay?.({ index, date });
    }
    setShowCal((prev) => ({ ...prev, show: false }));
  };
console.log(type);

  const isDatePickerVisible = showCal.show && showCal.type === type;

  const handleCalendarDisplay = () => {
    setShowCal((prev) => ({ ...prev, show: !prev.show, type }));
  };

  return (
    <>
      {type === "datePicker" && (
        <Image
          onClick={handleCalendarDisplay}
          src="/icons/calender-2.svg"
          alt=""
          height={15}
          width={15}
          style={{ margin: "0 5px 3px 0" }}
        />
      )}
      {isDatePickerVisible && (
        <CalenderBox type={type}>
          <DetectOutSideClick
            setShow={(e) => setShowCal((prev) => ({ ...prev, show: e }))}
          >
            <JDatePicker
              onDateSelect={(date) => handleSelectDate(date, type)}
            />
          </DetectOutSideClick>
        </CalenderBox>
      )}
    </>
  );
};

export default DatePickerFilters;

type CalenderBoxProps = FlexDirectionProps & {
  type?: CalenderTypesFilterAdmin;
};
const CalenderBox = styled.div<CalenderBoxProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #ffffff;
  z-index: 50;
  //transform: translateX(-90%);
  /* @media (max-width: 600px) {
    top: 45px;
    transform: ${({ type }) =>
      type === "fromDate"
        ? "translateX(-50%)"
        : type === ""
        ? "translateX(-50%)"
        : "translateX(-10%)"};
  } */
`;
