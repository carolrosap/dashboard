import { useState } from "react";

export function Login() {
  const [login, setLogin] = useState(null);
  const [senha, setSenha] = useState(null);
  return (
    <>
      <form onSubmit={}>
        <input
          type="text"
          name="login"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
