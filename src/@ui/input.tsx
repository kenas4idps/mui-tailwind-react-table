import React from "react";
import { TextField } from "@mui/material";

const CustomInput = React.forwardRef<
  React.ElementRef<typeof TextField>,
  React.ComponentPropsWithoutRef<typeof TextField>
>((props, ref) => {
  return (
    <TextField
      ref={ref}
      sx={{
        "& .MuiInputBase-root": {
          padding: "7.5px",
          borderStyle: "none",
        },
        "& .MuiInputBase-input": {
          padding: "0px",
          borderStyle: "none",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          // borderColor: "white",
        },
      }}
      {...props}
    />
  );
});

export default CustomInput;
