import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps<T extends FieldValues = FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  error?: FieldError;
  validationSchema?: RegisterOptions<T>;
  register?: UseFormRegister<T>;
  className?: string;
  labelText?: string;
}

export function Input<T extends FieldValues = FieldValues>({
  name,
  validationSchema,
  className,
  register,
  labelText,
  defaultValue,
  error,
  id,
  type,
  disabled,
  ...rest
}: InputProps<T>) {
  const hookFormProps = register ? { ...register(name, validationSchema) } : {};
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-xs text-gray-600" htmlFor={id}>
        {labelText}
      </label>
      <input
        className={`h-9 rounded-lg border-2 p-1 pl-2 ${disabled ? 'cursor-not-allowed text-gray-600' : ''}`}
        {...hookFormProps}
        type={type}
        id={id}
        disabled={disabled}
        defaultValue={defaultValue}
        {...rest}
      />
      <div className="h-6">
        {error?.type === 'minLength' && (
          <p className="text-xs text-red-600">{`Minimalna długość to ${validationSchema?.minLength} znaki`}</p>
        )}
        {error?.type === 'maxLength' && (
          <p className="text-xs text-red-600">{`Maksymalna długość to ${validationSchema?.maxLength} znaki`}</p>
        )}
        {error?.type === 'required' && <p className="text-xs text-red-600">To pole jest wymagane</p>}
        {error?.type === 'pattern' && <p className="text-xs text-red-600">Niepoprawne dane</p>}
      </div>
    </div>
  );
}
