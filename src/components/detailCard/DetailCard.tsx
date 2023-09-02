import { tm } from '@src/lib/tw';

export function DetailCard({
  children,
  className,
  border = 'border-[1px]',
}: {
  children: React.ReactNode;
  className?: string;
  border?: string;
}) {
  return <div className={tm('overflow-hidden rounded-[20px] shadow-lg', border, className)}>{children}</div>;
}
