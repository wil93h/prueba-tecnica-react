import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getRegistrationSchema } from '../../validation/schema';
import StepsRegister from './components/StepsRegister';
import { useTranslation } from 'react-i18next';



const Register = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getRegistrationSchema(t)),
  });

  return (
  <form onSubmit={handleSubmit(()=>{console.log("HOLA")})}>
    <StepsRegister />
  </form>
  )
}

export default Register
