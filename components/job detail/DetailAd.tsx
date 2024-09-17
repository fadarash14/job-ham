import React from "react";
import styled from "styled-components";
import Image from "next/image";
import {
  fontWeight,
  fontSize,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  FontWeightProps,
  FontSizeProps,
  color,
  ColorProps,
  border,
  backgroundColor,
  BorderProps,
  flexDirection,
  justifyContent,
  alignItems,
  FlexDirectionProps,
  JustifyContentProps,
  AlignItemsProps,
  width,
  WidthProps,
  FlexWrapProps,
  flexWrap,
  textAlign,
  TextAlignProps,
} from "styled-system";
import { IEditJob } from "@/types";
import { levels } from "@/dictionaries/cv-filters.json";
const Typography = styled.p<SpaceProps>`
  margin: 0;
  color: #474546;
  ${space}
`;
const IconTitle = styled.div<SpaceProps>`
  display: flex;
  align-items: center;
  > *:last-child {
    margin-right: 8.5px;
  }

  ${space}
`;
const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const TitleText = styled(Typography)`
  font-size: 20px;
  font-weight: 500;
  @media (max-width: 960px) {
    font-size: 16px;
  }
`;
const Stack = styled.div<
  | FlexDirectionProps
  | WidthProps
  | JustifyContentProps
  | AlignItemsProps
  | SpaceProps
  | FlexWrapProps
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
`;
const ContentText = styled(Typography)`
  white-space: nowrap;
  font-size: 16px;
  @media (max-width: 960px) {
    font-size: 14px;
  }
`;
const BoxText = styled(Typography)`
  color: #676666;
  display: inline-block;
  border: 1px solid #d5d5d5;
  font-size: 14px;
  min-width: 97px;
  max-width: fit-content;
  text-align: center;
  border-radius: 6px;
  padding: 0px 6px;
  white-space: normal;
  background: white;
`;
const DescriptionText = styled(BoxText)`
  font-size: 14px;
  min-width: 100%;
  text-align: justify;
  line-height: 1.8;
  padding: 8px;
  border-radius: 18px;
`;
type Props = {
  allData: IEditJob;
  dictionary: (val: string) => string;
};
const DetailAd = ({ allData, dictionary }: Props) => {
  const Field = ({
    title,
    icon,
    value,
    multiple = false,
  }: {
    title: string;
    icon: any;
    value:
      | string
      | string[]
      | undefined
      | { id: number; label: string; levelId: number }[];
    multiple?: boolean;
  }) => {
    return (
      <Stack mt={10.5} ml={4} flexDirection={"column"}>
        <IconTitle mb={8.5}>
          <Image src={`/${icon}`} width={16} height={16} alt="icon" />
          <ContentText>{dictionary(title)}</ContentText>
        </IconTitle>
        {multiple && Array.isArray(value) && value?.length > 0 ? (
          value?.map((v: any, index: number) => {
            return (
              <BoxText key={index}>
                {v.id
                  ? `${v.label} - ${
                      levels.find((item) => item.id === v.levelId)?.title
                    }`
                  : `${v}`}
              </BoxText>
            );
          })
        ) : typeof value === "string" && value?.length > 0 ? (
          <BoxText>{value}</BoxText>
        ) : (
          <BoxText>{"ندارد"}</BoxText>
        )}
      </Stack>
    );
  };
  return (
    <BoxContent>
      <IconTitle>
        <Image src={"/icons/Job.svg"} alt="Job" width={19} height={19} />
        <TitleText>اطلاعات شغلی</TitleText>
      </IconTitle>
      <Stack flexWrap={"wrap"} justifyContent={"flex-start"} width={"100%"}>
        <Field
          value={allData.typeCooperationId?.title}
          title={"typeCooperationId"}
          icon={"icons/Type of cooperation.svg"}
        />

        <Field
          value={allData.workDay}
          title={"workHour"}
          icon={"icons/Day and Time.svg"}
        />

        <Field
          value={allData.businessTrips}
          title={"businessTrips"}
          icon={"icons/business trips.svg"}
        />

        <Field
          value={allData.salaryId?.title}
          title={"salaryId"}
          icon={"icons/salary.svg"}
        />

        <Field
          value={allData.organizationPostId?.title}
          title={"organizationPostId"}
          icon={"icons/salary.svg"}
        />

        <Field
          multiple
          //@ts-ignore
          value={
            allData.advantageIds.length > 0
              ? allData.advantageIds.map((item) => item?.title)
              : 0
          }
          title={"advantageId"}
          icon={"icons/Facilities.svg"}
        />
      </Stack>

      <Stack flexDirection={"column"} width={"100%"} mt={25.75}>
        <IconTitle mb={8.5}>
          <Image src={"/icons/Job.svg"} alt="Job" width={19} height={19} />
          <TitleText>{dictionary("jobDescription")}</TitleText>
        </IconTitle>
        <DescriptionText>{allData.jobDescription}</DescriptionText>
      </Stack>
      <Stack flexDirection={"column"} width={"100%"} mt={25.75}>
        <IconTitle mb={8.5}>
          <Image
            src={"/icons/About Company.svg"}
            alt="aboutCompany"
            width={19}
            height={19}
          />
          <TitleText>{dictionary("description")}</TitleText>
        </IconTitle>
        <DescriptionText>{allData.company.description}</DescriptionText>
      </Stack>
      <Stack flexWrap={"wrap"} justifyContent={"flex-start"} width={"100%"}>
        <Field
          //@ts-ignore
          value={allData.company.industryId.title}
          title={"industryId"}
          icon={"icons/Industry.svg"}
        />
        <Field
          //@ts-ignore
          value={allData.company.sizeCompanyId.title}
          title={"sizeCompanyId"}
          icon={"icons/Organization Size.svg"}
        />
        <Field
          //@ts-ignore
          value={allData.company.typeOwnerShipId.title}
          title={"typeOwnerShipId"}
          icon={"icons/Ownership.svg"}
        />
        <Field
          //@ts-ignore
          value={allData.company.typeActivityCompanyId.title}
          title={"typeActivityCompanyId"}
          icon={"icons/Type of Activity.svg"}
        />
        <Field
          //@ts-ignore
          value={allData.company.establishedYear}
          title={"establishedYear"}
          icon={"icons/Established year.svg"}
        />
      </Stack>
      <Stack flexDirection={"column"} width={"100%"} mt={25.75}>
        <IconTitle mb={8.5}>
          <Image
            src={"/icons/Skill_02.svg"}
            alt="skillDescription"
            width={19}
            height={19}
          />
          <TitleText>{dictionary("descriptionServices")}</TitleText>
        </IconTitle>
        <DescriptionText>{allData.company.descriptionServices}</DescriptionText>
      </Stack>
      <Stack flexDirection={"column"} width={"100%"} mt={25.75}>
        <IconTitle mb={8.5}>
          <Image
            src={"/icons/Skill_1.svg"}
            alt="skillDescription"
            width={19}
            height={19}
          />
          <TitleText>{dictionary("skillDescription")}</TitleText>
        </IconTitle>
        <DescriptionText>{allData.skillDescription}</DescriptionText>
      </Stack>
      <IconTitle mt={25.75}>
        <Image src={"/icons/Job.svg"} alt="Job" width={19} height={19} />
        <TitleText>احراز شغلی</TitleText>
      </IconTitle>
      <Stack flexWrap={"wrap"} justifyContent={"flex-start"} width={"100%"}>
        <Field
          value={allData.sexId?.title}
          title={"sexId"}
          icon={"icons/Gender.svg"}
        />
        <Field
          value={allData.experienceId?.title}
          title={"experienceId"}
          icon={"icons/work experience.svg"}
        />
        <Field
          value={allData.fieldStudyId?.title}
          title={"fieldStudyId"}
          icon={"icons/Education.svg"}
        />
        <Field
          value={allData.gradeId?.title}
          title={"gradeId"}
          icon={"icons/Degree.svg"}
        />
        <Field
          multiple
          //@ts-ignore
          value={allData.languages}
          title={"languages"}
          icon={"icons/Language.svg"}
        />
        <Field
          value={allData.ageMinId?.title}
          title={"ageMinId"}
          icon={"icons/Age.svg"}
        />
        <Field
          value={allData.ageMaxId?.title}
          title={"ageMaxId"}
          icon={"icons/Age.svg"}
        />
      </Stack>
      <Stack flexWrap={"wrap"} justifyContent={"flex-start"} width={"100%"}>
        <Field
          multiple
          //@ts-ignore
          value={allData.skills}
          title={"skillDescription"}
          icon={"icons/Skill_02.svg"}
        />
      </Stack>
    </BoxContent>
  );
};

export default DetailAd;
