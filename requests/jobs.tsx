import { query, RequestOptions } from "../utils/request";
export const loadjobs = async function (data?: any, options?: RequestOptions) {
  return await query(
    "jobs",
    data,
    {
      id: true,
      title: true,
      parent_id: true,
    },
    options
  );
};
export const cities = async function (options?: RequestOptions) {
  return await query(
    "cities",
    null,
    {
      id: true,
      name: true,
      parent_id: true,
    },
    options
  );
};
