interface PageParams {
  page?: number;
  size?: number;
  order_types?: string[];
}

export function buildPageQuery(
  params: PageParams,
  defaultSize = 20
): URLSearchParams {
  const qs = new URLSearchParams();
  qs.append("page", String(params.page ?? 1));
  qs.append("size", String(params.size ?? defaultSize));
  const orders = params.order_types ?? ["CREATED_AT_DESC"];
  orders.forEach((o) => qs.append("order_types", o));
  return qs;
}
