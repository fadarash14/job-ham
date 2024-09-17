
import { mutation, RequestOptions } from "../utils/request";
import { number, string } from "prop-types";

export const signUp = async function (
  data: { mobile: string; role: number },
  options?: RequestOptions
) {
  return await mutation(
    "signUp",
    data,
    { status: true, page: string },
    options
  );
};

export const login = async function (
  data: { mobile: string; password: string },
  options?: RequestOptions
) {
  return await mutation(
    "login",
    data,
    {
      errorCode: true,
      errorMessage: true,
      id: true,
      mobile: true,
      token: true,
      roles: true,
    },
    options
  );
};

export const verify = async function (
  data: { mobile: string; code: string },
  options?: RequestOptions
) {
  return await mutation(
    "verify",
    data,
    {
      errorCode: true,
      errorMessage: true,
      id: true,
      mobile: true,
      token: true,
      roles: true,
    },
    options
  );
};

export const disposablePassword = async function (
  data: { mobile: string },
  options?: RequestOptions
) {
  return await mutation("disposablePassword", data, { status: true }, options);
};

export const changePassword = async function (
  data: { mobile: string },
  options?: RequestOptions
) {
  return await mutation(
    "changePassword",
    data,
    { status: true, userId: true },
    options
  );
};

export const verifyChangePassword = async function (
  data: { code: string; mobile: string },
  options?: RequestOptions
) {
  return await mutation(
    "verifyChangePassword",
    data,
    { status: true, errorCode: true },
    options
  );
};

export const addNewPassword = async function (
  data: { mobile: string; password: string; userId: number },
  options?: RequestOptions
) {
  return await mutation("addNewPassword", data, { status: true }, options);
};

export const profileUpdate = async function (
  data: { name: string; lastname: string; telephone: string; email: string },
  options?: RequestOptions
) {
  return await mutation(
    "profileUpdate",
    data,
    {
      errorCode: true,
      errorMessage: true,
      id: true,
      name: true,
      lastname: true,
      mobile: true,
      token: true,
    },
    options
  );
};
