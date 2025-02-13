import { SnackbarProvider } from 'notistack';
import { lazy, Suspense } from 'react'
import RouterWithNotFound from './utilities/routerWithNotFound.utility';
import { BrowserRouter, Route } from 'react-router-dom';
import LoadProgressSpinner from './components/LoadProgressSpinner';


const Register = lazy(() => import('./pages/Register/Register'));

function App() {
  
  return (
    <Suspense fallback={<LoadProgressSpinner/>}>
      <SnackbarProvider>
      <BrowserRouter>
        <RouterWithNotFound>
          <Route path="/" element={<Register/>} />
        </RouterWithNotFound>
      </BrowserRouter>
      </SnackbarProvider>
   </Suspense>
  )
}

export default App
