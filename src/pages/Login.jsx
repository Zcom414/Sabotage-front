import {useState} from "react"
import { Button, Input, Textarea } from '@material-tailwind/react';
import { toast } from "react-toastify"
import {useNavigate, NavLink} from "react-router-dom"
import axios from "axios";
import {useAuth} from "../context/AuthContext"

const Login = () => {
  
  const [formInput, setFormInput] = useState({
    email:"",
    password: ""
  })
  
  // Hook qui permet de récupérer le context
  const auth = useAuth()
  
  const navigate = useNavigate()
  
 const handleChange = (e) =>{
     
     const {name, value} = e.target;
     
     setFormInput({...formInput, [name]: value})
 }
 
 const handleSubmit = async (e) => {
     
     e.preventDefault();
     
     try {
         
         
         // Sécurité
         
         const res = await axios.post("/api/users/login", formInput)
         console.log(res);
        toast.success("Vous êtes bien connecté, vous allez être redirigé.")
        
        auth.login(res.data)
        
        setTimeout(()=>{
            navigate("/")
        },2000)
   
     } catch (e) {
             toast.error(e.response.data.message)
     }
     
 }
 
 
  return (
    <div className="min-h-screen bg-[#0E1217] flex justify-center pt-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-5 text-[#E11D48] text-center">Se connecter</h1>
        <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">Email</label>
            <Input
              id="email"
              type="text"
              color="light-blue"
              className='text-white'
              onChange={handleChange}
              value={formInput.email}
              name="email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-2">Mot de passe</label>
            <Input
              id="password"
              color="light-blue"
              className='text-white'
              onChange={handleChange}
              value={formInput.password}
              type="password"
              name="password"
            />
          </div>
          <Button type="submit" className="w-full bg-[#E11D48] mb-4 hover:bg-[#c81e42]">Envoyer</Button>
          <NavLink to="/inscription" className="text-[#E11D48]"> Pas encore inscrit? Inscrivez-vous. </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
