import { Vote } from "./Vote";
import { SignIn } from "./SignIn";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <SignIn />
      <Vote />
    </div>
  );
}

export default App;
