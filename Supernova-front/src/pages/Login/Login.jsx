// import Logo from "../../assets/img/logo.svg"; // Troque depois pelo logo do SuperNova!
import "./Login.css";
import { useContext, useEffect, useState } from "react";
import { UsuarioContext } from "../../context/UsuarioContext.jsx";
import { SenhaContext } from "../../context/SenhaContext.jsx";
import { useNavigate } from "react-router-dom";
import { Alerta } from "../../components/alerta/Alerta.jsx";
import api from "../../Services/services";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const { setUsuario } = useContext(UsuarioContext);
    const [novoEmail, setnovoEmail] = useState(""); 
    const [novoSenha, setnovoSenha] = useState("");
    const navigation = useNavigate();

    useEffect(() => {
        const logado = JSON.parse(localStorage.getItem("Usuario"));
        if (logado) {
            setUsuario(logado);
            navigation("/alimento");
        }
    }, [navigation, setUsuario]);

    const realizarLogin = async (e) => {
        e.preventDefault();

        if (novoEmail.trim().length === 0 || novoSenha.trim().length === 0) {
            Alerta({ title: "Erro", text: "Preencha todos os campos!", icon: "error" });
            return;
        }

        const dadoslogin = {
            Email: novoEmail,
            Senha: novoSenha,
        };

        try {
            const retornoAPI = await api.post("/Login", dadoslogin);
            const token = retornoAPI.data.token;
            
            const usuarioDecoded = jwtDecode(token);
            setUsuario(usuarioDecoded.email); 

            localStorage.setItem("Usuario", JSON.stringify(usuarioDecoded.email));
            localStorage.setItem("Token", token);
            
            navigation("/alimento");

        } catch (error) {
            console.error("Erro na requisição:", error);
            Alerta({ title: "Erro", text: "Falha ao realizar login.", icon: "error" });
        }
    };

    return (
        <main className="main_login">
            <div className="banner"></div>
            <section className="section_login">
                <h1>SuperNova Front</h1>
                <form onSubmit={realizarLogin} className="form_login">
                    <h2>LOGIN</h2>
                    <div className="campos_login">
                        <div className="campo_input">
                            <label htmlFor="email">Email:</label>
                            <input 
                                onChange={(e) => setnovoEmail(e.target.value)} 
                                value={novoEmail} 
                                type="email" 
                                placeholder="Digite seu e-mail"
                            />
                        </div>
                        <div className="campo_input">
                            <label htmlFor="senha">Senha:</label>
                            <input 
                                onChange={(e) => setnovoSenha(e.target.value)} 
                                value={novoSenha} 
                                type="password" 
                                placeholder="Digite sua senha"
                            />
                        </div>
                    </div>
                    <button className="botao" type="submit">Entrar</button>
                </form>
            </section>
        </main>
    );
};

export default Login;