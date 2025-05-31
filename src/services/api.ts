/* eslint-disable @typescript-eslint/no-explicit-any */
// api/useByOrder.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const KEY_SEARCH_BANK = 'search-service-ssc';

export interface IRequest {
  params: Record<string, any>;
}

export const searchOrder = async ({ params }: IRequest) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`https://nestjs-order-api.onrender.com/orders?${query}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  return response.json();
};

type QueryFnType = typeof searchOrder;
type ExtractFnReturnType<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

export const useByOrder = (
  request: IRequest,
  config?: UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: [KEY_SEARCH_BANK, request],
    queryFn: () => searchOrder(request),
    refetchOnWindowFocus: false,
    ...config,
  });
};
