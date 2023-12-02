import { LoadingIcon } from '@src/components/loadings/Loading';

export function SummaryCard({
  name,
  count,
  imgSrc,
  isError = false,
  isSlowFetch = false,
  isLoading,
}: {
  name: string;
  count: number | string | undefined;
  imgSrc: string;
  isError?: boolean;
  isSlowFetch?: boolean;
  isLoading: boolean;
}) {
  return (
    <div className="flex h-full items-center p-5">
      <div className="shrink-0">
        <img src={imgSrc} alt="" />
      </div>
      <div className="ml-4 mt-2 flex h-full flex-col justify-start self-start">
        <p className="font-abhaya text-gray-500">{name}</p>
        {isLoading && (
          <div className="flex w-full justify-center">
            <LoadingIcon />
          </div>
        )}
        {isError && <p className="text-xs text-red-600">Nie można pobrać danych...</p>}
        {!isError && isSlowFetch && <p className="text-xs text-yellow-600">Pobieranie trwa dłużej niż zwykle...</p>}
        {!isLoading && (
          <p className="text-2xl font-semibold text-primary">{typeof count === 'undefined' ? '--;--' : count}</p>
        )}
      </div>
    </div>
  );
}
