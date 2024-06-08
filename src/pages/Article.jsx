import {useParams} from "react-router-dom"
import {useState, useEffect} from "react"
import axios from "axios"
import Comments from "../components/Comment"
import {useAuth} from "../context/AuthContext"
import {toast} from "react-toastify"
import {token} from "../context/token"
const ArticlePage = () => {

const {id} = useParams();
const [article, setArticle] = useState("")
const [comments, setComments] = useState([])
const [loaded, setLoaded] = useState(false)
const {user} = useAuth()

useEffect(() => {
  
  const fetchOneArticle = async () => {
    try {
            
      // window.location.pathname
      if(user && user.token){
        
      const commentData = await axios.get(`/api/comments/${id}`, {headers: token()})
      setComments(commentData.data.reverse())
      }
      const res = await axios.get(`/api/articles/${id}`)
      
      setArticle(res.data)
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message)
    }
  }
  // const selectedArticle = articles.find((a) => a.id === parseInt(id))
  // setArticle(selectedArticle)
  fetchOneArticle()
}, [loaded])

const addComment = (newComment) =>  {
  setLoaded(!loaded)
  // setComments([...comments, newComment])
}

const API_URL = import.meta.env.VITE_API_URL

  return (
    <>
    { article && (
      
      <div className="min-h-screen bg-[#0E1217] text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#E11D48] text-center mb-5">{""}</h1> 
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img src={article.imageUrl} alt="Article" className="rounded-lg shadow-lg max-w-full h-auto md:w-1/2"/> 
            <div>
              <h2 className="text-2xl text-[#E11D48] mb-2">Résumé</h2>
              <p className="mb-4">{article.summary}</p>  
              <div className="flex items-center gap-4 mb-2">
                <img src={`${API_URL}/img/${article.authorImageUrl}`} alt={article.authorName} className="w-10 h-10 rounded-full shadow-lg"/>
                <span>{article.authorName}</span>
              </div>
             
              <div className="text-gray-400 mb-2">📅 {new  Date(article.createdAt).toLocaleDateString()}</div>
              <div className="text-gray-400 mb-2">📅 Mise à jour le:  {new  Date(article.updatedAt).toLocaleDateString()}</div>
              <div className="text-gray-400"> ⏳ Temps de lecture {Math.ceil(article.content.length/300)} min(s)</div>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl text-[#E11D48] mb-2">Contenu</h2>
            <p>{article.content}</p>
          </div>
        </div>
        {user && user.token && (
        
          <Comments updateComment={addComment}/>
        )}
      <hr />
     {
  comments.length > 0 && user && user.token ? (
    <div className="max-w-4xl mx-auto px-4 mt-4">
      {comments.map((c) => (
        <div key={c._id} className="bg-[#1E2230] p-5 rounded-lg shadow-lg mb-4">
          <div className="flex items-center gap-4 mb-2">
            <img src={`${API_URL}/${c.userId.image}`} alt={c.userId.username} className="w-10 h-10 rounded-full shadow-lg" />
            <span className="text-[#E11D48]">{c.userId.username}</span>
          </div>
          <p className="mb-2">{c.content}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">📅 {new Date(c.createdAt).toLocaleDateString()} ⏰ {new Date(c.createdAt).toLocaleTimeString()}</span>
            <span className="text-[#E11D48]">⭐ {c.rating}</span>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500">{user && user.token ? "Pas de commentaires pour cet article." : "Connectez-vous pour visualiser les commentaires"}</p>
  )
}

        
      
      </div>
    )}
    </>
  );
};

export default ArticlePage;
