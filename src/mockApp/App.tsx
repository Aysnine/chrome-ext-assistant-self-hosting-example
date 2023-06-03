import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RuntimeEventEmitter } from "../components/RuntimeEventBridge";
import { Button } from "antd";

function App() {
  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <RuntimeEventEmitter>
          {(emit) => (
            <Button
              onClick={() => {
                emit({ type: "TOGGLE_SIDEBAR" });
              }}
            >
              Toggle SideApp
            </Button>
          )}
        </RuntimeEventEmitter>
      </div>
    </>
  );
}

export default App;
