"use client"
import "@/styles/login.scss"
import Link from "next/link"
import {useState} from "react"
import { AiFillWechat } from "react-icons/ai";

export const Login =()=>{
  const [userinfo, setuserinfo] = useState({
    email:"",
    password:''
  })  
  return (
    <div className="formContainer">
    <div className="formWrapper">
    <AiFillWechat
        size={150}
        color="lightgreen"
        className=" bg-white rounded-3xl p-1 mt-4"
      />
      <h3 className="title">Se connecter</h3>
      <form onSubmit={()=>{}}>
        <div className="form-control">
        <label htmlFor="">Votre email</label>
        <input type="email" onChange={(e)=>setuserinfo({...userinfo,email:e.target.value})} placeholder="email" />
        </div>
        <div className="form-control">
        <label htmlFor="">Mot de passe</label>
        <input type="password" onChange={(e)=>setuserinfo({...userinfo,password:e.target.value})} placeholder="*******" />
        </div>
        <button>Se connecter</button>
        {/* {err && <span>Something went wrong</span>} */}
      </form>
      <p>Vous n'avez pas de compte? <Link to={"/register"} className="span" >S'inscrire</Link></p>
    </div>
  </div>
    )
}


