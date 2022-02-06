import React from "react"
import { Navigate, useNavigate } from "react-router-dom"

type Props = {
  title: string
  path: string
  currentPath: string
}

const NavBarButton = (props: Props) => {
  const navigate = useNavigate()
  const { path, title, currentPath } = props

  return (
    <div
      className={` ${
        currentPath === path ? "NavBar-active" : ""
      } NavBar-button`}
      onClick={() => {
        navigate(path)
      }}
    >
      {title}
    </div>
  )
}

export default NavBarButton
