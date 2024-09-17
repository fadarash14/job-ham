import CvDetail from "@/components/cv/templates/CvDetail";
import cookie from "cookie";
import Container from "@/components/utility/Container";
import { getCvById } from "@/requests/cv";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const ResumeId = ({ data, error }: any) => {
  if (error || !data) {
    return (
      <div>Error: {error || "An error occurred while fetching the CV"}</div>
    );
  }

  return (
    <>
      <Container className="container">
        <CvDetail data={data} />
      </Container>
    </>
  );
};

export default ResumeId;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const headers = context.req?.headers?.cookie
    ? cookie.parse(context.req?.headers?.cookie)
    : false;
  const token = headers ? headers?.token : null;
  const id = parseInt(query.id as string);
  try {
    const res = await getCvById(id, token as string);
    return {
      props: {
        data: res.data,
      },
    };
  } catch (error) {
    console.error("Error fetching CV:", error);
    return {
      props: {
        error: "An error occurred while fetching the CV.",
      },
    };
  }
};
