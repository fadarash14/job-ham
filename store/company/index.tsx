import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company } from "@/types";
interface IState {
  hasCompany: boolean;
  data: Company[];
  selectedCompany: Company;
  id: string;
}

const initialState: IState = {
  hasCompany: false,
  data: [
    {
      id: "",
      user_id: "",
      name: "",
      family: "",
      organizationPost: "",
      mobile: "",
      phoneNumber: "",
      nameCompany: "",
      cityId: -1,
      areaId: -1,
      areaString: "",
      industryId: 0,
      establishedYear: "",
      typeActivityCompanyId: 0,
      typeOwnerShipId: 0,
      sizeCompanyId: 0,
      webSiteUrl: "",
      telCompany: "",
      logoId: "",
      bannerId: "",
      description: "",
      descriptionServices: "",
    },
  ],
  selectedCompany: {
    id: "",
    user_id: "",
    name: "",
    family: "",
    organizationPost: "",
    mobile: "",
    phoneNumber: "",
    nameCompany: "",
    cityId: -1,
    areaId: -1,
    areaString: "",
    industryId: 0,
    establishedYear: "",
    typeActivityCompanyId: 0,
    typeOwnerShipId: 0,
    sizeCompanyId: 0,
    webSiteUrl: "",
    telCompany: "",
    logoId: "",
    bannerId: "",
    description: "",
    descriptionServices: "",
  },
  id: "",
};

const CompanyInfo = createSlice({
  name: "companyInfo",
  initialState,
  reducers: {
    getCompanyInfo: (state, action: PayloadAction<boolean>) => {
      state.hasCompany = action.payload;
    },
    setCompanyInfo: (state, action: PayloadAction<Company[]>) => {
      console.log(action.payload);

      state.data = action.payload;
    },
    setSelectedCompany: (state, action: PayloadAction<Company>) => {
      state.selectedCompany = action.payload;
    },
    setCompanyId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    clearData: (state) => {
      state.hasCompany = false;
      state.data = [
        {
          id: "",
          user_id: "",
          name: "",
          family: "",
          organizationPost: "",
          mobile: "",
          phoneNumber: "",
          nameCompany: "",
          cityId: -1,
          areaId: -1,
          areaString: "",
          industryId: 0,
          establishedYear: "",
          typeActivityCompanyId: 0,
          typeOwnerShipId: 0,
          sizeCompanyId: 0,
          webSiteUrl: "",
          telCompany: "",
          logoId: "",
          bannerId: "",
          description: "",
          descriptionServices: "",
        },
      ];
      state.id = "";
    },
  },
});

export const {
  getCompanyInfo,
  setCompanyInfo,
  clearData,
  setCompanyId,
  setSelectedCompany,
} = CompanyInfo.actions;

export default CompanyInfo.reducer;
