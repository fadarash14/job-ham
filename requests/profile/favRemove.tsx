import { string } from "prop-types";
import { mutation, RequestOptions } from "../../utils/request";

export const favRemove = async function (
  data: { id: number },
  options?: RequestOptions
) {
  return await mutation("favRemove", data, { id: true, status: true }, options);
};
