import React from "react";
import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  id: string;
  label: string;
  type: "text" | "number" | "textarea";
  register: UseFormRegisterReturn;
  error?: FieldError;
  step?: string;
  rows?: number;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  register,
  error,
  step,
  rows,
  placeholder,
}) => {
  const baseClassName =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          {...register}
          className={baseClassName}
          rows={rows || 3}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          type={type}
          step={step}
          {...register}
          className={baseClassName}
          placeholder={placeholder}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormField;
