import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Members from "./Routes/about/Members";
import About from "./Routes/about/About";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Concert from "./Routes/news/Concert";
import ConcertDetail from "./Routes/news/ConsertDetail";
import Recruitment from "./Routes/Recruitment";
import AdminBg from "./Routes/admin/AdminBg";
import AdminConcert from "./Routes/admin/AdminConcert";
import AdminNews from "./Routes/admin/AdminNews";
import AdminMedia from "./Routes/admin/AdminMedia";
import Newsletter from "./Routes/news/Newsletter";
import NewsletterDetail from "./Routes/news/NewsletterDetail";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/newsletter/concert/:id" element={<ConcertDetail />} />
        <Route path="/newsletter/concert" element={<Concert />} />
        <Route path="/newsletter/:id" element={<NewsletterDetail />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/admin/background" element={<AdminBg />} />
        <Route path="/admin/concert" element={<AdminConcert />} />
        <Route path="/admin/newsletter" element={<AdminNews />} />
        <Route path="/admin/media" element={<AdminMedia />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
