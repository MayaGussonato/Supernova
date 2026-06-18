import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PrivateRoute from "../Routes/PrivateRoute"
import CadastroAlimento from "../pages/CadastroAlimento/CadastroAlimento";
import CadastroTipoAlimento from "../pages/CadastroTipoAlimento/CadastroTipoAlimento";
import Login from "../pages/Login/Login";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} path="/" />

                <Route element={
                    <PrivateRoute>
                        <CadastroAlimento />
                    </PrivateRoute>
                } path="/alimento" />

                <Route element={<CadastroTipoAlimento />} path="/tipoalimento" />
            </Routes>
        </BrowserRouter>
    )
}


export default Rotas;