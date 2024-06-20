import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageTemplate from "./PageTemplate";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Likes from "./pages/Likes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageTemplate />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signout" element={<Navigate to={"/"} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/likes" element={<Likes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
