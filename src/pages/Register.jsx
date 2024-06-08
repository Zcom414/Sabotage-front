import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import axios from "axios"
import {toast} from "react-toastify"
import {NavLink} from "react-router-dom"

const Register = () => {
  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
  });

const [checkPwd, setCheckPwd] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    specialChar: false
})


const [isCompleted, setIsCompleted] = useState(true)

const handleChange = (e) =>{
    const {name, value} = e.target
    // Méthode une
    setFormInput({...formInput, [name]: value}) // L - LO - LOI - LOIC
    
    //  setArray([...array, "bonjour"]) // Pour ajouter une valeur dans un state en React
    // Rappel on ne peut pas utiliser la méthode PUSH 
    
    // Méthode plus optimisée
    setFormInput(prev => ({...prev, [name]: value}))
    
    isNotFullCompleted()
    // Validation pour le mot de passe
    if(name === "password"){
        const minLength = value.length >= 8; // Renvoie un true et false
        const uppercase = /[A-Z]/.test(value);
        const lowercase = /[a-z]/.test(value);
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)
        
       return setCheckPwd({
            minLength,
            uppercase,
            lowercase,
            specialChar, 
            isFocus: true
        
        })
        
        
    }
    
    setCheckPwd(prev => ({...prev, isFocus:false}))
    
}




const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
        // Sécurité 
        
        const res = await axios.post(`api/users/register`, formInput)
        
        toast.success(res.data.message)
    } catch (e) {
        // Pour afficher le message d'erreur venant du back 
        toast.error(e.response.data.message)
    }
}


const renderValidation = (isValid) => (
    isValid ? <span className ="text-green-500"> ✔️ </span> : <span className ="text-red-500"> ⛔</span>
)

const isNotFullCompleted = () => {
    const checkPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,55}$/
    
    if(!checkPwd.test(formInput.password)) {
       return setIsCompleted(true) 
    }
    
    return setIsCompleted(false) 

}

  return (
    <div className="min-h-screen bg-[#0E1217] flex justify-center pt-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#E11D48] text-center mb-8">Inscription</h1>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-4">
          <Input
            name="username"
            type="text"
            className="text-white"
            placeholder="Pseudo"
            onChange={handleChange}
            value={formInput.username}
          />
          <Input
            name="email"
            type="email"
            className="text-white"
            placeholder="Email"
            onChange={handleChange}
            value={formInput.email}
          />
          <Input
            name="password"
            type="password"
            className="text-white"
            placeholder="Mot de passe..."
            onChange={handleChange}
            value={formInput.password}
          />
          {checkPwd.isFocus && 
          <div className="text-white text-sm space-y-2">
            <p className="text-white"> {renderValidation(checkPwd.minLength)} Au moins 8 caractères  </p>
            <p className="text-white"> {renderValidation(checkPwd.uppercase)} Au moins 1 majuscule  </p>
            <p className="text-white"> {renderValidation(checkPwd.lowercase)} Au moins 1 minuscule  </p>
            <p className="text-white"> {renderValidation(checkPwd.specialChar)} Au moins 1 caractère spécial  </p>
          </div>
          }
          
          <Button  type="submit" variant="filled" className={"w-full bg-[#E11D48] mb-4 hover:bg-[#B11D42]" }>
            S'inscrire
          </Button>
          <NavLink to="/login" className="text-[#E11D48]"> Déjà inscrit? Connectez-vous. </NavLink>

        </form>
      </div>
    </div>
  );
};

export default Register;
