import * as React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material"

function CreateSoundItem() {
  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState({
    name: "",
    tags: "",
    description: "",
  })
  const [formData, setFile] = React.useState<FormData>(new FormData())

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
    formData.append("source", e.target.files[0])

    // console.log(formData.get("source"))
    // const reader = new FileReader()
    // reader.readAsBinaryString(e.target.files[0])

    setFile(formData)
  }

  const handleSend = async () => {
    try {
      formData.append("name", form.name)
      formData.append("tags", form.tags)
      formData.append("description", form.description)

      const res = await fetch("/api/item/create", {
        method: "POST",
        headers: {
          "Contetnt-Type": "multipart/form-data",
        },
        body: formData,
      })
      if (res.ok === true) handleClose()
    } catch (error) {}
  }
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Добавить звук
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Добавить звук</DialogTitle>
        <DialogContent
          style={{ display: "flex", flexDirection: "column", width: "500px" }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "500px",
            }}
          >
            <TextField
              onChange={handleChange}
              id="name"
              label="Название"
              variant="standard"
              autoComplete="off"
            />
            <TextField
              onChange={handleChange}
              id="tags"
              label="Теги"
              placeholder="kick, drums, snake, apple"
              variant="standard"
              autoComplete="off"
            />
            <TextField
              style={{ margin: "10px 0 0 0" }}
              onChange={handleChange}
              id="description"
              multiline
              minRows={4}
              maxRows={4}
              variant="standard"
              label="Описание"
              autoComplete="off"
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
