import theme from "src/theme";
import "./App.css";
import FormProviderCaseMaterial from "./Form";
import MyTable from "./MyTable";
import { ThemeProvider } from "@mui/material";
import MyTableFormA from "src/components/TableFormA";
import MyTableFormB from "src/components/TableFormB";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <FormProviderCaseMaterial />

        <MyTable />

        <MyTableFormA />

        <MyTableFormB />
      </div>
    </ThemeProvider>
  );
}

export default App;
