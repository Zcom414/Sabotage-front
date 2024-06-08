import { Input, Textarea, Button } from "@material-tailwind/react";
import {useState} from "react"
import axios from "axios"
import {toast} from "react-toastify"
import {token} from "../../context/token"

const AddArticle = () => {

const [inputs, setInputs] = useState({
    
    title: "",
    summary: "", 
    authorName: "",
    authorImageUrl: "",
    category: "", 
    content: ""
    
})

const [message, setMessage] = useState("")


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
        
        const {title, summary, content, authorName, imageUrl, authorImageUrl, category } = inputs
        
          // Sécurité
          
          if(title.trim() === ""
          || summary.trim() === ""
          || content.trim() === ""
          || authorName.trim() === ""
          || imageUrl.trim() === ""
          || !authorImageUrl
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
        const res = await axios.post("/api/articles/new", formData,  {headers: token()})
           

     setMessage(res.data.message)
     
     toast.success(res.data.message)
    } catch (e) {
        toast.error("Erreur lors de la création de l'article")
        setMessage("Erreur lors de la création de l'article")
    }

   
  
}

  
  return (
    <div className="min-h-screen bg-[#0E1217] flex justify-center items-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#E11D48] text-center mb-8">Ajouter un Article</h1>
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

export default AddArticle;
