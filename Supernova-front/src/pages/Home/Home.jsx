import { useEffect, useState } from "react";
import api from "../../services/services";
import "./Home.css";

export const Home = () => {
    const [alimentos, setAlimentos] = useState([]);
    const [idEditar, setIdEditar] = useState(null);
    const [nome, setNome] = useState("");
    const [idTipoAlimento, setIdTipoAlimento] = useState("");

    const buscarAlimentos = async () => {
        try {
            const resposta = await api.get("/Alimento");
            setAlimentos(resposta.data);
        } catch (error) {
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
        }
    };

    useEffect(() => {
        buscarAlimentos();
    }, []);

    return (
        <div className="container-home">
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
        </div>
    );
};