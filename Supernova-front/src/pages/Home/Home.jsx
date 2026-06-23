import { useEffect, useState } from "react";
import api from "../../services/services";
import "./home.css";
import Header from "../../components/header/Header";

import logo from "../../assets/img/logo.png";
export const Home = () => {
    const [alimentos, setAlimentos] = useState([]);
    const [pesquisa, setPesquisa] = useState("");

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
            const resposta = await api.post(
                "/ia/nutricional",
                {
                    alimento: nome,
                }
            );

            alert(resposta.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        buscarAlimentos();
    }, []);

    const alimentosFiltrados = alimentos.filter((item) =>
        item.nome
            .toLowerCase()
            .includes(pesquisa.toLowerCase())
    );

    return (
        <div className="container-home">

            {/* HEADER */}
            <header className="header">

    <img
        src={logo}
        alt="Supernova"
        className="logo"
    />

    <input
        type="text"
        placeholder="🔍 Pesquisar alimentos..."
        value={pesquisa}
        onChange={(e) =>
            setPesquisa(e.target.value)
        }
        className="input-pesquisa"
    />

</header>

            {/* CONTEÚDO */}
            <main className="conteudo">

                <h2>Catálogo de Alimentos</h2>

                <div className="lista-produtos">

                    {alimentosFiltrados.length > 0 ? (
                        alimentosFiltrados.map((item) => (
                            <div
                                className="card-produto"
                                key={item.idAlimento}
                            >

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

                                        <button
                                            className="btn-editar"
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="btn-ia"
                                            onClick={() =>
                                                buscarTabelaNutricional(
                                                    item.nome
                                                )
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
                            <h3>
                                Nenhum alimento encontrado
                            </h3>
                        </div>
                    )}

                </div>

            </main>

        </div>
    );
};