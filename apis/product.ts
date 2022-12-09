import { privateAxios, publicAxios } from "../config/configAxios";
import { PaginationParams, QueryParams } from "../utils/types";

export type ProductQueryParams = {
  slug?: string;
  name?: string;
  group_product_slug?: string;
  product_variants?: boolean;
} & QueryParams;

export type SearchProductQueryParams = {
  q: string;
} & QueryParams;

export const getAllProducts = (params?: ProductQueryParams): Promise<any> =>
  publicAxios().get("product", { params });

export const getFavoriteProducts = (params?: PaginationParams): Promise<any> =>
  privateAxios().get("product/favorite", { params });

export const createFavoriteProduct = (productId: number): Promise<any> =>
  privateAxios().post("product/favorite", { productId });

export const deleteFavoriteProduct = (productId: number): Promise<any> =>
  privateAxios().delete("product/favorite/" + productId);

export const search = (params?: SearchProductQueryParams): Promise<any> =>
  publicAxios().get("product/search", { params });
