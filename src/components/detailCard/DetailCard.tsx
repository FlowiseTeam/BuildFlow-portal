export function DetailCard({
  children,
  className = '',
  border = 'border-[1px]',
}: {
  children: React.ReactNode;
  className?: string;
  border?: string;
}) {
  return <div className={`overflow-hidden rounded-[20px] ${border} shadow-lg ${className}`}>{children}</div>;
}
