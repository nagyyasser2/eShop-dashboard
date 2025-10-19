import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";

interface CheckboxInputProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export default function CheckboxInput({
  id,
  label,
  register,
  error,
}: CheckboxInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type="checkbox"
        {...register}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
