import LatestArticles from "../components/LatestArticles"
import Newsletter from "../components/Newsletter"
import {useState, useEffect} from "react"
import axios from "axios";

const Home = () => {
  // Je veux que vous affichez UNIQUEMENT 3 articles
  // Bonus: Selon la date, vous affichez les plus 3 plus récents
  
  const [lastArticles, setLastArticles] = useState([])
  
  
  useEffect(() => {
    
    // Première méthode, .then pour gérer l'asynchrone,
     // Il va d'abord récupérer les données, ensuite il va les stocker dans le useState
    // axios.get("http://pajs02.ide.3wa.io:9000/api/articles")
    // .then(res => {
    //   // Les données se trouvent dans res.data
    //   console.log(res.data);
    //   setLastArticles(res.data)
    // const recentArticles = res.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    // setLastArticles(recentArticles.slice(0,3))
    // })
    
    
    // Deuxième méthode -- CELLE QUE JE RECOMMANDE 
    const fetchArticles = async () => {
      
      try {
         // sans le proxy dans vite.config.js :  axios.get("http://pajs02.ide.3wa.io:9000/api/articles")
         
          // axios.get(`${import.meta.env.VITE_API_URL}/api/articles")
        const res = await axios.get("/api/articles") // avec le vite.config.js
        console.log(res);
 
        const recentArticles = res.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    setLastArticles(recentArticles.slice(0,3))
        
        
      } catch (e) {
        console.log(e);
      }
      

    }
    
    // Troisième méthode
    // const fetchArticles = async () => {
    //   try {
        

    //     const query = await fetch("http://pajs02.ide.3wa.io:9000/api/articles")
        
    //     const res = await query.json()
        
        // Obligatoire pour gérer les erreurs
        // if(!res.ok){
        //   console.log("Impossible de récupérer la data")
        // }
        
    //     console.log(res);
        
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    
    fetchArticles()

    
    
  }, []) // Il va lancer UNE seule fois le useEffect lors du montage (chargement) du composant
    return (
      <div className="min-h-screen bg-[#0E1217]">
        <div className="container mx-auto px-4 pt-10">
          <h1 className="text-4xl font-bold mb-5 text-[#E11D48] animation-fadeIn">Articles récents</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* On appelle ici le composant <LatestArticles /> avec sa props :)  */}
            <LatestArticles arrayArticles={lastArticles} />
          </div>
             {/* On appelle ici le composant <Newsletter /> */}
             <Newsletter />
        </div>
      </div>
    );
  }
  
export default Home;

