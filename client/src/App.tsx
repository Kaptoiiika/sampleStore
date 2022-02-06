import * as React from "react"
import "./App.css"
import AppHeader from "./Component/AppHeader/AppHeader"
import { BrowserRouter } from "react-router-dom"
import useRoutes from "./routes"
import { observer } from "mobx-react-lite"
import AuthData from "./state/AuthData"

const App = observer(() => {
  const routes = useRoutes()
  React.useEffect(() => {
    AuthData.loginToken()
  })
  
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        {routes}
      </BrowserRouter>
    </div>
  )
})

export default App
