import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/services";
import "./CadastroUsuario.css";

export const CadastroUsuario = () => {

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const cadastrar = async (e) => {

        e.preventDefault();

        try {

            await api.post("/Usuario", {
                nome,
                email,
                senha
            });

            alert("Usuário cadastrado!");

            navigate("/home");

        } catch (error) {

            console.log(error);

            alert("Erro ao cadastrar");

        }
    };

   return (
    <main className="main_cadastro">

        <form
            onSubmit={cadastrar}
            className="form_cadastro"
        >

            <h2>Criar Conta</h2>

            <div className="campo">
                <label>Nome</label>

                <input
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>

            <div className="campo">
                <label>Email</label>

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="campo">
                <label>Senha</label>

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>

            <button
                className="btnCadastrar"
                type="submit"
            >
                Cadastrar
            </button>

        </form>

    </main>
);

}
