import React, { useState } from 'react'
import { Steps } from 'primereact/steps';
import RegisterForm from './RegisterForm';
import WelcomeDataStepOne from './WelcomeDataStepOne';
import WelcomeDataStepTwo from './WelcomeDataStepTwo';

const StepsRegister = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const steps = [
    { label: 'Información Personal', component: <RegisterForm/> },
    { label: 'Detalles de Cuenta', component: <WelcomeDataStepOne/>},
    { label: 'Confirmación', component: <WelcomeDataStepTwo/> }
  ];
  return (
    <>
      <Steps
        model={steps}
        activeIndex={activeIndex}
        className="w-full h-full"
        pt={{
          root: { className: 'hidden' }
        }}
      />
      <div className="h-full w-full flex justify-center items-center bg-white rounded-xl shadow-md">
        {steps[activeIndex].component}
      </div>

    </>
  )
}

export default StepsRegister