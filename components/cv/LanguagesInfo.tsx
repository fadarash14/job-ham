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
import {
  _EducationGrade,
  _EducationalInstitution,
  _Genders,
  _LanguageNames,
  _MaritalStatus,
  _MilitaryService,
  _SocialMedia,
  _StudyField,
} from "@/mock/_cv";
import { useAppSelector } from "@/store/hook";
import Image from "next/image";
import {
  setCompeletness,
  setEdited,
  setLanguageInfo,
  setLevel,
  updateCVInfo,
} from "@/store/cv";
import { Language, Option } from "@/types";
import ArrowButtons from "./ArrowButtons";
import Toast from "../Toast/Toast";
import { useAppDispatch } from "@/store/hook";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
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
  justify-content: center;
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
  margin-bottom: 15px;
  display: flex;
`;
const ExplainFlex = styled.div<SpaceProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70px;
  ${space};
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
  ::-webkit-scrollbar {
    display: none;
  }
  ${border}
`;
type ILanguage = Omit<Language, "id" | "title"> & { language: Option };

interface IFormInput {
  records: ILanguage[];
}
type Props = {
  data: {
    levels: Option[];
    languages: Option[];
  };
};

export default function LanguagesInfos({ data }: Props) {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const token = Cookies.get("token")!;
  const {
    languages: baseInfo,
    isEdited,
    completeness,
  } = useAppSelector((state) => state.cvInfo);
  const defaultValues: ILanguage[] = baseInfo.map((x) => {
    const { id, title, ...rest } = x;
    return {
      ...rest,
      language: id !== 0 ? { id, title } : null,
    };
  });

  let scrl = useRef<HTMLDivElement | null>(null);
  const { register, handleSubmit, control } = useForm<IFormInput>({
    defaultValues: { records: defaultValues },
  });
  const { fields, append, remove, swap } = useFieldArray<IFormInput>({
    name: "records",
    control,
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    let convertedData: Language[] = [];
    data.records.map((x) => {
      const { language, ...othervalues } = x;
      convertedData.push({
        ...othervalues,
        title: language?.title || "",
        id: language?.id ? (language?.id as number) : (0 as number),
      });
    });
    console.log(convertedData);

    if (isEdited) {
      console.log(convertedData);
      const filteredData = convertedData.filter(
        (item: any) => item.title !== ""
      );
      dispatch(updateCVInfo({ data: filteredData, key: "languages", token }))
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
      dispatch(setLanguageInfo(convertedData));
      dispatch(setLevel(5));
    }
  };

  const plusRecordHandler = () => {
    append({
      language: null,
      reading: null,
      hearing: null,
      writing: null,
      speaking: null,
      totalLevel: null,
      explain: "",
    });
  };
  const handleSwap = (indexA: number, indexB: number) => {
    swap(indexA, indexB);
  };
  const routeHandler = () => {
    isEdited
      ? (router.push("/user/my-resume"), dispatch(setEdited(false)))
      : dispatch(setLevel(3));
  };

  return (
    <CV onSubmit={handleSubmit(onSubmit)}>
      <BaseInfo>
        <Header>
          <Title>
            <Span color={"#474546"} fontSize={14}>
              سطح زبان
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
                  <Label>نام زبان</Label>
                  <Controller
                    name={`records.${index}.language`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        {console.log(value)}
                        <SelectInput
                          options={data.languages}
                          maxWidth={"180px"}
                          minWidth={"110px"}
                          mobile={false}
                          placeHolder={"نام زبان"}
                          value={value?.id === undefined || null ? null : value}
                          onChange={onChange}
                          onClear={() => onChange(null)}
                        />
                      </>
                    )}
                  />
                </InputParent>
                <InputParent>
                  <Label>مهارت خواندن</Label>
                  <Controller
                    name={`records.${index}.reading`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <SelectInput
                        options={data.levels}
                        maxWidth={"180px"}
                        minWidth={"110px"}
                        mobile={false}
                        placeHolder={"مهارت خواندن"}
                        value={value}
                        onChange={onChange}
                        onClear={() => onChange(null)}
                      />
                    )}
                  />
                </InputParent>
                <InputParent>
                  <Label>مهارت شنیداری</Label>
                  <Controller
                    name={`records.${index}.hearing`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <SelectInput
                        options={data.levels}
                        maxWidth={"180px"}
                        minWidth={"110px"}
                        mobile={false}
                        placeHolder={"مهارت شنیداری"}
                        value={value}
                        onChange={onChange}
                        onClear={() => onChange(null)}
                      />
                    )}
                  />
                </InputParent>
                <InputParent>
                  <Label>مهارت نوشتن</Label>
                  <Controller
                    name={`records.${index}.writing`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <SelectInput
                        options={data.levels}
                        maxWidth={"180px"}
                        minWidth={"110px"}
                        mobile={false}
                        placeHolder={"مهارت نوشتن"}
                        value={value}
                        onChange={onChange}
                        onClear={() => onChange(null)}
                      />
                    )}
                  />
                </InputParent>
              </Row>
              <Row>
                <InputParent>
                  <Label>مهارت گفتاری</Label>
                  <Controller
                    name={`records.${index}.speaking`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <SelectInput
                        options={data.levels}
                        maxWidth={"180px"}
                        minWidth={"110px"}
                        mobile={false}
                        placeHolder={"مهارت گفتاری"}
                        value={value}
                        onChange={onChange}
                        onClear={() => onChange(null)}
                      />
                    )}
                  />
                </InputParent>
                <InputParent>
                  <Label>سطح کلی</Label>
                  <Controller
                    name={`records.${index}.totalLevel`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <SelectInput
                        options={data.levels}
                        maxWidth={"180px"}
                        minWidth={"110px"}
                        mobile={false}
                        placeHolder={"سطح کلی"}
                        value={value}
                        onChange={onChange}
                        onClear={() => onChange(null)}
                      />
                    )}
                  />
                </InputParent>
                <ExplainFlex>
                  <Label>توضیحات تکمیلی</Label>
                  <Explain
                    {...register(`records.${index}.explain`)}
                    placeholder="نوع مدرک و نمره (در صورت شرکت در آزمون های زبان داخلی و یا بین المللی)"
                  />
                </ExplainFlex>
              </Row>
            </Form>
          </Div>
        ))}
        <AddRow onClick={plusRecordHandler}>
          <Title>
            <Span color={"#acacac"} fontSize={16} fontWeight={500}>
              اضافه کردن زبان جدید
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
          type="button"
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
