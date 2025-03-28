import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Contact from "./components/Contact";
import Layout from "./components/Layout";
import About from "./components/About";
import BookDetails from "./components/BookDetails";
import WhoWeAre from "./components/WhoWeAre";
import Privacy from "./components/Privacy";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-details" element={<BookDetails />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
