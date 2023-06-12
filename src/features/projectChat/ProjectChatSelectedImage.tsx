import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@src/components/button/Button';

export function ProjectChatSelectedImage({ fileName, deleteFile }: { fileName: string; deleteFile: () => void }) {
  return (
    <div className="flex w-full justify-between">
      <p className=" overflow-hidden text-ellipsis text-sm text-gray-500">{fileName}</p>
      <Button size="custom" variant="light" className="rounded-md p-[1px]" onClick={deleteFile}>
        <TrashIcon className="h-4" />
      </Button>
    </div>
  );
}
