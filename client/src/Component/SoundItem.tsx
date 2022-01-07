import * as React from "react"
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"

import { Rating } from "@mui/material"

 function SoundItem() {
  const [value, setValue] = React.useState(2)

  return (
    <Card
      sx={{
        display: "flex",
      }}
    >
      <Box
        style={{
          display: "flex",
          border: "1px solid black",
          flexDirection: "row",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Live From Space
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Mac Miller
            </Typography>
          </CardContent>

          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
           
          </Box>
        </Box>

        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="https://media.discordapp.net/attachments/499622001850318858/928965958784122920/Pianobook-Thumbnail-1.jpg?width=512&height=512"
          alt="Live from space album cover"
        />
      </Box>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue || 2)
        }}
      />
    </Card>
  )
}

export default SoundItem