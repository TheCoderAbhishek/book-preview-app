import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Contact from "./components/Contact";
import Layout from "./components/Layout";
import About from "./components/About";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
