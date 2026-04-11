import React from "react";
import { useState } from "react";
import PropTypes from 'prop-types';

type SignInProps = {
    setToken: (token: string) => void;
}

type TokenResponse = {
    token: string;
};

async function SignInUser(credentials: { email: string; password: string }): Promise<TokenResponse> {
 return fetch('http://localhost:8080/signIn', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function SignIn({ setToken }: SignInProps){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        const { token } = await SignInUser({
      email,
      password
    });
    setToken(token);
    }

    return(
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
                <h2>Sign In</h2>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: "10px", marginBottom: "10px" }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: "10px", marginBottom: "10px" }}
                />
                <button type="submit" style={{ padding: "10px", backgroundColor: "#007BFF", color: "#fff", border: "none", cursor: "pointer" }}>
                    Sign In
                </button>
            </form>
        </div>  
    )
}
SignIn.propTypes = {
  setToken: PropTypes.func.isRequired
}
