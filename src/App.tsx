import theme from "src/theme";
import "./App.css";
import FormProviderCaseMaterial from "./Form";
import MyTable from "./MyTable";
import { ThemeProvider } from "@mui/material";
import MyTableForm from "src/components/MyTableForm";
import MyTableFormB from "src/components/TableFormB";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <FormProviderCaseMaterial />

        <MyTable />

        <MyTableForm />

        <MyTableFormB />
      </div>
    </ThemeProvider>
  );
}

export default App;
