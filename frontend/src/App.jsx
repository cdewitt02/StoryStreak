import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./pages/NavBar";
import Write from "./pages/Write";
import Read from "./pages/Read";
import ReadDetail from "./pages/ReadDetail";
import MyPosts from "./pages/MyPosts";
import UpdatePost from "./pages/UpdatePost";

export const Logout = () => {
  localStorage.clear();
  return <Navigate to="/login" />;
};

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <Write />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myposts"
          element={
            <ProtectedRoute>
              <MyPosts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/:slug"
          element={
            <ProtectedRoute>
              <UpdatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/read/:slug"
          element={
            <ProtectedRoute>
              <ReadDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/read"
          element={
            <ProtectedRoute>
              <Read />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
