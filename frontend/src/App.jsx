import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import Home from "./pages/Home";
import BookPage from "./pages/BookPage";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookPage  />} />
      </Routes>
            <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
