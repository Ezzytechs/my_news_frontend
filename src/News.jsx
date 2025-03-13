import { Routes, Route } from "react-router-dom";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetails";
import AddNews from "./pages/admin/AddNews";
import AdminDashboard from "./pages/admin/Dashboard";
import NewsByTag from "./pages/NewByTag";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
const News = () => {
  return (
    <>
<Navbar/>
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/news/tags/:tag" element={<NewsByTag />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/add-news" element={<AddNews />} />
      </Routes>
      <Footer/>
   </>
  );
};
export default News;
