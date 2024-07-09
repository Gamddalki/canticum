import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import About from "./Routes/about/About";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Concert from "./Routes/news/Concert";
import ConcertDetail from "./Routes/news/ConcertDetail";
import Recruitment from "./Routes/Recruitment";
import AdminBg from "./Routes/admin/AdminBg";
import AdminConcert from "./Routes/admin/AdminConcert";
import AdminNews from "./Routes/admin/AdminNews";
import AdminNotice from "./Routes/admin/AdminNotice";
import Newsletter from "./Routes/news/Newsletter";
import NewsletterDetail from "./Routes/news/NewsletterDetail";
import AdminVideo from "./Routes/admin/AdminVideo";
import AdminPopup from "./Routes/admin/AdminPopup";
import AdminView from "./Routes/admin/AdminView";

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
        <Route path="/admin/video" element={<AdminVideo />} />
        <Route path="/admin/popup" element={<AdminPopup />} />
        <Route path="/admin/concert/:code" element={<AdminConcert />} />
        <Route path="/admin/concert" element={<AdminConcert />} />
        <Route path="/admin/news/:code" element={<AdminNews />} />
        <Route path="/admin/newsletter" element={<AdminNews />} />
        <Route path="/admin/noti/:code" element={<AdminNotice />} />
        <Route path="/admin/notice" element={<AdminNotice />} />
        <Route path="/admin/view/:type" element={<AdminView />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
