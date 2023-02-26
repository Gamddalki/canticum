import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Headquarters from "./Routes/about/Headquarters";
import Home from "./Routes/Home";
import Members from "./Routes/about/Members";
import About from "./Routes/about/About";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/about/members" element={<Members />}></Route>
        <Route path="/about/headquarters" element={<Headquarters />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
