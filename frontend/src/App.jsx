import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import Home from "./pages/Home";
import BookPage from "./pages/BookPage";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookPage />} />
      </Routes>
    </div>
  );
}

export default App;
