import { observer } from "mobx-react-lite"
import React from "react"
import AccountProfile from "../Component/ProfileUser/AccountProfile"
import AuthData from "../state/AuthData"

type Props = {}

const Profile = observer((props: Props) => {
  return <AccountProfile />
})

export default Profile
