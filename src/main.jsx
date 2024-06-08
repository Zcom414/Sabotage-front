import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import AuthProvider from "./context/AuthContext"
import 'react-toastify/dist/ReactToastify.css';

// Il ne faut pas oublier le BrowserRouter ici

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
    <App />
    </AuthProvider>
    <ToastContainer draggable theme="dark" autoClose="3000" />
  </BrowserRouter>
  </React.StrictMode>,
)
