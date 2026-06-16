import "./CadastroAlimento.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import { useEffect, useState } from "react";
import api from "../../Services/services";
import Lista from "../../components/lista/Lista";
import { Alerta } from "../../components/alerta/Alerta";

const CadastroAlimento = () => {
    const [valor, setValor] = useState("");
    const [idEditar, setIdEditar] = useState(0);
    const [editar, setEditar] = useState(false);
    const [tipoAlimento, setTipoAlimento] = useState("");
    const [imagem, setImagem] = useState("");

    const [listaTipos, setListaTipos] = useState([]);
    const [listaAlimentos, setListaAlimentos] = useState([]);

    const cadastrarAlimento = async (e) => {
        e.preventDefault();
        
        if (!valor || String(valor).trim().length === 0) {
            Alerta({
                title: "Aviso",
                text: "O nome do alimento deve ser preenchido!",
                icon: "warning",
                confirmButtonText: "Ok",
            });
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
                Alerta({
                    title: "Sucesso",
                    text: `Alimento "${valor}" cadastrado com sucesso!`,
                    icon: "success",
                    confirmButtonText: "OK"
                });
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
                Alerta({
                    title: "Sucesso",
                    text: `Alimento alterado com sucesso`,
                    icon: "success",
                });
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
            text: `Deseja realmente apagar o item "${item.nome}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Apagar",
            cancelButtonText: "Cancelar",
        });

        if (!result || !result.isConfirmed) return false;

        try {
            const retornoAPI = await api.delete(`/Alimento/${item.idAlimento}`);
            if (retornoAPI.status === 204 || retornoAPI.status === 200) {
                limparFormulario();
                getAlimentos();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getAlimentos = async () => {
        try {
            const retornoAPI = await api.get("/Alimento");
            const dados = retornoAPI.data;
            setListaAlimentos(Array.isArray(dados) ? dados : []);
        } catch (error) {
            setListaAlimentos([]);
        }
    };

    const getTipos = async () => {
        try {
            const retornoAPI = await api.get("/TipoAlimento");
            const dados = retornoAPI.data;
            if (Array.isArray(dados)) {
                const ordenados = dados.sort((a, b) => a.nome.localeCompare(b.nome));
                setListaTipos(ordenados);
            } else {
                setListaTipos([]);
            }
        } catch (error) {
            setListaTipos([]);
        }
    };

    useEffect(() => {
        getAlimentos();
        getTipos();
    }, []);

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Alimentos"
                    placeholder="Digite o nome do alimento"
                    valor={valor}
                    cancelarEdicao={limparFormulario}
                    setValor={setValor}
                    funcCadastro={editar ? editarAlimento : cadastrarAlimento}
                    btnEditar={editar}
                    listaGeneros={listaTipos} // Passando a lista de categorias mapeada para o componente genérico
                    setGenero={setTipoAlimento}
                    genero={tipoAlimento}
                    setImagem={setImagem}
                    imagem={imagem}
                />

                <Lista
                    tituloLista="Lista de Alimentos Disponíveis"
                    lista={listaAlimentos}
                    tipoLista="filme" // Mantido 'filme' temporariamente para que o componente reaproveite a estrutura de colunas com Imagem, Nome e Categoria
                    funcExcluir={excluirAlimento}
                    funcEditar={preEditar}
                />
            </main>
            <Footer />
        </>
    );
};

export default CadastroAlimento;