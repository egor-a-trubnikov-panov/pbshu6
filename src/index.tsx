import "./styles.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { useMachine } from "@xstate/react";
import machine from './machine'

function App() {
const [state, send]=useMachine(machine)
const {еда, какули}=state.context

  return (
    <div className="App">
      статус: {state.value}, еда: {еда}, какули: {какули}
      <button onClick={() => send("проснулась")}>
      проснулась
      </button>
      <button onClick={() => send("устала")}>
      устала
      </button>
      <button onClick={() => send("хочет кушать")}>
      хочет кушать
      </button>
      <button onClick={() => send("покушала")}>
      покушала
      </button>

      <button onClick={() => send("дали поесть")}>
      дали поесть
      </button>

      <button onClick={() => send("хочет какать")}>
      хочет какать
      </button>

      <button onClick={() => send("покакала")}>
      покакала
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
