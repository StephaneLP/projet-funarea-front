import "./menu.scss"
import imgLogin from "../../assets/images/button/login.png"
import imgLogout from "../../assets/images/button/logout.png"

import { getRole } from "../../js/utils.js"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

const Menu = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const token = localStorage.getItem("jwt")
    const pseudo = localStorage.getItem("pseudo")
    const[role, setRole] = useState("")

    //////////////////////////////////////////////////////////
    // CONTROLE DE LA VALIDITE DU TOKEN ET DES DROITS
    //////////////////////////////////////////////////////////

    useEffect(() => {
        if(token !== null) {
            getRole(token)
                .then((res) => {
                    if(res.status !== 200) {
                        localStorage.removeItem("jwt")
                        localStorage.removeItem("pseudo")
                        navigate('/erreur',{
                            state: {message: "Votre session est terminée ou vos droits sont insuffisants. Veuillez vous reconnecter S.V.P."}
                        })                        
                    }
                    else {
                        setRole(res.role)
                    }
                })
        }
        else {
            setRole("")
        }
    },[token, navigate])

    const path = location.pathname
    const isArea = (path === "/admin-area" || path === "/admin-area-create" || path === "/admin-area-update")
    const isAreaType = (path === "/admin-area-type" || path === "/admin-area-type-create" || path.includes("/admin-area-type-update"))
    const isAreaZone = (path === "/admin-area-zone" || path === "/admin-area-zone-create" || path.includes("/admin-area-zone-update"))
    const isAdmin = (isArea || isAreaType || isAreaZone)

    const handleLogoutClick = () => {
        localStorage.removeItem("jwt")
        localStorage.removeItem("pseudo")
        navigate("/")
    }

    return (
        <section className="container-fluid d-flex align-items-center menu">
            <div className="container d-flex d-row justify-content-between align-items-center">
                <nav className="navbar navbar-expand-lg menu-navbar">
                    <button className="navbar-toggler menu-navbar-togler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav align-items-start">
                            <li className="nav-item">
                                <Link to="/" className={location.pathname === "/" ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">ACCUEIL</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/search" className={location.pathname === "/search" ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">RECHERCHE AVANCÉE</Link>
                            </li>
                            {role === "user" &&
                                <li className="nav-item">
                                    <Link to="/my-space" className={location.pathname === "/my-space" ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">MON COMPTE</Link>
                                </li>
                            }
                            {role === "admin" &&
                                <li className="nav-item dropdown">
                                    <button className={isAdmin ? "nav-link menu-link menu-link-button dropdown-toggle actif" : "nav-link menu-link menu-link-button dropdown-toggle"} data-bs-toggle="dropdown" aria-expanded="false">ADMIN</button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to="/admin-area" className={isArea ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">AREA</Link>
                                        </li>
                                        <li>
                                            <Link to="/admin-area-type" className={isAreaType ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">AREA TYPE</Link>
                                        </li>
                                        <li>
                                            <Link to="/admin-area-zone" className={isAreaZone ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">AREA ZONE</Link>
                                        </li>

                                        <hr />
                                        <li>
                                            <Link to="/admin-user" className={isArea ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">USER</Link>
                                        </li>
                                        <li>
                                            <Link to="/admin-user-favorite" className={isArea ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">USER FAVORITE</Link>
                                        </li>
                                        <li>
                                            <Link to="/admin-user-rating" className={isArea ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">USER RATING</Link>
                                        </li>
                                    </ul>
                                </li>                            
                            }
                        </ul>
                    </div>
                </nav>
                {role === "" ?
                (
                    <Link className="btn-connect d-flex align-items-center" to="/connect" aria-current="page" href="#">
                        <img src={imgLogin} alt="Login" /> Connexion
                    </Link>
                )
                :
                (
                    <div className="menu-logout d-flex align-items-center" >
                        <span>{pseudo}</span>
                        <button className="btn-logout" onClick={handleLogoutClick}><img src={imgLogout} alt="Logout" /></button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Menu