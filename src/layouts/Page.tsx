import { useSidebarContext } from '@components/sidebar/SidebarProvider';
import React from 'react';

export function Page({
  children,
  title,
  header,
}: {
  children: React.ReactNode;
  title?: string;
  header?: React.ReactNode;
}) {
  const { isOpen } = useSidebarContext();
  return (
    <div className={`500ms flex flex-grow p-3 transition-[margin-left] ${isOpen ? 'lg:ml-56' : 'ml-0 lg:ml-56'}`}>
      <div className={` w-full animate-enter lg:mx-8`}>
        {header ? <>{header}</> : <h2 className="font-roboto text-2xl sm:text-4xl">{title}</h2>}

        {children}
      </div>
    </div>
  );
}
