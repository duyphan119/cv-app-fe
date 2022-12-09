import { RenderVariantType, Variant } from "./types";

export const formatVariants = (variants: Variant[]): RenderVariantType[] => {
  const result: any = {};
  const keys: string[] = [];
  variants.forEach((variant: Variant) => {
    if (result[variant.type]) {
      result[variant.type].push(variant);
    } else {
      keys.push(variant.type);
      result[variant.type] = [variant];
    }
  });

  return keys.map((key: string) => ({ key, values: result[key] }));
};

export const formatDate = (input: string | number | Date): string => {
  const d = new Date(input);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();

  return `${date < 10 ? "0" + date : date}-${
    month < 10 ? "0" + month : month
  }-${year}`;
};

export const formatTime = (input: string | number | Date): string => {
  const d = new Date(input);
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();

  return `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }:${second < 10 ? "0" + second : second}`;
};
export const formatDateTime = (input: string | number | Date): string => {
  return `${formatDate(input)} ${formatTime(input)}`;
};
