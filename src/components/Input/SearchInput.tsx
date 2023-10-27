import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export function SearchInput() {
  return (
    <div className="relative">
      <div className="absolute left-3 top-[6px] text-gray-400">
        <MagnifyingGlassIcon className="h-4 w-4" />
      </div>
      <input
        name="filter"
        placeholder="Wyszukaj"
        className="rounded-full border-2 px-2 py-1 pl-8 text-xs   outline-gray-500"
      />
    </div>
  );
}
