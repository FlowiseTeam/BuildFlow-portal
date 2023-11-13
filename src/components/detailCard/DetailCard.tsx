import { tm } from '@src/lib/tw';

export function DetailCard({
  children,
  className,
  border = 'border-[1px]',
  noOverflow = false,
}: {
  children: React.ReactNode;
  className?: string;
  border?: string;
  noOverflow?: boolean;
}) {
  return (
    <div className={tm('rounded-[20px] shadow-lg', border, className, noOverflow && 'overflow-hidden')}>{children}</div>
  );
}
