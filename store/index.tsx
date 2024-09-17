import { configureStore } from "@reduxjs/toolkit";
import search from "./searchCV";
import favorite from "./favorite";
import agreements from "./agreements";
import pageConfig from "./pageConfig";
import sign from "./sign";
import _ from "lodash";
import mobileConfig from "./mobilePage";
import removeAllFav from "./removeAllFav";
import notification from "./notification";
import jobInfo from "./jobInformation";
import companyInfo from "./company";
import cvInfo from "./cv";
import cvList from "./cvList";
import cvForAd from "./cvForAd";
export const saveState = (state: object) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();
const store = configureStore({
  preloadedState: persistedState,
  reducer: {
    search,
    pageConfig,
    sign,
    favorite,
    agreements,
    mobileConfig,
    removeAllFav,
    notification,
    jobInfo,
    companyInfo,
    cvInfo,
    cvList,
    cvForAd
  },
  devTools: process.env.NODE_ENV === "development",
});

store.subscribe(
  _.throttle(() => {
    saveState({
      favorite: store.getState().favorite,
      agreements: store.getState().agreements,
      removeAllFav: store.getState().removeAllFav,
      notification: store.getState().notification,
      sign: store.getState().sign,
       cvInfo: store.getState().cvInfo,
      // cvList: store.getState().cvList,
       companyInfo:store.getState().companyInfo
    });
  }, 100)
);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
