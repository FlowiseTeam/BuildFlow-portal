import { useSidebarContext } from '@components/sidebar/SidebarProvider';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon, ChevronDownIcon, Bars3Icon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { UserSection } from './UserSection';

export function Header({ noSidebar = false }: { noSidebar?: boolean }) {
  const { toggle } = useSidebarContext();

  return (
    <header className="sticky top-0 z-10 flex w-full items-center justify-between bg-white px-4 py-2">
      {!noSidebar && (
        <button className="lg:hidden">
          <Bars3Icon className="h-6 w-6" onClick={toggle} />
        </button>
      )}
      <h1 className="ml-4 mt-4 font-abhaya text-4xl font-bold text-primary">Buildflow</h1>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="" aria-label="logowanie">
            <UserCircleIcon className="inline-block h-6 w-6" />
            <ChevronDownIcon className="inline-block h-6 w-6 text-primary" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="absolute right-0">
            <UserSection />
          </div>
        </Transition>
      </Menu>
    </header>
  );
}
