const AppBar = dynamic(() => import("@/components/header/appBar"), {
  ssr: false,
});
import TopSearchJobs from "@/components/jobs/TopSearchJobs";
import dynamic from "next/dynamic";
import styled from "styled-components";
import Col from "@/components/utility/Col";
import {
  _Bonus,
  _Experience,
  _OrganizationalPosition,
  _Other,
  _Wage,
  _workType,
} from "@/mock/_jobs";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useCallback, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import _, { isEmpty, last } from "lodash";

import CardBox from "@/components/wizard/CardBox";
import {
  fetchJobAdsData,
  loadAdvertises,
  parseQueryParameters,
} from "@/requests/homePage";
import clsx from "clsx";
import Row from "@/components/utility/Row";
import Container from "@/components/utility/Container";
import { useAppSelector } from "@/store/hook";
const JobCard = dynamic(() => import("@/components/wizard/JobDetails"));
const DefaultCard = dynamic(() => import("@/components/jobs/DefaultCard"));
const NotFoundCard = dynamic(() => import("@/components/jobs/NotFoundCard"));
const MobileAppbar = dynamic(() => import("@/components/header/MobileAppbar"));
const PlaceholderCard = dynamic(
  () => import("@/components/wizard/PlaceholderCard")
);
const MobileSideBar = dynamic(
  () => import("@/components/profile/MobileSideBar"),
  {
    ssr: false,
  }
);
const { v4: uuidv4 } = require("uuid");
import FiltersModal from "@/components/jobs/FiltersModal";
import Footer from "@/components/footer/Footer";
import Cookies from "js-cookie";
import { JobSearchFilters } from "@/components/jobs/JobSearchFilters";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  posts: any[];
  perPage: number;
  page: number;
  count: number;
  skip: number;
}

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
`;
const JobList = styled.div`
  width: 100%;
  max-width: 420px;
  min-width: 400px;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1024px) {
    width: 100%;
    min-width: unset;
  }
`;

const JobInfo = styled.div`
  width: 100%;
  border: 1px solid #d5d5d5;
  border-radius: 9px;
  opacity: 1;
  @media (max-width: 1024px) {
    display: none;
  }
`;

export default function Jobs(props: Props) {
  const { posts, count, skip, perPage } = props;
  const [scroll, setScroll] = useState(false);
  const { isLogged } = useAppSelector((state) => state.sign);

  const router = useRouter();
  const job = useAppSelector((state) => state.jobInfo.post);

  const scrollListener = () => {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      setScroll(true);
    }
  };

  const debouncedScrollListener = useCallback(
    _.debounce(scrollListener, 1000),
    []
  );
  useEffect(() => {
    window.addEventListener("scroll", debouncedScrollListener);
    return () => {
      window.removeEventListener("scroll", debouncedScrollListener);
    };
  }, []);

  async function fetchPage(context: any) {
    let _default = parseQueryParameters(router.query);
    _default.skip = context.pageParam.skip;
    const res = await loadAdvertises({
      ..._default,
    }).catch((e) => {
      console.log(e);
    });
    if (res) {
      const { errorCode, errorMessage, page, ...otherVals } = res;

      return { ...otherVals, skip: page };
    }

    return [];
  }
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    //@ts-ignore
    useInfiniteQuery({
      queryKey: ["posts", router.query],
      queryFn: fetchPage,
      //@ts-ignore
      initialPageParam: { skip: 0 },
      getNextPageParam: (lastPage) => {
        if (lastPage) {
          //@ts-ignore
          let { count, skip, perPage } = lastPage;
          if (count - (skip + 1) * perPage > 0) {
            return { skip: skip + 1 };
          }
        }

        return undefined;
      },
      staleTime: "Infinity",
      gcTime: "Infinity",
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      //@ts-ignore
      initialData: (e) => {
        return {
          pages: [{ data: posts, perPage, skip: 0, count }],
          pageParams: { skip: 0, perPage: 24, count },
        };
      },
    });

  const post_list: JSX.Element[] = [];
  data?.pages?.map((page: any) => {
    if (page.data) {
      page?.data?.map((post: any, index: number) => {
        post_list.push(
          <Col
            flexGrow={1}
            flexShrink={1}
            pb={"8px"}
            maxWidth={["100%", "100%", "100%", "100%", "100%"]}
            flexBasis={["100%", "100%", "100%", "100%", "100%"]}
            key={uuidv4()}
          >
            <CardBox border={"1px solid #D5D5D5"} post={post} />
          </Col>
        );
      });
    } else {
      null;
    }
  });

  const token = Cookies.get("token");
  return (
    <>
      <TopSearchJobs color={"black"} bg={"#F5F6FA"} />
      <JobSearchFilters />
      <ContentWrapper className="container">
        <JobList>
          <InfiniteScroll
            next={fetchNextPage}
            hasMore={hasNextPage ?? false}
            dataLength={post_list.length}
            loader={"در حال بارگذاری..."}
            height={"90vh"}
          >
            <Container pr={0} pl={0} mt={["5px", "10px"]}>
              <Row
                pb={["80px", "0"]}
                className={clsx({ home: false, "home-after": scroll })}
                justifyContent={"flex-start"}
              >
                {post_list}
              </Row>
              <Row>
                {isFetchingNextPage &&
                  Array.from({ length: 12 }, (v, i) => i).map((i) => (
                    <Col
                      flexGrow={1}
                      flexShrink={1}
                      pb={"8px"}
                      maxWidth={["100%", "100%", "100%", "100%", "100%"]}
                      flexBasis={["100%", "100%", "100%", "100%", "100%"]}
                      key={post_list.length + i}
                    >
                      <PlaceholderCard />
                    </Col>
                  ))}
              </Row>
            </Container>
          </InfiniteScroll>
        </JobList>
        <JobInfo>
          {(!job || !job.id) && count !== 0 ? (
            <DefaultCard />
          ) : job && job.id ? (
            <JobCard
              isLogged={isLogged !== undefined && token !== undefined}
              post={job}
            />
          ) : (
            <NotFoundCard />
          )}
        </JobInfo>
      </ContentWrapper>
      <Footer />
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const queryParams = parseQueryParameters(query);

  const { data, page, count, perPage } = await fetchJobAdsData(queryParams);
  return {
    props: {
      posts: data,
      skip: 0,
      page,
      count,
      perPage,
    },
  };
};
