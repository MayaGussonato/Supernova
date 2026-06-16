import "./Header.css";
import Logo from "../../assets/img/logo.svg"
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <div className="layout_grid cabecalho">
                {/* Ao clicar no link, redireciona para a tela login */}
                <Link to="/">
                    <img src={Logo} alt="Logo do Filmoteca" />
                </Link>

                <nav className="nav_header">
                    <Link className="link_header" to="/filme">Filme</Link>
                    <Link className="link_header" to="/genero">Gênero</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;