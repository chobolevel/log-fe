interface PageParams {
  page?: number;
  size?: number;
  orderTypes?: string[];
}

export function buildPageQuery(
  params: PageParams,
  defaultSize = 20
): URLSearchParams {
  const qs = new URLSearchParams();
  qs.append("page", String(params.page ?? 1));
  qs.append("size", String(params.size ?? defaultSize));
  const orders = params.orderTypes ?? ["CREATED_AT_DESC"];
  orders.forEach((o) => qs.append("orderTypes", o));
  return qs;
}
