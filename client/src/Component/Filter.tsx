import * as React from "react"
import { Autocomplete, TextField } from "@mui/material"

const tags = ["anime", "jojo",'shrek']

function Filter(props: any) {
  const { setFilter } = props
  const [value, setValue] = React.useState<string | null>("")

  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue)
          setFilter(newValue)
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
