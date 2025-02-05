import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Register } from './pages/Register/Register'


function App() {
  
  return (
    <Suspense fallback={<>Cargando...</>}>
    <Provider store={store}>
      <BrowserRouter>
        <RouterWithNotFound>
          <Route path="/" element={<Register/>} />
        </RouterWithNotFound>
      </BrowserRouter>
    </Provider>
   </Suspense>
  )
}

export default App
