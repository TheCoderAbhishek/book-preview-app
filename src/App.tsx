import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Categories from "./components/Categories";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

// Create placeholder components for your pages
const About = () => <h1>About Page</h1>;
const Contact = () => <h1>Contact Page</h1>;

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
