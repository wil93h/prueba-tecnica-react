import React from 'react'
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getRegistrationSchema } from '../../validation/schema';
import StepsRegister from './components/StepsRegister';
import { useTranslation } from 'react-i18next';
import { ProgressSpinner } from 'primereact/progressspinner';



const Register = () => {
  const { t } = useTranslation();

  const methods = useForm({
    resolver: yupResolver(getRegistrationSchema(t)),
    defaultValues: {
      email: "",
      phoneNumber: "",
      address: "",
      idNumber: "",
      firstName: "",
      lastName: "",
      idTypeSuggestions: [
        { label: "Pasaporte", value: "passport" },
        { label: "DUI", value: "nationalId" },
      ],
      departmentSuggestions: [
        { label: "San Salvador", value: "San Salvador" },
        { label: "Santa Ana", value: "Santa Ana" },
      ],
      municipalitySuggestions: [
        { label: "San Salvador", value: "San Salvador" },
        { label: "Santa Ana", value: "Santa Ana" },
      ],
      stepsPosition:0,
      loading: false,
    }
  });
  const { watch } = methods;
  return (
    <FormProvider {...methods}>
      {watch("loading") &&(
        <div className="fixed inset-0 flex justify-center items-center transparent bg-white opacity-50 z-50">
          <ProgressSpinner style={{ width: "50px", height: "50px" }} />
        </div>)
      }
      <StepsRegister />
    </FormProvider>
  )
}

export default Register
