import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import UploadProfile from "./UploadProfile";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
  BorderProps,
  backgroundColor,
  border,
} from "styled-system";
import SelectInput from "@/components/search/SelectInput";
import {
  _Genders,
  _MaritalStatus,
  _MilitaryService,
  _SocialMedia,
} from "@/mock/_cv";
import CalenderModal from "@/components/cv/CalenderModal";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import LocationInfo from "@/components/cv/LocationInfo";
import { setBaseInfo, setLevel, setEdited, updateCVInfo } from "@/store/cv";
import { BaseInfo, CustomDate, Option } from "@/types";
import { jalaliDateValidation } from "@/utils/helper";
import BelowMessage from "../addWizard/BelowMessage";
import schema from "./Schema";
import Toast from "../Toast/Toast";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
const CV = styled.form`
  width: 80%;
  margin: 0 auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  width: 100%;
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

  ${space}
  ${layout}
`;
const Divider = styled.div`
  flex-grow: 1;
  border-bottom: 1px solid #d1d1d1;
  height: 1rem;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  width: 100%;
`;
const Row = styled.div`
  display: flex;
  // margin: 10px 0px;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 870px) {
    flex-wrap: wrap;
  }
`;
const Input = styled.input`
    border:1px solid #D1D1D1;
    border-radius:10px;
    outline:none;
    padding:5px 10px;
    height: 40px;
    background:white;
    width:100%;
    min-width:125px;
    &.onFocus{
        &:focus{
            text-align:right;
            direction:ltr;
            }
        }
   
    &::-webkit-inner-spin-button{
        display:none;
    }

`;
const BirthInput = styled.div`
  display: flex;
  font-size: 14px;
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  height: 40px;
  background: white;
  width: 100%;
`;
const DateInput = styled.div`
  outline: none;
  padding: 5px 10px;
  border: none;
  background: white;
  width: 100%;
  cursor: pointer;
  color: #acacac;
`;
const InputParent = styled.div<SpaceProps>`
  flex: 1 1 50%;
  padding: 4px;
  ${space}
`;
const ExplainFlex = styled.div<SpaceProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  ${space};
`;
const Label = styled.label<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: right;
  color: #acacac;
  font-size: 14px;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Button = styled.button<LayoutProps | ColorProps | BorderProps>`
  border: 1px solid #f5f6fa3c;
  border-radius: 12px;
  color: black;
  justify-content: center;
  text-align: center;
  min-width: 110px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
  border: none;
  ${layout}
  ${color}
  ${border}
  ${backgroundColor}
`;

const Explain = styled.textarea<BorderProps>`
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  background: white;
  flex: 1 1 90%;
  padding: 10px;
  outline: none;
  resize: none;
  -webkit-user-select: text; /* Chrome, Opera, Safari */
  -moz-user-select: text; /* Firefox 2+ */
  -ms-user-select: text; /* IE 10+ */
  user-select: text; /* Standard syntax */
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
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  width: 100%;
`;
const SocialMedia = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  //   width: 100%;
  align-items: start;
`;
const Submit = styled.div<{ isEdited: boolean }>`
  margin-top: 15px;
  margin-left: 10px;
  // width: 100%;
  justify-content: ${({ isEdited }) => (isEdited ? "space-between" : "end")};
  margin-bottom: 15px;
  display: flex;
`;

type IFormInput = BaseInfo;
type Props = {
  data: {
    sex: Option[];
    militaryServices: Option[];
  };
};

export default function BasicInfo({ data }: Props) {
  const [message, setMessage] = useState("");
  const [showCalender, setShowCalender] = useState(false);
  const [dateType, setDateType] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const { baseInfo, isEdited } = useAppSelector((state) => state.cvInfo);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const token = Cookies.get("token")!;
  const {
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: baseInfo,
    //@ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (datas) => {
    Object.keys(datas).map((key) => {
      if (datas[key as keyof IFormInput] === undefined) {
        //@ts-ignore
        datas[key as keyof IFormInput] = baseInfo[key as keyof IFormInput];
      }
    });
    if (!datas.birthDate) {
      datas.birthDate = baseInfo.birthDate;
    } else {
      const dates: ["Year", "Month", "Day"] = ["Year", "Month", "Day"];
      dates.map((date) => {
        if (!datas?.birthDate[date]) {
          if (baseInfo.birthDate[date]) {
            //@ts-ignore
            datas.birthDate[date] = baseInfo.birthDate[date];
          }
        }
      });
    }
    if (baseInfo.location !== null && datas.location === null) {
      datas.location = baseInfo.location;
    }
    if (datas.location.area?.id === -1 && datas.location.city?.id === -1) {
      setMessage("تکمـیل این مـورد اجبـاری می باشـد.");
      return false;
    } else {
      setMessage("");
    }
    // When user is female , the militaryServiceId must be exempt
    if (datas.sexId?.id === 1) {
      datas.militaryServiceId = { id: 4, title: "معاف" };
    }
    //@ts-ignore
    if (datas.socialMedias?.title?.id) {
      //@ts-ignore
      datas.socialMedias.title = datas.socialMedias.title.id;
    } else {
      //@ts-ignore
      datas.socialMedias = {};
    }
    if (isEdited) {
      dispatch(updateCVInfo({ data: datas, key: "baseInfo", token }))
        .then(() => {
          setToast({
            show: true,
            message: "درخواست شما با موفقیت ثبت شد.",
            type: "success",
          });
          queryClient.invalidateQueries({ queryKey: ["myResume"] });
          setTimeout(() => {
            router.push("/user/my-resume");
            dispatch(setEdited(false));
          }, 1000);
        })
        .catch((e) => {
          console.log(e);
          setToast({
            show: true,
            message: "در ثبت درخواست شما مشکلی بوجود امده است",
            type: "error",
          });
        });
    } else {
      dispatch(setLevel(2));
      dispatch(setBaseInfo(datas));
    }
  };

  const handleToggle = (e: any, type: string) => {
    e.preventDefault();
    setDateType(type);
    setShowCalender((prevState) => !prevState);
  };
  const closeSmallModal = () => {
    setShowCalender(false);
  };
  const renderDate = (
    func: number | string | null | undefined,
    value: number | string | null | undefined,
    defaultValue: string
  ) => {
    return func ? (
      <Span color={"black"}>{func}</Span>
    ) : value ? (
      <Span color={"black"}>{value}</Span>
    ) : (
      defaultValue
    );
  };

  const isMale = () => {
    const watchItem = watch("sexId")!;
    if (watchItem === null) {
      return true;
    }
    if (watchItem.id === 1) {
      return false;
    }
    return true;
  };

  return (
    <CV onSubmit={handleSubmit(onSubmit)}>
      <Content>
        <Header>
          <Title>
            <Span color={"#474546"} fontSize={14}>
              اطلاعات پایه
            </Span>
          </Title>
          <Divider></Divider>
        </Header>
        <Row>
          <InputParent>
            <Label>نام</Label>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input placeholder={"نام"} onChange={onChange} value={value} />
              )}
            />
            {errors.name && <BelowMessage message={errors.name.message} />}
          </InputParent>
          <InputParent>
            <Label>نام خانوادگی</Label>
            <Controller
              name="family"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={"نام خانوادگی"}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            {errors.family && <BelowMessage message={errors.family.message} />}
          </InputParent>
          <InputParent>
            <Label>عنوان شغلی</Label>
            <Controller
              name="jobTitle"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={"عنوان شغلی"}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            {errors.jobTitle && (
              <BelowMessage message={errors.jobTitle.message} />
            )}
          </InputParent>
          {/* <InputParent>
            <Controller
              name="pictureId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <UploadProfile setImage={onChange} image={value!} />
              )}
            />
          </InputParent> */}
        </Row>
        <Row>
          <InputParent>
            <Label>جنسیت</Label>
            <Controller
              name="sexId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={data.sex}
                  maxWidth={"150px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={"جنسیت"}
                  value={value}
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
            {errors.sexId && <BelowMessage message={errors.sexId.message} />}
          </InputParent>
          <InputParent>
            <Label>تاریخ تولد</Label>
            <BirthInput>
              <DateInput onClick={(e) => handleToggle(e, "Day")}>
                {renderDate(
                  getValues(`birthDate.Day`),
                  baseInfo.birthDate.Day,
                  "روز"
                )}
              </DateInput>
              <DateInput onClick={(e) => handleToggle(e, "Month")}>
                {renderDate(
                  getValues(`birthDate.Month`),
                  baseInfo.birthDate.Month,
                  "ماه"
                )}
              </DateInput>
              <DateInput onClick={(e) => handleToggle(e, "Year")}>
                {renderDate(
                  getValues(`birthDate.Year`),
                  baseInfo.birthDate.Year,
                  "سال"
                )}
              </DateInput>
            </BirthInput>
            {errors.birthDate && (
              <BelowMessage message={errors.birthDate.message} />
            )}
          </InputParent>
          <InputParent>
            <Label>وضعیت تاهل</Label>
            <Controller
              name="isMarried"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={_MaritalStatus}
                  maxWidth={"150px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={"وضعیت تاهل"}
                  value={value}
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
            {errors.isMarried && (
              <BelowMessage message={errors.isMarried.message} />
            )}
          </InputParent>
          <InputParent>
            {isMale() && (
              <>
                <Label>وضعیت سربازی</Label>
                <Controller
                  name="militaryServiceId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <SelectInput
                      options={data.militaryServices}
                      maxWidth={"150px"}
                      minWidth={"110px"}
                      mobile={false}
                      placeHolder={"وضعیت سربازی"}
                      value={value}
                      onChange={onChange}
                      onClear={() => onChange(null)}
                    />
                  )}
                />
                {errors.militaryServiceId && (
                  <BelowMessage message={errors.militaryServiceId.message} />
                )}
              </>
            )}
          </InputParent>
        </Row>
        <Row>
          <ExplainFlex>
            <Label> خلاصه ی رزومه</Label>
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Explain onChange={onChange} value={value} />
              )}
            />
            {errors.description && (
              <BelowMessage message={errors.description.message} />
            )}
          </ExplainFlex>
        </Row>
      </Content>
      <ContactInfo>
        <Header>
          <Title>
            <Span color={"#474546"} fontSize={14}>
              اطلاعات تماسی
            </Span>
          </Title>
          <Divider></Divider>
        </Header>
        <Row>
          <InputParent>
            <Controller
              name="location"
              control={control}
              render={({ field: { onChange, value } }) => (
                <LocationInfo value={value} setLocation={onChange} />
              )}
            />
            {message !== "" && <BelowMessage message={message} />}
          </InputParent>
          <InputParent>
            <Label>آدرس</Label>
            <Controller
              name="address"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input placeholder={"آدرس"} onChange={onChange} value={value} />
              )}
            />
            {errors.address && (
              <BelowMessage message={errors.address.message} />
            )}
          </InputParent>
        </Row>
        <Row>
          <InputParent>
            <Label>ایمیل</Label>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={"ایمیل"}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && <BelowMessage message={errors.email.message} />}
          </InputParent>
          <InputParent>
            <Label>موبایل</Label>
            <Controller
              name="mobile"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={"موبایل"}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            {errors.mobile && <BelowMessage message={errors.mobile.message} />}
          </InputParent>
          <InputParent>
            <Label>تلفن</Label>
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input placeholder={"تلفن"} onChange={onChange} value={value} />
              )}
            />
            {errors.phone && <BelowMessage message={errors.phone.message} />}
          </InputParent>
          <InputParent>
            <Label>وب سایت</Label>
            <Controller
              name="webSiteUrl"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={"وب سایت"}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            {errors.webSiteUrl && (
              <BelowMessage message={errors.webSiteUrl.message} />
            )}
          </InputParent>
        </Row>
      </ContactInfo>
      <SocialMedia>
        <Header>
          <Title>
            <Span color={"#474546"} fontSize={14}>
              شبکه های اجتماعی
            </Span>
          </Title>
          <Divider></Divider>
        </Header>
        <Row>
          <InputParent>
            <Label>شبکه اجتماعی</Label>
            <Controller
              name="socialMedias.title"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={_SocialMedia}
                  maxWidth={"150px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={"شبکه اجتماعی"}
                  value={value}
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
          </InputParent>
          <InputParent>
            <Label>آیدی</Label>
            <Controller
              name="socialMedias.id"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input placeholder={"آیدی"} onChange={onChange} value={value} />
              )}
            />
          </InputParent>
        </Row>
      </SocialMedia>
      {showCalender && (
        <Controller
          name={`birthDate`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <CalenderModal
              type={dateType}
              closeModal={closeSmallModal}
              setMonth={(e: string) => {
                const day = jalaliDateValidation(value!, e);
                onChange({ ...(value as object), Month: e, Day: day });
              }}
              setYear={(e: number) => {
                onChange({ ...(value as object), Year: e });
              }}
              setDay={(e: number) => {
                const day = jalaliDateValidation(value!, e);
                onChange({ ...(value as object), Day: day });
              }}
            />
          )}
        />
      )}
      <Submit isEdited={isEdited}>
        {isEdited ? (
          <Button
            className="Button"
            backgroundColor={"paleGrey"}
            onClick={(e) => {
              router.push("/user/my-resume");
              dispatch(setEdited(false));
              e.preventDefault();
            }}
          >
            <Span color={"black"} fontWeight={400} fontSize={14}>
              بازگشت
            </Span>
          </Button>
        ) : null}
        <Button className="Button" backgroundColor={"lipstick"} type="submit">
          <Span color={"white"} fontWeight={400} fontSize={14}>
            {isEdited ? "تایید" : "ادامه"}
          </Span>
        </Button>
      </Submit>
      {toast.show && (
        <Toast
          setIsHovering={(e) => setToast((prev) => ({ ...prev, show: false }))}
          isHovering={toast.show}
          type={toast.type}
          text={toast.message}
        />
      )}
    </CV>
  );
}
