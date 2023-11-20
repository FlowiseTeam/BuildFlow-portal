import { Link, To, useLocation } from 'react-router-dom';
import { useSidebarContext } from './SidebarProvider';

export function SidebarGroup({
  to,
  name,
  pattern,
  icon,
  children,
}: {
  to: To;
  name: string;
  pattern: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { close } = useSidebarContext();
  const location = useLocation();
  // const isActive = location.pathname === to;
  const isSubItemActive = location.pathname.includes(pattern);
  const variant = isSubItemActive
    ? 'bg-gray-100 text-primary hover:bg-gray-200'
    : 'text-neutral-700 hover:bg-gray-100 hover:text-primary';

  return (
    <>
      <li>
        <Link
          to={to}
          onClick={close}
          className={`${variant} my-2 flex items-center rounded-full px-6 py-2 font-semibold`}
        >
          <div className={`mr-4 h-4 w-4 ${isSubItemActive ? 'text-primary' : 'text-gray-300'}`}>{icon && icon}</div>
          {name}
        </Link>
      </li>
      {isSubItemActive && <ul className="list-disc">{children}</ul>}
    </>
  );
}
