import React from "react";
import { TextField } from "@mui/material";
import { cn } from "src/util/cn";

const CustomInput = React.forwardRef<
  React.ElementRef<typeof TextField>,
  React.ComponentPropsWithoutRef<typeof TextField>
>(({ className, ...props }, ref) => {
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
      classes={{
        root: cn("base-custom-classname", className),
      }}
      {...props}
    />
  );
});

export default CustomInput;
