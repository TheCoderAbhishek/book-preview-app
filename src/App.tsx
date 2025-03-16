import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Categories from "./components/Categories";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Create placeholder components for your pages
const About = () => <h1>About Page</h1>;
const Contact = () => <h1>Contact Page</h1>;
const Search = () => <h1>Search Page</h1>;

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
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
