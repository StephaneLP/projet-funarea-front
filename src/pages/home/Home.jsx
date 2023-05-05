import Header from "../../layout/header/Header"
import Menu from "../../layout/menu/Menu"
import Footer from "../../layout/footer/Footer"
import HomeBandeau from "./components/HomeBandeau"
import HomeTypeSortie from "./components/HomeTypeSortie"

const Home = () => {
    return (
        <>
            <Header />            
            <main>
                <Menu />
                <HomeBandeau />
                <HomeTypeSortie />
                <Footer />
            </main>
        </>
    )
}

export default Home