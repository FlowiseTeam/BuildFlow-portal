import { Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react';

export function Modal({
  onClose,
  title,
  children,
  show,
  className = '',
  dialogClassName = '',
}: {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  show: boolean;
  className?: string;
  dialogClassName?: string;
}) {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className={`relative z-10 ${className}`} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-10 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-30 overflow-y-auto">
          <div className=" flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={` w-full max-w-2xl  transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${dialogClassName}`}
              >
                {title && (
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-primary">
                    {title}
                  </Dialog.Title>
                )}
                <div className="mt-2">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
