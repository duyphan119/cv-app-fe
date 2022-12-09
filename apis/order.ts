import { privateAxios } from "../config/configAxios";
import { CartItem, QueryParams } from "../utils/types";

export type CreateCartItem = {
  productVariantId: number;
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
} & QueryParams;

export const createCartItem = (body: CreateCartItem): Promise<any> =>
  privateAxios().post("order/cart-item", body);

export const updateCartItem = (
  productVariantId: number,
  newQuantity: number
): Promise<any> =>
  privateAxios().patch("order/cart-item/" + productVariantId, { newQuantity });

export const deleteCartItem = (productVariantId: number): Promise<any> =>
  privateAxios().delete("order/cart-item/" + productVariantId);

export const getCart = (): Promise<any> => privateAxios().get("/order/cart");

export const checkout = (body: Checkout): Promise<any> =>
  privateAxios().patch("order/checkout", body);

export const myOrders = async (params?: OrderQueryParams): Promise<any> =>
  privateAxios().get("order/user", { params });
