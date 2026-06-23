import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../services/services.js";
import { UsuarioContext } from "../../context/UsuarioContext.jsx";
import { Alerta } from "../../components/alerta/Alerta.jsx";
import "./Login.css";
import logo from "../../assets/img/Supernova.jpg";

const Login = () => {
    const { setUsuario } = useContext(UsuarioContext);
    const [novoEmail, setnovoEmail] = useState("");
    const [novoSenha, setnovoSenha] = useState("");
    const navigation = useNavigate();

    // 1. Verifica se já está logado e manda para a tela correta ao carregar a página
    useEffect(() => {
        const logado = JSON.parse(localStorage.getItem("Usuario"));
        const token = localStorage.getItem("Token");

        if (logado && token) {
            setUsuario(logado);
            try {
                const usuarioDecoded = jwtDecode(token);
                // Verifica a Role salva no token
                if (usuarioDecoded.role === "admin") {
                    navigation("/alimento");
                } else {
                    navigation("/home");
                }
            } catch (err) {
                // Se o token estiver expirado ou inválido, limpa tudo
                localStorage.clear();
            }
        }
    }, [navigation, setUsuario]);

    const realizarLogin = async (e) => {
        e.preventDefault();

        if (novoEmail.trim().length === 0 || novoSenha.trim().length === 0) {
            Alerta({ title: "Erro", text: "Preencha todos os campos!", icon: "error", confirmButtonText: "OK" });
            return;
        }

        const dadoslogin = { Email: novoEmail, Senha: novoSenha };

        try {
            const retornoAPI = await api.post("/login", dadoslogin);
            const token = retornoAPI.data.token;
            
            // Descriptografa o Token vindo da API
            const usuarioDecoded = jwtDecode(token);

            setUsuario(usuarioDecoded.email);
            localStorage.setItem("Usuario", JSON.stringify(usuarioDecoded.email));
            localStorage.setItem("Token", token);
            
            // 2. Redirecionamento condicional baseado na CLAIM de Role do Token
            // Nota: Se no seu console.log o nome vier diferente de "role" (ex: "tipoUsuario"), mude aqui.
            if (usuarioDecoded.role === "admin") {
                navigation("/alimento");
            } else {
                navigation("/home");
            }

        } catch (error) {
            console.error(error);
            Alerta({ title: "Erro", text: "Credenciais inválidas.", icon: "error", confirmButtonText: "OK" });
        }
    };
      
    return (
        <main className="main_login">
            {/* Lado Esquerdo: Banner com a identidade visual */}
            <div className="banner">
                <img
                    src={logo}
                    alt="Logo Supernova"
                    className="logoSupernova"
                />
            </div>

            {/* Lado Direito: Formulário */}
            <section className="section_login">
                <form onSubmit={realizarLogin} className="form_login">
                    <h2>LOGIN</h2>

                    <div className="campo_input">
                        <label>E-mail</label>
                        <input
                            onChange={(e) => setnovoEmail(e.target.value)}
                            value={novoEmail}
                            type="email"
                            placeholder="exemplo@supernova.com"
                        />
                    </div>

                    <div className="campo_input">
                        <label>Senha</label>
                        <input
                            onChange={(e) => setnovoSenha(e.target.value)}
                            value={novoSenha}
                            type="password"
                            placeholder="********"
                        />
                    </div>

                    <button className="botao" type="submit">Entrar</button>

                    <p className="textoCadastro">
                        Não possui conta?
                    </p>

                    <button
                        type="button"
                        className="botaoCadastro"
                        onClick={() => navigation("/cadastro")}
                    >
                        Criar Conta
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Login;