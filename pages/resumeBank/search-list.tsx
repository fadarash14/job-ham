import ResumeCard from "@/components/resumeBank/ResumeCard";
import Container from "@/components/utility/Container";
import { SearchCVInput, searchCVRequest } from "@/requests/resumeFilter";
import { ModifiedResultCV } from "@/types";
import { GetServerSideProps } from "next";
import styled from "styled-components";

const SearchList = ({
  error,
  data,
}: {
  error: string;
  data: ModifiedResultCV[];
}) => {
  if (error || !data) {
    return <h3 style={{ textAlign: "center" }}>Error: {error || "An error occurred while fetching the CV"}</h3>;
  }

  return (
    <>
      <Container className="container">
        <Grid>
          {!data.length && <h3>نتیجه ای برای جستجو پیدا نشد</h3>}
          {data.map((item) => (
            <ResumeCard key={item.id} {...item} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default SearchList;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
  margin: 30px 0;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const headers = context.req?.headers?.cookie;
  const token = headers ? headers.split(";")[0].split("=")[1] : "";

  const convertQuery = (query: any): SearchCVInput => {
    const newObj: { [key: string]: any } = {
      ...query,
      jobExperienceIds: convertToNumberArray(query.jobExperienceIds),
      sexIds: convertToNumberArray(query.sexIds),
      militaryServiceIds: convertToNumberArray(query.militaryServiceIds),
      skillIds: convertToNumberArray(query.skillIds),
      salaryId: query.salaryId ? Number(query.salaryId) : undefined,
      languageIds: convertToNumberArray(query.languageIds),
      educationCourseIds: convertToNumberArray(query.educationCourseIds),
      cityId: query.cityId ? Number(query.cityId) : undefined,
      skip: 0,
      limit: 10,
      sort: "Desc",
    };

    // Remove properties with undefined values
    Object.keys(newObj).forEach(
      (key) => newObj[key] === undefined && delete newObj[key]
    );

    return newObj as any;
  };

  const myQuery = convertQuery(query);
  try {
    const res = await searchCVRequest(myQuery, token);
    const data = res.data;
    return {
      props: {
        data: data?.searchCv !== null ? res.data : [],
      },
    };
  } catch (error: any) {
    if (Object.keys(query).length === 0) {
      return {
        props: {
          data: [],
        },
      };
    }
    console.error("Error fetching CV:", error);
    return {
      props: {
        error: error.message,
      },
    };
  }
};

const convertToNumberArray = (
  value: string | undefined
): number[] | undefined => {
  return value ? value.split(",").map(Number) : undefined;
};
