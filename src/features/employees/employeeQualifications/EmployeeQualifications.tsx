import { Button } from '@src/components/button/Button';
import { AddQualificationModal } from './AddQualificationModal';
import { useState } from 'react';

export function EmployeeQualifications({ qualifications }: { qualifications: string[] | string | null | undefined }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AddQualificationModal show={isOpen} setIsOpen={setIsOpen} />
      <div>
        <header className="flex items-center justify-between border-b-2 px-4 py-2 font-semibold">
          <p>Uprawnienia</p>
          <Button onClick={() => setIsOpen(true)} size="xs">
            Dodaj
          </Button>
        </header>
        <ul className="p-4">
          {Array.isArray(qualifications) && qualifications.map((qualification) => <li>{qualification}</li>)}
          {!qualifications && <li className="text-gray-500">Brak uprawnień</li>}
          {typeof qualifications === 'string' && <li>{qualifications}</li>}
        </ul>
      </div>
    </>
  );
}
