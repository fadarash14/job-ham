import { Company } from "@/types";
import { convertIdsToTitles } from "@/utils/helper";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
const companyFilters = require("@/dictionaries/company-filters.json");
import styled from "styled-components";
import {
  ColorProps,
  FontWeightProps,
  SpaceProps,
  WidthProps,
  color,
  fontWeight,
  space,
  width,
} from "styled-system";

type Props = {
  data: Company[];
  page: number;
  limit: number;
};
const TableContainer = styled.div`
  margin: 20px;
  margin-top: 30px;
  border-radius: 12px;
  border: 1px solid #d1d1d1;
`;

const Table = styled.table`
  width: 100%;
  background: white;
  border-radius: 12px;
  border: 1px solid #d1d1d1;
  border-collapse: collapse;
  overflow: hidden;
`;
const THead = styled.thead`
  color: #474546;
  font-size: 12px;
  font-weight: 500;
  border-bottom: 1px solid #d1d1d1;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: right;
  color: #474546;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
`;

const TableRow = styled.tr`
  border-top: 1px solid #d1d1d1;
  border-bottom: 1px solid #d1d1d1;
`;

const TableCell = styled.td`
  padding: 10px;
  font-size: 12px;
  color: #474546;
  white-space: nowrap;
  @media (min-width: 768px) {
    white-space: normal;
  }
  align-items: center;
`;
const Span = styled.span<ColorProps | FontWeightProps | SpaceProps>`
  color: #474546;
  ${color}
  ${fontWeight}
  ${space}
`;

const CustomColumnCell = styled(TableCell)<WidthProps>`
  width: 50px;
  color: #474546;
  ${width}
`;
const CompanyNameCell = styled(TableCell)<WidthProps>`
  display: flex;
  align-items: center;
  ${width}
`;

export default function CompanyList({ data, page, limit }: Props) {
  const stringifyHiringStatus = (count: number): string => {
    if (count === 0) return "هیچ موقعیت شغلی وجود ندارد";
    return `در حال استخدام ${count} وقعیت شغلی`;
  };
  const router = useRouter();

  return (
    <TableContainer>
      <Table>
        <THead>
          <TableRow>
            <CustomColumnCell>رتبه</CustomColumnCell>
            <TableHeader>شرکت</TableHeader>
            <TableHeader>نوع فعالیت</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </THead>
        <tbody>
          {data.map((company, index) => {
            //@ts-ignore
            const cData: Company = convertIdsToTitles(companyFilters, company);
            return (
              <TableRow key={index}>
                <CustomColumnCell>{index + 1 + page * limit}</CustomColumnCell>
                <CompanyNameCell>
                  <Image
                    src={
                      company.logoId ? company.logoId : "/icons/companyL.svg"
                    }
                    alt={company.nameCompany}
                    width={32}
                    height={32}
                  />
                  <Span mr={10} fontWeight={600}>
                    {cData.nameCompany}
                  </Span>
                </CompanyNameCell>
                <TableCell>
                  <Span>{cData.industryId}</Span>
                </TableCell>
                <TableCell>
                  <Span
                    onClick={() => router.push(`companies/${cData.id}`)}
                    style={{ cursor: "pointer" }}
                    color={"#DB143D"}
                  >
                    مشاهده صفحه شرکت
                  </Span>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </TableContainer>
  );
}
