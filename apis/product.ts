import { publicAxios } from "../config/configAxios";
import { QueryParams } from "../utils/types";

export type ProductQueryParams = {
  slug?: string;
  name?: string;
} & QueryParams;

export const getAllProducts = (params?: ProductQueryParams): Promise<any> =>
  publicAxios().get("product", { params });
