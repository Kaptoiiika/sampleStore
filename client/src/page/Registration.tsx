import { observer } from "mobx-react-lite"
import React from "react"
import AuthData from "../state/AuthData"

type Props = {}

const Registration = observer((props: Props) => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    username: "",
  })
  const [error, setError] = React.useState("")

  function changeHandler(e: any) {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  async function RegistrationHandler() {
    AuthData.registertration(form.email, form.username, form.password)
  }

  return (
    <>
      <div className="auth-container">
        <div className="card">
          <div className="card-title"></div>
          <div className="card-inputs">
            <p className="card-inputs-text">Username</p>
            <input
              className="inputs card-inputs-input"
              placeholder="Username"
              id="username"
              type="username"
              onChange={changeHandler}
            />
            <p className="card-inputs-text">Email</p>
            <input
              className="inputs card-inputs-input"
              placeholder="Email"
              id="email"
              type="email"
              onChange={changeHandler}
            />
            <p className="card-inputs-text">Password</p>
            <input
              className="inputs card-inputs-input"
              placeholder="Password"
              id="password"
              type="password"
              onChange={changeHandler}
            />
            <button
              className="button card-inputs-button"
              onClick={RegistrationHandler}
              disabled={!(form.email && form.username && form.password)}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  )
})

export default Registration
