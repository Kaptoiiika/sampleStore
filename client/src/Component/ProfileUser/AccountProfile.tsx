import React, { useState } from 'react'
import './AccountProfile.scss'
import { observer } from 'mobx-react-lite'
import AuthData from '../../state/AuthData'
import UserData from '../../state/UserData'
import SoundItem from '../SoundItem/SoundItem'
import { item } from '../../Types/item'

type Props = {}

const AccountProfile = observer((props: Props) => {
  const { username: name, status, _id } = AuthData.user
  const [userInfo, setUserInfo] = useState<any>(null)
  const [open, setopen] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const [form, setForm] = useState(status)

  const handleOpen = () => {
    setopen(true)
  }

  React.useEffect(() => {
    UserData.getUserInfo(_id).then((data) => {
      setUserInfo(data)
      console.log(data)
    })
  }, [_id])
  const handleClose = () => {
    setopen(false)
  }

  const hundlelogout = () => {
    AuthData.logout()
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
        <div className="banner">
          <div className="logout">
            <button className="update btn btn-primary" onClick={hundlelogout}>
              logout
            </button>
          </div>
        </div>
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
        <div>
          Количесвто прослушиваний
          {userInfo?.uploads?.reduce(
            (previousValue: number, obj: item) =>
              previousValue + (obj.countOfPlays as number),
            0
          )}
        </div>
          {isChange ? (
            <div className="textfield">
              <div className="textfield-info">
                <label className="title">Статус</label>
                <div style={{ width: '100%' }} className="input-wrapper">
                  <input
                    style={{ margin: '0' }}
                    className="send-form-input"
                    onChange={changeHandler}
                    autoComplete="false"
                    defaultValue={status || 'жизнь за пиво'}
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
                <label className="text">{status || 'жизнь за пиво'}</label>
              </div>
            </div>
          )}

          <div className="textfield">
            <div className="textfield-info">
              <label className="title">Социальные сети</label>
              <label className="text">{'#notPivo'}</label>
            </div>
          </div>
        </div>
        <div className="AccountCard-uploads">
          <div>Вашы загруженные файлы: {userInfo?.uploads?.length || 0}</div>
          {userInfo ? (
            userInfo.uploads.map((item: any) => {
              if (!item) return null
              return (
                <SoundItem
                  item={item}
                  admin={
                    AuthData.user._id === '6206d6a5b50b8627bd4b15c5' ||
                    AuthData.user._id === item.owner
                  }
                />
              )
            })
          ) : (
            <h5>Тут ничего нет</h5>
          )}
        </div>
      </div>
      {/* <ChangeAvatar open={open} onClose={handleClose} /> */}
    </div>
  )
})

export default AccountProfile
