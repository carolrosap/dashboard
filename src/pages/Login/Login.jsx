// src/components/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginAndGetUser } from "../../services/auth";
import Logo from "../../assets/logo.svg";
import Hero from "../../assets/Saly-14.svg";
import "./Login.style.scss";
export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !senha.trim()) {
      setError("Preencha todos os campos");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await loginAndGetUser({ email, password: senha });
      navigate("/dashboard");
    } catch (err) {
      const apiMsg = err?.response?.data || err?.message || "Falha no login";
      setError(typeof apiMsg === "string" ? apiMsg : "Falha no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="loginPage">
      <header className="loginPage__header">
        <img src={Logo} alt="MeuGestor" className="loginPage__logo" />
      </header>

      <main className="loginPage__content container">
        {/* Coluna esquerda */}
        <section className="loginPage__left">
          <div className="loginPage__headline">
            <h1>Faça seu login em</h1>
            <h2>
              <span className="brand--primary">Meu</span>
              <span className="brand--secondary">Gestor</span>
            </h2>

            <p className="loginPage__hint">
              Se você ainda não tem uma conta.
              <br />
              Você pode se{" "}
              <Link to="/register" className="link">
                Registrar aqui !
              </Link>
            </p>
          </div>

          <img
            className="loginPage__hero"
            src={Hero}
            alt="Pessoa usando aplicativo no celular"
            loading="lazy"
          />
        </section>

        {/* Cartão do formulário */}
        <section className="loginPage__right">
          <div className="loginCard" role="form" aria-labelledby="loginTitle">
            <h3 id="loginTitle" className="loginCard__title">
              Login
            </h3>

            <form onSubmit={handleSubmit} noValidate>
              <label className="form__label" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="E-mail"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form__input"
              />

              <div className="form__row">
                <label className="form__label" htmlFor="senha">
                  Senha
                </label>
                <Link to="/forgot-password" className="form__aux">
                  Esqueceu sua senha?
                </Link>
              </div>
              <input
                id="senha"
                type="password"
                name="senha"
                placeholder="Senha"
                autoComplete="current-password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="form__input"
              />

              {error && <p className="form__error">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="button button--primary"
              >
                {loading ? "Entrando..." : "Login"}
              </button>

              <div className="divider">
                <span>ou continue com</span>
              </div>

              <div className="social">
                <button type="button" className="social__btn" aria-label="Login com Facebook">
                  f
                </button>
                <button type="button" className="social__btn" aria-label="Login com Apple">
                  
                </button>
                <button type="button" className="social__btn" aria-label="Login com Google">
                  G
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
