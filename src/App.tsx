import { Theme } from "@radix-ui/themes";
import "./styles/globals.css";
import "@radix-ui/themes/styles.css";
import Chat from "@components/chatscreen";

function App() {
  return (
    <Theme appearance="light">
      <Chat />
    </Theme>
  );
}

export default App;
