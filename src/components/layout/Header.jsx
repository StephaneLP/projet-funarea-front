import "./header.scss"
import logoMenu from "../../assets/img/logo/logo-menu.png"

const Header = () => {
    return (
        <header>
            <section className="container header-bandeau">
                <div className="d-flex d-row justify-content-between align-items-center">
                    <div className="d-flex align-items-center header-logo">
                        <img src={logoMenu} />
                        <a className="navbar-brand header-logo-titre" href="#"><span >L</span>udic<span>Z</span>one</a>
                        </div>
                    <div className="header-titre"><span >S</span>orties <span >L</span>udiques à <span >B</span>ordeaux</div>              
                </div>
            </section>
        </header>
    )
}

export default Header