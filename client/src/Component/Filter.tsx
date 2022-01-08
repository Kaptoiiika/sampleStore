import * as React from "react"
import { Autocomplete, TextField } from "@mui/material"

const tags = ["anime", "jojo",'shrek']

function Filter(props: any) {
  const { setFilter } = props
  const [value, setValue] = React.useState<string | null>("")
  const [inputValue, setInputValue] = React.useState("")

  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue)
          setFilter(newValue)
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        options={tags}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Филтр" />
        )}
      />
    </>
  )
}

export default Filter
