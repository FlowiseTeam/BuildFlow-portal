import { To, useLocation, Link } from 'react-router-dom';
import { useSidebarContext } from './SidebarProvider';

export function SidebarItem({ to, name, icon }: { to: To; name: string; icon?: React.ReactNode }) {
  const { close } = useSidebarContext();
  const location = useLocation();
  const isActive = location.pathname === to;
  const variant = isActive
    ? 'bg-gray-100 text-primary hover:bg-gray-200'
    : 'text-neutral-700 hover:bg-gray-100 hover:text-primary';

  return (
    <li>
      <Link
        to={to}
        onClick={close}
        className={`${variant} my-2 flex items-center rounded-full px-6 py-2 font-semibold`}
      >
        <div className={`mr-4 h-4 w-4 ${isActive ? 'text-primary' : 'text-gray-300'}`}>{icon && icon}</div>
        {name}
      </Link>
    </li>
  );
}
