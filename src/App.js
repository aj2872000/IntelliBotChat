// import "./App.css";
// // import { Jupyter, Notebook, Terminal } from "@datalayer/jupyter-react";

// // function App() {
// //   return (
// //     <div className="App">
// //       <Jupyter
// //         // jupyterServerHttpUrl="http://127.0.0.1:8888"
// //         // jupyterToken="42aa1954650df89e649019244a7f9d5aea1b5e1e646d82d0"
// //         terminals={true}
// //         collaborative={true}
// //       >
// //         {/* <Terminal colorMode="light" height="800px" /> */}
// //         {/* <Notebook renderers={[]} /> */}
// //       </Jupyter>
// //     </div>
// //   );
// // }

// App.js
// import React from "react";
// import CodeEditor from "./CodeEditor/CodeEditor";
// import "./App.css";
// import ErrorComponent from "./ErrorComponent/ErrorComponent";

// function App() {
//   return (
// <>
//   <div className="main">
//     <CodeEditor />
//     {/* <ErrorComponent message="ajay"/> */}
//   </div>
// </>
//   );
// }

// export default App;

import * as React from "react";
import "./App.css";
import CodeEditor from "./CodeEditor/CodeEditor";

function App() {
  return (
    <>
      <div className="main">
        <CodeEditor />
      </div>
    </>
  );
}
export default App;
