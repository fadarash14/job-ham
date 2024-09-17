import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { CSSObject, keyframes } from "styled-components";
import {
  BorderProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  border,
  ColorProps,
  color,
  ZIndexProps,
  zIndex,
} from "styled-system";
import Image from "next/image";
import MainFilters from "./MainFilters";
import _ from "lodash";
import AdsUploadContext from "./AdsUploadContext";
import steps from "./AdsUploadConfig";
import Contact from "./Contact";
import Box from "../utility/Box";
import VerificationModal from "./VerificationModal";
import { registerAdsRequest, updateAds } from "../../requests/wizard";
import { useRouter } from "next/router";
import ErrorMessage from "../log in/ErrorMessage";
import dynamic from "next/dynamic";
import AdsCityAreaModals from "./AdsCityAreaModals";
import AdsMapModals from "./AdsMapModals";
import AdsRandomError from "./AdsRandomError";
import Cookies from "js-cookie";
import { DownloadTypesApp } from "../../utils/mobileConfig";
import CompanyFilters from "./CompanyFilters";
import simpleFilters from "@/dictionaries/simple-filters.json";
import cFilters from "@/dictionaries/company-filters.json";
import AdditionalCompanyFilters from "./AdditionalCompanyFilters";
import { useAppSelector } from "@/store/hook";
import { object } from "yup";
//@ts-ignore
const SelectedMap = dynamic(
  () => import("../../components/addWizard/SelectedMap"),
  {
    ssr: false,
  }
);

const fadeIn = keyframes`
 0% { opacity: 0; transform:translate(0,100%)}
 100% { opacity: 1; transform:translate(0,0)}
`;
const fade = keyframes`
 0% { opacity: 0;}
 100% { opacity: 1}
`;

const Img = styled.div<FlexboxProps | LayoutProps | SpaceProps>`
  align-items: center;
  display: flex;
  &.map {
    left: 10px;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 999;
    width: 20px;
    position: absolute;
  }
  ${layout}
  ${flexbox}
    ${space}
`;

const Loc = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  animation-name: ${fade};
  animation-duration: 1s;
  animation-iteration-count: 1;
`;

const Topic = styled.div<BorderProps>`
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  flex: 1 1 90%;
  height: 40px;
  ${border}
`;
const Red = styled.button<LayoutProps | ColorProps | BorderProps>`
  background: #db143d;
  border-radius: 12px;
  padding: 10px 30px;
  color: white;
  font-size: 14px;
  text-align: center;
  max-width: fit-content;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: auto;
  border: none;
  &:disabled,
  [disabled] {
    opacity: 0.8;
  }
  ${layout}
  ${color}
    ${border}
`;

const Text = styled.div`
  font-size: 11px;
  color: #707070;
  align-items: center;
  margin-bottom: 8px;
  display: flex;
`;
const Piece = styled.div`
  flex: 1 1;
`;
const Where = styled.div`
  width: fit-content;
`;

const Flex = styled.div<FlexboxProps | ZIndexProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 960px) {
    &.mobile {
      flex-direction: column;
      align-items: baseline;
    }
  }
  @media (max-width: 1300px) {
    &.tablet {
      flex-direction: column;
      align-items: baseline;
    }
  }
  ${flexbox}
  ${zIndex}
`;
const FlexInput = styled.div<FlexboxProps | SpaceProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  ${flexbox}
  ${space}
`;

const LocationFinder = styled.div`
  margin-top: 24px;
  display: flex;
  position: relative;
`;
const TickPos = styled.div<LayoutProps>`
  display: flex;
  min-width: fit-content;
  ${layout}
`;
const Tick = styled.div<LayoutProps>`
  margin: auto 10px auto 0;
  ${layout}
`;
const Gps = styled.div<BorderProps | SpaceProps>`
  width: 100%;
  padding: 5px;
  align-items: center;
  display: flex;
  height: 80px;
  border-radius: 18px;
  font-size: 12px;
  color: #474546;
  text-align: center;
  cursor: pointer;
  margin-bottom: 8px;
  flex: 1 1;
  ${border}
  ${space}
`;

const Back = styled.div`
  align-items: center;
  display: flex;
  background-image: url("/icons/map.svg");
  background-repeat: no-repeat;
  background-size: cover;
  margin: auto;
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  border-radius: 18px;
`;

const Part = styled.div<LayoutProps | SpaceProps>`
  animation-name: ${fadeIn};
  animation-duration: 1s;
  animation-iteration-count: 1;
  width: 40%;
  margin: auto;
  @media (max-width: 1400px) {
    width: 50% !important;
  }
  @media (max-width: 1200px) {
    width: 65% !important;
  }
  @media (max-width: 768px) {
    width: 100% !important;
    margin: 0;
  }
  ${layout}
  ${space}
`;

const SetAds = styled.div<LayoutProps>`
  margin-bottom: 10px;
  margin-top: auto;
  position: sticky;
  background: #f5f6fa;
  bottom: 0;
  margin: auto auto 0 auto;
  &::before {
    content: "";
    display: block;
    height: 1px;
    background: grey;
    width: 100%;
    margin: 0 0 10px 0;
  }
  @media (max-width: 1400px) {
    width: 50% !important;
  }
  @media (max-width: 1200px) {
    width: 65% !important;
  }
  @media (max-width: 768px) {
    width: 100% !important;
    margin: 0;
  }
  ${layout}
`;

// @ts-ignore
const Div = styled.div<any>((props: { userscroll: boolean }): CSSObject => {
  return {
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    paddingTop: "60px",
    transition: "0.5s margin-top",
    scrollBehavior: "smooth",
    // "&::before": {
    //     content:'""',
    //     display:'block',
    //     position:'sticky',
    //     height:'60px',
    //     width:'100%',
    //     top:'-25px',
    //     background:'linear-gradient(to bottom, #f5f6fa, rgba(245, 246, 250, 0) 90%)',
    //
    // }
    //
    "@media(max-width:576px)": {
      paddingTop: "100px",
      height: "80vh",
    },
  };
});

const Whole = styled.div<LayoutProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: auto;
  &::before {
    content: "";
    display: block;
    position: absolute;
    height: 50px;
    width: 60%;
    right: 50%;
    transform: translate(50%, 0);
    background: linear-gradient(to bottom, #f5f6fa, rgba(245, 246, 250, 0) 90%);
    z-index: 1;
  }
  @media (max-width: 1001px) {
    &::before {
      width: 100% !important;
      margin: 0;
    }
  }
  ${layout}
`;

export default function AdsForm(props: PropsWithChildren<any>) {
  const [show, setShow] = useState(false);
  const [showLoc, setShowLoc] = useState(false);
  const [verModal, setVerModal] = useState({ show: false, mobile: "" });
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [validity, setValidity] = useState(false);
  const [message, setMessage] = useState("");
  const [userscroll, setUserscroll] = useState(false);
  const [company, setCompany] = useState<any>(null);
  const [download, setDownloadType] = useState<string>("pwa");
  const companyInfo = useAppSelector((state) => state.companyInfo);

  const [loading, setLoading] = useState(false);
  const {
    setStep,
    category,
    setLevel,
    level,
    city,
    area,
    selectedFilter,
    pictures,
    sex,
    typeCooperations,
    setId,
    editMode,
    setFiltersCompleted,
    lat,
    long,
    setPaused,
    companyArea,
    mobile,
    companycity,
    organizationPost,
  } = useContext(AdsUploadContext);

  const Nlat = Number(lat);
  const Nlong = Number(long);

  const [latN, setLatN] = useState(Nlat);
  const [longN, setLongN] = useState(Nlong);

  function _onScrollY(e: UIEvent) {
    const target = e.target as HTMLDivElement;
    if (target.scrollTop == 0) {
      setUserscroll(true);
    } else {
      setUserscroll(false);
    }
  }

  const onScrollY: Function = useCallback(_.debounce(_onScrollY, 100), []);

  const onShow = () => {
    setShow(true);
  };
  const onShowLoc = () => {
    setShowLoc(true);
  };
  let scrl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    //@ts-ignore
    if (window && window.rahnama) {
      //@ts-ignore
      if (window?.rahnama?.getDownloadType) {
        // @ts-ignore
        let type = window?.rahnama?.getDownloadType();
        switch (type) {
          case DownloadTypesApp.Myket:
            setDownloadType("myket");
            break;
          case DownloadTypesApp.KafeBazar:
            setDownloadType("bazar");
            break;
          default:
            setDownloadType("pwa");
        }
      }
    }
  }, []);

  const convertToId = (data: any) => {
    if (Array.isArray(data)) {
      let values: any[] = [];
      data.map((item) => {
        if (item.value) {
          values.push(item.value);
        } else {
          values.push(item);
        }
      });
      return values;
    }
    if (typeof data !== "object" || data === null) {
      return data;
    }
    if ("value" in data && "label" in data) {
      return data.value;
    }
  };
  const convertSelectedFilters = () => {
    let datas: { [key: string]: any } = { company: {} };
    const init = [...simpleFilters.filters, ...cFilters.filters];
    Object.keys(selectedFilter).map((key) => {
      const dataKey = init.find((x) => x.id === parseInt(key))?.key;
      if (dataKey && dataKey !== undefined) {
        const filter = selectedFilter[parseInt(key)];
        // for company filters
        if (parseInt(key) > 15) {
          if (dataKey === "orgLocation") {
            datas.company.areaId = filter.area?.id;
            datas.company.cityId = filter.city?.id;
          } else if (dataKey === "address") {
            datas[dataKey] = filter;
          } else if (dataKey === "picture") {
            delete datas.company[dataKey];
          } else {
            const value = convertToId(filter);
            datas.company[dataKey] = value;
          }
          if (companyInfo.hasCompany && companyInfo.id !== "") {
            const selectedCompany = companyInfo.data.filter(
              (company) => company.id === companyInfo.id
            )[0];
            let { bannerId, logoId, areaString, user_id, id, ...other } =
              selectedCompany;

            const newobj = { ...other };
            datas.company = newobj;
          }
        } else {
          if (city || area) {
            datas.cityId = city?.id;
            datas.areaId = area?.id;
          }

          if (datas.advantageIds == "") {
            datas.advantageIds = [];
          }
          if (datas.languages == "") {
            datas.languages = [];
          }
          if (datas.skills == "") {
            datas.skills = [];
          }
          // both are one field but in backend are seperated
          if (parseInt(key) === 2) {
            datas.workHour = datas.workDay;
          }
          // from the adsCategoryBuilder
          datas.jobId = category?.id;
          datas.typeCooperationId = typeCooperations;
          datas.organizationPostId = organizationPost;
          datas.sexId = sex;
          datas.mobile = mobile;
          // datas.company.bannerId = "";
          if (lat.length > 0 && long.length > 0) {
            datas.location = `${lat.substr(0, 16)}/${long.substr(0, 16)}`;
          } else if (lat.length == 0 && long.length == 0) {
            datas.location = "";
          }
          const value = convertToId(filter);
          datas[dataKey] = value;
        }
      }
    });
    return datas;
  };

  function registerAds() {
    setPaused(0);
    let _pics: string[] = [];
    pictures.map((p) => {
      let valid = p.split("base64,");
      if (valid.length > 1) {
        _pics.push(valid[1]);
      }
    });

    const data = convertSelectedFilters();
    console.log(data);

    setVerModal((prev) => ({ ...prev, show: false }));
    setErrorSubmit(false);
    setLoading(true);
    registerAdsRequest({ ...data })
      .then((e) => {
        if (e.data) {
          if (setId) setId(e.data.id);
          if (companyInfo.id === "") {
            setCompany(data.company);
          }
          setVerModal({ mobile: data.mobile, show: true });
        } else {
          setErrorSubmit(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setErrorSubmit(true);
        setLoading(false);
      });
  }
  useEffect(() => {
    setLatN(Nlat);
    setLongN(Nlong);
  }, [Nlat, Nlong]);
  function isEveryItemValid(
    obj: { [keys: number]: any },
    base: { [keys: number]: any }
  ) {
    const values = { ...obj };
    Object.keys(values).map((key) => {
      const baseKey = parseInt(key) - 1;
      if (!base[baseKey].is_required) {
        delete values[key as unknown as number];
      }
    });
    return Object.values(values).every((value) => {
      return value !== "" && value !== null && value !== undefined;
    });
  }
  const checkValidity = () => {
    const init = [...simpleFilters.filters, ...cFilters.filters];
    let values: {
      [k: string]: any;
    };
    if (level == 2) {
      values = Object.fromEntries(Object.entries(selectedFilter).slice(0, 15));
    } else {
      //orgLocation contains two fields
      selectedFilter[22] = { area: companyArea, city: companycity };
      values = selectedFilter;
    }
    if (companyInfo.hasCompany) {
      values = Object.fromEntries(Object.entries(selectedFilter).slice(0, 15));
    }
    //For not validating the image values from values variable
    values[30] = " ";
    const isValid: boolean = isEveryItemValid(values, init);

    if (isValid) {
      let _level = 0;
      if (companyInfo.hasCompany && companyInfo.id !== "" && level == 2) {
        _level = 4;
      } else {
        _level = +level + 1;
      }
      setFiltersCompleted(true);
      setLevel(_level);
    } else {
      setValidity(false);
      setMessage("");
    }
  };

  // @ts-ignore
  const location: [Location] = area?.id ? area : city?.id ? city : null;
  return (
    <Whole>
      <Div
        ref={scrl}
        className={"scroll-d-none"}
        userscroll={userscroll}
        onScroll={onScrollY}
      >
        {/*<BoxShadow userscroll={userscroll}/>*/}
        <Part>
          <Text>دستــه بـنـدی</Text>
          <FlexInput mb={"8px"}>
            <Topic border={"1px solid #00C39C"}>
              {category && <div>{category?.address}</div>}
              <Img
                className={"remove"}
                onClick={() => {
                  if (!editMode) {
                    setStep(steps["select_category"]);
                    setLevel(0);
                  }
                }}
              >
                {!editMode && (
                  <Image
                    height={20}
                    width={20}
                    src={"/icons/grey-remove.svg"}
                    alt="remove"
                  />
                )}
              </Img>
            </Topic>
            <TickPos>
              <Tick>
                <Image
                  src={"/icons/green tick.svg"}
                  height={10}
                  width={15}
                  alt="tick"
                />
              </Tick>
            </TickPos>
          </FlexInput>
          <Text>محــدوده فعالیت</Text>
          <FlexInput>
            {
              <Topic
                border={
                  //@ts-ignore
                  area.id !== -1 && city.id !== -1 ? "1px solid #00C39C" : ""
                }
                onClick={onShow}
              >
                {
                  //@ts-ignore
                  area?.id !== -1 && city?.id !== -1 ? (
                    <Box>
                      {city?.name} - {area?.name}
                    </Box>
                  ) : (
                    <Img mr={"auto"}>
                      <Image
                        width={10}
                        height={10}
                        src={`/icons/ads-left-arrow.svg`}
                        alt="arrow"
                      />
                    </Img>
                  )
                }
              </Topic>
            }
            <TickPos width={"24px"}>
              <Tick width={"15px"}>
                {level >= 2 && (
                  <Image
                    src={"/icons/green tick.svg"}
                    height={10}
                    width={15}
                    alt="tick"
                  />
                )}
              </Tick>
            </TickPos>
          </FlexInput>
          <Text>
            <Img height={"15px"} ml={"10px"}>
              <Image
                src={"/icons/Arrow - Left 2.svg"}
                height={8}
                width={8}
                alt="arrow left"
              />
            </Img>
            لطــفـا شــهـر و محــله خـود را انتـخــاب کنــید.
          </Text>
          {level >= 2 && download === "pwa" && (
            <LocationFinder>
              <Piece>
                <Flex>
                  <Gps
                    border={
                      latN == 0 && longN == 0
                        ? "1px dashed #fba303"
                        : "1px dashed #00C39C"
                    }
                  >
                    {latN === 0 && longN === 0 ? (
                      <Back onClick={onShowLoc}>
                        <div
                          style={{
                            margin: "auto",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Img height={20}>
                            <Image
                              src={"/icons/Iconly-Curved-Location.svg"}
                              height={20}
                              width={20}
                              alt="location"
                            />
                          </Img>
                          <div>انتخاب محدوده آگهی روی نقشه</div>
                        </div>
                      </Back>
                    ) : (
                      <Loc>
                        {
                          //@ts-ignore
                          <SelectedMap lat={latN} long={longN} />
                        }
                        <Img
                          className={"map"}
                          onClick={(e) => {
                            setLatN(0);
                            setLongN(0);
                            e.stopPropagation();
                          }}
                        >
                          <Image
                            height={20}
                            width={20}
                            src={"/icons/grey-remove.svg"}
                            alt="remove"
                          />
                        </Img>
                      </Loc>
                    )}
                  </Gps>
                  <TickPos width={"24px"}>
                    <Tick width={"15px"}>
                      {latN !== 0 && longN !== 0 ? (
                        <Image
                          src={"/icons/green tick.svg"}
                          height={10}
                          width={15}
                          alt="green tick"
                        />
                      ) : null}
                    </Tick>
                  </TickPos>
                </Flex>
                <Text>
                  <Img height={"15px"} ml={"10px"}>
                    <Image
                      src={"/icons/Arrow - Left 2.svg"}
                      height={8}
                      width={8}
                      alt="left arrow"
                    />
                  </Img>
                  شما می توانـید محـدوده آگهـی خود را از روی نقـشه نیز مشـخص
                  کنـید.
                </Text>
              </Piece>
            </LocationFinder>
          )}
          {level >= 2 && (
            <MainFilters
              label={"اطــلاعــات شغلـی"}
              main={true}
              proceed={validity}
              message={message}
            />
          )}
        </Part>
        {level >= 2 && (
          <Part mb={"50px"}>
            <MainFilters
              label={"احراز شغل"}
              main={false}
              proceed={validity}
              message={message}
            />
          </Part>
        )}
        {!companyInfo.hasCompany || companyInfo.id === "" ? (
          <>
            {" "}
            {level >= 3 && (
              <Part mb={"50px"}>
                <CompanyFilters
                  label={"اطلاعات رابط سازمان"}
                  main={false}
                  proceed={validity}
                  message={message}
                />
              </Part>
            )}
            {level >= 3 && (
              <Part mb={"50px"}>
                <CompanyFilters
                  label={"اطلاعات سازمان"}
                  main={true}
                  proceed={validity}
                  message={message}
                />
              </Part>
            )}
            {level >= 3 && (
              <Part mb={"50px"}>
                <AdditionalCompanyFilters
                  label={"اطــلاعات سازمان (تکمیلی)"}
                  main={false}
                  proceed={validity}
                  message={message}
                />
              </Part>
            )}
          </>
        ) : null}
        {level >= 4 && (
          <Part mb={"100px"}>
            <Contact />
          </Part>
        )}
        <AdsCityAreaModals show={show} setshow={setShow} />
        {
          <AdsMapModals
            show={showLoc}
            setShow={setShowLoc}
            //@ts-ignore
            location={location}
          />
        }
      </Div>
      <SetAds width={["100%", "100%", "50%", "40%"]}>
        <Flex zIndex={10}>
          {!validity && level === 2 ? <ErrorMessage message={message} /> : null}
          {level == 5 ? (
            <Red onClick={registerAds}>
              {loading && (
                <Image
                  src={"/icons/loading_j.gif"}
                  height={20}
                  width={20}
                  alt="gif save"
                />
              )}
              {editMode ? (
                <Where>ثبـت ویـرایـش آگـهی</Where>
              ) : (
                <span>ثبـت آگـهی</span>
              )}
            </Red>
          ) : (
            <Red onClick={checkValidity}>
              <span>ادامه</span>
            </Red>
          )}
        </Flex>
      </SetAds>
      <VerificationModal
        setVerModal={() =>
          setVerModal((prev) => ({ ...prev, show: !prev.show }))
        }
        verModal={verModal.show}
        mobile={verModal.mobile}
        company={company}
      />
      <AdsRandomError
        saveReport={errorSubmit}
        saveReportShow={setErrorSubmit}
      />
    </Whole>
  );
}
