import { useContext, useEffect, useState } from "react"
import { UsuarioContext } from "./UsuarioContext"

//disponibiliza o state do usuário de forma global para
// todos os seus componentes filhos ( children )
export const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)

    // ciclo de vida e funções
    useEffect(() => {
        const usuarioLogado = JSON.parse(localStorage.getItem("Usuario"))
        setUsuario(usuarioLogado)

    }, [])

    // guarda o usuário no localStorage no formato JSON
    return (
        <UsuarioContext.Provider
            value={{
                usuario,
                setUsuario
            }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}