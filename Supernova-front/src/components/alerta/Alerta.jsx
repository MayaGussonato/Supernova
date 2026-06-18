import Swal from "sweetalert2";
import "./Alerta.css"
import Swall from "sweetalert2";

export const Alerta = ({ 
    tilte, 
    text, 
    icon ,
    showCancelButton = null,
    confirmButtonText = null,
    confirmButtonColor = "#33d630ff",
    cancelButtonColor = "#d33",
}) => {
    return Swal.fire({
        tilte: tilte,
        text: text,
        icon: icon,
        showCancelButton,
        confirmButtonText,
        confirmButtonColor,
        cancelButtonColor
    })
}

// const result = await Swall.fire({
//     title: "TEM CERTEZA",
//     text: `você ira excluir o gênero ${item.Nome}`,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#33d630ff",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "SIM, excluir"
// })
// if (!result.isConfirmed) {
//     return false
// }