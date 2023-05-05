export function SidebarNav({ children }: { children: React.ReactNode }) {
  return (
    <nav className="mt-16">
      <ul>{children}</ul>
    </nav>
  );
}
