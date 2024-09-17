import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import moment from "jalali-moment";
import DatePickerFilters, {
  CalenderTypesFilterAdmin,
  ICalendarFilterAdmin,
  IDateRageFilterAdmin,
} from "../utility/DatePickerFilters";
import HourInput from "../utility/HourInput";
import { setAcceptInterview } from "@/requests/profile/cvListAds";
import { useAppSelector } from "@/store/hook";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 10px;
  gap: 10px;
  background-color: #ffffff;
  height: auto;
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
  .reason {
    display: inline-flex;
    align-items: center;
    p {
      margin: 0;
      font-size: 14px;
      font-weight: 300;
    }
    input[type="radio"] {
      transform: scale(0.9);
      margin: 0 0 0 3px;
      accent-color: #db143d;
      cursor: pointer;
    }
  }
`;
const Button = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  background-color: ${({ disabled }) => (disabled ? "#d1d1d1" : "#dc264d;")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
const Footer = styled.div`
  margin: 5px auto;
  width: 60%;
`;
const Divider = styled.div`
  border-bottom: 1px solid #e3e3e3;
  width: 100%;
  margin-top: 5px;
`;
const InputWrapper = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;
const Label = styled.div`
  font-size: 14px;
  font-weight: 300;
  white-space: nowrap;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const CalendarWrapper = styled.div`
  position: relative;
  //display: flex;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Span = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
  font-size: 14px;
  font-weight: 300;
`;

const DateInput = styled.div`
  display: flex;
  height: 26px;
  border-radius: 6px;
  border: 1px solid #d1d1d1;
  background-color: #ffffff;
  outline: none;
  //min-width: 120px;
  width: 100%;
  cursor: pointer;
  &:hover {
    border: 1px solid #acacac;
  }
`;
const Timing = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Explain = styled.textarea`
  height: 60px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  background: transparent;
  width: 100%;
  padding: 10px;
  outline: none;
  resize: none;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const TextaraeaWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const Input = styled.input`
  width: 100%;
  font-weight: 300;
  display: flex;
  width: 100%;
  height: 26px;
  outline: none;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  align-items: center;
  justify-content: center;

  &:focus {
    outline-style: none;
  }
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
  &::-webkit-search-decoration {
    -webkit-appearance: none;
  }
`;
type Props = {
  submitHandler: (
    date: string,
    time: string,
    desc: string,
    interview: string
  ) => void;
};
const AcceptInterviewBox = ({ submitHandler }: Props) => {
  const [interview, setInterview] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");
  const [showCal, setShowCal] = useState<ICalendarFilterAdmin>({
    type: "",
    show: false,
  });
  const [day, setDay] = useState({
    index: 0,
    date: moment().locale("fa").format("jYYYY/jMM/jDD"),
  });
  const statuses = useAppSelector((state) => state.cvForAd.statuses);
  console.log(statuses);
  const dateConvertor = (date: string) => {
    const newDate = date.slice(0, 10).split("-").join("/");
    return newDate;
  };
  useEffect(() => {
    if (
      statuses.statusInterview &&
      statuses.dateInterview &&
      statuses.timeInterview &&
      statuses.descInterview
    ) {
      const defaultDate: string = dateConvertor(statuses.dateInterview);
      console.log(defaultDate);
      setInterview(statuses.statusInterview);
      setDay((day) => ({
        ...day,
        date: defaultDate,
      }));
      setTime(statuses.timeInterview);
      setDesc(statuses.descInterview);
    }
  }, []);

  const renderDatePicker = (type: CalenderTypesFilterAdmin) => (
    <DatePickerFilters
      showCal={showCal}
      setShowCal={setShowCal}
      setDay={setDay}
      type={type}
    />
  );

  return (
    <Container>
      <Title>نوع برگزاری مصاحبه:</Title>
      <Body>
        <div className="reason">
          <input
            value={"inperson"}
            checked={interview === "inperson"}
            onChange={() => {
              setInterview("inperson");
              setTime("");
              setDesc("");
              setDay((day) => ({
                ...day,
                date: moment().locale("fa").format("jYYYY/jMM/jDD"),
              }));
            }}
            type="radio"
          />
          <p>حضوری</p>
        </div>
        {interview === "inperson" && (
          <Form>
            <Timing>
              {" "}
              <InputWrapper>
                <Label>روز</Label>
                <DateInput onClick={() => setShowCal({ show: true, type: "" })}>
                  <Span>{day.date}</Span>
                </DateInput>
                {showCal.show && showCal.type == "" && (
                  <>{renderDatePicker("")}</>
                )}
              </InputWrapper>
              <InputWrapper>
                <Label>ساعت</Label>
                <HourInput
                  placeholder="12:00"
                  onTimeChange={(e) => setTime(e)}
                  initTime={time}
                />
              </InputWrapper>
            </Timing>
            <TextaraeaWrapper>
              <Label>آدرس</Label>
              <Explain value={desc} onChange={(e) => setDesc(e.target.value)} />
            </TextaraeaWrapper>
          </Form>
        )}
        <Divider></Divider>
        <div className="reason">
          <input
            value={"online"}
            checked={interview === "online"}
            onChange={() => {
              setInterview("online");
              setTime("");
              setDesc("");
              setDay((day) => ({
                ...day,
                date: moment().locale("fa").format("jYYYY/jMM/jDD"),
              }));
            }}
            type="radio"
          />
          <p>آنلاین</p>
        </div>
        {interview === "online" && (
          <Form>
            <Timing>
              {" "}
              <InputWrapper>
                <Label>روز</Label>
                <DateInput onClick={() => setShowCal({ show: true, type: "" })}>
                  <Span>{day.date}</Span>
                </DateInput>
                {showCal.show && showCal.type == "" && (
                  <>{renderDatePicker("")}</>
                )}
              </InputWrapper>
              <InputWrapper>
                <Label>ساعت</Label>
                <HourInput
                  placeholder="12:00"
                  onTimeChange={(e) => setTime(e)}
                  initTime={time}
                />
              </InputWrapper>
            </Timing>
            <TextaraeaWrapper>
              <Label>لینک آدرس</Label>
              <Input value={desc} onChange={(e) => setDesc(e.target.value)} />
            </TextaraeaWrapper>
          </Form>
        )}
        <Divider></Divider>
        <div className="reason">
          <input
            value={"offline"}
            checked={interview === "offline"}
            onChange={() => {
              setInterview("offline");
              setTime("");
              setDesc("");
              setDay((day) => ({
                ...day,
                date: moment().locale("fa").format("jYYYY/jMM/jDD"),
              }));
            }}
            type="radio"
          />
          <p>تلفنی</p>
        </div>
        {interview === "offline" && (
          <Form>
            <Timing>
              {" "}
              <InputWrapper>
                <Label>روز</Label>
                <DateInput onClick={() => setShowCal({ show: true, type: "" })}>
                  <Span>{day.date}</Span>
                </DateInput>
                {showCal.show && showCal.type == "" && (
                  <>{renderDatePicker("")}</>
                )}
              </InputWrapper>
              <InputWrapper>
                <Label>ساعت</Label>
                <HourInput
                  placeholder="12:00"
                  onTimeChange={(e) => setTime(e)}
                  initTime={time}
                />
              </InputWrapper>
            </Timing>
            <TextaraeaWrapper>
              <Label>شماره تلفن</Label>
              <Input value={desc} onChange={(e) => setDesc(e.target.value)} />
            </TextaraeaWrapper>
          </Form>
        )}
      </Body>
      <Footer>
        {!(interview === "") && (
          <Button
            disabled={time === "" || desc === ""}
            // isActive={!(reasonId === 0) ? true : false}
            onClick={() => submitHandler(day.date, time, desc, interview)}
          >
            ثبت
          </Button>
        )}
      </Footer>
    </Container>
  );
};

export default AcceptInterviewBox;
