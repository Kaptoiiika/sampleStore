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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />
})

function CreateSoundItem() {
  const [open, setOpen] = React.useState(false)
  const [err, setErr] = React.useState("")
  const [form, setForm] = React.useState({
    name: "",
    tags: "",
    description: "",
  })
  const [file, setFile] = React.useState<any>("")

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }
  const handleFileUpload = (e: any) => {
    setFile(e.target.files[0])
  }

  const handleSend = async () => {
    const formData = new FormData()
    formData.append("name", form.name)
    formData.append("tags", form.tags)
    formData.append("description", form.description)
    formData.append("source", file)
    try {
      await axios.post("/api/item/create", formData)
      handleClose()
      window.location.reload()
    } catch (error: any) {
      setErr(error.message)
    }
  }
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Добавить звук
      </Button>
      <Dialog
        open={open}
        keepMounted
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Добавить звук</DialogTitle>
        <DialogContent
          style={{ display: "flex", flexDirection: "column",  }}
        >
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
          </form>
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
export default CreateSoundItem
