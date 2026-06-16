import "./CadastroTipoAlimento.css";
import Header from "../../components/header/Header"; 
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import { useEffect, useState } from "react";
import api from "../../Services/services";
import Lista from "../../components/lista/Lista";
import { Alerta } from "../../components/alerta/Alerta";

const CadastroTipoAlimento = () => {
    const [valor, setValor] = useState("");
    const [idEditar, setIdEditar] = useState(0);
    const [editar, setEditar] = useState(false);
    const [listaTipos, setListaTipos] = useState([]);

    const CadastroTipoAlimento = async (e) => {
        e.preventDefault();
        if (valor.trim().length === 0) {
            Alerta({
                title: "Cadastro de Categoria",
                text: "O tipo de alimento deve ser preenchido!",
                icon: "warning",
                confirmButtonText: "Ok",
            });
            return false;
        }

        const objetoCadastro = { nome: valor };

        try {
            const retornoAPI = await api.post("/TipoAlimento", objetoCadastro);

            if (retornoAPI.status === 201) {
                Alerta({
                    title: "Sucesso",
                    text: `Categoria (${objetoCadastro.nome}) cadastrada com sucesso`,
                    icon: "success",
                    confirmButtonText: "OK"
                });
                limparFormulario();
                getTipos();
            }
        } catch (error) {
            Alerta({ title: "Erro", text: "Erro na chamada da API", icon: "error", confirmButtonText: "OK" });
        }
    };

    const limparFormulario = () => {
        setValor("");
        setEditar(false);
        setIdEditar(0);
    };

    const preEditar = (item) => {
        setIdEditar(item.idTipoAlimento);
        setValor(item.nome);
        setEditar(true);
    };

    const editarTipo = async (e) => {
        e.preventDefault();
        const objEditar = { nome: valor };
        try {
            const retornoAPI = await api.put(`/TipoAlimento/${idEditar}`, objEditar);
            if (retornoAPI.status === 204 || retornoAPI.status === 200) {
                Alerta({
                    title: "Editado",
                    text: `Categoria alterada para (${objEditar.nome}) com sucesso`,
                    icon: "success",
                    confirmButtonText: "OK"
                });
                limparFormulario();
                getTipos();
            }
        } catch (error) {
            Alerta({ title: "Erro", text: "Erro ao chamar a API", icon: "error", confirmButtonText: "OK" });
        }
    };

    const excluirTipo = async (item) => {
        const result = await Alerta({
            title: "Excluir Categoria",
            text: `Deseja realmente apagar o tipo ${item.nome}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
        });

        if (!result.isConfirmed) return false;

        try {
            const retornoAPI = await api.delete(`/TipoAlimento/${item.idTipoAlimento}`);
            if (retornoAPI.status === 204 || retornoAPI.status === 200) {
                limparFormulario();
                getTipos();
            }
        } catch (error) {
            console.error(error);
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
        getTipos();
    }, []);

    return (
        <>
            <Header /> 
            <main>
                <Cadastro 
                    tituloCadastro="Cadastro de Tipo de Alimento"
                    visibilidade="none"
                    placeholder="Ex: Frutas, Legumes..."
                    valor={valor}
                    cancelarEdicao={limparFormulario}
                    setValor={setValor}
                    funcCadastro={editar ? editarTipo : cadastrarTipo}
                    btnEditar={editar}
                />

                <Lista
                    tituloLista="Lista de Categorias"
                    visibilidade="none"
                    lista={listaTipos}
                    tipoLista="genero" // Mantido 'genero' se o seu componente interno <Lista> usar essa string para renderizar as colunas corretas de categorias
                    funcExcluir={excluirTipo}
                    funcEditar={preEditar}
                />
            </main>
            <Footer />
        </>
    );
};

export default CadastroTipoAlimento;