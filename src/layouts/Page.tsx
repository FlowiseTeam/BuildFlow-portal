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
    <div className={`p-3 500ms flex flex-grow  transition-[margin-left] ${isOpen ? 'lg:ml-56' : 'ml-0 lg:ml-56'}`}>
      <div className={` w-full animate-enter lg:mx-8`}>
        {header ? <>{header}</> : <h2 className="col font-roboto text-4xl">{title}</h2>}

        {children}
      </div>
    </div>
  );
}
