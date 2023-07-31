/* Import du style */
import "./header.scss"

/* Import des composants */
import Bandeau from "./components/Bandeau"
import Menu from "./components/Menu"

const Header = () => {
    return (
        <header>
            <Bandeau />
            <Menu />
        </header>
    )
}

export default Header