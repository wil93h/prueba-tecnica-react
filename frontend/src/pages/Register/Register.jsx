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
      idTypeSuggestions: [
        { label: "Pasaporte", value: "passport" },
        { label: "DUI", value: "nationalId" },
      ],
      stepsPosition:0
    }
  });

  return (
    <FormProvider {...methods}>
      <StepsRegister />
    </FormProvider>
  )
}

export default Register
