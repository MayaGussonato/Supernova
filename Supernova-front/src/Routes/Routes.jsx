import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PrivateRoute from "../Routes/PrivateRoute"
import CadastroAlimento from "../pages/CadastroAlimento/CadastroAlimento";
import CadastroTipoAlimento from "../pages/CadastroTipoAlimento/CadastroTipoAlimento";
import Login from "../pages/Login/Login";
import { Home } from "../pages/Home/Home";
import { CadastroUsuario } from "../pages/CadastroUsuario/CadastroUsuario";


const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/home" />
                <Route element={<Login />} path="/" />
                <Route element={<CadastroUsuario />} path="/cadastro" />

                <Route element={
                    // <PrivateRoute>
                    <CadastroAlimento />
                    // </PrivateRoute>
                } path="/alimento" />

                <Route element={<CadastroTipoAlimento />} path="/tipoalimento" />
            </Routes>
        </BrowserRouter>
    )
}


export default Rotas;