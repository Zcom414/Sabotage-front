import {useState} from "react"
import { Button, Input, Textarea } from '@material-tailwind/react';

const Contact = () => {
  
  const [formInput, setFormInput] = useState({
    pseudo:"",
    message: ""
  })
  
  const [disableInput, setDisableInput] = useState(false)
  const [message, setMessage] = useState("")
  
 // Il faut envoyer les données de ce formulaire dans le localStorage,
 // RAPPEL: Il faut récupérer le LS, puis ajouter une nouvelle valeur pour ne pas
 // écraser anciennes valeurs

 // Faire la fonction handleChange et handleSubmit
 
 const handleChange = (e) =>{
   const {name, value} = e.target
   
   setFormInput({...formInput, [name]: value, date: new Date() })
   setMessage("")
   
 }
 
 const handleSubmit = e => {
   e.preventDefault();
      if(disableInput){
     return;
   }
   
   const dataFromLS = JSON.parse(localStorage.getItem("contact")) || []
   
   if(formInput.pseudo.trim() === "" || formInput.message.trim() === ""){
     return setMessage("Vous ne pouvez pas envoyer des données vide")
   }
   dataFromLS.push(formInput)
   
   localStorage.setItem("contact", JSON.stringify(dataFromLS))
  setDisableInput(true)
   setTimeout(() => {
     setDisableInput(false)
   }, 10000)
 }
 
  return (
    <div className="min-h-screen bg-[#0E1217] flex justify-center items-center">
      <div className="container mx-auto px-4 pt-10">
        <h1 className="text-4xl font-bold mb-5 text-[#E11D48] text-center">Contact</h1>
        <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="pseudo" className="block text-white mb-2">Pseudo</label>
            <Input
              id="pseudo"
              type="text"
              color="light-blue"
              className='text-white'
              onChange={handleChange}
              value={formInput.pseudo}
              name="pseudo"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-white mb-2">Message</label>
            <Textarea
              id="message"
              color="light-blue"
              className='text-white'
              onChange={handleChange}
              value={formInput.message}
              name="message"
            />
          </div>
          <Button disabled={disableInput} type="submit" className="w-full bg-[#E11D48] hover:bg-[#c81e42]">Envoyer</Button>
        </form>
        {message && <span className="mx-auto text-[#E11D48]"> {message} </span>}
      </div>
    </div>
  );
};

export default Contact;
