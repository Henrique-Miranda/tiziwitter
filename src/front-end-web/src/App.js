import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Timeline from "./pages/Timeline";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
