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
  registerProps?: any[];
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'] | 'textarea';
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
  registerProps = [],
  ...rest
}: InputProps<T>) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label
        className={tm(
          'after:text-red ml-1 text-xs text-gray-600',
          !disabled && validationSchema?.required && "after:ml-[2px] after:text-red-500 after:content-['*']",
        )}
        htmlFor={id}
      >
        {labelText}
      </label>
      {type !== 'textarea' ? (
        <input
          className={tm(
            'h-9 rounded-lg border-2 p-1 pl-2',
            disabled && ' text-gray-600',
            error && 'focus:outline-red-500',
          )}
          type={type}
          id={id}
          aria-invalid={!!error}
          disabled={disabled}
          {...register(name, validationSchema, ...registerProps)}
          {...rest}
        />
      ) : (
        <textarea
          className={tm(
            'min-h-[36px] rounded-lg border-2 p-1 pl-2',
            disabled && ' text-gray-600',
            error && 'focus:outline-red-500',
          )}
          id={id}
          aria-invalid={!!error}
          disabled={disabled}
          {...register(name, validationSchema, ...registerProps)}
          {...rest}
        />
      )}
      <div className="h-5">
        {error && validationSchema && (
          <p className="text-xs text-red-600">{errorMessage(error.type, validationSchema)}</p>
        )}
      </div>
    </div>
  );
}
