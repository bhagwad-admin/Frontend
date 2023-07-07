import { Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./Components/Navbar";
import Home from "./Home";
import ChapterPage from "./ChapterPage";
import VersePage from "./VersePage";
import MeaningPage from "./MeaningPage";
import MeaningsContainer from "./MeaningsContainer";
import BlogsContainer from "./BlogsContainer";
import BlogPage from "./BlogPage";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <div className="fixed top-0 left-0 w-screen h-screen bg-fixed"></div>
      <div className="relative min-h-screen pb-20">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Frontend" element={<Home />} />
          <Route exact path="/chapters/:id" element={<ChapterPage />} />
          <Route
            exact
            path="/verses/chapter/:chapterId/verse/:verseId"
            element={<VersePage />}
          />
          <Route exact path="/meanings" element={<MeaningsContainer />} />
          <Route
            exact
            path="/meaning/chapter/:chapterId/verse/:verseId/:word"
            element={<MeaningPage />}
          />
          <Route exact path="/blogs" element={<BlogsContainer />} />
          <Route exact path="/blog/:blogId" element={<BlogPage />} />
        </Routes>
        <Footer />
      </div>

      {/* <Router></Router> */}
    </div>
  );
}

export default App;
