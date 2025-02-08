import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./styles/globals.css";
import Home from "./components/Home/home";


function App() {
  return (
    <Theme appearance="light">
      <Home />
    </Theme>
  );
}

export default App;
