/* Import du style */
import "./searchResult.scss"

/* Import des composants */
import Loader from "../../../components/loader/Loader"

/* Import des Hooks & composants react-rooter */
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

const SearchResult = (props) => {
    /* ------------------------------------------------------------------------------------- */
    /* ------------------------------------- JAVASCRIPT ------------------------------------ */
    /* ------------------------------------------------------------------------------------- */

    const navigate = useNavigate();
    const [getArea, setGetArea] = useState(null) // Liste des salles

    const [filterParam, setFilterParam] = useState({ // Tri & filtre
        sort: "asc",
        name: "",
        typeId: props.typeId,
        zoneId: props.zoneId,
    })

    /*********************************************************
    API GET
    - Chargement de la liste des salles
    *********************************************************/
    useEffect(() => {
        const requestUrlParams =
            "sort=" + filterParam.sort +
            "&name=" + filterParam.name +
            "&typeId=" + filterParam.typeId +
            "&zoneId=" + filterParam.zoneId

        fetch("http://localhost:3001/api/areas?" + requestUrlParams, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                if(["ERR_SERVER"].includes(res.status)) {
                    navigate("/erreur", {state: res.message})
                    return
                }
                setGetArea(res.data)
            })
            .catch((error) => {
                navigate("/erreur", {state: error.message})
            })
    },[filterParam, navigate])

    /*********************************************************
    Ouverture de la fiche descriptive d'une salle
    *********************************************************/
    const handleFicheClick = () => {
        navigate("/en-construction")
    }

    /* ------------------------------------------------------------------------------------- */
    /* ---------------------------------------- JSX ---------------------------------------- */
    /* ------------------------------------------------------------------------------------- */

    return (
        <section className="container-fluid search">
            <h1>Recherche Avancée</h1>
            <div className="container">
                {getArea === null ?
                    (<Loader />)
                    :
                    (
                    <div className="row">
                        { getArea.length === 0 ?
                        (
                            <div className="d-flex justify-content-center align-items-center search-no-result">Aucun résultat...</div>
                        )
                        :
                        (<>
                            {getArea.map((element) => {
                                return (
                                    <div className="col-12 col-md-6 search-box" key={element.id}>
                                        <div className="col-12 search-box-inner">
                                            <div className="search-box-recto d-flex justify-content-center align-items-end" style={{backgroundImage: `url(${require("../../../assets/images/pages/area/" + element.picture)})`}}>
                                                <h3>{element.name}</h3>
                                            </div>                              
                                            <div className="search-box-verso" style={{backgroundImage: `url(${require("../../../assets/images/pages/area/" + element.picture)})`}}>
                                                <div className="d-flex flex-column justify-content-center align-items-center search-box-verso-filter">
                                                    <h3>{element.name}</h3>
                                                    <p>{element.AreaType.name}</p>
                                                    <p>{element.AreaZone.name}</p>
                                                    <button className="btn" onClick={handleFicheClick}>Ouvrir la fiche</button>                                    
                                                </div>
                                            </div>                            
                                        </div>
                                    </div>
                                )
                            })} 
                        </>)}
                    </div>
                    )}
            </div>            
        </section>        
    )
}

// Prévoir pour le responsive :
//
// const goBoxVerso = (event) => {
//     event.currentTarget.classList.add("active")
// }
//
// const backBoxRecto = (event) => {
//     event.currentTarget.classList.remove("active")
// }
//
// Avec : onClick={() => goBoxVerso('1')} onMouseLeave={() => backBoxRecto('1')}

export default SearchResult