import { privateAxios, serverSideAxios } from "../config/configAxios";
import { QueryParams } from "../utils/types";

export type CreateCartItem = {
  productId: number;
  productVariantId?: number;
  quantity: number;
};

export type Checkout = {
  province: string;
  district: string;
  ward: string;
  address: string;
  paymentMethod: string;
  shippingPrice: number;
  fullName: string;
  phone: string;
};

export type OrderQueryParams = {
  start?: string;
  end?: string;
  address?: string;
  fullName?: string;
  phone?: string;
} & QueryParams;

export const getAllOrders = (
  params: OrderQueryParams,
  accessToken?: string
): Promise<any> => serverSideAxios(accessToken).get("order", { params });

export const createCartItem = (body: CreateCartItem): Promise<any> =>
  privateAxios().post("order/cart-item", body);

export const updateCartItem = (id: number, newQuantity: number): Promise<any> =>
  privateAxios().patch("order/cart-item/" + id, { newQuantity });

export const deleteCartItem = (id: number): Promise<any> =>
  privateAxios().delete("order/cart-item/" + id);

export const getCart = (): Promise<any> => privateAxios().get("/order/cart");

export const checkout = (body: Checkout): Promise<any> =>
  privateAxios().patch("order/checkout", body);

export const myOrders = (params?: OrderQueryParams): Promise<any> =>
  privateAxios().get("order/user", { params });

export const getOrderById = (id: number, accessToken?: string): Promise<any> =>
  serverSideAxios(accessToken).get("order/" + id);

export const updateStatus = (id: number, status: string): Promise<any> =>
  privateAxios().patch(`order/${id}/status`, { status });
