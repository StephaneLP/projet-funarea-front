import "./login.scss"

import NoMenu from "../../layout/menu/NoMenu"

import { colorMsg } from "../../js/utils.js"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Connect = () => {
    const navigate = useNavigate()

    let isReconnect = false
    const location = useLocation()
    if(location.state !== null) {
        isReconnect = (location.state.reconnect !== null ? location.state.reconnect : false)
    }

    const reconnect = (location.state !== null ? location.state : false)

    const[adminMessage, setAdminMessage] = useState({libelle: "", color: ""})
    const[focusLogin, setFocusLogin] = useState("")
    const[focusPassword, setFocusPassword] = useState("")
    const[login, setLogin] = useState("")
    const[password, setPassword] = useState("")

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
        setAdminMessage({libelle: "", color: ""})
        setFocusLogin("")
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setAdminMessage({libelle: "", color: ""})
        setFocusPassword("")
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(login === "") {
            setAdminMessage({libelle: "Veuillez renseigner un identifiant S.V.P.", color: colorMsg.error})
            setFocusLogin(colorMsg.error)
            // window.scrollTo(0,0)
            return
        }

        if(password === "") {
            setAdminMessage({libelle: "Veuillez renseigner un mot de passe S.V.P.", color: colorMsg.error})
            setFocusPassword(colorMsg.error)
            // window.scrollTo(0,0)
            return
        }

        fetch("http://localhost:3001/api/user/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: login,
                password: password,
            })
        })
        .then((res) => {
            return res.json()          
        })
        .then((res) => {
            if(res.success) {
                localStorage.setItem("jwt",res.token)
                localStorage.setItem("pseudo",res.data.nick_name)
                if(isReconnect) {
                    navigate(location.state.route)
                }
                else {
                    navigate("/")
                }
            }
            else {
                setAdminMessage({libelle: res.message, color: colorMsg.error})
            }
        })
    }

    const handleCancleClick = () => {
        localStorage.removeItem("jwt")
        localStorage.removeItem("pseudo")
        navigate("/")
    }

    return (
    <main>
        <NoMenu />
        <section className="container-fluid login">
            {!reconnect ?
            (
                <h1>Connectez-vous à votre compte</h1>
            )
            :
            (<>
                <h1>Votre session est expirée...</h1>
                <h2>Veuillez vous identifier S.V.P.</h2>
            </>)}
            
            <div className="container">
                <div className="login-message d-flex justify-content-center align-items-center">
                    <div style={{backgroundColor: adminMessage.color}}>{adminMessage.libelle}</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-4"></div>
                        <div className="col-12 col-md-4 login-separator-top"></div>
                        <div className="col-12 col-md-4"></div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-4"></div>
                        <div className="col-12 col-md-4">
                            <div className="login-cellule">
                                <label>
                                    <input type="text" placeholder="Pseudo ou Email" maxLength="50" value={login} onChange={(e) => handleLoginChange(e)} style={{borderColor: focusLogin}} />
                                </label>
                            </div>
                            <div className="login-cellule">
                                <label>
                                    <input type="password" placeholder="Mot de passe" maxLength="50" value={password} onChange={(e) => handlePasswordChange(e)} style={{borderColor: focusPassword}} />
                                </label>
                            </div>
                        </div>
                        <div className="col-12 col-md-2"></div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-4"></div>
                        <div className="col-12 col-md-4 login-separator-bottom"></div>
                        <div className="col-12 col-md-4"></div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-buttons">
                                <div>
                                    <input className="btn-confirm" type="submit" value="Valider" />
                                </div>
                                <div>
                                    <button className="btn-confirm-no" onClick={handleCancleClick}>Annuler</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </main>
    )
}

export default Connect