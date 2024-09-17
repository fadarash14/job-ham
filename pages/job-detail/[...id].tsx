import React, { useCallback, useState, useRef, useEffect } from "react";
import styled from "styled-components";
const DetailAd = dynamic(() => import("@/components/job detail/DetailAd"), {
  ssr: false,
});
const EditAd = dynamic(() => import("@/components/job detail/EditAd"), {
  ssr: false,
});
import Container from "../../components/utility/Container";
import Image from "next/image";
import Footer from "../../components/footer/Footer";
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
  textAlign,
  TextAlignProps,
} from "styled-system";
import dynamic from "next/dynamic";
import { showLoginModal } from "@/store/pageConfig";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { loadSingleWizard } from "../../requests/singleWizard";
import moment from "jalali-moment";
import _, { parseInt } from "lodash";
import { IAdJob } from "../../types";
import { safeXss } from "../../utils/helper";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { query } from "../../utils/request";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Cookies from "js-cookie";
import { sendCvToCompany } from "@/requests/cv";
import { useForm } from "react-hook-form";
import { Ads } from "@/types";
import SubmitMessage from "@/components/utility/SubmitMessage";
import { setSingleId } from "@/store/cvList";
import { getCompanyAdsList } from "@/requests/profile/companyListAds";
//@ts-ignore
// const MapWithNoSSR = dynamic(() => import("../../components/wizard/Map"), {
//   ssr: false,
// });

type Props = {
  post: IAdJob;
  jobOpportunitiesCount: any;
};

const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Main1 = styled.div<LayoutProps | SpaceProps>`
  display: flex;
  align-items: center;
  margin-top: 5px;
  ${space}
  ${layout}
`;

const Span = styled.span<
  | FontSizeProps
  | FontWeightProps
  | SpaceProps
  | LayoutProps
  | ColorProps
  | TextAlignProps
>`
  text-align: center;
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
  ${color}
  ${textAlign}
`;
const Buttons = styled.div`
  display: flex;
  margin: 15px;
  @media (max-width: 960px) {
    align-items: center;
    & .share {
      width: 22px;
      height: 22px;
    }
  }
`;
const Img = styled.div`
  cursor: pointer;
  height: 30px;
`;
const SendResume = styled.button<LayoutProps | ColorProps | BorderProps>`
  border: 1px solid #1abc9c;
  color: white;
  font-size: 14px;
  justify-content: center;
  text-align: center;
  min-width: 154px;
  height: 33px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 5px;
  border: none;
  border-radius: 2px;

  & > span {
    font-size: 12px;
    font-weight: 500;
  }
  @media (max-width: 960px) {
    min-width: fit-content;
    padding-inline: 10px;
    font-size: 12px;
    border-radius: 5px;
    white-space: nowrap;
  }
  ${layout}
  ${color}
  ${border}
  ${backgroundColor}
`;
const LinkButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover{
    text-decoration: underline;
  }
`;

const SendResumeMobile = styled.button`
  display: block;
  position: sticky;
  bottom: 0;
  left: 0;
  min-width: 100vw;
  background-color: #1abc9c;
  color: #fff;
  border: none;
  padding: 8px;
  cursor: pointer;
  text-align: center;
  margin-top: auto;
  & > span {
    font-size: 12px;
    font-weight: 500;
  }
  &:disabled {
    background-color: #a6a6a6;
    cursor: not-allowed;
  }
`;

const Typography = styled.p<SpaceProps>`
  margin: 0;
  color: #474546;
  ${space}
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background: #d5d5d5;
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

const Descript = styled.div`
  color: #474546;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const Ad = styled.div<SpaceProps>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
  flex-grow: 1;
  ${space}
`;
const Headmobile = styled.div<LayoutProps>`
  align-items: center;
  display: flex;
  width: 100%;
  margin: 10px 0;
  position: relative;
  padding-bottom: 10px;
  &::after {
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    background: grey;
    bottom: 0;
    position: absolute;
  }
  ${layout}
`;

const Where = styled.label`
  color: #acacac;
  margin-right: 5px;
  font-size: 12px;
`;

const Header = styled.div`
  color: #474546;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow: hidden;
  & .title {
    @media (max-width: 960px) {
      font-size: 14px;
      white-space: normal;
      margin-bottom: 0;
    }
  }
  & .cTitle span {
    @media (max-width: 960px) {
      font-size: 12px;
      white-space: nowrap;
    }
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;
const Name = styled.div<SpaceProps | LayoutProps>`
  ${space}
  ${layout}
`;
const Input = styled.input`
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  height: 40px;
  background: white;
  width: 100%;
  min-width: 125px;
  &.onFocus {
    &:focus {
      text-align: right;
      direction: ltr;
    }
  }

  &::-webkit-inner-spin-button {
    display: none;
  }
`;
const dictionary = (val: keyof typeof changer): string => {
  const changer: Record<string, string> = {
    typeCooperationId: "نوع همکاری",
    workHour: "روز و ساعت کاری",
    businessTrips: "سفرهای کاری",
    salaryId: "حقوق",
    advantageId: "مزایا و تسهیلات",
    jobDescription: "شرح شغل",
    description: "درباره شرکت",
    industryId: "صنعت",
    sizeCompanyId: "اندازه سازمان",
    typeOwnerShipId: "نوع مالکیت",
    typeActivityCompanyId: "نوع فعالیت",
    establishedYear: "سال تاسیس",
    descriptionServices: "محصولات و خدمات",
    skillDescription: "مهارت های مورد نیاز",
    sexId: "جنسیت",
    experienceId: "حداقل سابقه کار",
    fieldStudyId: "رشته تحصیلی",
    gradeId: "حداقل مدرک تحصیلی",
    languages: "زبان",
    ageMinId: "حداقل سن متقاضی",
    ageMaxId: "حداکثر سن متقاضی",
    organizationPostId: "پست سازمانی",
  };
  return changer[val] || "";
};

// const Button23 = styled.button<{ isClicked: boolean }>`
//   display: flex;
//   padding: 8px 32px;
//   font-size: 15px;
//   background: ${(props) => (props.isClicked ? "#db143d" : "white")};
//   color: ${(props) => (props.isClicked ? "white" : "#db143d")};
//   border: ${(props) =>
//     props.isClicked ? "1px solid white" : " 1px solid #db143d"};
//   border-radius: 12px;
//   margin-left: 20px;
//   text-align: center;
//   cursor: pointer;
//   &.ads {
//     right: 180px;
//   }
// `;

export default function SingleJob({ post, jobOpportunitiesCount }: Props) {
  // console.log({ post, jobOpportunitiesCount });
  console.log({ post });
  const [allData, setData] = useState<any>(post);
  const [show, setShow] = useState(false);
  const [saveReport, saveReportShow] = useState(false);
  const [reportShow, showReport] = useState(false);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [ShR, setShR] = useState(false);
  const [toast, setToast] = useState(false);
  const [note, setNote] = useState(false);
  const [shareClicked, setShareClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<"success" | "fail" | "pending" | "">("");
  type IFormInput = Ads;
  useForm<IFormInput>({
    defaultValues: allData,
  });
  const { isLogged } = useAppSelector((state) => state.sign);
  const { baseInfo } = useAppSelector((state) => state.cvInfo);
  const { idList } = useAppSelector((state) => state.cvList) as {
    idList: string[];
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const router = useRouter();
  const {
    query: { editMode },
  } = router;
  // console.log(editMode);

  let gallery = useRef(null);
  const dispatch = useAppDispatch();

  const escapeListener = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && gallery.current) {
      //@ts-ignore
      gallery?.current?.exitFullScreen();
    }
  }, []);
  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (
        //@ts-ignore
        e.target?.nodeName?.toLowerCase() !== "img" &&
        //@ts-ignore
        (e.target.classList.contains("image-gallery") ||
          //@ts-ignore
          e.target.classList.contains("fullscreen")) &&
        //@ts-ignore
        gallery?.current?.exitFullScreen
      ) {
        //@ts-ignore
        gallery?.current?.exitFullScreen();
      }
    },
    [gallery.current]
  );

  useEffect(() => {
    document.addEventListener("click", clickListener);
    document.addEventListener("keyup", escapeListener);

    return () => {
      document.removeEventListener("click", clickListener);
      document.removeEventListener("keyup", escapeListener);
    };
  }, [clickListener]);

  function _onScrollY(e: UIEvent) {
    const target = e.target as HTMLDivElement;
    if (-(target.scrollLeft - 1) + target.clientWidth === target.scrollWidth) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
    if (target.scrollLeft !== 0) {
      setShR(true);
    } else {
      setShR(false);
    }
  }
  let src: string = "/icons/null-svg/1180n.svg";

  const CopyUrl = () => {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };
  const reportsReasons = async () => {
    return await query("reportsReasons", null, { id: true, value: true });
  };
  const { data } = useQuery({
    queryKey: ["ERRORlIST"],
    queryFn: reportsReasons,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
  moment.locale("fa");
  const sendStatus = idList.includes(post.id)
    ? { active: false, message: "رزومه ارسال شده است" }
    : { active: true, message: "ارسال رزومه" };
  const onClickHandler = () => {
    const setError = () => {
      setMessage("رزومه شما قبلا ارسال شده است.");
      setStatus("fail");
      setShowModal(true);
    };
    !isLogged
      ? dispatch(showLoginModal(true))
      : sendStatus.active
      ? SendResumeHandler()
      : setError();
  };
  const renderSubmitButton = () => {
    return (
      <div>
        <SendResume
          onClick={onClickHandler}
          disabled={!sendStatus.active}
          className="sendResume just-desktop"
          backgroundColor={sendStatus.active ? "green" : "very_light_pink"}
        >
          <Span fontSize={16} fontWeight={600}>
            {sendStatus.message}
          </Span>
        </SendResume>
        <SendResume
          className="ads"
          onClick={() => handleLink(1)}
          backgroundColor={"#fff"}
          color="#db143d"
          border="1px solid #db143d"
        >
          {`${jobOpportunitiesCount} فرصت شغلی`}
        </SendResume>
      </div>
    );
  };

  function handleShareClick() {
    setShareClicked(!shareClicked);
    CopyUrl();
  }
  const SendResumeHandler = async () => {
    setShowModal(true);
    setStatus("pending");
    const { id: cv_id } = baseInfo;
    const adv_id = post.id;
    const company_id = parseInt(post.company.id);
    const token = Cookies.get("token")!;
    const response = await sendCvToCompany(
      parseInt(cv_id),
      company_id,
      parseInt(adv_id),
      token
    );
    if (!response.errorCode) {
      setMessage("درخواست شما با موفقیت ارسال شد");
      dispatch(setSingleId(post.id));
      setStatus("success");
      setTimeout(() => {
        setShowModal(false);
        setMessage("");
        setStatus("");
      }, 2000);
    } else {
      setStatus("fail");
    }
  };

  const handleLink = (tabNumber: number) => {
    router.push(
      {
        pathname: `/companies/[id]`,
        query: { id: post.company.id, tab: tabNumber },
      },
      `/companies/${post.company.id}`
    );
  };

  return (
    <Ad
      // pb={["70px", "0"]}
      className={show || saveReport || note || reportShow ? "lock-scroll" : ""}
    >
      <Head>
        <title>آگهی {post.jobTitle}</title>
        {/* <meta name="description" content={post.content} />
        {seo_descriptions[router.asPath] &&
        seo_descriptions[router.asPath]["metadescription"]
          ? seo_descriptions[router.asPath]["title"]
          : post.content && <meta name="description" content={post.content} />}
        {seo_descriptions[router.asPath] &&
        seo_descriptions[router.asPath]["metadescription"]
          ? seo_descriptions[router.asPath]["title"]
          : post.content && <meta name="twitter:card" content={post.content} />}
        {seo_descriptions[router.asPath] &&
        seo_descriptions[router.asPath]["title"]
          ? seo_descriptions[router.asPath]["title"]
          : post.name && <meta name="twitter:title" content={post.name} />}
        {seo_descriptions[router.asPath] &&
        seo_descriptions[router.asPath]["metadescription"]
          ? seo_descriptions[router.asPath]["title"]
          : post.content && (
              <meta name="twitter:description" content={post.content} />
            )}
        {seo_descriptions[router.asPath] &&
        seo_descriptions[router.asPath]["title"]
          ? seo_descriptions[router.asPath]["title"]
          : post.name && <meta property="og:title" content={post.name} />}
        {seo_descriptions[router.asPath] &&
        seo_descriptions[router.asPath]["metadescription"]
          ? seo_descriptions[router.asPath]["title"]
          : post.content && (
              <meta property="og:description" content={post.content} />
            )} */}
      </Head>
      <Container display={["flex", "none"]}>
        <Headmobile onClick={router.back}>
          <Flex>
            <Image
              src={"/icons/heLogo.svg"}
              height={25}
              width={25}
              alt="logo"
            />
            <Name mr={"5px"}>نیـازمندی‌های هـمشـهری</Name>
          </Flex>
          <Name height={"25px"} mr={"auto"}>
            <Image
              src={"/icons/mobile-left-arrow.svg"}
              height={25}
              width={25}
              alt="left arrow"
            />
          </Name>
        </Headmobile>
      </Container>
      <Main className="container">
        <Box>
          <Header>
            <Span
              color={"#474546"}
              marginBottom={"15px"}
              fontSize={20}
              fontWeight={600}
              textAlign={"right"}
              className="title"
            >
              {post.jobTitle}
            </Span>
            <div>
              <div className="cTitle">
                <Span dir="rtl">
                  <LinkButton onClick={() => handleLink(0)}>
                    {post?.company?.nameCompany}
                  </LinkButton>
                  -{" "}
                </Span>
                <Span dir="rtl" fontWeight={400} fontSize={14}>
                  {moment(
                    String(post?.releasedAt).length < 11
                      ? post?.releasedAt * 1000
                      : post?.releasedAt
                  ).fromNow()}
                </Span>
              </div>
              <Main1>
                <Image
                  src={"/icons/Location.svg"}
                  alt="location"
                  width={12}
                  height={12}
                />
                <Where>
                  <Span fontWeight={400} fontSize={12}>
                    {post.areaString
                      ? post.areaString.replace("/", "،")
                      : post.cityName}
                  </Span>
                </Where>
              </Main1>
            </div>
          </Header>
          {editMode !== "true" ? (
            <Buttons>
              <Img>
                <Image
                  className="share"
                  src={"/icons/sharing.svg"}
                  alt="اشتراک گذاشتن"
                  width={30}
                  height={30}
                />
              </Img>

              {renderSubmitButton()}
            </Buttons>
          ) : null}
        </Box>
        <Divider />
        {editMode === "true" ? (
          <EditAd allData={allData} setData={setData} dictionary={dictionary} />
        ) : (
          <DetailAd allData={allData} dictionary={dictionary} />
        )}
      </Main>
      <Footer pb={"85px"} classNames={"containersingle just-desktop"} />
      <SendResumeMobile
        onClick={onClickHandler}
        disabled={!sendStatus.active}
        className="just-mobile"
      >
        <Span fontSize={16} fontWeight={600}>
          {sendStatus.message}
        </Span>
      </SendResumeMobile>
      {showModal && (
        <SubmitMessage
          status={status}
          message={message}
          setShow={setShowModal}
        />
      )}
    </Ad>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { query } = context;
    let id = query?.id?.[0];
    if (!id) {
      return { props: { post: {} } };
    }

    const { data } = await loadSingleWizard({ id: parseInt(id) });

    if (data.length > 0) {
      const jobOpportunities = await getCompanyAdsList({
        id: parseInt(data[0].company.id),
        skip: 0,
        limit: 24,
        sort: "Desc",
      });

      return {
        props: {
          post: safeXss(data[0]),
          jobOpportunitiesCount: jobOpportunities.data.count,
        },
      };
    } else {
      context.res.statusCode = 404;
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error(error);
    return { props: { error: "خطایی رخ داده است" } };
  }
}
