export const variants = {
  primary: 'bg-primary-light hover:bg-primary text-white',
  neutral: 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 hover:text-neutral-800',
  danger: 'bg-red-500 hover:bg-red-700 text-white',
  success: 'bg-green-500 hover:bg-green-700 text-white',
  warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
};

export const sizes = {
  xs: 'py-1 px-3 text-xs',
  sm: 'py-[5px] px-4',
  md: 'py-2 px-5 text-md',
  lg: 'py-2 px-7 text-lg',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export function Button({ children, variant = 'neutral', size = 'sm', className, ...rest }: ButtonProps) {
  return (
    <button className={`rounded-full font-abhaya   ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
