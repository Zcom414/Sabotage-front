import {useAuth} from "../context/AuthContext"
import {Navigate, Outlet} from "react-router-dom"

const PrivateRoute =  ({roles}) => {
    
    // Pour récupérer les informations de l'utilisateur connecté
    const {user} = useAuth()
    
    // Vérifier si l'utilisateur est connecté et on va récupérer son rôle
    // correspond bien au rôle requis pour accéder à la page
    
    const isAuthorized =  user && roles.includes(user.role); // Renvoie un booléen true ou false si son role correspond
    
    console.log(isAuthorized);
    // Si l'utilisateur n'a pas le bon rôle
    if(!isAuthorized){
        // Rediriger l'utilisateur vers la page d'accueil
        return <Navigate to={"/"} replace />
    }
    
    
    // Si l'utilisateur a le bon rôle on lui affiche la page qu'il souhaite (composant)
    return <Outlet />
    
}


export default PrivateRoute;