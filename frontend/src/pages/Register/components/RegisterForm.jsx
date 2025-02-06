import React from 'react'

const RegisterForm = () => {
  return (
    <div className='h-screen w-full flex '>

    <div className='h-full w-full  lg:grid lg:w-3/6 bg-cover bg-center bg-no-repeat rounded-2xl'  
      style={{ backgroundImage: 'url("/src/assets/bg_img.png"), radial-gradient(circle, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.5) 100%)'}}
    >
      
      <div className='flex items-center justify-center'>
        <div className='w-3/5 h-3/5 bg-cover bg-center bg-no-repeat rounded-2xl'
        style={{ backgroundImage: 'url("/src/assets/img-register.png"), radial-gradient(circle, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.5) 100%)'}}>
            
        </div>
      </div>
      </div>


  </div>
  )
}

export default RegisterForm