import "./homeTypeSortie.scss"
import Loader from "../../../components/loader/Loader"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"

import imgVrGames from "../../../assets/images/type-sortie/vr-games.jpg"
import imgEscapeGames from "../../../assets/images/type-sortie/escape-games.jpg"
import imgLaserGames from "../../../assets/images/type-sortie/laser-games.jpg"
import imgSociete from "../../../assets/images/type-sortie/societe.jpg"
import imgKarting from "../../../assets/images/type-sortie/karting.jpg"
import imgBowling from "../../../assets/images/type-sortie/bowling.jpg"

const HomeTypeSortie = () => {
    const navigate = useNavigate();
    const[getAreaType, setGetAreaType] = useState(null)
  
    useEffect(() => {
        fetch("http://localhost:3001/api/areatype")
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                setGetAreaType(res.data)
            })
    },[])

    const handleClickNavigate = (id) => {
        navigate('/search',{
            state: {
                type: id,
              }
        })
    }

    return (
        <section className="container-fluid home-type">
            <h2>Recherche par type de loisir</h2>
            <div className="container">
                <div className="row">
                    {getAreaType === null ?
                        (<Loader />)
                        :
                        (
                            <>
                            {getAreaType.map((element) => {
                                return (
                                    <div className="col-12 col-lg-6 type-section" onClick={() => handleClickNavigate(element.id)} key={element.id}>
                                        <div className="col-12 d-flex flex-row section-all">
                                            <div className="d-flex flex-column justify-content-center align-items-center type-section-left">
                                                <h3>{element.name}</h3>
                                            </div>
                                            <div className="type-section-right">
                                                <img src={"./assets/images/type-sortie/" + element.picture} alt={element.name} />
                                            </div>
                                        </div>
                                    </div>   
                                )
                            })}
                            </>
                        )
                    }
                </div>
            </div>            
        </section>        
    )
}

export default HomeTypeSortie