import { query, RequestOptions } from "../utils/request";
export const pills = async function (options?: RequestOptions) {
  return await query(
    "pills",
    null,
    {
      id: true,
      label: true,
      url: true,
      status: true,
    },
    options
  );
};
