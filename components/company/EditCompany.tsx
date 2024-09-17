import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { Company } from "@/types";
import {
  AlignItemsProps,
  FlexDirectionProps,
  FlexWrapProps,
  JustifyContentProps,
  LayoutProps,
  SpaceProps,
  WidthProps,
  alignItems,
  flexDirection,
  flexWrap,
  justifyContent,
  space,
  width,
  layout,
  FlexboxProps,
  flexbox,
  BorderProps,
  border,
  HeightProps,
  height,
  FontSizeProps,
  fontSize,
  backgroundColor,
  fontWeight,
  ColorProps,
  color,
  FontWeightProps,
} from "styled-system";
import Image from "next/image";
import SelectInput from "../search/SelectInput";
import Select, { StylesConfig, OptionProps, components } from "react-select";
import simpleFilters from "@/dictionaries/company-filters.json";
import Box from "../utility/Box";
import { getAreaNameById, getCityNameById } from "@/utils/helper";
import CompanyCityAreaModal from "../addWizard/CompanyCityAreaModal";
import AdsUploadContext from "../addWizard/AdsUploadContext";
import { updateCompany } from "@/requests/profile/company";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "../Toast/Toast";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background: white;
  padding: 0px 18px;
`;
const RightSide = styled.div`
  display: flex;
  flex-grow: 1;
  width: 70%;
  flex-direction: column;
`;
const Stack = styled.div<
  | FlexDirectionProps
  | WidthProps
  | JustifyContentProps
  | AlignItemsProps
  | SpaceProps
  | FlexWrapProps
  | HeightProps
>`
  display: flex;
  @media (max-width: 960px) {
    margin-left: 6px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  ${flexDirection}
  ${flexWrap}
  ${justifyContent}
${alignItems}
${space}
${width}
${height}
`;
const IconTitle = styled.div<SpaceProps>`
  display: flex;
  align-items: center;
  > *:last-child {
    margin-right: 8.5px;
  }

  ${space}
`;
const Typography = styled.p<SpaceProps>`
  margin: 0;
  color: #474546;
  ${space}
`;
const ContentText = styled(Typography)`
  white-space: nowrap;
  font-size: 16px;
  @media (max-width: 960px) {
    font-size: 14px;
  }
`;
const Input = styled.input<WidthProps | LayoutProps>`
  margin: 0 5px;
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  min-height: 40px;
  height: auto;
  background: white;
  //width:100%;
  /* min-width:110px;
    width: 190px; */
  ${width}
  ${layout}
    &.onFocus {
    &:focus {
      text-align: right;
      direction: ltr;
    }
  }

  &::-webkit-inner-spin-button {
    display: none;
  }
`;
const FlexInput = styled.div<FlexboxProps | SpaceProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 190px;
  min-width: 110px;
  margin: 0 5px;
  ${flexbox}
  ${space}
`;
const Topic = styled.div<BorderProps>`
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  flex: 1 1 90%;
  height: 40px;
  ${border}
`;
const Img = styled.div<FlexboxProps | LayoutProps | SpaceProps>`
  align-items: center;
  display: flex;
  &.map {
    left: 10px;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 999;
    width: 20px;
    position: absolute;
  }
  ${layout}
  ${flexbox}
    ${space}
`;

const Explain = styled.textarea<BorderProps>`
  height: 200px;
  min-width: 200px;
  width: 422px;
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  margin: 0 5px;
  // background: transparent;
  // flex: 1 1 90%;
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
  @media (max-width:530px){
    width: 250px;
  }
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
  @media (max-width:530px){
    width:100%;
    height:44px;
    position: fixed;
    bottom: 0;
    left: 0;
    border-radius: 0px;
    }
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
const Submit = styled.div`
  margin-top: 15px;
  margin-left: 10px;
  // width: 100%;
  margin-bottom: 15px;
  display: flex;
  justify-content: end;
`;
type Props = {
  data: Company;
};
const EditCompany = ({ data }: Props) => {
  const convertObject = (object: any) => {
    let newObj: any = {};
    for (let key in object) {
      if (key === "cityId" || key === "areaId") {
        if (!newObj.location) {
          newObj.location = {};
        }
        newObj.location[key] = object[key];
      } else {
        newObj[key] = object[key];
      }
    }

    return newObj;
  };
  const newData = convertObject(data);
  const [show, setShow] = useState(false);
  const [city, setCity] = useState<{ id: number; name: string } | null>(null);
  const [area, setArea] = useState<{ id: number; name: string } | null>(null);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const token = Cookies.get("token");
  const queryClient = useQueryClient();
  useEffect(() => {
    let _city: { id: number; name: string } = {
      id: newData.location.cityId,
      name: getCityNameById(newData.location.cityId),
    };
    let _area: { id: number; name: string } = {
      id: newData.location.areaId,
      name: getAreaNameById(newData.location.cityId, newData.location.areaId),
    };
    setCity(_city);
    setArea(_area);
  }, []);

  type IFormInput = Company & { location: { cityId: number; areaId: number } };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: newData,
  });
  const option = (key: string) => {
    return simpleFilters.filters.filter((items) => items.key === key)[0]
      .options!;
  };
  const transformData = (data: any) => {
    const newObj: any = {};
    for (const key in data) {
      if (data[key].id) {
        newObj[key] = data[key].id;
      } else {
        newObj[key] = data[key];
      }
    }
    return newObj;
  };
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    const newData = {
      ...data,
      areaId: area?.id,
      cityId: city?.id,
      id: +data.id,
    };
    const { location, logoId, bannerId, ...other } = newData;

    const finalData = transformData(other);
    console.log(finalData);

    const res = await updateCompany(finalData, token!);
    queryClient.invalidateQueries({ queryKey: ["getMyCompany"] });
    setToast(true);
    setMessage("عملیات با موفقیت انجام شد.");
    console.log(res);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <RightSide>
          <Stack flexWrap={"wrap"} justifyContent={"flex-start"} width={"100%"}>
            <Stack mt={10.5} ml={4} flexDirection={"column"}>
              {" "}
              <IconTitle mb={8.5}>
                <Image
                  src={"/icons/Iconly-Curved-Arrow - Left 3.svg"}
                  alt="arrow"
                  width={8}
                  height={8}
                />
                <ContentText>نام سازمان</ContentText>
              </IconTitle>
              <Controller
                name="nameCompany"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder={"نام سازمان"}
                    value={value}
                    onChange={onChange}
                    minWidth={"110px"}
                    width={"190px"}
                  />
                )}
              />
            </Stack>
            <Stack mt={10.5} ml={4} flexDirection={"column"}>
              {" "}
              <IconTitle mb={8.5}>
                <Image
                  src={"/icons/Iconly-Curved-Arrow - Left 3.svg"}
                  alt="arrow"
                  width={8}
                  height={8}
                />
                <ContentText>صنعت</ContentText>
              </IconTitle>
              <Controller
                name="industryId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectInput
                    options={option("industryId")}
                    maxWidth={"190px"}
                    minWidth={"110px"}
                    mobile={false}
                    placeHolder={"صنعت"}
                    value={
                      option("industryId").filter(
                        (item) => item.id === value
                      )[0]
                    }
                    onChange={onChange}
                    onClear={() => onChange(null)}
                  />
                )}
              />
            </Stack>
            <Stack mt={10.5} ml={4} flexDirection={"column"}>
              {" "}
              <IconTitle mb={8.5}>
                <Image
                  src={"/icons/Iconly-Curved-Arrow - Left 3.svg"}
                  alt="arrow"
                  width={8}
                  height={8}
                />
                <ContentText>محدوده فعالیت</ContentText>
              </IconTitle>
              <Controller
                name="location"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FlexInput>
                    {
                      <Topic onClick={() => setShow(true)}>
                        {area?.id !== -1 && city?.id !== -1 ? (
                          <Box>
                            {city?.name} - {area?.name}
                          </Box>
                        ) : (
                          <Img mr={"auto"}>
                            <Image
                              width={10}
                              height={10}
                              src={`/icons/ads-left-arrow.svg`}
                              alt="arrow"
                            />
                          </Img>
                        )}
                      </Topic>
                    }
                  </FlexInput>
                )}
              />
            </Stack>
            <Stack mt={10.5} ml={4} flexDirection={"column"}>
              {" "}
              <IconTitle mb={8.5}>
                <Image
                  src={"/icons/Iconly-Curved-Arrow - Left 3.svg"}
                  alt="arrow"
                  width={8}
                  height={8}
                />
                <ContentText>سال تاسیس</ContentText>
              </IconTitle>
              <Controller
                name="establishedYear"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder={"سال تاسیس"}
                    value={value}
                    onChange={onChange}
                    minWidth={"110px"}
                    width={"190px"}
                  />
                )}
              />
            </Stack>
            <Stack mt={10.5} ml={4} flexDirection={"column"}>
              {" "}
              <IconTitle mb={8.5}>
                <Image
                  src={"/icons/Iconly-Curved-Arrow - Left 3.svg"}
                  alt="arrow"
                  width={8}
                  height={8}
                />
                <ContentText>نوع فعالیت</ContentText>
              </IconTitle>
              <Controller
                name="typeActivityCompanyId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectInput
                    options={option("typeActivityCompanyId")}
                    maxWidth={"190px"}
                    minWidth={"110px"}
                    mobile={false}
                    placeHolder={"نوع فعالیت"}
                    value={
                      option("typeActivityCompanyId").filter(
                        (item) => item.id === value
                      )[0]
                    }
                    onChange={onChange}
                    onClear={() => onChange(null)}
                  />
                )}
              />
            </Stack>
            <Stack mt={10.5} ml={4} flexDirection={"column"}>
              {" "}
              <IconTitle mb={8.5}>
                <Image
                  src={"/icons/Iconly-Curved-Arrow - Left 3.svg"}
                  alt="arrow"
                  width={8}
                  height={8}
                />
                <ContentText>نوع مالکیت</ContentText>
              </IconTitle>
              <Controller
                name="typeOwnerShipId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectInput
                    options={option("typeOwnerShipId")}
                    maxWidth={"190px"}
                    minWidth={"110px"}
                    mobile={false}
                    placeHolder={"نوع مالکیت"}
                    value={
                      option("typeOwnerShipId").filter(
                        (item) => item.id === value
                      )[0]
                    }
                    onChange={onChange}
                    onClear={() => onChange(null)}
                  />
                )}
              />
            </Stack>
            <Stack mt={10.5} ml={4} flexDirection={"column"}>
              {" "}
              <IconTitle mb={8.5}>
                <Image
                  src={"/icons/Iconly-Curved-Arrow - Left 3.svg"}
                  alt="arrow"
                  width={8}
                  height={8}
                />
                <ContentText>اندازه سازمان</ContentText>
              </IconTitle>
              <Controller
                name="sizeCompanyId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectInput
                    options={option("sizeCompanyId")}
                    maxWidth={"190px"}
                    minWidth={"110px"}
                    mobile={false}
                    placeHolder={"اندازه سازمان"}
                    value={
                      option("sizeCompanyId").filter(
                        (item) => item.id === value
                      )[0]
                    }
                    onChange={onChange}
                    onClear={() => onChange(null)}
                  />
                )}
              />
            </Stack>
            <Stack mt={10.5} ml={4} flexDirection={"column"}>
              {" "}
              <IconTitle mb={8.5}>
                <Image
                  src={"/icons/Iconly-Curved-Arrow - Left 3.svg"}
                  alt="arrow"
                  width={8}
                  height={8}
                />
                <ContentText>آدرس وب سایت</ContentText>
              </IconTitle>
              <Controller
                name="webSiteUrl"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder={"آدرس وب سایت"}
                    value={value}
                    onChange={onChange}
                    minWidth={"110px"}
                    width={"190px"}
                  />
                )}
              />
            </Stack>
            <Stack mt={10.5} ml={4} flexDirection={"column"}>
              {" "}
              <IconTitle mb={8.5}>
                <Image
                  src={"/icons/Iconly-Curved-Arrow - Left 3.svg"}
                  alt="arrow"
                  width={8}
                  height={8}
                />
                <ContentText>تلفن سازمانی</ContentText>
              </IconTitle>
              <Controller
                name="telCompany"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder={"تلفن سازمانی"}
                    value={value}
                    onChange={onChange}
                    minWidth={"110px"}
                    width={"190px"}
                  />
                )}
              />
            </Stack>
          </Stack>
          <Stack flexWrap={"wrap"} justifyContent={"flex-start"} width={"100%"}>
            <Stack mt={10.5} ml={4} flexDirection={"column"} height={150}>
              {" "}
              <IconTitle mb={8.5}>
                <Image
                  src={"/icons/Iconly-Curved-Arrow - Left 3.svg"}
                  alt="arrow"
                  width={8}
                  height={8}
                />
                <ContentText>درباره شرکت</ContentText>
              </IconTitle>
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Explain
                    maxLength={2500}
                    defaultValue={value}
                    placeholder={"درباره شرکت"}
                    onChange={onChange}
                  />
                )}
              />
            </Stack>
            <Stack mt={10.5} ml={4} flexDirection={"column"} height={150}>
              {" "}
              <IconTitle mb={8.5}>
                <Image
                  src={"/icons/Iconly-Curved-Arrow - Left 3.svg"}
                  alt="arrow"
                  width={8}
                  height={8}
                />
                <ContentText>محصولات و خدمات</ContentText>
              </IconTitle>
              <Controller
                name="descriptionServices"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Explain
                    maxLength={2500}
                    defaultValue={value}
                    placeholder={"درباره شرکت"}
                    onChange={onChange}
                  />
                )}
              />
            </Stack>
          </Stack>
          <Submit>
            <Button
              className="Button"
              backgroundColor={"lipstick"}
              type="submit"
            >
              <Span color={"white"} fontWeight={400} fontSize={14}>
                ویرایش اگهی
              </Span>
            </Button>
          </Submit>
        </RightSide>
        <CompanyCityAreaModal
          show={show}
          setshow={setShow}
          setCity={setCity}
          setArea={setArea}
        />
      </Container>
      {toast && (
        <Toast
          setIsHovering={setToast}
          isHovering={toast}
          type={"success"}
          text={message}
          confirm={false}
        />
      )}
    </form>
  );
};

export default EditCompany;
