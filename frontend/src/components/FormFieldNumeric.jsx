import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputNumber } from "primereact/inputnumber";

const FormFieldNumeric = ({ name, labelKey, classN, ...props }) => {
  const { control, formState: { errors }, trigger } = useFormContext();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="peer-focus:text-yellow-500 peer-placeholder-shown:text-yellow-400 transition-colors">
        {t(labelKey)}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputNumber
            id={name}
            {...field}
            {...props}
            inputClassName={`peer ${classN} h-10 !rounded-xl ${errors[name] ? "p-invalid" : ""}`}
            onChange={(e) => {
              field.onChange(e.value);
              trigger(name);
            }}
          />
        )}
      />

      {errors[name] && <small id={name} className="p-error">{errors[name]?.message}</small>}
    </div>
  );
};

export default FormFieldNumeric;