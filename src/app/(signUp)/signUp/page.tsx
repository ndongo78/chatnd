"use client"
import Link  from "next/link";
import "@/styles/login.scss";
import {AiFillWechat} from "react-icons/ai";

const Register = () => {
    const handleSubmit = () => {}
    return (
        <div className="formContainer ">
            <div className="formWrapper h-screen">
                <AiFillWechat
                    size={250}
                    color="lightgreen"
                    className=" bg-white rounded-3xl p-1"
                />
                <h3 className="title italic m-2">Rejoindre la communauté</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="">Votre Nom et Prénom</label>
                        <input type="text" placeholder="username" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="">Votre email</label>
                        <input type="email" placeholder="email" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="">Mot de passe</label>
                        <input type="password" placeholder="*******" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="">Votre numéro de téléphone</label>
                        <input type="tel" placeholder="telephone" />
                    </div>
                    <button>S&apos;inscrire</button>
                    {/* {err && <span>Something went wrong</span>} */}
                </form>
                <p>Vous avez déja un compte? <Link href={"/"} className='span' >Se connecter</Link></p>
            </div>
        </div>
    )
}

export default Register
