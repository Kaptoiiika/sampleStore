import axios from "axios"
import { Dispatch } from "redux"
import { AuthAction } from "../../Types/authReducer"

export const login = (username: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({ type: "TRY_LOGIN" })
      // const { data } = await axios.get("")
      const data = {
        token: {
          access: "asd.QWE.Asd",
        },
        user: {
          username: username,
          email: "@maasd",
          status: "JiznZaNerzyla",
          subscription: ["null"],
          uploads: null,
        },
      }
      dispatch({
        type: "LOGIN",
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: "LOGIN",
        payload: {
          error: error,
        },
      })
    }
  }
}
