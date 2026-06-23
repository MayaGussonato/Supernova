import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/services";
import "./CadastroUsuario.css";

export const CadastroUsuario = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("cliente"); 

    const cadastrar = async (e) => {
        e.preventDefault();

        try {
            await api.post("/Usuario", {
                nome,
                email,
                senha,
                tipoUsuario 
            });

            alert(`Usuário (${tipoUsuario}) cadastrado com sucesso!`);

            // Redirecionamento condicional de acordo com o tipo do usuário
            if (tipoUsuario === "admin") {
                navigate("/alimento"); // Se for admin, vai para a tela de alimentos
            } else {
                navigate("/home");     // Se for cliente (ou qualquer outro), vai para a home
            }

        } catch (error) {
            console.log(error);
            alert("Erro ao cadastrar. Verifique se os dados estão corretos.");
        }
    };

    return (
        <main className="main_cadastro">
            <form onSubmit={cadastrar} className="form_cadastro">
                <h2>Criar Conta</h2>

                <div className="campo">
                    <label>Nome</label>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

                <div className="campo">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="campo">
                    <label>Senha</label>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>

                <div className="campo">
                    <label>Tipo de Usuário</label>
                    <select 
                        value={tipoUsuario} 
                        onChange={(e) => setTipoUsuario(e.target.value)}
                        className="select-tipo"
                    >
                        <option value="cliente">Cliente</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>

                <button className="btnCadastrar" type="submit">
                    Cadastrar
                </button>
            </form>
        </main>
    );
};