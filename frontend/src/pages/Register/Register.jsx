import React from 'react'
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getRegistrationSchema } from '../../validation/schema';
import StepsRegister from './components/StepsRegister';
import { useTranslation } from 'react-i18next';



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
      // monthlyIncome: 0,
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
      stepsPosition:1
    }
  });

  return (
    <FormProvider {...methods}>
      <StepsRegister />
    </FormProvider>
  )
}

export default Register
