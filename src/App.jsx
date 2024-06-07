import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Notes from "./pages/notes";
import LogIn from "./pages/logIn";
import SignUp from "./pages/signUp";
import Protected from "./components/Protected";
import OpenRoute from "./components/OpenRoute";
import Error from "./pages/error";
import BGImage from "./components/BGImage";

function App() {
  return (
    <BrowserRouter>
      <BGImage />
      <Routes>
        <Route index element={<Navigate to={"/notes"} />} />
        <Route
          path="/notes"
          element={
            <Protected>
              <Notes />
            </Protected>
          }
        />
        <Route
          path="/log_in"
          element={
            <OpenRoute>
              <LogIn />
            </OpenRoute>
          }
        />
        <Route
          path="/sign_up"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
