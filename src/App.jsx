import "./App.css";

import Body from "./pages/Body";
import { Routes, Route } from "react-router-dom";
import PreviewLinks from "./pages/PreviewLinks";
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Body />} />
        <Route exact path="/preview" element={<PreviewLinks />} />
      </Routes>
    </div>
  );
}

export default App;
