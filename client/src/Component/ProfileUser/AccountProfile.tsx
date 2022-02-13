import React, { useState } from "react"
import "./AccountProfile.scss"
import { observer } from "mobx-react-lite"
import AuthData from "../../state/AuthData"

type Props = {}

const AccountProfile = observer((props: Props) => {
  console.log(AuthData.user)
  const { username: name, status, _id } = AuthData.user
  const [open, setopen] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const [form, setForm] = useState(status)

  const handleOpen = () => {
    setopen(true)
  }

  const handleClose = () => {
    setopen(false)
  }

  const changeHandler = (e: any) => {
    setForm(e.target.value)
  }

  const setStatus = () => {
    AuthData.user.status = form
    // AuthData.updateInfo(form, "@boar")
    setIsChange(false)
  }

  return (
    <div className="AccountProfile">
      <div className="AccountCard">
        <div className="banner"></div>
        <div className="userInfo">
          <div className="userInfo">
            <img
              className="avatar avatar avatar-80"
              src={`http://${window.location.hostname}:3030/api/user/avatar/${_id}`}
              alt=""
            />
            <label className="name">{name}</label>
          </div>
          <button onClick={handleOpen} className="update btn btn-primary">
            Сменить аватар
          </button>
        </div>
        <div className="usermoreinfo">
          {isChange ? (
            <div className="textfield">
              <div className="textfield-info">
                <label className="title">Статус</label>
                <div style={{ width: "100%" }} className="input-wrapper">
                  <input
                    style={{ margin: "0" }}
                    className="send-form-input"
                    onChange={changeHandler}
                    autoComplete="false"
                    defaultValue={status || "жизнь за пиво"}
                  />
                </div>
              </div>
              <div className="textfield-button">
                <button onClick={setStatus} className="btn btn-primary">
                  применить
                </button>
              </div>
            </div>
          ) : (
            <div className="textfield">
              <div className="textfield-info">
                <label className="title">Статус</label>
                <label className="text">{status || "жизнь за пиво"}</label>
              </div>
              <div className="textfield-button">
                <button
                  onClick={() => setIsChange(true)}
                  className="btn btn-secondary"
                >
                  изменить
                </button>
              </div>
            </div>
          )}

          <div className="textfield">
            <div className="textfield-info">
              <label className="title">Социальные сети</label>
              <label className="text">{"#notPivo"}</label>
            </div>
            <div className="textfield-button">
              <button className="btn btn-secondary">изменить</button>
            </div>
          </div>
        </div>
      </div>

      {/* <ChangeAvatar open={open} onClose={handleClose} /> */}
    </div>
  )
})

export default AccountProfile
