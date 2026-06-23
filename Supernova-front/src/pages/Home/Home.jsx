import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Importe o hook de navegação
import api from "../../services/services";
<<<<<<< HEAD
import "./Home.css";

export const Home = () => {
    const [alimentos, setAlimentos] = useState([]);
    const [idEditar, setIdEditar] = useState(null);
    const [nome, setNome] = useState("");
    const [idTipoAlimento, setIdTipoAlimento] = useState("");
=======
import "./home.css";

import logo from "../../assets/img/logo.png";

export const Home = () => {
    const [alimentos, setAlimentos] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [resultadoIA, setResultadoIA] = useState("");
    
    const navigate = useNavigate(); // 2. Inicialize o hook
>>>>>>> e4be027262b8e89d445793ae8b391190546ecb10

    const buscarAlimentos = async () => {
        try {
            const resposta = await api.get("/Alimento");
            setAlimentos(resposta.data);
        } catch (error) {
<<<<<<< HEAD
            console.log("Erro ao buscar alimentos:", error);
        }
    };

    const excluir = async (id) => {
        try {
            await api.delete(`/Alimento/${id}`);
            buscarAlimentos();
        } catch (error) {
            console.log("Erro ao excluir:", error);
        }
    };

    const editar = async () => {
        if (!idEditar) return;

        try {
            await api.put(`/Alimento/${idEditar}`, {
                nome,
                idTipoAlimento,
            });

            setIdEditar(null);
            setNome("");
            setIdTipoAlimento("");

            buscarAlimentos();
        } catch (error) {
            console.log("Erro ao editar:", error);
        }
    };

    const buscarTabelaNutricional = async (nomeAlimento) => {
        try {
            const resposta = await api.post("/ia/nutricional", {
                alimento: nomeAlimento,
            });

            alert(resposta.data);
        } catch (error) {
            console.log("Erro ao buscar tabela nutricional:", error);
=======
            console.log(error);
        }
    };

    const buscarTabelaNutricional = async (nome) => {
        try {
            const resposta = await api.post("/ia/nutricional", {
                alimento: nome,
            });
            setResultadoIA(resposta.data);
        } catch (error) {
            console.log(error);
            setResultadoIA("Erro ao gerar a tabela nutricional.");
>>>>>>> e4be027262b8e89d445793ae8b391190546ecb10
        }
    };

    useEffect(() => {
        buscarAlimentos();
    }, []);

    const alimentosFiltrados = alimentos.filter((item) =>
        item.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );

    // 3. Crie a função de logout separada para manter o código limpo
    const handleLogout = () => {
        localStorage.removeItem("Token");
        localStorage.removeItem("Usuario");
        
        // Redireciona para o login. 
        // IMPORTANTE: Se a sua rota de login for diferente de "/", mude aqui (ex: "/login")
        navigate("/"); 
    };

    return (
        <div className="container-home">
<<<<<<< HEAD
            <h1>Supernova</h1>

            {idEditar && (
                <div className="editar-alimento">
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome do alimento"
                    />

                    <input
                        type="number"
                        value={idTipoAlimento}
                        onChange={(e) => setIdTipoAlimento(e.target.value)}
                        placeholder="ID do tipo"
                    />

                    <button onClick={editar}>
                        Salvar Alterações
                    </button>
                </div>
            )}

            <div className="lista-produtos">
                {alimentos.map((item) => (
                    <div
                        className="card-produto"
                        key={item.idAlimento}
                    >
                        <img
                            src={item.imagem}
                            alt={item.nome}
                        />

                        <h3>{item.nome}</h3>

                        <p>
                            {item.tipoAlimento ??
                                item.tipo?.nome ??
                                item.tipo ??
                                "Sem categoria"}
                        </p>

                        <div className="acoes">
                            <button
                                onClick={() => {
                                    setIdEditar(item.idAlimento);
                                    setNome(item.nome);
                                    setIdTipoAlimento(
                                        item.idTipoAlimento ?? ""
                                    );
                                }}
                            >
                                Editar
                            </button>

                            <button
                                onClick={() =>
                                    excluir(item.idAlimento)
                                }
                            >
                                Excluir
                            </button>

                            <button
                                onClick={() =>
                                    buscarTabelaNutricional(item.nome)
                                }
                            >
                                IA Nutricional
                            </button>
                        </div>
                    </div>
                ))}
            </div>
=======
            {/* HEADER */}
            <header className="header">
                <img src={logo} alt="Supernova" className="logo" />

                <input
                    type="text"
                    placeholder="🔍 Pesquisar alimentos..."
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    className="input-pesquisa"
                />

                {/* 4. Chame a função no botão */}
                <button className="btn-logout" onClick={handleLogout}>
                    Sair
                </button>
            </header>

            {/* CONTEÚDO (Mantido igual ao seu) */}
            <main className="conteudo">
                <h2>Catálogo de Alimentos</h2>

                {resultadoIA && (
                    <div className="resultado-ia">
                        <h3>Tabela Nutricional IA</h3>
                        <pre>{resultadoIA}</pre>
                        <button
                            className="btn-fechar"
                            onClick={() => setResultadoIA("")}
                        >
                            Fechar
                        </button>
                    </div>
                )}

                <div className="lista-produtos">
                    {alimentosFiltrados.length > 0 ? (
                        alimentosFiltrados.map((item) => (
                            <div className="card-produto" key={item.idAlimento}>
                                <img
                                    src={
                                        item.imagem ||
                                        "https://placehold.co/400x300?text=Sem+Imagem"
                                    }
                                    alt={item.nome}
                                />
                                <div className="info-produto">
                                    <h3>{item.nome}</h3>
                                    <span className="categoria">
                                        {item.tipoAlimento}
                                    </span>
                                    <div className="acoes">
                                        <button className="btn-editar">Editar</button>
                                        <button
                                            className="btn-ia"
                                            onClick={() =>
                                                buscarTabelaNutricional(item.nome)
                                            }
                                        >
                                            IA Nutricional
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="sem-produtos">
                            <h3>Nenhum alimento encontrado</h3>
                        </div>
                    )}
                </div>
            </main>
>>>>>>> e4be027262b8e89d445793ae8b391190546ecb10
        </div>
    );
};