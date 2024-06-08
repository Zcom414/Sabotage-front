import {useState, useEffect} from "react"
import { NavLink } from "react-router-dom"; 
import {toast } from "react-toastify";
import axios from "axios"
import {token} from "../../context/token"
const ArticleDashboard = () => {
   
  const [searchInput, setSearchInput] = useState("")
  const [filteredArticles, setFilteredArticles] = useState([])
  const [articles, setArticles] = useState([])
  const [isDeleted, setIsDeleted] = useState(false)
  
  useEffect(()=> {
      
      const fetchArticles = async () => {
          try {
              
              const res = await axios.get("/api/articles")
              
              setArticles(res.data)
              setFilteredArticles(res.data)
              console.log(res.data);
              
          } catch (e) {}
      }
      
      fetchArticles()
      
  },[isDeleted])
  
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

    const handleDelete = async (id) => {
        
        const confirmDelete = confirm("Êtes vous sur de vouloir supprimer cet article?")
        
        if(confirmDelete){
            try {
            const res = await axios.delete(`/api/articles/delete/${id}`, {headers: token()})
            
            setIsDeleted(!isDeleted)
            toast.success(res.data.message)
            } catch (e) {
                console.log(e);
                toast.error("Erreur")
                setIsDeleted(!isDeleted)
            }
           
        }
        
    }

    return (
      <div className="min-h-screen bg-[#0E1217] text-white p-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-[#E11D48]">Dashboard Articles</h1>
            <NavLink to="/admin/article/nouveau" className="btn bg-[#E11D48] hover:bg-[#cf1124]">+ Ajouter un article</NavLink>
          </div>
  
          <div className="mb-8">
            <input
            onChange={handleChange}
                value={searchInput}
              type="text"
              placeholder="Rechercher par titre ou auteur..."
              className="w-full p-4 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              
            />
          </div>
  
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="py-3 px-6 text-white">Date</th>
                <th scope="col" className="py-3 px-6 text-white">Titre de l'article</th>
                <th scope="col" className="py-3 px-6 text-white">Catégorie</th>
                <th scope="col" className="py-3 px-6 text-white">Auteur</th>
                <th scope="col" className="py-3 px-6 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
                {filteredArticles.map((article) => (
                
                <tr key={article._id} className="bg-gray-800 border-b border-gray-700 text-white">
                <td className="py-4 px-6"> {new Date(article.createdAt).toLocaleDateString()}</td>
                <td className="py-4 px-6"> <NavLink to={`/article/${article._id}`}>{article.title}</NavLink></td>
                 <td className="py-4 px-6"> {article.category}</td>
                <td className="py-4 px-6"> {article.authorName}</td>
                <td className="py-4 px-6 flex gap-4">
                    <NavLink to={`/admin/article/modifier/${article._id}`} className="text-blue-500 hover:text-blue-700"> Editer </NavLink>
                    <button onClick={() => handleDelete(article._id)} className="text-red-500 hover:text-red-700"> Supprimer </button>
                </td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default ArticleDashboard;
