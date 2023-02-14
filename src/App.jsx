import "./App.css";
import { CryptoInfo } from "./components/CryptoInfo";

function App() {
  return (
    <div className="container-fluid">
      <h1 className="text-center text-light">React crypto</h1>
      <CryptoInfo />
    </div>
  );
}

export default App;
