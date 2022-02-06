import React from "react"
import "./AppHeader.scss"

type Props = {}

const AppHeader = (props: Props) => {
  const isAuth = false
  return (
    <div className="header-wraper">
      <div className="header">
        <div className="NavBar">
          <img
            src="https://splice-res.cloudinary.com/image/upload/f_auto,q_auto,w_21,dpr_1.0/app-assets/general/Logo-Logged-In-Light_3x.png"
            alt="Logo"
          />
          <p className="NavBar-button">SomeButton</p>
          <p className="NavBar-button">SomeButton</p>
        </div>
        <div className="NavBar-profile">
          {isAuth ? (
            <>
              <p className="NavBar-button">MyProfile</p>
            </>
          ) : (
            <>
              <p className="NavBar-button">Login</p>
              <div className="alignCenter">
                <p className="NavBar-button NavBar-button-SignUp">Sign up</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppHeader
