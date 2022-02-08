import * as React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import axios from "axios"
import SoundItem from "./SoundItem"
import defaulticon from "../static/icons/default.png"

type Props = {
  open: boolean
  onClose: () => void
}

function CreateSoundItem(props: Props) {
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
    const formData = new FormData()
    formData.append("name", form.name)
    formData.append("tags", form.tags)
    formData.append("description", form.description)
    formData.append("source", file)
    formData.append("icon", avatar)
    try {
      await axios.post("/api/item/create", formData)
      handleClose()
      // window.location.reload()
    } catch (error: any) {
      setErr(error.message)
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
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
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />
})
export default CreateSoundItem
