import "./Login.css";
import Logo from "../logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    localStorage.setItem("@username", username);
    navigate("/timeline");
  }

  return (
    <div className="login-wrapper">
      <img width="100" src={Logo} alt="logo" />
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Nome de Usuário"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
