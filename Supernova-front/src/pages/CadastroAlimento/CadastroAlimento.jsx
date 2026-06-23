import { useEffect, useState } from "react";
import api from "../../services/services.js";
import "./CadastroAlimento.css";

// Componentes
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import { Alerta } from "../../components/alerta/Alerta";

const CadastroAlimento = () => {
    // Estados
    const [valor, setValor] = useState("");
    const [idEditar, setIdEditar] = useState(0);
    const [editar, setEditar] = useState(false);
    const [tipoAlimento, setTipoAlimento] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");
    const [listaTipos, setListaTipos] = useState([]);
    const [listaAlimentos, setListaAlimentos] = useState([]);

    // Funções
    const cadastrarAlimento = async (e) => {
        e.preventDefault();
        
        if (!valor || String(valor).trim().length === 0) {
            Alerta({ title: "Aviso", text: "O nome do alimento deve ser preenchido!", icon: "warning", confirmButtonText: "Ok" });
            return false;
        }

        const formData = new FormData();
        formData.append("Nome", valor);
        formData.append("Descricao", descricao);
        formData.append("Preco", preco);
        formData.append("IdTipoAlimento", tipoAlimento);
        formData.append("Imagem", imagem);

            try {
            const retornoAPI = await api.post("/Alimento", formData);

            if (retornoAPI.status === 201) {
                Alerta({ title: "Sucesso", text: `Alimento "${valor}" cadastrado!`, icon: "success" });
                limparFormulario();
                getAlimentos();
            }
        } catch (error) {
            Alerta({ title: "Erro", text: "Erro ao cadastrar na API", icon: "error" });
        }
    };

    const limparFormulario = () => {
        setValor("");
        setDescricao("");
        setPreco("");
        setEditar(false);
        setIdEditar(0);
        setTipoAlimento("");
        setImagem("");
    };

    const preEditar = (item) => {
        setIdEditar(item.idAlimento);
        setValor(item.nome || item.titulo);
        setDescricao(item.descricao || "");
        setPreco(item.preco ?? "");
        setTipoAlimento(item.idTipoAlimento);
        setImagem(item.imagem);
        setEditar(true);
    };

    const editarAlimento = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                nome: valor,
                descricao,
                preco: Number(preco) || 0,
                idTipoAlimento: tipoAlimento,
            };

            if (typeof imagem === "string" && imagem.length > 0) {
                payload.imagem = imagem;
            }

            const retornoAPI = await api.put(`/Alimento/${idEditar}`, payload);
            if (retornoAPI.status === 204 || retornoAPI.status === 200) {
                Alerta({ title: "Sucesso", text: "Alimento alterado!", icon: "success" });
                limparFormulario();
                getAlimentos();
            }
        } catch (error) {
            Alerta({ title: "Erro", text: "Erro ao editar alimento", icon: "error" });
        }
    };

    const excluirAlimento = async (item) => {
        const result = await Alerta({
            title: "Excluir",
            text: `Deseja realmente apagar "${item.nome}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Apagar"
        });

        if (result?.isConfirmed) {
            try {
                await api.delete(`/Alimento/${item.idAlimento}`);
                getAlimentos();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const getAlimentos = async () => {
        try {
            const retornoAPI = await api.get("/Alimento");
            setListaAlimentos(Array.isArray(retornoAPI.data) ? retornoAPI.data : []);
        } catch (error) {
            setListaAlimentos([]);
        }
    };

    const getTipos = async () => {
        try {
            const retornoAPI = await api.get("/TipoAlimento");
            setListaTipos(Array.isArray(retornoAPI.data) ? retornoAPI.data.sort((a, b) => a.nome.localeCompare(b.nome)) : []);
        } catch (error) {
            setListaTipos([]);
        }
    };

    useEffect(() => {
        getAlimentos();
        getTipos();
    }, []);

    return (
    <div className="supernova-container">
        <Header />
        <main className="supernova-main">
            <h1 className="supernova-title">Painel de Alimentos — SuperNova</h1>
            
            {/* Deixe o card original por fora, sem nenhum wrapper em volta do Cadastro */}
            <div className="supernova-card-form">
                    <Cadastro
                        tituloCadastro={editar ? "Editar Alimento" : "Cadastrar Novo Alimento"}
                        funcCadastro={editar ? editarAlimento : cadastrarAlimento}
                        placeholder="Alimento"
                        valor={valor}
                        setValor={setValor}
                        descricao={descricao}
                        setDescricao={setDescricao}
                        preco={preco}
                        setPreco={setPreco}
                        listaGeneros={listaTipos}
                        genero={tipoAlimento}
                        setGenero={setTipoAlimento}
                        setImagem={setImagem}
                        btnEditar={editar}
                        cancelarEdicao={limparFormulario}
                    />
            </div>

            <div className="supernova-card-lista">
                <Lista
                    tituloLista="Estoque Disponível (Hortifrúti)"
                    lista={listaAlimentos}
                    tipoLista="alimento"
                    funcExcluir={excluirAlimento}
                    funcEditar={preEditar}
                />
            </div>
        </main>
        <Footer />
    </div>
    );
};

export default CadastroAlimento;