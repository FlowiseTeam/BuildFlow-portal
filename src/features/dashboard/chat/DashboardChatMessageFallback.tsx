export function DashboardChatMessageFallback() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex justify-between">
        <div className="h-4 basis-1/3 rounded bg-neutral-200"></div>
        <div className="h-4 basis-1/3 rounded bg-neutral-200"></div>
      </div>
      <div className="mb-2">
        <div className="mb-1 h-4 rounded bg-neutral-200"></div>
        <div className="mb-1 h-4 rounded bg-neutral-200"></div>
      </div>
      <div className="mt-auto">
        <div className="h-4 basis-1/3 rounded bg-neutral-200"></div>
      </div>
    </div>
  );
}
