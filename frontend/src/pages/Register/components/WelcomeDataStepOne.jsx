import React from "react";
import { useTranslation } from "react-i18next";
import Samla from "../../../assets/Layer 1.svg";
import File from "../../../assets/perm_media.svg";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import FormField from "../../../components/FormField";
import { Controller, useFormContext } from "react-hook-form";
import FormFieldNumeric from "../../../components/FormFieldNumeric";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";

const WelcomeDataStepOne = () => {
  const { t } = useTranslation();
  const {
    watch,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext();
  const nextStep = async () => {
    console.log(watch(), "watch");
    const resultado = await trigger([
      "department",
      "municipality",
      "address",
      "monthlyIncome",
      "fileId",
    ]);
    if (resultado) {
      setValue("stepsPosition", 2);
    }
  }
  const handleFileSelect = (event) => {
    const files = event.files;
    console.log("🚀 ~ handleFileSelect ~ files:", files)
    if (Array.isArray(files) && files.length > 0) {
    
      const validFiles = files.filter(
        (file) =>
          ["image/png", "image/jpg", "image/jpeg"].includes(file.type) &&
          file.size <= 5 * 1024 * 1024
      );
      console.log("🚀 ~ handleFileSelect ~ validFiles:", validFiles)
      setValue("fileId", validFiles);
    } else {
      setValue("fileId", []);
    }
  
    trigger("fileId");
  };
  const templateFileUpload = () => (
    <div className="sm:h-full flex flex-col items-center justify-center text-center border-dashed border-2 border-blue-400 rounded-lg p-6">
      <img className="p-1 w-20 " src={File} />
      <p className="mt-4 text-lg font-normal text-[#0B0B0B]">
        {t("fileUpload.dragAndDropText")}
      </p>
      <div className="w-full flex items-center gap-2 text-lg">
        <hr className="w-full border-[#E7E7E7]" />
        <span className="text-gray-700">o</span>
        <hr className="w-full border-[#E7E7E7]" />
      </div>
      <button
        type="button"
        onClick={() => {
          document.querySelector("input[type='file']")?.click();
        }}
        className="px-4 py-2 bg-[#F2F4F7] text-black rounded-lg mt-4 hover:bg-[#F2F4F7]/70"
      >
        {t("fileUpload.selectFileButton")}
      </button>
    </div>
  );

  return (
    <div className="w-full sm:h-screen flex flex-col">
      <div className='h-7 w-full bg-cover bg-center bg-no-repeat'  
        style={{ backgroundImage: 'url("/src/assets/bg_img.png"), radial-gradient(circle, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.5) 100%)'}}
      ></div> 
      <div className="sm:h-7/8 w-full flex sm:flex-row flex-col">
        <div className="flex flex-col p-10 justify-center align-middle w-full sm:w-3/6 gap-2">
          <img className="p-1 w-30 pb-8" src={Samla} />
          <h1 className="text-2xl font-medium font-sans">{t("housingData")}</h1>
          <FormField
            name="department"
            labelKey="department.label"
            component={Dropdown}
            options={watch("departmentSuggestions")}
          />
          <FormField
            name="municipality"
            labelKey="municipality.label"
            component={Dropdown}
            options={watch("municipalitySuggestions")}
          />
          <FormField
            name="address"
            labelKey="address.label"
            component={InputText}
          />
          <FormFieldNumeric
            name="monthlyIncome"
            labelKey="monthlyIncome.label"
            mode="decimal"
            prefix="$"
            minFractionDigits={2}
            maxFractionDigits={2}
          />
        </div>
        <div className="sm:h-full w-full grid sm:w-3/6 bg-cover bg-center bg-no-repeat rounded-b-2xl sm:rounded-r-2xl sm:rounded-bl-none align-middle items-center px-12">
          <div className="sm:h-2/6">
            <h1 className="text-2xl font-medium font-sans pb-5">
              {t("photoId")}
            </h1>
            <FileUpload
              mode="advanced"
              name="fileId"
              accept="image/*"
              className="h-full"
              customUpload
              auto
              uploadHandler={(event) => handleFileSelect(event)}
              emptyTemplate={templateFileUpload}
            />
            {errors.fileId && (
              <p className="text-red-500 text-sm mt-2">{errors.fileId.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-0 sm:h-1/8 w-full gap-3 flex flex-col sm:flex-row sm:justify-end sm:pr-10">
        <Button
          className="order-last sm:order-first sm:w-1/8 !bg-[#F2F4F7] !text-[#1D2939] !rounded-lg h-10  hover:!bg-[#F2F4F7]/60 !border-[#F2F4F7]"
          label={t("cancel")}
        />
        <Button
          className="sm:w-1/8 !bg-primary !rounded-lg h-10  hover:!bg-primary/80 !border-primary"
          label={t("continue")}
          onClick={nextStep}

        />
      </div>
    </div>
  );
};

export default WelcomeDataStepOne;
