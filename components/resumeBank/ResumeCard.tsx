import { ModifiedResultCV, Option } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const ResumeCard = ({
  name,
  pictureId,
  id,
  areaString,
  family,
  jobTitle,
  jobExperiences,
  sexId,
  degrees,
}: ModifiedResultCV) => {
  const router = useRouter();
  // const handleClick = () => router.push(`/resumeBank/${id}`);
  const calculateYearsPeriod = () => {
    const total = jobExperiences.reduce((acc, cur) => {
      // Convert start and end dates to Date objects
      const startDate = new Date(
        cur.startDate.Year,
        monthNames.indexOf(cur.startDate.Month),
        cur.startDate.Day
      );
      const endDate = new Date(
        cur.endDate.Year,
        monthNames.indexOf(cur.endDate.Month),
        cur.endDate.Day
      );
      // Calculate the difference in milliseconds
      const diff = endDate.getTime() - startDate.getTime();
      // Convert the difference to years and add it to the accumulator
      return acc + diff / (1000 * 60 * 60 * 24 * 365.25);
    }, 0);
    return Math.round(total);
  };
  const findTopEduGrade = () => {
    let maxDegreeId: any = null;
    let maxDegreeTitle = "نا مشخص";
    degrees.forEach((degree) => {
      if (degree.educationGrade) {
        if (maxDegreeId === null || degree.educationGrade.id > maxDegreeId) {
          maxDegreeId = degree.educationGrade.id;
          maxDegreeTitle = degree.educationGrade.title;
        }
      }
    });
    return maxDegreeTitle;
  };
  const experiences = calculateYearsPeriod();
  const TopDegreeEdu = findTopEduGrade();
  return (
    <Card>
      <Avatar
        src={
          pictureId
            ? `${pictureId}`
            : sexId.id === 1
            ? "/icons/female-avatar.svg"
            : "/icons/male-avatar.svg"
        }
        alt=""
        width={100}
        height={100}
      />
      <Info>
        <P1>{name + " " + family || "-"}</P1>
        <P2>{jobTitle}</P2>
        <P3>
          <Image
            src={"/icons/black-location.svg"}
            alt=""
            width={10}
            height={10}
            style={{ margin: "0 5px" }}
          />
          {areaString}
        </P3>
      </Info>
      <Action>
        <Image
          src={"/icons/Heart.svg"}
          alt=""
          width={9}
          height={8}
          style={{ marginRight: "auto", marginBottom: "5px" }}
        />
        <Span>
          {experiences === 0 ? "بدون سابقه کار" : `${experiences} سال سابقه`}
        </Span>
        <Span>{TopDegreeEdu}</Span>
        <Link href="/resumeBank/[id]" as={`/resumeBank/${id}`}>
          <A>
            مشاهده رزومه
            <Image
              src={"/icons/Icon_awesome-arrow-left.svg"}
              alt=""
              width={9}
              height={8}
              style={{ margin: "0 5px" }}
            />
          </A>
        </Link>
      </Action>
    </Card>
  );
};

export default ResumeCard;

const Card = styled.div`
  width: 100%;

  height: 115px;
  border: 1px solid #d5d5d5;
  border-radius: 7px;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  gap: 15px;
`;
const Avatar = styled(Image)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #d5d5d5;
  border: 1px solid #d5d5d5;
`;
const Info = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 5px;
`;
const Action = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  height: 100%;
`;
const Span = styled.span`
  width: 100%;
  max-width: 130px;
  /* height: 30px; */
  max-height: 40px;
  border-radius: 5px;
  border: 1px solid #d5d5d5;
  background-color: #fff;
  padding: 5px 10px;
  font-size: 10px;
  text-align: center;
`;
const A = styled.a`
  width: 100%;
  max-width: 130px;
  height: 30px;
  background-color: #fff;
  color: #db143d;
  border: none;
  font-size: 12px;
  cursor: pointer;
`;
const P1 = styled.p`
  margin: 0;
  font-size: 18px;
`;
const P2 = styled.p`
  margin: 0;
  font-size: 12px;
`;
const P3 = styled.p`
  margin: 0;
  font-size: 10px;
  color: #acacac;
`;

const monthNames = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
