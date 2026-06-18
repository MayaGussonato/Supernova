import { useEffect, useState } from "react";
import api from "../../Services/services";
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
        formData.append("idTipoAlimento", tipoAlimento);
        formData.append("Imagem", imagem);

        try {
            const retornoAPI = await api.post("/Alimento", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

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
        setEditar(false);
        setIdEditar(0);
        setTipoAlimento("");
        setImagem("");
    };

    const preEditar = (item) => {
        setIdEditar(item.idAlimento);
        setValor(item.nome || item.titulo);
        setTipoAlimento(item.idTipoAlimento);
        setImagem(item.imagem);
        setEditar(true);
    };

    const editarAlimento = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("Nome", valor);
            formData.append("idTipoAlimento", tipoAlimento);
            formData.append("Imagem", imagem);

            const retornoAPI = await api.put(`/Alimento/${idEditar}`, formData);
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
                
                <div className="supernova-card-form">
                    <Cadastro
                        tituloCadastro={editar ? "Editar Alimento" : "Cadastrar Novo Alimento"}
                        funcaoCadastrar={editar ? editarAlimento : cadastrarAlimento}
                        placeholder="Alimento"
                        valor={valor}
                        setValor={setValor}
                        listaTipos={listaTipos}
                        setTipoAlimento={setTipoAlimento}
                        setImagem={setImagem}
                        textoBotao={editar ? "Atualizar" : "Cadastrar"}
                    />
                </div>

                <div className="supernova-card-lista">
                    <Lista
                        tituloLista="Estoque Disponível (Hortifrúti)"
                        listaDados={listaAlimentos}
                        funcaoExcluir={excluirAlimento}
                        funcaoEditar={preEditar}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CadastroAlimento;