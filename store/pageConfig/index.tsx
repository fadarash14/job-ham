import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type InitialType = {
  showOnHeader: boolean;
  showLoginModal: boolean;
  loading: boolean;
  showTabletCategory: boolean;
  showLogout: boolean;
  showLogin: boolean;
  showSupport: boolean;
  jobFiltersModal: boolean;
};
const initialState: InitialType = {
  showOnHeader: false,
  showLoginModal: false,
  loading: false,
  showTabletCategory: false,
  showLogout: false,
  showLogin: false,
  showSupport: false,
  jobFiltersModal: false,
};
const pageConfig = createSlice({
  name: "pageConfig",
  initialState,
  reducers: {
    setShowOnHeader: (state: InitialType, action: PayloadAction<boolean>) => {
      return { ...state, showOnHeader: action.payload };
    },
    showLoginModal: (state: InitialType, action: PayloadAction<boolean>) => {
      return { ...state, showLogin: action.payload };
    },
    showSupportModal: (state: InitialType, action: PayloadAction<boolean>) => {
      return { ...state, showSupport: action.payload };
    },
    setshowTabletCategory: (
      state: InitialType,
      action: PayloadAction<boolean>
    ) => {
      return { ...state, showTabletCategory: action.payload };
    },
    showLogoutModal: (state: InitialType, action: PayloadAction<boolean>) => {
      return { ...state, showLogout: action.payload };
    },
    setloading: (state: InitialType, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
    OpenJobsFiltersModal: (
      state: InitialType,
      action: PayloadAction<boolean>
    ) => {
      return { ...state, jobFiltersModal: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setShowOnHeader,
  showLoginModal,
  showSupportModal,
  setshowTabletCategory,
  showLogoutModal,
  setloading,
  OpenJobsFiltersModal,
} = pageConfig.actions;

export default pageConfig.reducer;
