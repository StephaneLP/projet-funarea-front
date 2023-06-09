/* Import des composants : Accueil et Recherche avancée */
import Home from "./pages/home/Home"
import Search from "./pages/search/Search"

/* Import des composants : Login */
import Connect from "./pages/login/Connect"

/* Import des composants : Administration */
import AdminAreaType from "./pages/admin/area-type/AdminAreaType"
import AdminAreaTypeCreate from "./pages/admin/area-type/AdminAreaTypeCreate"
import AdminAreaTypeUpdate from "./pages/admin/area-type/AdminAreaTypeUpdate"
import AdminAreaZone from "./pages/admin/area-zone/AdminAreaZone"
import AdminAreaZoneCreate from "./pages/admin/area-zone/AdminAreaZoneCreate"
import AdminAreaZoneUpdate from "./pages/admin/area-zone/AdminAreaZoneUpdate"

/* Import des composants : Erreurs */
import PageError from "./pages/errors/PageError"
import PageNotFound from "./pages/errors/PageNotFound"
import PageUnderConstruction from "./pages/errors/PageUnderConstruction"

/* Import des Hooks & composants react-rooter */
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
        <Routes>
            {/* Pages : Accueil et Recherche avancée */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            {/* Page Login */}
            <Route path="/connect" element={<Connect />} />
            {/* Pages d'administration */}
            <Route path="/admin-area-type" element={<AdminAreaType />} />
            <Route path="/admin-area-type-create" element={<AdminAreaTypeCreate />} />
            <Route path="/admin-area-type-update/:id" element={<AdminAreaTypeUpdate />} />
            <Route path="/admin-area-zone" element={<AdminAreaZone />} />
            <Route path="/admin-area-zone-create" element={<AdminAreaZoneCreate />} />
            <Route path="/admin-area-zone-update/:id" element={<AdminAreaZoneUpdate />} />
            {/* Pages d'erreur */}
            <Route path="/erreur" element={<PageError />} />
            <Route path="/en-construction" element={<PageUnderConstruction />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </BrowserRouter> 
  );
}

export default App;
