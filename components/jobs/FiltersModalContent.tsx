import {
  _Bonus,
  _Experience,
  _OrganizationalPosition,
  _Other,
  _Wage,
  _workType,
} from "@/mock/_jobs";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
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
import Checkbox from "../utility/CheckBox";

import Image from "next/image";
import { Option, QueryKeys } from "@/types";
import CvFilters from "@/dictionaries/cv-filters.json";
import AdFilters from "@/dictionaries/simple-filters.json";
import useUrlMaker from "@/hooks/useUrlMaker";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  justify-content: start;
  align-items: center;
  width: 100%;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;
const Input = styled.div`
  display: flex;
  &::before {
    display: none;
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
const Title = styled.div<LayoutProps | SpaceProps>`
  display: flex;
  justify-content: center;

  ${space}
  ${layout}
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  padding-bottom: 30px;
  width: 100%;
  border-bottom: 1px solid #d1d1d1;
  height: 1rem;
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
const Img = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 8px;
`;
const Submit = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 5px;
  background-color: white;
  border-top: 1px solid #d1d1d1;
`;
const Button = styled.button<LayoutProps | ColorProps | BorderProps>`
  border: 1px solid #f5f6fa3c;
  border-radius: 12px;
  color: black;
  justify-content: center;
  text-align: center;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  width: 100%;
  ${layout}
  ${color}
  ${border}
  ${backgroundColor}
`;
type OptionWithoutNull = Exclude<Option, null>;
const filterOptions: {
  options: OptionWithoutNull[];
  property: QueryKeys;
  placeholder: string;
  currentValue: (
    urlState: { [key: string]: number[] },
    item: Option
  ) => boolean;
}[] = [
  {
    options: CvFilters.organizationPosts,
    property: QueryKeys.OrganizationPostIds,
    placeholder: "پست سازمانی",
    currentValue: function (urlStates, item) {
      return findCurrentValue(urlStates, item, this.property);
    },
  },
  {
    options: CvFilters.typeCooperations,
    property: QueryKeys.TypeCooperationIds,
    placeholder: "نوع همکاری",
    currentValue: function (urlStates, item) {
      return findCurrentValue(urlStates, item, this.property);
    },
  },
  {
    options: CvFilters.experiences,
    property: QueryKeys.ExperienceId,
    placeholder: "سابقه کار",
    currentValue: function (urlStates, item) {
      return findCurrentValue(urlStates, item, this.property);
    },
  },
  {
    options: CvFilters.salaries,
    property: QueryKeys.SalaryId,
    placeholder: "حقوق",
    currentValue: function (urlStates, item) {
      return findCurrentValue(urlStates, item, this.property);
    },
  },
  {
    options: AdFilters.filters[2].options!,
    property: QueryKeys.AdvantageIds,
    placeholder: "مزایا و تسهیلات",
    currentValue: function (urlStates, item) {
      return findCurrentValue(urlStates, item, this.property);
    },
  },
];
function findCurrentValue(
  urlStates: { [key: string]: number[] },
  item: Option,
  property: QueryKeys
) {
  if (urlStates[property]) {
    if (typeof urlStates[property] !== "number") {
      const index = urlStates[property].findIndex((x) => x === item?.id);
      if (index !== -1) {
        return true;
      }
      return false;
    } else {
      return item?.id == (urlStates[property] as unknown as string | number);
    }
  }
  return false;
}

function FiltersModalContent(props: { onClose: () => void }) {
  const [urlStates, updateUrl] = useUrlMaker();
  const [values, setValues] = useState<{ [key: string]: number[] | number }>(
    {}
  );
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { skip, limit, sort, ...otherQueries } = values;
    updateUrl({ ...otherQueries });
    props.onClose();
  };
  useEffect(() => {
    const _values = { ...urlStates };
    setValues(_values);
  }, [urlStates]);
  console.log(values);

  const onChangeHandler = useCallback(
    (property: string, id: number) => {
      //@ts-ignore
      setValues((prev) => {
        if (Array.isArray(prev[property])) {
          //@ts-ignore
          const updatedSet = new Set(prev[property]);

          if (updatedSet.has(id)) {
            updatedSet.delete(id); // ID exists, remove it
          } else {
            updatedSet.add(id); // ID doesn't exist, add it
          }

          return {
            ...prev,
            [property]: Array.from(updatedSet),
          };
        } else {
          const updatedValue = prev[property] != id ? id : null;
          return {
            ...prev,
            [property]: updatedValue,
          };
        }
      });
    },
    [values]
  );

  return (
    <Form onSubmit={onSubmit}>
      <Header>
        <Title>
          <Span fontSize={16}>جستجو پیشرفته</Span>
        </Title>
      </Header>
      <Content>
        {filterOptions.map((filter, index) => {
          return (
            <Section key={index}>
              <SectionHeader>
                <Img>
                  <Image
                    src={"icons/hamburger.svg"}
                    width={24}
                    height={24}
                    alt=""
                  />
                </Img>
                <Label color={"black"} fontSize={16}>
                  {filter.placeholder}
                </Label>
              </SectionHeader>
              {filter.options.map((item, idx) => {
                return (
                  <Div key={idx}>
                    <Input>
                      <Checkbox
                        //@ts-ignore
                        checked={filter.currentValue(values, item)}
                        onChange={() =>
                          onChangeHandler(filter.property, item.id as number)
                        }
                      />
                    </Input>
                    <Label marginRight={"10px"}>{item?.title}</Label>
                  </Div>
                );
              })}
            </Section>
          );
        })}
      </Content>
      <Submit>
        <Button type="submit" className="Button" backgroundColor={"mustard"}>
          <Span fontWeight={400} fontSize={14}>
            مشاهده نتایج
          </Span>
        </Button>
      </Submit>
    </Form>
  );
}
export default FiltersModalContent;
