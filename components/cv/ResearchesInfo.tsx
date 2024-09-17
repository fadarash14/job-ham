import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { CSSObject, keyframes } from "styled-components";
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
  FlexboxProps,
  flexbox,
  alignItems,
  AlignItemsProps,
  justifyContent,
  JustifyContentProps,
} from "styled-system";
import {
  _EducationGrade,
  _EducationalInstitution,
  _Genders,
  _MaritalStatus,
  _MilitaryService,
  _SkillLevels,
  _SocialMedia,
  _StudyField,
} from "@/mock/_cv";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Image from "next/image";
import {
  setEdited,
  setLevel,
  setMyCv,
  setResearchesInfo,
  setCompeletness,
  updateCVInfo,
} from "@/store/cv";
import { _workType } from "@/mock/_jobs";
import { AllCvData, ResearchesInfo } from "@/types";
import { convertToJalaliString } from "@/utils/helper";
import { setCV } from "@/requests/cv";
import SubmitMessage from "../utility/SubmitMessage";
import VerificationCVModal from "./VerificationCVModal";
import useScrollToElement from "@/hooks/useScrollToElement";
import ArrowButtons from "./ArrowButtons";
import Cookies from "js-cookie";
import { updateCV } from "@/requests/cv";
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

  ${border}
`;

interface IFormInput {
  records: ResearchesInfo;
}

export default function ResearchesInfos() {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [modalValeus, setModalValues] = useState({
    id: "",
    type: "",
    mobile: "",
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const allInfo = useAppSelector((state) => state.cvInfo);
  const [allCv, setAllCv] = useState<AllCvData>(allInfo);
  const [status, setStatus] = useState<"success" | "fail" | "pending" | "">("");
  const dispatch = useAppDispatch();
  const {
    projects: baseInfo,
    isEdited,
    completeness,
  } = useAppSelector((state) => state.cvInfo);
  const router = useRouter();
  let scrl = useRef<HTMLDivElement | null>(null);
  const { register, handleSubmit, control } = useForm<IFormInput>({
    defaultValues: { records: baseInfo },
  });
  const { fields, append, remove, swap } = useFieldArray<IFormInput>({
    name: "records",
    control,
  });
  const queryClient = useQueryClient();
  const token = Cookies.get("token")!;
  function transformData(obj: any): any {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }
    const newObj: any = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      if (key === "location") {
        const { city, area, ...rest } = obj[key];
        if (city.id !== -1 && area.id !== -1) {
          newObj.cityId = city.id;
          newObj.areaId = area.id;
        }
      } else if (key === "sexId") {
        newObj[key] = obj[key].id;
      } else if (key === "militaryServiceId") {
        newObj[key] = obj[key].id;
      } else if (key === "isMarried") {
        newObj[key] = obj[key].id === 1 ? true : false;
      } else if (key === "id") {
        newObj[key] = +obj.id;
      } else if (key === "jobExperiences") {
        newObj[key] = obj[key].filter((item: any) => item.title !== "");
      } else if (key === "degrees") {
        newObj[key] = obj[key].filter(
          (item: any) => item.fieldStudies && item.institutionName !== ""
        );
      } else if (key === "languages") {
        newObj[key] = obj[key].filter((item: any) => item.title !== "");
      } else if (key === "educationCourses") {
        newObj[key] = obj[key].filter((item: any) => item.courseName !== "");
      } else if (key === "skills") {
        newObj[key] = obj[key].filter((item: any) => item.title !== "");
      } else if (key === "projects") {
        newObj[key] = obj[key].filter((item: any) => item.title !== "");
      } else {
        newObj[key] = key.includes("birthDate")
          ? convertToJalaliString(obj[key])
          : transformData(obj[key]);
      }
    }

    return newObj;
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    if (isEdited) {
      const filteredData = data.records.filter(
        (item: any) => item.title !== ""
      );
      dispatch(updateCVInfo({ data: filteredData, key: "projects", token }))
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
      let {
        baseInfo: { pictureId, id, user_id, ...otherBaseInfoValues },
        level,
        completeness,
        isEdited,
        ...othervalues
      } = allInfo;
      othervalues = {
        ...othervalues,
        ...otherBaseInfoValues,
        projects: data.records,
      };
      dispatch(setResearchesInfo(data.records));
      const transformedObject = transformData(othervalues);
      console.log(transformedObject);

      setCV({ ...transformedObject }).then((e) => {
        if (e.data) {
          console.log(e.data);
          const { id, mobile } = e.data;
          let verifyDatas = {
            type: "cv",
            id,
            mobile: transformedObject.mobile,
          };
          const resultCv: AllCvData = e.data;
          const {
            projects,
            skills,
            educationCourses,
            languages,
            degrees,
            jobExperiences,
            ...baseInfo
          } = resultCv;

          setAllCv(e.data);
          setModalValues(verifyDatas);
          setShowModal(true);
        } else {
          setStatus("fail");
        }
      });
    }
  };

  const plusRecordHandler = () => {
    append({ title: "", applicantReference: "", link: "" });
  };

  useEffect(() => {
    if (fields.length === 1 && typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    if (fields.length > 1 && scrl.current) {
      scrl.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [fields]);
  const verficationHandler = (isDone: boolean) => {
    if (isDone) {
      let { level, ...othervalues } = allInfo;
      othervalues = { ...allCv };
      dispatch(setMyCv(allCv));
      setMessage("رزومه با موفقیت ثبت شد");
      setToast({
        show: true,
        message: "درخواست شما با موفقیت ثبت شد.",
        type: "success",
      });
      // setStatus("success");
      queryClient.invalidateQueries({ queryKey: ["myResume"] });
      setTimeout(() => {
        setShowModal(false);
        router.push("/user");
        dispatch(setLevel(1));
      }, 3000);
    } else {
      setStatus("fail");
    }
  };
  const handleSwap = (indexA: number, indexB: number) => {
    swap(indexA, indexB);
  };
  const routeHandler = () => {
    isEdited
      ? (router.push("/user/my-resume"), dispatch(setEdited(false)))
      : dispatch(setLevel(6));
  };

  return (
    <CV onSubmit={handleSubmit(onSubmit)}>
      <BaseInfo>
        <Header>
          <Title>
            <Span color={"#474546"} fontSize={14}>
              تحقیقات / پروژه
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
                  <Label>عنوان</Label>
                  <Input
                    placeholder={"عنوان"}
                    {...register(`records.${index}.title`)}
                  />
                </InputParent>
                <InputParent>
                  <Label>مرجع درخواست کننده</Label>
                  <Input
                    placeholder={"مرجع درخواست کننده"}
                    {...register(`records.${index}.applicantReference`)}
                  />
                </InputParent>
                <InputParent>
                  <Label>لینک دوره</Label>
                  <Input
                    placeholder={"لینک دوره"}
                    {...register(`records.${index}.link`)}
                  />
                </InputParent>
              </Row>
            </Form>
          </Div>
        ))}
        <AddRow onClick={plusRecordHandler}>
          <Title>
            <Span color={"#acacac"} fontSize={16} fontWeight={500}>
              اضافه کردن تحقیقات / پروژه جدید
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
            تایید{" "}
          </Span>
        </Button>
      </Submit>
      {showSubmitModal && (
        <SubmitMessage
          setShow={setShowSubmitModal}
          status={status}
          message={message}
        />
      )}
      <VerificationCVModal
        setStatus={(s) => setStatus(s)}
        setVerModal={() => setShowModal(!showModal)}
        verModal={showModal}
        setDone={verficationHandler}
        values={modalValeus}
      />
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
