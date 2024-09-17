import Back from "../../public/icons/Iconly-Curved-Arrow - Left Circle.svg";
import React, {
  Dispatch,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  SpaceProps,
} from "styled-system";
import { User } from "../../types";
import ErrorMessage from "../log in/ErrorMessage";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Close from "../../public/icons/white-close-modal.svg";
import Logo from "../../public/icons/Mask Group 48.svg";
import ModalSkeleton from "../utility/ModalSkeleton";
import { useRouter } from "next/router";
import AdsUploadContext from "./AdsUploadContext";
import sign, { defaultSignIn } from "../../store/sign";
import { registerAdsRequest, verifyAdsRequest } from "../../requests/wizard";
import CloseSvgWhite from "../../public/icons/white-close-modal.svg";
import { showLoginModal } from "../../store/pageConfig";
import { Timer } from "../log in/Timer";
import simpleFilters from "@/dictionaries/simple-filters.json";
import cFilters from "@/dictionaries/company-filters.json";
import convertDigitToEnglish from "../../utils/helper";
import Toast from "../Toast/Toast";
import { getCompanyInfo, setCompanyInfo } from "@/store/company";
import Cookies from "js-cookie";

const Throwaway = styled.div<LayoutProps>`
  padding: 30px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 84%;
  ${layout}
`;
const Head = styled.div``;
const Piece = styled.div`
  display: flex;
`;

const Title = styled.div`
  font-size: 16px;
  position: relative;
  display: flex;
`;
const ReverseTimer = styled.div`
  display: flex;
  margin-right: auto;
  max-width: 200px;
`;

const Alteration = styled.div<SpaceProps>`
  display: flex;
  font-size: 12px;
  cursor: pointer;
`;

const Digit = styled.input`
  background: transparent;
  border-radius: 13px;
  border: solid 1px rgba(45, 44, 44, 0.32);
  color: black;
  height: 44px;
  width: 44px;
  margin: 0 5px;
  text-align: center;
  &:hover {
    border-color: #f18f6b;
  }
  &:focus {
    outline-style: none;
  }
`;
const Content = styled.div`
  justify-content: right;
  flex-direction: row-reverse;
  margin: 10px 0;
  display: flex;
`;

const icon = {
  position: "absolute",
  right: "0",
  top: "50%",
  transform: "translate(0,-50%)",
};

const Hint = styled.div`
  color: #acacac;
  font-size: 12px;
  margin-top: 12px;
`;
const TryAgain = styled.div`
  background: #d1d1d1;
  padding: 4px 14.6px 4px 14.6px;
  color: #474546;
  border-radius: 8px;
  cursor: pointer;
  width: 110.2px;
  font-size: 11px;
  text-align: center;
  opacity: 35%;
  margin-bottom: 10px;
`;

const Img = styled.div`
  margin: 2px 5px 0 0;
`;
const Item = styled.div`
  width: 30px;
`;
const Imgha = styled.div`
  position: absolute;
  left: 0;
  top: -10px;
  opacity: 0.5;
`;

const Carpet = styled.div<ColorProps>`
  font-size: 12px;
  padding: 14px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 119px;
  &.mobile {
    display: none;
  }
  @media (max-width: 575px) {
    &.web {
      display: none;
    }
    &.mobile {
      display: flex;
      flex-direction: row;
      width: 100%;
    }
  }

  ${color}
`;
const Span = styled.div`
  margin-top: auto;
  border-right: 1px solid white;
  color: white;
  padding-right: 5px;
`;

const logo = {
  position: "absolute",
  right: "50%",
  top: "50%",
  transform: "translate(50%,-50%)",
};

const close = {
  marginRight: "auto",
  cursor: "pointer",
  zIndex: "2",
};
type Company = {
  id: string;
  user_id: "";
  name: "";
  family: "";
  organizationPost: "";
  mobile: "";
  phoneNumber: "";
  nameCompany: "";
  cityId: -1;
  areaId: -1;
  areaString: "";
  industryId: 0;
  establishedYear: "";
  typeActivityCompanyId: 0;
  typeOwnerShipId: 0;
  sizeCompanyId: 0;
  webSiteUrl: "";
  telCompany: "";
  logoId: "";
  bannerId: "";
  description: "";
  descriptionServices: "";
};
export default function VerificationModal(props: {
  setVerModal: Dispatch<boolean>;
  verModal: boolean;
  mobile: string;
  company: Company;
}) {
  const {
    category,
    city,
    area,
    selectedFilter,
    pictures,
    sex,
    typeCooperations,
    setId,
    id,
    lat,
    long,
    setPaused,
    organizationPost,
  } = useContext(AdsUploadContext);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState("on");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [callTimer, setCallTimer] = useState(false);
  const Duration = 60 * 2;
  let init = {
    field_1: "",
    field_2: "",
    field_3: "",
    field_4: "",
  };
  const [throwawayPass, setThrowawayPass] = useState(init);
  const first_ref = useRef<HTMLInputElement | null>(null);
  const companyInfo = useAppSelector((state) => state.companyInfo);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength = e.target.maxLength;
    const nameInput = e.target.name;
    let valueInput = e.target.value;

    valueInput = convertDigitToEnglish(valueInput);
    const str = valueInput.trim();
    const parsedValue = /^\d+$/.test(str) ? parseInt(str) : "";

    if (str.length <= maxLength || parsedValue === "") {
      const updatedPass = { ...throwawayPass, [nameInput]: parsedValue };
      let nextInput = e.target.nextElementSibling as HTMLInputElement | null;
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
      setThrowawayPass(updatedPass);
    }
  };
  const inputOnclick = (e: any) => {
    return e.target.select();
  };
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
            let { logoId, areaString, user_id, id, ...other } = selectedCompany;
            const newobj = { ...other };
            datas.company = newobj;
          }
        } else {
          if (city || area) {
            datas.cityId = city?.id;
            datas.areaId = area?.id;
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
          datas.mobile = props.mobile;
          if (lat || long) {
            datas.location = `${lat.substr(0, 16)}/${long.substr(0, 16)}`;
          }
          const value = convertToId(filter);
          datas[dataKey] = value;
        }
      }
    });
    return datas;
  };
  function tryAgain() {
    setTimer("on");
    if (props.mobile) {
      let _pics: string[] = [];
      pictures.map((p) => {
        let valid = p.split("base64,");
        if (valid.length > 1) {
          _pics.push(valid[1]);
        }
      });
      const data = convertSelectedFilters();
      registerAdsRequest({ ...data }).then((e) => {
        if (e.data) {
          if (setId) setId(e.data.id);
        }
      });
    }
  }

  useEffect(() => {
    setMessage("");
    if (timer == "on") {
      setCallTimer(true);
    } else {
      setCallTimer(false);
    }
  }, [timer]);

  let stringCode = "";
  useEffect(() => {
    stringCode =
      throwawayPass.field_1.toString() +
      throwawayPass.field_2.toString() +
      throwawayPass.field_3.toString() +
      throwawayPass.field_4.toString();

    if (stringCode.length == 4 && props.mobile) {
      let type = "ads";
      verifyAdsRequest({ mobile: props.mobile, code: stringCode, id, type })
        .then((res: User & { company_id: number }) => {
          if (res.id) {
            console.log(res);

            setId(String(res.id));

            setToast({
              show: true,
              message: "آگهی شما با موفقیت ثبت شد.",
              type: "success",
            });
            dispatch(
              defaultSignIn({
                token: res.token,
                mobile: props.mobile,
                errorCode: res.errorCode,
                errorMessage: res.errorMessage,
              })
            );
            console.log(res.company_id);
            console.log(companyInfo.id);

            Cookies.set("cid", String(res.company_id), { expires: 1, path: "/" });

            if (props.company) {
              if (companyInfo.hasCompany) {
                let newCompany = { ...props.company };
                let tempCompany = [...companyInfo.data];
                newCompany.id = String(res.company_id);

                tempCompany.push(newCompany);
                dispatch(setCompanyInfo(tempCompany));
              } else {
                let newCompany = { ...props.company };
                newCompany.id = String(res.company_id);
                dispatch(setCompanyInfo([newCompany]));
              }
            }
            dispatch(getCompanyInfo(true));
            setThrowawayPass(init);
            setTimeout(() => {
              router.push("/user");
            }, 2000);
          } else if (res.errorCode === 330) {
            setThrowawayPass(init);
            if (first_ref.current) {
              first_ref.current?.focus();
            }
            setMessage("کد وارد شده صحیح نمی باشد");
          }
        })
        .catch((err: any) => {
          setThrowawayPass(init);
          if (first_ref.current) {
            first_ref.current?.focus();
          }
          setMessage("فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید");
        });
      setMessage("");
    }
  }, [throwawayPass]);

  return (
    <ModalSkeleton
      flex={"column"}
      show={props.verModal}
      setShow={props.setVerModal}
    >
      <Carpet className={"mobile"} bg={"#DB143D"}>
        <Span>نیازمندی های همشهری</Span>
        <CloseSvgWhite
          onClick={() => dispatch(showLoginModal(false))}
          style={close}
        />
        <Imgha>
          <Image
            height={80}
            width={80}
            src={"/icons/white-he-profile.svg"}
            alt=""
          />
        </Imgha>
      </Carpet>
      <Piece>
        <Throwaway>
          <Head>
            <Title>
              <div>رمـز یکبـار مصـرف</div>
              <ReverseTimer>
                <Img>
                  <Image
                    height={15}
                    width={15}
                    alt=""
                    src={"/icons/Iconly-Curved-Time Square.svg"}
                  />
                </Img>
                <Item>
                  <Timer
                    Duration={Duration}
                    timer={timer}
                    setTimer={setTimer}
                    callTimer={callTimer}
                  />
                </Item>
              </ReverseTimer>
            </Title>
            <Hint>برای تایید شماره خود، لطفا کد ارسال شده را وارد کنید.</Hint>
          </Head>
          <div>
            <Content aria-autocomplete={"none"}>
              <Digit
                type={"tel"}
                ref={first_ref}
                autoFocus
                name={"field_1"}
                value={throwawayPass.field_1}
                maxLength={1}
                onChange={handleInputChange}
                onClick={inputOnclick}
              />
              <Digit
                type={"tel"}
                name={"field_2"}
                value={throwawayPass.field_2}
                maxLength={1}
                onChange={handleInputChange}
                onClick={inputOnclick}
              />
              <Digit
                type={"tel"}
                name={"field_3"}
                value={throwawayPass.field_3}
                maxLength={1}
                onChange={handleInputChange}
                onClick={inputOnclick}
              />
              <Digit
                type={"tel"}
                name={"field_4"}
                value={throwawayPass.field_4}
                maxLength={1}
                onChange={handleInputChange}
                onClick={inputOnclick}
              />
            </Content>
            <ErrorMessage message={message} />
          </div>
          {timer == "on" ? (
            <TryAgain onClick={tryAgain}>ارسـال مجـدد</TryAgain>
          ) : (
            <TryAgain style={{ opacity: "100%" }} onClick={tryAgain}>
              ارسـال مجـدد
            </TryAgain>
          )}
          <Alteration>
            تغـییر شمـاره موبایـل
            <Back
              style={{ margin: "2px 5px 0 0" }}
              onClick={() => props.setVerModal(false)}
            />
          </Alteration>
        </Throwaway>
        <Carpet className={"web"} bg={"#DB143D"}>
          <Close
            onClick={() => props.setVerModal(!props.verModal)}
            style={close}
          />
          <Span>نیازمنــدی هـای همشــهری</Span>
          <Logo style={logo} />
        </Carpet>
      </Piece>
      {toast.show && (
        <Toast
          setIsHovering={(e) => setToast((prev) => ({ ...prev, show: false }))}
          isHovering={toast.show}
          type={toast.type}
          text={toast.message}
        />
      )}
    </ModalSkeleton>
  );
}
