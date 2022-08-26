import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";


const SignPage = () => {
   const { authenticated, login } = useContext(AuthContext)
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [namepriamry, setNameprimary] = useState("")
   const [namesecundary, setNameSecundary] = useState("")


   const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password,namepriamry)
    }

   return (
      <div id="login">
         <h1 className="title">Cadastro do Sistema </h1>
         <p>{String(authenticated)}</p>
         <form className="form" onSubmit={handleSubmit}>
            <div className="field">
               <label htmlFor="email">Email</label>
               <input type="email" name="email" id="email" value={email}
                  onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="nome">
                <label htmlFor="nameprimary">Primeiro Nome</label>
                <input type="name" name="name" id="name" value={namepriamry}
                  onChange={(e) => setNameprimary(e.target.value)} />
            </div>
            <div className="nome">
                <label htmlFor="namesecundary">Segundo Nome</label>
                <input type="name" name="name" id="name" value={namesecundary}
                  onChange={(e) => setNameSecundary(e.target.value)} />
            </div>
            <div className="field">
               <label htmlFor="password">Senha</label>
               <input type="password" name="password" id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="actions">Cadastrar</button>
         </form>

      </div>
   )
};

export default SignPage;