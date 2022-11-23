export const formatVariants = (variants: any[]): any => {
  const types: any = {};
  variants.forEach((variant: any) => {
    if (types[variant.type]) {
      types[variant.type].push(variant);
    } else {
      types[variant.type] = [variant];
    }
  });
  return types;
};
