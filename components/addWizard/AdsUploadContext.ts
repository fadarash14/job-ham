import { createContext, Dispatch } from "react";
import { Filter, SelectedCategory } from "../../types";
import steps from "./AdsUploadConfig";
// import {ImageListType} from "react-images-uploading/dist/typings";

type Props = {
  id: string;
  setId: Dispatch<string>;
  category?: SelectedCategory;
  setCategory: Dispatch<SelectedCategory>;
  filters: Filter[];
  setFilter: Dispatch<Filter[]>;
  pictures: string[];
  setPicture: Dispatch<string[]>;
  imagesEditMode: { src: string; name: string }[];
  setImagesEditMode: Dispatch<{ src: string; name: string }[]>;
  title: string;
  setTitle: Dispatch<string>;
  content: string;
  setContent: Dispatch<string>;
  step: string;
  setStep: Dispatch<string>;
  level: number;
  setLevel: Dispatch<number>;
  area?: { id: number; name: string; lat: number; long: number };
  setArea?: Dispatch<{ id: number; name: string }>;
  city?: { id: number; name: string; lat: number; long: number };
  setCity?: Dispatch<{ id: number; name: string }>;
  companycity?: { id: number; name: string; lat: number; long: number };
  setCompanyCity?: Dispatch<{ id: number; name: string }>;
  companyArea?: { id: number; name: string; lat: number; long: number };
  setCompanyArea?: Dispatch<{ id: number; name: string }>;
  locations?: {
    area: { id: number; name: string };
    city: { id: number; name: string };
  }[];
  setLocations?: Dispatch<
    { area: { id: number; name: string }; city: { id: number; name: string } }[]
  >;
  isMultiplelocation?: boolean;
  setIsMultiplelocation?: Dispatch<boolean>;
  showMobile: boolean;
  setShowMobile: Dispatch<boolean>;
  chat: string;
  setChat: Dispatch<string>;
  mobile: string;
  setMobile: Dispatch<string>;
  tel: string;
  setTel: Dispatch<string>;
  email: string;
  setMail: Dispatch<string>;
  selectedFilter: { [key: number]: any };
  setSelectedFilter: Dispatch<{ [key: number]: any }>;
  paused: number;
  setPaused: Dispatch<number>;
  editMode: boolean;
  setEditMode: Dispatch<boolean>;
  getWizard: Function;
  valid: { [key: string]: any };
  validate: Dispatch<{ [key: string]: any }>;
  lat: string;
  long: string;
  setLat: Dispatch<string>;
  setLong: Dispatch<string>;
  filtersCompleted: boolean;
  setFiltersCompleted: Dispatch<boolean>;
  companyFiltersCompleted: boolean;
  setCompanyFiltersCompleted: Dispatch<boolean>;
  sex: number;
  setSex: Dispatch<number>;
  typeCooperations: number;
  setTypeCooperations: Dispatch<number>;
  organizationPost: number;
  setOrganizationPost: Dispatch<number>;
};

const AdsUploadContext = createContext<Props>({
  id: "",
  setId: () => {},
  setCategory: () => {},
  filters: [],
  setFilter: () => {},
  pictures: [],
  setPicture: () => {},
  title: "",
  setTitle: () => {},
  content: "",
  setContent: () => {},
  level: 0,
  setLevel: () => {},
  step: steps["select_category"],
  setStep: () => {},
  showMobile: false,
  setShowMobile: () => {},
  chat: "",
  setChat: () => {},
  mobile: "",
  setMobile: () => {},
  tel: "",
  setTel: () => {},
  email: "",
  setMail: () => {},
  selectedFilter: {},
  setSelectedFilter: () => {},
  paused: 0,
  setPaused: () => {},
  editMode: false,
  setEditMode: () => {},
  imagesEditMode: [],
  setImagesEditMode: () => {},
  getWizard: () => {},
  valid: {},
  validate: () => {},
  lat: "",
  long: "",
  setLat: () => {},
  setLong: () => {},
  filtersCompleted: false,
  setFiltersCompleted: () => {},
  companyFiltersCompleted: false,
  setCompanyFiltersCompleted: () => {},
  sex: 0,
  setSex: () => {},
  typeCooperations: 0,
  setTypeCooperations: () => {},
  organizationPost: 0,
  setOrganizationPost: () => {},
});
export default AdsUploadContext;
