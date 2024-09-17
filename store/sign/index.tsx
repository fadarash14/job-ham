import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import moment from "moment";

const initialState: Partial<User> = {};

const slice = createSlice({
  name: "Sign",
  initialState,
  reducers: {
    defaultSignIn: (state: Partial<User>, action: PayloadAction<any>) => {
      let decoded: { exp: number } = jwt_decode(action.payload.token);
      document.cookie = `token = ${
        action.payload.token
      }; path=/; expires=${moment(decoded.exp).format()}`;
      let role = Cookies.get("role");
      Cookies.set("token", action.payload.token, { expires: 1, path: "/" });
      //@ts-ignore
      if (typeof window !== "undefined" && window?.rahnama?.setCookie) {
        //@ts-ignore
        window.rahnama.setCookie("token", action.payload.token);
      }
      if (!role) {
        role = action.payload.roles;
      }
      let { token, roles, ...signPayload } = action.payload;
      return { ...signPayload, roles: role, isLogged: true };
    },
    profileComplete: (
      state: Partial<User>,
      action: PayloadAction<{
        name: string;
        lastname: string;
        telephone: string;
        email: string;
        mobile?: string;
        id?: number;
      }>
    ) => {
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        mobile: action.payload.mobile,
        lastname: action.payload.lastname,
        telephone: action.payload.telephone,
        email: action.payload.email,
      };
    },
    exitProfile: () => {
      Cookies.remove("token");
      Cookies.remove("cid");
      localStorage.removeItem("state");
      Cookies.remove("role");
      return {};
    },
    userRoles: (state: Partial<User>, action: PayloadAction<string>) => {
      Cookies.set("role", action.payload, { expires: 2, path: "/" });
      return {
        ...state,
        roles: action.payload,
        isLogged: true,
      };
    },
  },
});

export const { defaultSignIn, profileComplete, exitProfile, userRoles } =
  slice.actions;

export default slice.reducer;
