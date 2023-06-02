import { Input } from '@src/components/Input/Input';
import { Button } from '@src/components/button/Button';
import { Modal } from '@src/components/modal/Modal';
import { useForm } from 'react-hook-form';

interface QualificationInputs {
  qualification: string;
}

export function AddQualificationModal({
  show,
  setIsOpen,
}: {
  show: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { register, formState, handleSubmit, reset } = useForm<QualificationInputs>();

  const onSubmit = (data: QualificationInputs) => {
    setIsOpen(false);
    reset();
  };

  return (
    <Modal onClose={() => setIsOpen(false)} show={show} title="Dodaj uprawnienie">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          validationSchema={{ minLength: 3, required: true }}
          name="qualification"
          id="qualification"
          labelText="Uprawnienie"
          error={formState.errors.qualification}
        />
        <Button disabled={!formState.isValid}>Dodaj</Button>
      </form>
    </Modal>
  );
}
