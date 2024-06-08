import LatestArticles from "../components/LatestArticles"
import {useState, useEffect} from "react"
import axios from "axios"



const Articles = () => {
  // Bonus
  // Filter va vous aider, à vous de chercher comment faire pour la barre de recherche
  
  // On va stocker la valeur de l'input 
  const [searchInput, setSearchInput] = useState("")
  const [filteredArticles, setFilteredArticles] = useState([])
  const [articles, setArticles] = useState([])
  
  
  useEffect(()=>{
    
    const fetchArticles = async () => {
      try {
      
        const res = await axios.get("/api/articles")
        
        setFilteredArticles(res.data)
        setArticles(res.data)
        
      } catch (e) {
        console.log(e);
      }
    }
    
    fetchArticles()
    
  }, [])
  
  const handleChange = (e) => {
    const search = e.target.value // Pour éviter le décalage de 1
    setSearchInput(search)
    
    const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())  
    || a.authorName.toLowerCase().includes(search.toLowerCase())  
    || a.summary.toLowerCase().includes(search.toLowerCase())  
    || a.category.toLowerCase().includes(search.toLowerCase())  
    )
    
    setFilteredArticles(filtered)
    
  }
  
    return (
      <div className="min-h-screen bg-[#0E1217]">
        <div className="container mx-auto px-4 pt-10">
          <h1 className="text-4xl font-bold mb-5 text-[#E11D48]">Tous les articles</h1>
          <div className="mb-8">
            <input
            onChange={handleChange}
            value={searchInput}
              type="search"
              placeholder="Rechercher un article"
              className="w-full p-4 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ici vous appelez le composant <LatestArticles /> avec la props et le nouveau tableau filtré :)  */}
          <LatestArticles arrayArticles={filteredArticles} />
          </div>
        </div>
      </div>
    );
  };
  
  export default Articles;