import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
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
  alignItems,
  AlignItemsProps,
  justifyContent,
  JustifyContentProps,
} from "styled-system";
import SelectInput from "@/components/search/SelectInput";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Image from "next/image";
import {
  setEdited,
  setLevel,
  setSkillsInfo,
  setCompeletness,
  updateCVInfo,
} from "@/store/cv";
import { _workType } from "@/mock/_jobs";
import { Option, Skill, SkillsInfo } from "@/types";
import useScrollToElement from "@/hooks/useScrollToElement";
import ArrowButtons from "./ArrowButtons";
import { updateCV } from "@/requests/cv";
import { convertToJalaliString } from "@/utils/helper";
import Cookies from "js-cookie";
import Toast from "../Toast/Toast";
import { useQueryClient } from "@tanstack/react-query";
const CV = styled.form`
  width: 80%;
  margin: 0 auto;
`;

const BaseInfo = styled.div`
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
  margin: 10px 0px;
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
    }
    &::-webkit-inner-spin-button{
        display:none;
    }

`;

const InputParent = styled.div<
  SpaceProps | LayoutProps | AlignItemsProps | JustifyContentProps
>`
  flex: 1 1 50%;
  padding: 4px;
  ${space}
  ${layout}
  ${alignItems}
  ${justifyContent}
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
const Div = styled.div`
  display: flex;
  width: 100%;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: white;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 10px 28px;
`;
const AddRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  // width: 100%;
  justify-content: center;
  // align-items: center;
  cursor: pointer;
`;
const Img = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 8px;
`;
const Submit = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-left: 10px;
  width: 100%;
  // justify-content: end;
  margin-bottom: 15px;
  display: flex;
`;
type ISkill = Omit<Skill, "id" | "title"> & { skill: Option };
interface IFormInput {
  records: ISkill[];
}
type Props = {
  data: {
    levels: Option[];
    skills: Option[];
  };
};

export default function SkillsInfos({ data }: Props) {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const dispatch = useAppDispatch();
  const {
    skills: baseInfo,
    isEdited,
    completeness,
  } = useAppSelector((state) => state.cvInfo);
  const defaultValues: ISkill[] = baseInfo.map((x) => {
    const { id, title, ...rest } = x;
    return {
      ...rest,
      skill: id !== 0 ? { id, title } : null,
    };
  });
  const queryClient = useQueryClient();
  const token = Cookies.get("token")!;
  const { register, handleSubmit, control } = useForm<IFormInput>({
    defaultValues: { records: defaultValues },
  });
  const { fields, append, remove, swap } = useFieldArray<IFormInput>({
    name: "records",
    control,
  });
  const router = useRouter();
  let scrl = useRef<HTMLDivElement | null>(null);
  useScrollToElement(scrl, "smooth", [fields.length, scrl.current], true);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    let convertedData: Skill[] = [];
    data.records.map((x) => {
      const { skill, ...othervalues } = x;
      convertedData.push({
        ...othervalues,
        title: skill?.title || "",
        id: skill?.id ? (skill?.id as number) : (0 as number),
      });
    });
    if (isEdited) {
      console.log(convertedData);
      const filteredData = convertedData.filter(
        (item: any) => item.title !== ""
      );
      dispatch(updateCVInfo({ data: filteredData, key: "skills", token }))
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
      console.log(data);
      dispatch(setSkillsInfo(convertedData));
      dispatch(setLevel(7));
    }
  };
  const plusRecordHandler = () => {
    append({
      skill: null,
      skillLevel: null,
    });
  };

  const handleSwap = (indexA: number, indexB: number) => {
    swap(indexA, indexB);
  };

  const routeHandler = () => {
    isEdited
      ? (router.push("/user/my-resume"), dispatch(setEdited(false)))
      : dispatch(setLevel(5));
  };

  return (
    <CV onSubmit={handleSubmit(onSubmit)}>
      <BaseInfo>
        <Header>
          <Title>
            <Span color={"#474546"} fontSize={14}>
              مهارت ها
            </Span>
          </Title>
          <Divider></Divider>
        </Header>
        {fields.map((item, index: number) => (
          <Div ref={scrl} key={item.id}>
            <ArrowButtons
              onRemove={() => remove(index)}
              onMoveUp={() => index !== 0 && handleSwap(index, index - 1)}
              onMoveDown={() =>
                fields.length > index + 1 && handleSwap(index, index + 1)
              }
            />
            <Form>
              <Row>
                <InputParent>
                  <Label>نام مهارت</Label>
                  <Controller
                    name={`records.${index}.skill`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        {console.log(value)}
                        <SelectInput
                          options={data.skills}
                          maxWidth={"180px"}
                          minWidth={"110px"}
                          mobile={false}
                          placeHolder={"نام مهارت"}
                          value={value?.id === null || undefined ? null : value}
                          onChange={onChange}
                          onClear={() => onChange(null)}
                        />
                      </>
                    )}
                  />
                </InputParent>
                <InputParent>
                  <Label>سطح</Label>
                  <Controller
                    name={`records.${index}.skillLevel`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <SelectInput
                        options={data.levels}
                        maxWidth={"180px"}
                        minWidth={"110px"}
                        mobile={false}
                        placeHolder={"سطح"}
                        value={value}
                        onChange={onChange}
                        onClear={() => onChange(null)}
                      />
                    )}
                  />
                </InputParent>
              </Row>
            </Form>
          </Div>
        ))}
        <AddRow onClick={plusRecordHandler}>
          <Title>
            <Span color={"#acacac"} fontSize={16} fontWeight={500}>
              اضافه کردن مهارت جدید
            </Span>
          </Title>
          <Img>
            <Image
              src={"icons/plus_squar_blak.svg"}
              width={20}
              height={20}
              alt="plus"
            />
          </Img>
        </AddRow>
      </BaseInfo>
      <Submit>
        <Button
          className="Button"
          backgroundColor={"paleGrey"}
          onClick={routeHandler}
        >
          <Span color={"black"} fontWeight={400} fontSize={14}>
            بازگشت
          </Span>
        </Button>
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
