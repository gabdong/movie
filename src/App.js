import { useState, useEffect } from "react";

function Hello() {
  const byFn = () => {
    console.log("bye :(");
  };
  const effectFn = () => {
    console.log("created :)");
    return byFn; // cleanup function
  };
  useEffect(effectFn, []);
  return <h1>Hello</h1>;
}

function App() {
  const [showing, setShowing] = useState(false);
  const onclick = () => setShowing((prev) => !prev);
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onclick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
