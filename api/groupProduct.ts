import { publicAxios } from "../config/configAxios";
import { QueryParams } from "../utils/types";

export type GroupProductQueryParams = {
  slug?: string;
  name?: string;
} & QueryParams;

export const getAllGroupProducts = (
  params?: GroupProductQueryParams
): Promise<any> => publicAxios().get("group-product", { params });
