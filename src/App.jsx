import "./App.css";
import { Tabulation } from "./pages/Tabulation";
import "./components/style.css";
import { Route, Routes } from "react-router-dom";
import { Redirect } from "./pages/Redirect";
import { Monthly } from "./pages/Monthly";

function App() {
  return (
    <Routes>
      <Route path="" element={<Redirect />} />
      <Route path="/home" element={<Tabulation />} />
      <Route path="/monthly" element={<Monthly />} />
    </Routes>
  );
}

export default App;
