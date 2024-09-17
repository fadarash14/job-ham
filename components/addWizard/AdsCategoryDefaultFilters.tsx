import { SelectedCategory } from "@/types";
import Image from "next/image";
import React, { Dispatch, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useAppSelector } from "@/store/hook";
type Props = {
  setFilterValues: Dispatch<any>;
  setGoBack: () => void;
};

type FilterKeys =
  | "category"
  | "sex"
  | "typeCooperations"
  | "organizationPosts"
  | "company";

type Filters = {
  [K in FilterKeys]: K extends "category"
    ? SelectedCategory | null
    : K extends "company"
    ? string
    : number;
};

const slideDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 500px; 
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    max-height: 500px; 
    opacity: 1;
  }
  to {
    max-height: 0;
    opacity: 0;
  }
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  & img {
    cursor: pointer;
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  padding: 0 4px;
  flex-direction: column;
  max-height: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 6px 4px;
  border-bottom: 1px solid #d9d7d4;
  &:hover {
    color: white;
    background: #d9d7d4;
  }
  & img {
    margin-left: 10px;
  }
`;
const Header = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  & img {
    margin-right: 10px;
    transition: transform 0.3s ease; /* Apply transition for smooth rotation */
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  }
`;
const Options = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  overflow: hidden;
  animation: ${({ isOpen }) => (isOpen ? slideDown : slideUp)} 0.3s ease-in-out;
`;

const sex = {
  name: "جنسیت",
  key: "sex",
  subs: [
    { id: 1, name: "زن" },
    { id: 2, name: "مرد" },
    { id: 3, name: "فرقی ندارد" },
  ],
};
const typeCooperations = {
  name: "نوع همکاری",
  key: "typeCooperations",
  subs: [
    { id: 1, name: "تمام وقت" },
    { id: 2, name: "پاره وقت" },
    { id: 3, name: "دورکاری" },
    { id: 4, name: "تمام وقت و پاره وقت" },
    { id: 5, name: "کارآموزی" },
  ],
};
const organizationPosts = {
  name: "پست سازمانی",
  key: "organizationPosts",
  subs: [
    {
      name: "کارگر",
      id: 7,
    },
    {
      name: "کارمند",
      id: 6,
    },
    {
      name: "کارشناس",
      id: 5,
    },
    {
      name: "کارشناس ارشد",
      id: 4,
    },
    {
      name: "مدیر میانی",
      id: 3,
    },
    {
      name: "معاونت",
      id: 2,
    },
    {
      name: "مدیر ارشد",
      id: 1,
    },
  ],
};

const initialFilters = {
  category: null,
  sex: 0,
  typeCooperations: 0,
  organizationPosts: 0,
  company: "",
};

export default function AdsCategoryDefaultFilters({
  setFilterValues,
  setGoBack,
}: Props) {
  const [level, setLevel] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const companyInfo = useAppSelector((state) => state.companyInfo);
  const hasCompany = companyInfo.hasCompany;
  let companyData = companyInfo.data.map((company: any) => ({
    id: company.id,
    name: company.nameCompany,
  }));
  companyData.push({ id: "", name: "افزودن شرکت" });
  const company = {
    name: "شرکت",
    key: "company",
    subs: companyData,
  };
  const _filters = hasCompany
    ? [organizationPosts, typeCooperations, sex, company]
    : [organizationPosts, typeCooperations, sex];
  const goBack = () => {
    if (level > 0) {
      setLevel((level) => level - 1);
    } else {
      setGoBack();
    }
  };
  const toggleExpand = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleFilter = (name: string, id: number) => {
    setFilters((prev) => ({ ...prev, [name]: id }));
    if (level < 2 && !hasCompany) {
      setLevel((level) => level + 1);
    } else if (level < 3 && hasCompany) {
      setLevel((level) => level + 1);
    } else {
      const finalFilters = { ...filters, [name]: id };
      setFilterValues(finalFilters);
    }
  };
  const renderFilter = (level: number) => {
    const filter = _filters[level];
    return (
      <List>
        <Image
          src={"/icons/arrow right.svg"}
          alt="goBack"
          width={30}
          height={30}
          onClick={goBack}
        />
        <Header isOpen={isOpen} onClick={toggleExpand}>
          {filter?.name}
          <Image
            src={"/icons/ads-down-arrow.svg"}
            alt="arrow"
            width={10}
            height={10}
          />
        </Header>
        <Options isOpen={isOpen}>
          {filter?.subs?.map((option: any) => {
            return (
              <ListItem
                onClick={() => {
                  handleFilter(filter.key, option.id);
                }}
                key={option.id}
              >
                {option.name}
              </ListItem>
            );
          })}
        </Options>
      </List>
    );
  };
  return <Container dir="rtl">{renderFilter(level)}</Container>;
}
