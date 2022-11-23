export type Action = {
  payload?: any;
  type?: string;
};

export type QueryParams = {
  sortBy?: string;
  sortType?: string;
  limit?: string;
  p?: string;
};

type Timestamp = {
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  images: ProductVariantImage[];
  productVariants: ProductVariant[];
} & Timestamp;

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
  productVariant: ProductVariant;
  productVariantId: number;
  quantity: number;
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
