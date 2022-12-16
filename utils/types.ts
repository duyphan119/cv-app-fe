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
export type QueryParams = { withDeleted?: boolean } & SortParams &
  PaginationParams;
export type SearchQueryParams = {
  q?: string;
} & QueryParams;

type Timestamp = {
  createdAt: string;
  updatedAt: string;
} & Partial<{ deletedAt?: string | null }>;

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  groupProductId: number;
  isVisible: boolean;
  price: number;
  inventory: number;
  detail: string;
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
  variantValues: VariantValue[];
} & Timestamp;

export type VariantValue = {
  id: number;
  value: string;
} & Timestamp &
  Partial<{ variant: Variant }>;

export type ProductVariant = {
  id: number;
  inventory: number;
  price: number;
  productId: number;
  product: Product;
  name: string;
  variantValues: VariantValue[];
} & Timestamp;

export type ProductVariantImage = {
  id: number;
  productId: number;
  variantValueId: number | null;
  path: string;
} & Timestamp;
export type CartItem = {
  productId: number;
  quantity: number;
} & Partial<{
  productVariant: ProductVariant;
  productVariantId: number;
  product: Product;
}>;
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
  items: OrderItem[];
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

export type RenderVariantValues = {
  keys: string[];
  values: FormattedVariants;
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
export type FormattedVariants = {
  [key: string]: VariantValue[];
};
