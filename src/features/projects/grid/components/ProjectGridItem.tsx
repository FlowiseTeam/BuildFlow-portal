import { UserGroupIcon, TruckIcon, CalendarDaysIcon } from '@heroicons/react/20/solid';
import { Button } from '@src/components/button/Button';
import { FallbackMap } from '@src/components/fallbackMap/FallbackMap';
import { Project } from '@src/services/api-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const statusButtonStyles = {
  Zawieszony: 'bg-red-400 hover:bg-red-500',
  'W trakcie': 'bg-yellow-300 hover:bg-yellow-400',
  Zakończony: 'bg-green-400 hover:bg-green-500',
};

export function ProjectGridItem({
  project,
  setActiveProject,
}: {
  project: Project;
  setActiveProject: React.Dispatch<React.SetStateAction<Project | null>>;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col overflow-hidden rounded-xl shadow">
      <div className="map-wrapper relative">
        <Button
          onClick={() => setActiveProject(project)}
          size="xs"
          variant="none"
          className={`absolute ml-2 mt-2 ${statusButtonStyles[project.status]}`}
        >
          {project.status}
        </Button>
        <div className="h-80">
          <FallbackMap />
        </div>
      </div>
      <Footer onClick={() => navigate(String(project._id))}>
        <FooterItem className="flex-grow ">
          <p>{`${project.street},`}</p>
          <p>{project.city}</p>
        </FooterItem>
        <FooterItem className="text-center">
          <UserGroupIcon className="mx-auto h-6 w-full" />
          <p>{project.employees.length}</p>
        </FooterItem>
        <FooterItem className="ml-6 text-center">
          <TruckIcon className="mx-auto h-6 w-full" />
          {/* TODO: add vehicles */}
          <p>{0}</p>
        </FooterItem>
        <FooterItem className="ml-6">
          <CalendarDaysIcon className="mx-auto h-6 w-full" />
          <p>{new Date(project.end_date).toLocaleDateString()}</p>
        </FooterItem>
      </Footer>
    </div>
  );
}

function Footer({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-grow items-center bg-neutral-100  px-4 py-2 text-sm hover:cursor-pointer"
    >
      {children}
    </div>
  );
}

function FooterItem({ className, children }: { className: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}
