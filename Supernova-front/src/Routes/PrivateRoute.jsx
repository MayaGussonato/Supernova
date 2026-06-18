import { useContext } from "react";
import { AlimentoContext } from "../context/AlimentoContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {alimento} = useContext(AlimentoContext)

    return alimento ? children : <Navigate to="/"/>
}

export default PrivateRoute