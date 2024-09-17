import { Calendar, Day, DayValue } from "react-modern-datepicker-javaheri";
import React, { useEffect, useState } from "react";
import moment from "jalali-moment";
import Image from "next/image";
import styled from "styled-components";

const ButtonPerv = styled.div`
  position: absolute;
  right: 15px;
  top: 20px;
  cursor: pointer;
`;

const ButtonNext = styled.div`
  position: absolute;
  left: 15px;
  top: 20px;
  cursor: pointer;
`;

const Button = styled.div`
  visibility: hidden;
  background: #fcc155;
  padding: 5px 20px;
  border-radius: 8px;
  margin: 10px auto 10px auto;
  color: #000;
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
`;

type CustomDayClassNameItem = Day & { className: string; location: string };

interface JDatePickerProps {
  onDateSelect: (date: DayValue) => void;
}

export default function JDatePicker(props: JDatePickerProps) {
  const [clicked, setClicked] = useState(false);
  const [selectedDays, setSelectedDay] = useState<CustomDayClassNameItem[]>();
  const [customDate, setCustomDate] = useState(moment());

  const changeMonth = (prev = true) => {
    let new_date;
    if (prev) {
      //prev month
      new_date = customDate.subtract(1, "jMonth");
    } else {
      //next month
      new_date = customDate.add(1, "jMonth");
    }
    setCustomDate(new_date);

    let _selected_day: CustomDayClassNameItem[] = [];
    // Your logic here to populate _selected_day based on your requirements
    setSelectedDay(_selected_day);
  };

  useEffect(() => {
    let _selected_day: CustomDayClassNameItem[] = [];
    // Your logic here to populate _selected_day based on your requirements
    setSelectedDay(_selected_day);
  }, []);

  const initialValue = {
    year: moment().jYear(),
    month: moment().jMonth() + 1,
    day: moment().jDay(),
  };

  const value = {
    year: customDate.jYear(),
    month: customDate.jMonth() + 1,
    day: customDate.jDay(),
  };

  const handleDateSelect = (newValue: DayValue) => {
    const { onDateSelect } = props;
    onDateSelect(newValue);
  
    
  };

  return (
    <div className={"newspaper-img"}>
      <div className={`calendar-center mb-main VizheNameh`}>
        {clicked ? (
          customDate && (
            <Calendar
              value={value}
              onChange={handleDateSelect}
              locale={"fa"}
              customDaysClassName={selectedDays}
              renderFooter={() => (
                <div>
                  <ButtonPerv
                    onClick={() => {
                      changeMonth(true);
                    }}
                  >
                    <div style={{ height: "16px" }}>
                      <Image
                        src={"/icons/arrow-right-cal.svg"}
                        height={16}
                        width={16}
                        alt=""
                      />
                    </div>
                  </ButtonPerv>
                  <ButtonNext
                    onClick={() => {
                      changeMonth(false);
                    }}
                  >
                    <div style={{ height: "16px" }}>
                      <Image
                        src={"/icons/arrow-left-cal.svg"}
                        height={16}
                        width={16}
                        alt=""
                      />
                    </div>
                  </ButtonNext>
                 
                </div>
              )}
            />
          )
        ) : (
          <Calendar
            value={initialValue}
            onChange={handleDateSelect}
            locale={"fa"}
            customDaysClassName={selectedDays}
            renderFooter={() => (
              <div>
                <ButtonPerv
                  onClick={() => {
                    setClicked(true);
                    changeMonth(true);
                  }}
                >
                  <div style={{ height: "16px" }}>
                    <Image
                      src={"/icons/arrow-right-cal.svg"}
                      height={16}
                      width={16}
                      alt=""
                    />
                  </div>
                </ButtonPerv>
                <ButtonNext
                  onClick={() => {
                    setClicked(true);
                    changeMonth(false);
                  }}
                >
                  <div style={{ height: "16px" }}>
                    <Image
                      src={"/icons/arrow-left-cal.svg"}
                      height={16}
                      width={16}
                      alt=""
                    />
                  </div>
                </ButtonNext>
                <Button
                  style={{ visibility: "hidden" }}
                  onClick={() => {
                    setClicked(false);
                    setCustomDate(moment());
                  }}
                >
                  برو امروز
                </Button>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
}
