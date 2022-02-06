import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./page/Home"
import Login from "./page/Login"
import Registration from "./page/Registration"
import Upgrade from "./page/Upgrade"

type Props = {
  isAuthentificated: boolean
}

const router = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/upgrade" element={<Upgrade />} />
    </Routes>
  )
}

export default router
