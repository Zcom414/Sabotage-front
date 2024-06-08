import { Input, Textarea, Button } from "@material-tailwind/react";
import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios"
import {toast} from "react-toastify"
import {token} from "../../context/token"

const EditArticle = () => {

const { id } = useParams();
const navigate = useNavigate()
const [inputs, setInputs] = useState({
    
    title: "",
    summary: "", 
    authorName: "",
    authorImageUrl: "",
    category: "", 
    content: ""
    
})

const [message, setMessage] = useState("")

useEffect(()=> {
    
    const fetchOneArticle = async () => {
        try {
                
                const res = await axios.get(`/api/articles/${id}`)
                
                setInputs(res.data)

        } catch (e) {
            console.log(e);
        }
    }
    
    fetchOneArticle()
    
},[])





const handleChange = (e) => {
    
    // Formik | react-hook-form (react-form)
    
    // DECOMPOSITION
    const {name, value} = e.target;
    
    if(name === "authorImageUrl"){
        console.log(e.target.files[0])
        setInputs({...inputs, authorImageUrl: e.target.files[0]})
    }else{
         // Assignation dynamique lié au name
    setInputs({...inputs, [name]: value})
 
    }
    
    // Je vide l'input
    setMessage("")


}

const handleSubmit = async(e) => {
    e.preventDefault();
  
    try { 
        console.log(inputs)
        
        const formData = new FormData();
        
        const {title, summary, content, authorName, imageUrl, category } = inputs
        
          // Sécurité
          
          if(title.trim() === ""
          || summary.trim() === ""
          || content.trim() === ""
          || authorName.trim() === ""
          || imageUrl.trim() === ""
          || category.trim() === ""
          ){
              return toast.warning("Veuillez remplir tous les champs")
          }
          
          
          
        formData.append("title", inputs.title);
        formData.append("summary", inputs.summary);
        formData.append("content", inputs.content);
        formData.append("authorName", inputs.authorName);
        formData.append("imageUrl", inputs.imageUrl);
        formData.append("authorImageUrl", inputs.authorImageUrl);
        formData.append("category", inputs.category);
        
        // 2e méthode
        // Object.entries({title, summary, content, authorName, imageUrl, authorImageUrl, category})
        // .forEach(([key, value]) => formData.append(key, value) )


        // Envoie vers notre serveur du formulaire
        const res = await axios.put(`/api/articles/edit/${id}`, formData,  {headers: token()})
           

        setMessage(res.data.message)
        toast.success(res.data.message)
        setTimeout(() => {
        navigate("/admin/article/dashboard")
            
        }, 2000) 
        
    } catch (e) {
        toast.error("Erreur lors de la mise à jour de l'article")
        setMessage("Erreur lors de la création de l'article")
    }

   
  
}

  
  return (
    <div className="min-h-screen bg-[#0E1217] flex justify-center items-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#E11D48] text-center mb-8">Editer un Article</h1>
        <form encType="multipart/form-data" onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-4 text-white">
          <div className="flex flex-col mb-4">
            <label htmlFor="title" className="mb-2">Titre</label>
            <Input onChange={handleChange} value={inputs.title} id="title" name="title" type="text"  />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="summary" className="mb-2">Résumé</label>
            <Textarea onChange={handleChange} value={inputs.summary} id="summary" name="summary"  />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="category" className="mb-2">Catégorie</label>
            <Input onChange={handleChange} value={inputs.category} id="category" name="category" type="text"  />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="author" className="mb-2">Auteur</label>
            <Input onChange={handleChange} value={inputs.authorName} id="author" name="authorName" type="text"  />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="authorImageUrl" className="mb-2">URL de l'image de l'auteur</label>
            <Input onChange={handleChange}  id="authorImageUrl" name="authorImageUrl" type="file"   />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="imageUrl" className="mb-2">URL de l'image de l'article</label>
            <Input onChange={handleChange} value={inputs.imageUrl} id="imageUrl" name="imageUrl" type="text" />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="content" className="mb-2">Contenu</label>
            <Textarea onChange={handleChange} value={inputs.content} id="content" name="content"   />
          </div>
          <div className="flex flex-col mb-4 bg-[#E11D48]">
            {message && <span> {message} </span>}
        </div>
          <Button type="submit" variant="filled" className="w-full bg-[#E11D48]">Soumettre</Button>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;
