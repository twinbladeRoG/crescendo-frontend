import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/loginPage";
import HomePage from "./Pages/homePage";
import AddDocPage from "./Pages/addDocPage";
import AllDocPage from "./Pages/allDocPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/add" element={<AddDocPage />} />
          <Route path="/mydocs" element={<AllDocPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
