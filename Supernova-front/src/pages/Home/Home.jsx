import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Importe o hook de navegação
import api from "../../services/services";
import "./home.css";

import logo from "../../assets/img/logo.png";

export const Home = () => {
    const [alimentos, setAlimentos] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [resultadoIA, setResultadoIA] = useState("");
    
    const navigate = useNavigate(); // 2. Inicialize o hook

    const buscarAlimentos = async () => {
        try {
            const resposta = await api.get("/Alimento");
            setAlimentos(resposta.data);
        } catch (error) {
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
        </div>
    );
};