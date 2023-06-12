import { FolderPlusIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Button } from '@src/components/button/Button';
import { useForm } from 'react-hook-form';
import { ProjectChatSelectedImage } from './ProjectChatSelectedImage';
import { createComment } from '@src/services/api';
import { queryClient } from '@src/main';
import { useState } from 'react';

type ProjectChatFormInputs = {
  message: string;
  files: FileList;
};

export function ProjectChatForm({ projectId }: { projectId: number }) {
  const { handleSubmit, register, watch, setValue, getValues, formState, reset } = useForm<ProjectChatFormInputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ProjectChatFormInputs) => {
    setLoading(true);
    const formData = new FormData();
    for (const key of Object.keys(data.files)) {
      formData.append('images[]', data.files[key as any]);
    }
    formData.append('message', data.message);
    formData.append('status', 'active');

    reset();
    await createComment(projectId, formData);
    await queryClient.invalidateQueries(['project-messages', projectId]);
    setLoading(false);
  };

  const handleDeleteFile = (file: File) => {
    const dt = new DataTransfer();

    [...getValues('files')].forEach((f) => {
      if (file !== f) {
        dt.items.add(f);
      }
    });

    setValue('files', dt.files);
  };

  return (
    <div className=" rounded-xl border-[1px] border-gray-300 p-1">
      {loading && <p>Wysyłanie...</p>}
      {watch('files') &&
        [...watch('files')].map((file) => (
          <ProjectChatSelectedImage key={file.name} fileName={file.name} deleteFile={() => handleDeleteFile(file)} />
        ))}
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full justify-between">
        <input {...register('message')} className="max-h-[8rem] w-48 overflow-y-auto" />
        <div className="h-6 whitespace-nowrap">
          <Button
            type="submit"
            disabled={!formState.isValid || !formState.isDirty}
            size="custom"
            variant="light"
            className="rounded-md p-[1px]"
          >
            <PaperAirplaneIcon className="inline h-6" />
          </Button>
          <label htmlFor="file-input">
            <FolderPlusIcon className="inline h-6" />
          </label>
          <input
            {...register('files')}
            accept=".png,.jpg,.jpeg,.gif,.mp4"
            className="hidden"
            type="file"
            id="file-input"
            multiple
          />
        </div>
      </form>
    </div>
  );
}
