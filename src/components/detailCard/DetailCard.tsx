export function DetailCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`overflow-hidden rounded-[20px] border-[1px] shadow-lg ${className}`}>{children}</div>;
}
