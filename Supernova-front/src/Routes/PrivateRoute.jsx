import { Children, useContext } from "react";
import { AlimentoContext } from "../context/AlimentoContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({Children}) => {
    const {alimento} = useContext(AlimentoContext)

    return alimento ? Children : <Navigate to="/"/>
}

export default PrivateRoute