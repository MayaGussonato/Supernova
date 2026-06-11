import { useState } from "react";
import { AlimentoContext } from "./AlimentoContext";


export const AlimentoProvider = ({ children }) => {
    const [ListarAlimento, setListarAlimento] = useState([]);

    return (
        <AlimentoContext.Provider
            value={{
                ListarAlimento,
                setListarAlimento
            }}
        >
            {children}
        </AlimentoContext.Provider>
    );
};

export default ProdutoProvider;