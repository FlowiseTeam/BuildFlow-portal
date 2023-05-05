import { useSidebarContext } from '@components/sidebar/SidebarProvider';

export function Page({ children, title }: { children: React.ReactNode; title: string }) {
  const { isOpen } = useSidebarContext();
  return (
    <div className={`transition-[margin-left] flex flex-grow  500ms ${isOpen ? 'lg:ml-56' : 'ml-0 lg:ml-56'}`}>
      <div className={` w-full animate-enter lg:mx-8`}>
        <h2 className="text-4xl col font-roboto">{title}</h2>
        {children}
      </div>
    </div>
  );
}
