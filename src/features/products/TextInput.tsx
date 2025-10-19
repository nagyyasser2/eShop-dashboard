import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  step?: string;
  rows?: number;
}

export default function TextInput({
  id,
  label,
  type = "text",
  register,
  error,
  step,
  rows,
}: TextInputProps) {
  const inputClasses =
    "mt-1 block w-full rounded-md border-gray-300 border focus:border-green-600 focus:ring-green-600 sm:text-sm";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          rows={rows ?? 4}
          {...register}
          className={inputClasses}
        />
      ) : (
        <input
          id={id}
          type={type}
          step={step}
          {...register}
          className={inputClasses}
        />
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
