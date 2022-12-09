import { publicAxios } from "../config/configAxios";
import { QueryParams } from "../utils/types";
export type VariantQueryParams = {
  name?: string;
  type?: string;
} & QueryParams;

export const getAllVariants = (params?: VariantQueryParams): Promise<any> =>
  publicAxios().get("variant", { params });
