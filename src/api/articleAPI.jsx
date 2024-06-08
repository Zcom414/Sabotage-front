import axios from "axios" 
 
 export const fetchArticles = async () => {
      
      try {
         // sans le proxy dans vite.config.js :  axios.get("http://pajs02.ide.3wa.io:9000/api/articles")
         
        //   axios.get(`${import.meta.env.VITE_API_URL}/api/articles`)
        const res = await axios.get("/api/articles") // avec le vite.config.js
      
      return res.data

        
      } catch (e) {
        console.log(e);
      }
      

    }
    
    
    export const addArticle = async (form) =>{
        try {
            
            const res = await axios.post("/api/articles/new", form)
            
            return res.data
        } catch (e) {
            console.log(e)
        }
    }
    
    export const getOneArticle = async (id) => {
        try {
            
            const res = await axios.get("/api/articles/" + id)
        } catch (e) {
            console.log(e);
        }
    }