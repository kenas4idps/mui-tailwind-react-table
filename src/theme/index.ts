import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiInputBase: {},
  },
});

export default theme;
