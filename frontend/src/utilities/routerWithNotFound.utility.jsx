import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const NotFound = lazy(() => import('../components/PageNotFound'));


const RouterWithNotFound = ({ children }) => {
  return (
    <Routes>
        { children }
        <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}
export default RouterWithNotFound