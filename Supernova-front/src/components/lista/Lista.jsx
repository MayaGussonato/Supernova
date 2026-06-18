import "./lista.css"; 

// Importação de imagens: 
// // import Editar from "../../assets/img/pen-to-square-solid.svg"; 
// // import Excluir from "../../assets/img/trash-can-regular.svg"; 
// // import faltadecartaz from "../../assets/img/logo.svg"; 
// import { apiPort } from "../../Services/services";


// import faltadecartaz from "../../assets/img/logo.svg";
import { apiPort } from "../../Services/services";

const Lista = (props) => {
    return (
        <section className="layout_grid">
            <div className="listagem">

                <h1>{props.tituloLista}</h1>
                <hr />

                <div className="tabela">
                    <table>
                        <thead>
                            <tr className="table_cabecalho">
                                <th style={{ display: props.visibilidade }}>Imagem</th>
                                <th>Nome</th>
                                <th style={{ display: props.visibilidade }}>Gênero</th>
                                <th>Editar</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>

                        <tbody>
                            {props.lista && props.lista.length > 0 ? (
                                props.lista.map((item) => (
                                    <tr
                                        className="item_lista"
                                        key={
                                            props.tipoLista === "alimento"
                                                ? item.idAlimento
                                                : item.idTipoAlimento
                                        }
                                    >
                                        <td
                                            data-cell="Imagem"
                                            style={{ display: props.visibilidade }}
                                        >
                                            <img
                                                className="img_cartaz"
                                                src={
                                                    item.imagem &&
                                                    item.imagem !== "null" &&
                                                    item.imagem !== "undefined"
                                                        ? `https://localhost:${apiPort}/imagens/${item.imagem}`
                                                        : undefined
                                                }
                                                alt={item.nome || "Imagem"}
                                            />
                                        </td>

                                        <td data-cell="Nome">
                                            {props.tipoLista === "tipoAlimento"
                                                ? item.nome
                                                : item.nome}
                                        </td>

                                        <td
                                            data-cell="TipoAlimento"
                                            style={{ display: props.visibilidade }}
                                        >
                                            {props.tipoLista === "alimento"
                                                ? item.idTipoAlimentoNavigation?.nome || "-"
                                                : "-"}
                                        </td>

                                        <td data-cell="Editar">
                                            <button
                                                className="icon"
                                                onClick={() => props.funcEditar(item)}
                                            >
                                                Editar
                                            </button>
                                        </td>

                                        <td data-cell="Excluir">
                                            <button
                                                className="icon"
                                                onClick={() => props.funcExcluir(item)}
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">
                                        Nenhum registro encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Lista;