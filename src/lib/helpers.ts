export const createQueryString = (filters: any): string => {
  const queryParams: string[] = [];

  if (filters.facilities && filters.facilities.length > 0) {
    filters.facilities.forEach((facility: string) => {
      queryParams.push(`${facility}=true`);
    });
  }
  if (filters.landType && filters.landType.length > 0) {
    queryParams.push(
      "region=[" +
        filters.landType.map((type: any) => `"${type}"`).join(",") +
        "]"
    );
  }
  if (filters.landStatus && filters.landStatus.length > 0) {
    queryParams.push(`estate=${filters.landStatus.join(",")}`);
  }
  if (filters.crop && filters.crop.length > 0) {
    queryParams.push(`crop=${filters.crop}`);
  }
  if (filters.price && filters.price.length > 0) {
    queryParams.push(`estate_minmax=${filters.price}`);
  }
  if (filters.landSize && filters.landSize.length > 0) {
    queryParams.push(`farm_size=${filters.landSize}`);
  }

  return queryParams.join("&");
};
