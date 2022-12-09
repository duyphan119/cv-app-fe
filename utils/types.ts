export type Action = {
  payload?: any;
  type?: string;
};
export type SortParams = {
  sort_by?: string;
  sort_type?: string;
};
export type PaginationParams = {
  p?: string | number;
  limit?: string | number;
};
export type QueryParams = SortParams & PaginationParams;

type Timestamp = {
  createdAt: string;
  updatedAt: string;
} & Partial<{ deletedAt?: string }>;

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  groupProductId: number;
} & Timestamp &
  Partial<{
    images: ProductVariantImage[];
    productVariants: ProductVariant[];
    groupProduct: GroupProduct;
    minPrice: number;
    maxPrice: number;
  }>;

export type Variant = {
  id: number;
  name: string;
  type: string;
} & Timestamp;

export type ProductVariant = {
  id: number;
  inventory: number;
  price: number;
  productId: number;
  product: Product;
  variants: Variant[];
} & Timestamp;

export type ProductVariantImage = {
  id: number;
  productId: number;
  variantId: number;
  path: string;
} & Timestamp;
export type CartItem = {
  productVariantId: number;
  quantity: number;
} & Partial<{ productVariant: ProductVariant }>;
export type Order = {
  id: number;
  province: string;
  district: string;
  ward: string;
  address: string;
  fullName: string;
  phone: string;
  status: "Đang xử lý" | "Đang vận chuyển" | "Vận chuyển thành công" | null;
  paymentMethod: string;
  shippingPrice: number;
  userId: number;
  couponId: number | null;
  user: User;
  items: OrderItem[];
} & Timestamp;
export type OrderItem = CartItem & {
  price: number;
  id: number;
};
export type Cart = {
  items: CartItem[];
};
export type User = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  isAdmin: boolean;
} & Timestamp;

export type GroupProduct = {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
} & Timestamp;

export type ResponseItems<T> = {
  items: T[];
  count: number;
};

export type RenderVariantType = {
  key: string;
  values: Variant[];
};

export type Filter = {
  p?: number;
  sort_by?: number;
  sort_type?: number;
  min_price?: number;
  max_price?: number;
  v_ids?: string;
  group_product_slug?: string;
};
export type SortState = {
  by: string;
  isAsc: boolean;
};
