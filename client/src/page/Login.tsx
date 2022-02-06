import { observer } from "mobx-react-lite"
import React from "react"
import AuthData from "../state/AuthData"
import "./styles/Login.scss"

type Props = {}

const Login = observer((props: Props) => {
  const [form, setForm] = React.useState({ email: "", password: "" })
  const [error, setError] = React.useState("")

  function changeHandler(e: any) {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  async function loginHandler() {
    AuthData.login(form.email, form.password)
  }

  return (
    <>
      <div className="auth-container">
        <div className="card">
          <div className="card-title"></div>
          <div className="card-inputs">
            <input
              className="inputs card-inputs-input"
              placeholder="Email"
              id="email"
              type="email"
              onChange={changeHandler}
            />
            <input
              className="inputs card-inputs-input"
              placeholder="Password"
              id="password"
              type="password"
              onChange={changeHandler}
            />
            <button
              className="button card-inputs-button"
              onClick={loginHandler}
              disabled={!(form.email && form.password)}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </>
  )
})

export default Login
