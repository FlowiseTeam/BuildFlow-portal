import { Button } from '@src/components/button/Button';
import { AddQualificationModal } from './AddQualificationModal';
import { useState } from 'react';
import { Employee } from '@src/services/api-types';
import { updateEmployee } from '@src/services/api';
import { queryClient } from '@src/main';
import { XMarkIcon } from '@heroicons/react/24/outline';

export function EmployeeQualifications({ employee, isEdited }: { employee: Employee; isEdited: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const qualifications = employee.qualifications || [];

  const handleAddQualification = async (qualification: string) => {
    const qualfs = qualifications || [];
    const updatedEmployee = { ...employee, qualifications: [...qualfs, qualification] };
    queryClient.setQueryData(['employee', employee._id], updatedEmployee);
    await updateEmployee({ ...employee, qualifications: [...qualfs, qualification] });
  };

  const handleRemoveQualification = async (index: number) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications.splice(index, 1);
    queryClient.setQueryData(['employee', employee._id], { ...employee, qualifications: updatedQualifications });
    await updateEmployee({ ...employee, qualifications: updatedQualifications });
  };

  return (
    <>
      <AddQualificationModal onAdd={handleAddQualification} show={isOpen} setIsOpen={setIsOpen} />
      <div>
        <header className="flex items-center justify-between border-b-2 px-4 py-2 font-semibold">
          <p>Uprawnienia</p>
          <Button onClick={() => setIsOpen(true)} size="xs">
            Dodaj
          </Button>
        </header>
        <ul className="my-2 px-4 [&>*:not(:first-of-type)]:border-t-2">
          {Array.isArray(qualifications) &&
            qualifications.map((qualification, i) => (
              <li className="flex items-center justify-between py-1" key={qualification}>
                <span>{qualification}</span>
                {isEdited && (
                  <Button size="custom" className="p-1" onClick={() => handleRemoveQualification(i)}>
                    <XMarkIcon className="h-4 w-4" />
                  </Button>
                )}
              </li>
            ))}
          {!qualifications && <li className="text-gray-500">Brak uprawnień.</li>}
          {typeof qualifications === 'string' && <li>{qualifications}</li>}
        </ul>
      </div>
    </>
  );
}
