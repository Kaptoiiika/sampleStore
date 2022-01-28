import { AuthAction, AuthState } from "../../Types/authReducer"

const LOGIN = "LOGIN"
const TRY_LOGIN = "TRY_LOGIN"

const initalState: AuthState = {
  token: {
    access: "",
  },

  user: {
    username: "",
    email: "",
    status: "",
    subscription: null,
    uploads: null,
  },

  error: null,
  loading: false,
}

export const authReducer = (
  state = initalState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case TRY_LOGIN:
      return { ...state, loading: true, error: null }
    case LOGIN:
      return { ...state, loading: false, ...action.payload }
    default:
      return state
  }
}
