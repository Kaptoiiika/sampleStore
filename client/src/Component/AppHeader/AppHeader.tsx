import { observer } from "mobx-react-lite"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AuthData from "../../state/AuthData"
import "./AppHeader.scss"
import NavBarButton from "./NavBarButton"
import Logo from "../../static/icons/Logo.png"

type Props = {}

const AppHeader = observer((props: Props) => {
  const navigate = useNavigate()
  const isAuth = AuthData.isAuth
  const { pathname } = useLocation()
  return (
    <div className="header-wrapper">
      <div className="header">
        <div className="NavBar">
          <img className="NavBar-logo"src={Logo} alt="Logo" />
          <NavBarButton title="Home" path="/" currentPath={pathname} />
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
              <NavBarButton
                title="MyProfile"
                path="/profile/me"
                currentPath={pathname}
              />
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
