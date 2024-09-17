import AdsUploadContext from "./AdsUploadContext";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Category, Filter, SelectedCategory } from "../../types";
import steps from "./AdsUploadConfig";
import _ from "lodash";
import { list } from "../../utils/helper";
import Cookies from "js-cookie";

export default function AdsUploadContextProvider(
  props: PropsWithChildren<any>
) {
  const [category, setCategory] = useState<SelectedCategory>({
    id: 0,
    title: "",
    parent_id: 0,
    status: 0,
    metakeyword: "",
    icon: "",
    slug: "",
    address: "",
    layer: 0,
    ordernumber: 0,
    metadescription: "",
    name: "",
    has_child: false,
  });
  const [filters, setFilter] = useState<Filter[]>([]);
  const [pictures, setPicture] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [step, setStep] = useState<string>(steps["select_category"]);
  const [area, setArea] = useState<{ id: number; name: string }>({
    id: -1,
    name: "",
  });
  const [city, setCity] = useState<{ id: number; name: string }>({
    id: -1,
    name: "",
  });
  const [companyArea, setCompanyArea] = useState<{ id: number; name: string }>({
    id: -1,
    name: "",
  });
  const [companycity, setCompanyCity] = useState<{ id: number; name: string }>({
    id: -1,
    name: "",
  });
  const [locations, setLocations] = useState<
    { city: { id: number; name: string }; area: { id: number; name: string } }[]
  >([
    {
      city: {
        id: -1,
        name: "",
      },
      area: {
        id: -1,
        name: "",
      },
    },
  ]);
  const [mobile, setMobile] = useState("");
  const [showMobile, setShowMobile] = useState(false);
  const [chat, setChat] = useState("");
  const [tel, setTel] = useState("");
  const [email, setMail] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [level, setLevel] = useState(0);
  const [id, setId] = useState<string>("");
  const [paused, setPaused] = useState<number>(0); //1 ask 2 cancel -1 continue 3 donot save 4 remove it
  const [editMode, setEditMode] = useState<boolean>(false);
  const [imagesEditMode, setImagesEditMode] = useState<
    { name: string; src: string }[]
  >([]);
  const [valid, validate] = useState<{ [key: string]: any }>({});
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [filtersCompleted, setFiltersCompleted] = useState<boolean>(false);
  const [companyFiltersCompleted, setCompanyFiltersCompleted] =
    useState<boolean>(false);
  const [sex, setSex] = useState<number>(0);
  const [typeCooperations, setTypeCooperations] = useState<number>(0);
  const [organizationPost, setOrganizationPost] = useState<number>(0);

  const getWizard = () => {
    try {
      const role = Cookies.get("role");
      const token = Cookies.get("token");
      let _wizard = localStorage.getItem("wizard");
      if (_wizard && token !== undefined && role == "1") {
        return JSON.parse(_wizard);
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    try {
      let _wizard = localStorage.getItem("wizard");
      if (_wizard && !editMode) {
        if (paused === -1) {
          let wizard = JSON.parse(_wizard);
          setCategory(wizard.category);
          setFilter(wizard.filters);
          setPicture(wizard.pictures);
          setTitle(wizard.title);
          setContent(wizard.content);
          setStep(wizard.step);
          setArea(wizard.area);
          setCity(wizard.city);
          setCompanyCity(wizard.companycity);
          setCompanyArea(wizard.companyArea);
          setMobile(wizard.mobile);
          setShowMobile(wizard.showMobile);
          setChat(wizard.chat);
          setTel(wizard.tel);
          setMail(wizard.email);
          setSelectedFilter(wizard.selectedFilter);
          setLevel(wizard.level);
          setId(wizard.id);
          setLong(wizard.lat);
          setLat(wizard.long);
          setFiltersCompleted(wizard.filtersCompleted);
          setSex(wizard.sex);
          setTypeCooperations(wizard.typeCooperations);
          setOrganizationPost(wizard.organizationPost);
        }
      }
    } catch (e) {}
    if (paused === 2 || paused === 4) {
      localStorage.removeItem("wizard");
    }
  }, [paused]);

  function _setState(wizard: any) {
    localStorage.setItem("wizard", JSON.stringify(wizard));
  }
  const setState = useCallback(_.debounce(_setState, 500), []);

  const validateAds = () => {
    let _validate: { [key: string]: any } = {};
    if (title.length < 10 || title.length > 200) {
      _validate["title"] = "";
    }

    if ((content && content.length > 2500) || content.length < 10) {
      _validate["content"] = "حداقل طول مجاز 10 و حداکثر 2500 کاراکتر میباشد";
    }
    validate(_validate);
  };

  useEffect(() => {
    validateAds();
    if (paused === 2 || paused === -1) {
      let wizard = {
        category,
        filters,
        pictures,
        title,
        content,
        step,
        area,
        city,
        mobile,
        showMobile,
        chat,
        tel,
        email,
        selectedFilter,
        level,
        id,
        long,
        lat,
        filtersCompleted,
        companyFiltersCompleted,
        sex,
        typeCooperations,
        organizationPost,
        locations,
      };
      if (city.id !== -1 && level === 1) {
        setLevel(2);
      }
      setState(wizard);
    }
  }, [
    category,
    filters,
    pictures,
    title,
    content,
    step,
    area,
    city,
    companyArea,
    companycity,
    mobile,
    showMobile,
    chat,
    tel,
    email,
    selectedFilter,
    level,
    id,
    paused,
    long,
    lat,
    locations,
    filtersCompleted,
    sex,
    typeCooperations,
    organizationPost,
    locations,
  ]);

  return (
    <AdsUploadContext.Provider
      value={{
        category,
        setCategory,
        filters,
        setFilter,
        pictures,
        setPicture,
        title,
        setTitle,
        content,
        setContent,
        step,
        setStep,
        //@ts-ignore
        area,
        setArea,
        //@ts-ignore
        city,
        setCity,
        //@ts-ignore
        companyArea,
        setCompanyArea,
        //@ts-ignore
        companycity,
        setCompanyCity,
        locations,
        //@ts-ignore
        setLocations,
        mobile,
        setMobile,
        showMobile,
        setShowMobile,
        chat,
        setChat,
        level,
        setLevel,
        tel,
        setTel,
        email,
        setMail,
        selectedFilter,
        setSelectedFilter,
        id,
        setId,
        paused,
        setPaused,
        editMode,
        valid,
        validate,
        lat,
        setLat,
        long,
        setLong,
        setEditMode,
        setImagesEditMode,
        imagesEditMode,
        getWizard,
        filtersCompleted,
        setFiltersCompleted,
        companyFiltersCompleted,
        setCompanyFiltersCompleted,
        sex,
        setSex,
        typeCooperations,
        setTypeCooperations,
        organizationPost,
        setOrganizationPost,
      }}
    >
      {props.children}
    </AdsUploadContext.Provider>
  );
}
