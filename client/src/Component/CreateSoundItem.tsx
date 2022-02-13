import * as React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material"
import SoundItem from "./SoundItem/SoundItem"
import defaulticon from "../static/icons/default.png"
import { observer } from "mobx-react-lite"
import ItemsData from "../state/ItemsData"

type Props = {
  open: boolean
  onClose: () => void
}

const CreateSoundItem = observer((props: Props) => {
  const { open, onClose } = props
  const [err, setErr] = React.useState("")
  const [form, setForm] = React.useState({
    name: "",
    tags: "",
    description: "",
  })
  const [file, setFile] = React.useState<Blob>(new Blob())
  const [avatar, setAvatar] = React.useState<Blob>(new Blob())
  const [avatarUrl, setAvatarUrl] = React.useState("")

  const handleClose = () => {
    onClose()
  }

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleFileUpload = (e: any) => {
    setFile(e.target.files[0])
    if (!form.name) {
      setForm({ ...form, name: e.target.files[0].name })
    }
  }

  const handlePhotoUpload = (e: any) => {
    setAvatar(e.target.files[0])
    setAvatarUrl(URL.createObjectURL(e.target.files[0]))
  }

  const handleSend = async () => {
    ItemsData.handleSend(form, file, avatar)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить звук</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              onChange={handleChange}
              id="name"
              label="Название"
              variant="standard"
              autoComplete="off"
              value={form.name}
            />
            <TextField
              onChange={handleChange}
              id="tags"
              label="Теги"
              placeholder="kick, drums, snake, apple"
              variant="standard"
              autoComplete="off"
              value={form.tags}
            />
            <TextField
              style={{ margin: "10px 0 0 0" }}
              onChange={handleChange}
              id="description"
              multiline
              minRows={4}
              maxRows={4}
              helperText={err || ""}
              variant="standard"
              label="Описание"
              autoComplete="off"
              value={form.description}
            />
            <input
              id="source"
              onChange={handleFileUpload}
              style={{ margin: "10px 0 0 0" }}
              type="file"
            />
            <input
              id="Photo"
              onChange={handlePhotoUpload}
              style={{ margin: "10px 0 0 0" }}
              type="file"
            />
          </form>
          <div style={{ margin: "20px 0 0  0" }}>
            <SoundItem
              item={{
                name: form.name,
                tags: form.tags.split(","),
                description: form.description,
                _id: "",
                size: 0,
                dataCreate: new Date(),
                path: "",
                icon: !!avatar.size ? avatarUrl : defaulticon,
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="contained" onClick={handleSend}>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
})

export default CreateSoundItem
