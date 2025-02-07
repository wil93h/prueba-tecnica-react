import React from 'react'
import FormField from '../../../components/FormField'
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from "primereact/autocomplete";
import Samla from "../../../assets/Layer 1.svg"
import { useTranslation } from "react-i18next";
import { Button } from 'primereact/button';
import { useFormContext } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';

const RegisterForm = () => {
  const { t } = useTranslation();
const { watch, setValue, trigger } = useFormContext();
  const nextStep = async() => {
    console.log(watch(), 'watch')
    const resultado = await trigger([
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'idType',
      'idNumber'
    ]);
    if (resultado) {
      setValue('stepsPosition', 1);
    }
  }
  return (
    <div className='h-screen w-full flex sm:flex-row flex-col'>

    <div className='min-h-3/4 sm:h-full w-full grid sm:w-3/6 bg-cover bg-center bg-no-repeat rounded-b-2xl sm:rounded-r-2xl sm:rounded-bl-none'  
      style={{ backgroundImage: 'url("/src/assets/bg_img.png"), radial-gradient(circle, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.5) 100%)'}}
    > 
      <div className='flex items-center justify-center'>
        <div className='w-3/5 h-3/5 bg-cover sm:bg-center  bg-no-repeat rounded-2xl'
          style={{ backgroundImage: 'url("/src/assets/img-register.png"), radial-gradient(circle, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.5) 100%)'}}
          ></div>
      </div>
    </div>

    <div className='flex flex-col p-10 justify-center align-middle  w-3/6 gap-2'>
      <img className='p-1 w-30 pb-8' src={Samla} />
      <h1 className='text-2xl font-medium font-sans'>{t("register")}</h1>
      <FormField name="firstName" labelKey="firstName.label" component={InputText} />
      <FormField name="lastName" labelKey="lastName.label" component={InputText} />
      <FormField name="email" labelKey="email.label" component={InputText} />
      <FormField name="phoneNumber" labelKey="phoneNumber.label" component={InputText} />
      <FormField name="idType" labelKey="idType.label" component={Dropdown} options={watch("idTypeSuggestions")}  />
      <FormField name="idNumber" labelKey="idType.label" component={InputText} />
      <div className='pt-4'>
        <Button className="w-full !bg-primary !rounded-lg h-10  hover:!bg-primary/80 !border-primary" label={t("submit")} onClick={nextStep} />
      </div>
    </div>


  </div>
  )
}

export default RegisterForm