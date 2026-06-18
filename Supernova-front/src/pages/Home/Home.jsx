import { useEffect, useState } from "react";
import api from "../../services/services";

export const Home = () => {

    const [alimentos, setAlimentos] = useState([]);

    const buscarAlimentos = async () => {

        try {

            const resposta =
                await api.get("/Alimento");

            setAlimentos(resposta.data);

        } catch (error) {

            console.log(error);

        }
    };

    const excluir = async (id) => {

        try {

            await api.delete(`/Alimento/${id}`);

            buscarAlimentos();

        } catch (error) {

            console.log(error);

        }

        <button
            onClick={() =>
                excluir(item.idAlimento)
            }
        >
            Excluir
        </button>
    };


    const editar = async () => {

        try {

            await api.put(

                `/Alimento/${idEditar}`,

                {
                    nome,
                    idTipoAlimento
                }

            );

            buscarAlimentos();

        } catch (error) {

            console.log(error);

        }
        <button
            onClick={() => {

                setIdEditar(item.idAlimento);

                setNome(item.nome);

            }}
        >
            Editar
        </button>
    };


    const buscarTabelaNutricional = async (nome) => {

        const resposta = await api.post(
            "/ia/nutricional",
            {
                alimento: nome
            }
        );

        <button
            onClick={() =>
                buscarTabelaNutricional(item.nome)
            }
        >
            IA Nutricional
        </button>

        alert(resposta.data);
    };

    useEffect(() => {

        buscarAlimentos();

    }, []);

    return (

        <div className="container-home">

            <h1>Supernova</h1>

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
                            {item.tipoAlimento}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
};