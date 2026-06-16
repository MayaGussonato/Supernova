import { useContext, useEffect, useState } from "react"
import { SenhaContext } from "./Senhacontext"


//disponibiliza o state do usuário de forma global para
// todos os seus componentes filhos ( children )
export const SenhaProvider = ({ children }) => {
    const [Senha, setSenha] = useState(null)

    // ciclo de vida e funções
    useEffect(() => {
        const SenhaLogado = JSON.parse(localStorage.getItem("Senha"))
        setSenha(SenhaLogado)

    }, [])

    // guarda o usuário no localStorage no formato JSON
    return (
        <SenhaContext.Provider
            value={{
 
                Senha,
                setSenha,

            }}
        >
            {children}
        </SenhaContext.Provider>
    )
}