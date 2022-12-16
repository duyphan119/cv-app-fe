import { privateAxios, publicAxios } from "../config/configAxios";
import {
  PaginationParams,
  QueryParams,
  SearchQueryParams,
} from "../utils/types";

export type ProductQueryParams = {
  slug?: string;
  name?: string;
  group_product_slug?: string;
  product_variants?: boolean;
  images?: boolean;
} & QueryParams;

export type CreateProductDTO = {
  name: string;
  slug?: string;
  groupProductId: number;
  thumbnail?: number;
  description?: string;
  detail?: string;
};

export const getAllProducts = (params?: ProductQueryParams): Promise<any> =>
  publicAxios().get("product", { params });

export const getProductById = (id: number): Promise<any> =>
  publicAxios().get("product/" + id);

export const createProduct = (body: CreateProductDTO): Promise<any> =>
  privateAxios().post("product", body);

export const getFavoriteProducts = (params?: PaginationParams): Promise<any> =>
  privateAxios().get("product/favorite", { params });

export const createFavoriteProduct = (productId: number): Promise<any> =>
  privateAxios().post("product/favorite", { productId });

export const deleteFavoriteProduct = (productId: number): Promise<any> =>
  privateAxios().delete("product/favorite/" + productId);

export const search = (
  params?: SearchQueryParams & ProductQueryParams
): Promise<any> => publicAxios().get("product/search", { params });

export const updateThumbnailProduct = (
  productId: number,
  thumbnail: string
): Promise<any> =>
  privateAxios().patch("product/thumbnail/" + productId, { thumbnail });
