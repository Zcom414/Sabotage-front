import {Routes, Route} from "react-router-dom"
import 'tailwindcss/tailwind.css'
import './App.css'
import Home from "./pages/Home"
import Articles from "./pages/Articles"
import Article from "./pages/Article"
import Contact from "./pages/Contact"
import Author from "./pages/Author"
import MenuCustom from "./components/MenuCustom"
import Footer from "./components/Footer"
import AddArticle from "./pages/admin/AddArticle"
import EditArticle from "./pages/admin/EditArticle"
import ArticleDashboard from "./pages/admin/ArticleDashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PrivateRoute from "./PrivateRoute/PrivateRoute"


// Faire votre système de pages, routes, route ici
// Toutes les routes à créer correspondent au dossier pages donc 5 routes à faire
const App = () =>  {

  return (
    <>
    <MenuCustom />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/article/:id" element={<Article />} />
      <Route path="/auteurs" element={<Author />} />
      <Route path="/login" element={<Login />} />
      <Route path="/inscription" element={<Register />} />
      
      {/* CES PAGES SONT ACCESSIBLES POUR LES UTILISATEURS CONNECTES */}
      <Route path="/" element={<PrivateRoute roles={["admin", "user"]} />}>
            <Route path="/contact" element={<Contact />} />

      </Route>
      
      
      {/* CES PAGES SONT ACCESSIBLES QUE POUR LES ADMINS */}
      <Route path="/" element={<PrivateRoute roles={["admin"]} />}>
      {/* Pour appeler cette route là, je dois mettre dans mon URL ex: /admin/article/nouveau */}
      
          <Route path="/admin">
            <Route path="article/nouveau" element={<AddArticle />} />
            <Route path="article/dashboard" element={<ArticleDashboard />} />
            <Route path="article/modifier/:id" element={<EditArticle />} />
          </Route>
      </Route>
      
      <Route path="*" element={<h1> La page n'existe pas </h1>} />
    </Routes>
      <Footer />
   </>
  )
}

export default App
