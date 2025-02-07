import React, { lazy, useState } from 'react'
import { Steps } from 'primereact/steps';
import { useFormContext } from 'react-hook-form';

const RegisterForm = lazy(() => import('./RegisterForm'));
const WelcomeDataStepOne = lazy(() => import('./WelcomeDataStepOne'));
const WelcomeDataStepTwo = lazy(() => import('./WelcomeDataStepTwo'));

const StepsRegister = () => {
  const {watch} = useFormContext();
  const steps = [
    { component: <RegisterForm/> },
    { component: <WelcomeDataStepOne/>},
    { component: <WelcomeDataStepTwo/> }
  ];
  return (
    <>
      <Steps
        model={steps}
        activeIndex={watch("stepsPosition")}
        className="w-full h-auto"
        pt={{
          root: { className: 'hidden' }
        }}
      />
      <div className="w-full flex justify-center items-center bg-white rounded-xl shadow-md">
        {steps[watch("stepsPosition")].component}
      </div>

    </>
  )
}

export default StepsRegister