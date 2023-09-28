"use client"
import "@/styles/login.scss"
import Link from "next/link"
import {SyntheticEvent, useEffect, useState} from "react"
import { AiFillWechat } from "react-icons/ai";
import {useRouter} from "next/navigation";
import {loginUser} from "@/utils";
import {useAuth} from "@/context/AuthContext";
import jwt_decode from "jwt-decode";

export const Login =()=>{
  const [userinfo, setuserinfo] = useState({
    email:"",
    password:''
  })
  const router = useRouter()
  const {token,setToken,setCurrentUser } = useAuth();



  useEffect(() => {
    const tokenfrom= localStorage.getItem("token")
    if(tokenfrom && token) {
      // @ts-ignore
      router.push("/chat")
    }
  }, [token]);


  const handleSubmit=(e:SyntheticEvent)=>{
    e.preventDefault();
    loginUser(userinfo)
        .then(response=>{
          if (response.token){
            const user:any= jwt_decode(response.token);
            setCurrentUser(user.user)
            setToken(response.token)
            router.push("/chat",response.token)
            localStorage.setItem("token",response.token+"jjhsed944000000")
          }
        })
        .catch(err=>console.error("err",JSON.stringify(err)))
  }

  return (
    <div className="formContainer">
    <div className="formWrapper">
    <AiFillWechat
        size={150}
        color="lightgreen"
        className=" bg-white rounded-3xl p-1 mt-4"
      />
      <h3 className="title">Se connecter</h3>
      <form onSubmit={handleSubmit}>
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
      <p>Vous n&apos;avez pas de compte? <Link href={"/signUp"} className="span" >S&apos;inscrire</Link></p>
    </div>
  </div>
    )
}


