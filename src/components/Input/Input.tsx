import { tm } from '@src/lib/tw';
import { noop } from 'lodash';
import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

export function errorMessage<T extends FieldValues = FieldValues>(
  type: FieldError['type'],
  validationSchema: RegisterOptions<T>,
) {
  switch (type) {
    case 'minLength': {
      return `Minimalna długość to ${validationSchema.minLength} znaki`;
    }
    case 'maxLength': {
      return `Maksymalna długość to ${validationSchema.minLength} znaki`;
    }
    case 'required': {
      return 'To pole jest wymagane';
    }
    case 'pattern': {
      return 'Niepoprawne dane';
    }
    default: {
      return 'Błąd';
    }
  }
}

export interface InputProps<T extends FieldValues = FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  error?: FieldError;
  validationSchema?: RegisterOptions<T>;
  register?: UseFormRegister<T> | typeof noop;
  className?: string;
  labelText?: string;
}

export function Input<T extends FieldValues = FieldValues>({
  name,
  validationSchema,
  className,
  register = noop,
  labelText,
  error,
  id,
  type,
  disabled,
  ...rest
}: InputProps<T>) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-xs text-gray-600" htmlFor={id}>
        {labelText}
      </label>
      <input
        className={tm(
          'h-9 rounded-lg border-2 p-1 pl-2',
          disabled && 'cursor-not-allowed text-gray-600',
          error && 'focus:outline-red-500',
        )}
        type={type}
        id={id}
        aria-invalid={!!error}
        disabled={disabled}
        {...register(name, validationSchema)}
        {...rest}
      />
      <div className="h-6">
        {error && validationSchema && (
          <p className="text-xs text-red-600">{errorMessage(error.type, validationSchema)}</p>
        )}
      </div>
    </div>
  );
}
