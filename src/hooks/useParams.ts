import { useParams as useRouterParams } from 'react-router-dom';

export function useParams(param: string) {
  const routerParam = useRouterParams()[param];

  if (!routerParam) {
    throw new Error(`${param} is not avaible!`);
  }

  return routerParam;
}

export function useIdParam() {
  return useParams('id');
}
