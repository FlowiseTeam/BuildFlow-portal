export function DetailCard({
  children,
  className = '',
  border = 'border-[1px]',
}: {
  children: React.ReactNode;
  className?: string;
  border?: string;
}) {
  return <div className={` rounded-[20px] ${border} shadow-lg ${className} overflow-hidden`}>{children}</div>;
}
