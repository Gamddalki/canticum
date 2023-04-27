import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Members from "./Routes/about/Members";
import About from "./Routes/about/About";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Concert from "./Routes/news/Concert";
import Recruitment from "./Routes/Recruitment";
import AdminBg from "./Routes/admin/AdminBg";
import AdminConcert from "./Routes/admin/AdminConcert";
import AdminNews from "./Routes/admin/AdminNews";
import AdminMedia from "./Routes/admin/AdminMedia";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/newsletter/concert" element={<Concert />}></Route>
        <Route path="/recruitment" element={<Recruitment />}></Route>
        <Route path="/admin/background" element={<AdminBg />}></Route>
        <Route path="/admin/concert" element={<AdminConcert />}></Route>
        <Route path="/admin/newsletter" element={<AdminNews />}></Route>
        <Route path="/admin/media" element={<AdminMedia />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
