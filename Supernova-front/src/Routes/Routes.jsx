import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PrivateRoute from "./privateroute";
import { AlimentoContext } from "../context/AlimentoContext";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} path="/" />

                <Route element={
                    <PrivateRoute>
                        <CadastrarAlimento />
                    </PrivateRoute>
                } path="/alimento" />

                <Route element={<CadastrarTipoAlimento />} path="/tipoalimentos" />
            </Routes>
        </BrowserRouter>
    )
}