import { ClipboardIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useSidebarContext } from './SidebarProvider';
import { SidebarItem } from './SidebarItem';
import { SidebarNav } from './SidebarNav';
import { UserIcon } from '@components/icons/UserIcon';
import { CarIcon } from '@components/icons/CarIcon';
import { DashboardIcon } from '@components/icons/DashboardIcon';
import { LeafIcon } from '@components/icons/LeafIcon';
import { SidebarGroup } from './SidebarGroup';
import { SidebarGroupItem } from './SidebarGroupItem';

export function Sidebar() {
  const { isOpen, toggle } = useSidebarContext();

  return (
    <>
      <div onClick={toggle} className={isOpen ? 'fixed inset-0 z-10 bg-black bg-opacity-25 lg:hidden' : ''} />
      <aside
        className={`fixed top-0 z-10 transition-transform lg:top-auto ${
          isOpen ? '' : '-translate-x-56 lg:-translate-x-0'
        } 500ms h-full w-56 flex-shrink-0 bg-white px-4 pt-4 font-abhaya shadow-[8px_0px_3px_-8px] shadow-zinc-400`}
      >
        <XMarkIcon onClick={toggle} className="ml-auto h-8 lg:hidden" />
        <SidebarNav>
          <SidebarItem to="/app" name="Strona główna" icon={<DashboardIcon />} />
          <SidebarItem to="/app/projects" name="Projekty" icon={<ClipboardIcon />} />
          <SidebarItem to="/app/employees" name="Pracownicy" icon={<UserIcon />} />
          <SidebarItem to="/app/vehicles" name="Pojazdy" icon={<CarIcon />} />
          <SidebarGroup pattern="/app/bdo" to="/app/bdo/kpo" name="Raporty" icon={<LeafIcon />}>
            <SidebarGroupItem to="/app/bdo/kpo" name="KPO" />
            <SidebarGroupItem to="/app/bdo/keo" name="KEO" />
          </SidebarGroup>
        </SidebarNav>
      </aside>
    </>
  );
}
