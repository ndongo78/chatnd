"use client"
import Link  from "next/link";
import "@/styles/login.scss";

const Register = () => {
    const handleSubmit = () => {}
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <h2 className="logo">Mon logo </h2>
                <h3 className="title">Se connecter</h3>
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
                    <button>Sign in</button>
                    {/* {err && <span>Something went wrong</span>} */}
                </form>
                <p>Vous avez déja un compte? <Link href={"/"} className='span' >Se connecter</Link></p>
            </div>
        </div>
    )
}

export default Register
