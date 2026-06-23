import "./Cadastro.css";
import Botao from "../botao/Botao";



const Cadastro = (props) => {
    return (
        <section className="section_cadastro">
            <form onSubmit={props.funcCadastro} className="layout_grid form_cadastro">
                <h1>{props.tituloCadastro}</h1>
                <hr />
                <div className="campos_cadastro">
                    <div className="campo_cad_alimento">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" name="nome" value={props.valor} placeholder={`Digite o nome do ${props.placeholder}`} onChange={(e) => props.setValor?.(e.target.value)} />
                    </div>
                    {props.setDescricao && (
                        <div className="campo_cad_descricao">
                            <label htmlFor="descricao">Descrição</label>
                            <textarea name="descricao" value={props.descricao || ""} placeholder="Digite a descrição" onChange={(e) => props.setDescricao?.(e.target.value)} />
                        </div>
                    )}
                    {props.setPreco && (
                        <div className="campo_cad_preco">
                            <label htmlFor="preco">Preço</label>
                            <input type="number" step="0.01" name="preco" value={props.preco || ""} placeholder="Digite o preço" onChange={(e) => props.setPreco?.(e.target.value)} />
                        </div>
                    )}
                    <div className="campo_cad_genero" style={{ display: props.visibilidade }}>
                        <label htmlFor="genero">Tipo Alimento</label>
                        <select value={props.genero} onChange={(e) => props.setGenero?.(e.target.value)} name="genero" id="">
                            <option value="">Selecione</option>
                            {props.listaGeneros && props.listaGeneros.length > 0 ? (
                                props.listaGeneros.map((item) => {
                                    const key = item.idGenero ?? item.idTipoAlimento ?? item.id;
                                    const value = item.idGenero ?? item.idTipoAlimento ?? item.id;
                                    const label = item.nome ?? item.titulo ?? "";
                                    return <option key={key} value={value}>{label}</option>;
                                })) : (<></>)
                            }
                        </select>
                    </div>
                </div>

                <div className="linha-btn">
                    {props.btnEditar &&
                        <Botao nomeDoBotao="Cancelar"
                            cancelarEdicao={props.cancelarEdicao}
                            btnEditar={props.btnEditar} />}
                    <div className={`campo_cad_genero campo_cad_genero--${props.temadatela}`} style={{ display: props.visibilidade }}>
                        <label htmlFor="imagem" className={`label_image label_image--${props.temadatela}`}> Selecionar Imagem </label>
                        <input className={`input_image input_image--${props.temadatela}`} type="file" id="imagem" onChange={(e) => props.setImagem?.(e.target.files[0])} style={{ display: "none" }} />
                    </div>
                    <Botao nomeDoBotao={props.textoBotao || "Cadastrar"} />
                </div>
            </form>
        </section>
    )
}

export default Cadastro;
