import { observer } from "mobx-react-lite"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AuthData from "../../state/AuthData"
import "./AppHeader.scss"
import NavBarButton from "./NavBarButton"

type Props = {}

const AppHeader = observer((props: Props) => {
  const navigate = useNavigate()
  const isAuth = AuthData.isAuth
  const { pathname } = useLocation()
  return (
    <div className="header-wraper">
      <div className="header">
        <div className="NavBar">
          <img
            src="https://splice-res.cloudinary.com/image/upload/f_auto,q_auto,w_21,dpr_1.0/app-assets/general/Logo-Logged-In-Light_3x.png"
            alt="Logo"
          />
          <NavBarButton title="Home" path="/" currentPath={pathname} />
          <NavBarButton title="SomeButton" path="/asd" currentPath={pathname} />
        </div>
        <div className="NavBar-profile">
          {isAuth ? (
            <>
              <div className="alignCenter">
                <p
                  className="NavBar-button NavBar-button-Upgrade"
                  onClick={() => {
                    navigate("/upgrade")
                  }}
                >
                  Upgrade
                </p>
              </div>
              <p className="NavBar-button">MyProfile</p>
            </>
          ) : (
            <>
              <NavBarButton
                title="Login"
                path="/login"
                currentPath={pathname}
              />
              <div className="alignCenter">
                <div
                  className={`NavBar-button NavBar-button-SignUp ${
                    pathname === "/registration" ? "NavBar-button-active" : ""
                  }`}
                  onClick={() => {
                    navigate("/registration")
                  }}
                >
                  Sign up
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
})

export default AppHeader
